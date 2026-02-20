import http from 'node:http';

const PORT = Number(process.env.PORT || 8787);
const GITHUB_OWNER = process.env.GITHUB_OWNER || '';
const GITHUB_REPO = process.env.GITHUB_REPO || '';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

function json(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': CORS_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(payload));
}

function sanitizePath(path) {
  const p = String(path || '').replace(/\\/g, '/').replace(/^\/+/, '').replace(/^\.\//, '');
  if (!p) return '';
  if (p.includes('..')) return '';
  return p;
}

async function githubRequest(path, method = 'GET', body) {
  const resp = await fetch(`https://api.github.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'User-Agent': 'ThreejsGuide-Publisher'
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await resp.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }
  return { ok: resp.ok, status: resp.status, data };
}

async function getExistingSha(path) {
  const encoded = encodeURIComponent(path).replace(/%2F/g, '/');
  const endpoint = `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${encoded}?ref=${encodeURIComponent(GITHUB_BRANCH)}`;
  const resp = await githubRequest(endpoint, 'GET');
  if (!resp.ok) {
    if (resp.status === 404) return null;
    throw new Error(`Failed to fetch existing file ${path}: ${resp.status}`);
  }
  return resp.data && resp.data.sha ? resp.data.sha : null;
}

async function upsertFile(path, content, message) {
  const safePath = sanitizePath(path);
  if (!safePath) throw new Error(`Invalid file path: ${path}`);
  const sha = await getExistingSha(safePath);
  const encoded = encodeURIComponent(safePath).replace(/%2F/g, '/');
  const endpoint = `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${encoded}`;
  const payload = {
    message,
    content: Buffer.from(String(content ?? ''), 'utf8').toString('base64'),
    branch: GITHUB_BRANCH
  };
  if (sha) payload.sha = sha;
  const resp = await githubRequest(endpoint, 'PUT', payload);
  if (!resp.ok) {
    const errMsg = resp.data && (resp.data.message || resp.data.error) ? (resp.data.message || resp.data.error) : `GitHub API error ${resp.status}`;
    throw new Error(`Failed to publish ${safePath}: ${errMsg}`);
  }
  return {
    path: safePath,
    sha: resp.data?.content?.sha || null
  };
}

function validateEnv() {
  if (!GITHUB_OWNER || !GITHUB_REPO || !GITHUB_TOKEN) {
    return 'Missing env vars. Set GITHUB_OWNER, GITHUB_REPO, GITHUB_TOKEN (and optional GITHUB_BRANCH).';
  }
  return null;
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    return json(res, 200, { ok: true });
  }
  if (req.url !== '/api/github/publish' || req.method !== 'POST') {
    return json(res, 404, { ok: false, error: 'Not found' });
  }

  const envError = validateEnv();
  if (envError) return json(res, 500, { ok: false, error: envError });

  try {
    let raw = '';
    for await (const chunk of req) raw += chunk;
    const payload = raw ? JSON.parse(raw) : {};
    const files = Array.isArray(payload.files) ? payload.files : [];
    if (!files.length) {
      return json(res, 400, { ok: false, error: 'files[] is required' });
    }

    const baseMessage = String(payload.message || 'Studio publish');
    const committed = [];
    for (const f of files) {
      const filePath = sanitizePath(f.path);
      if (!filePath) throw new Error(`Invalid path in payload: ${f.path}`);
      const result = await upsertFile(filePath, f.content || '', `${baseMessage} (${filePath})`);
      committed.push(result);
    }

    return json(res, 200, {
      ok: true,
      repo: `${GITHUB_OWNER}/${GITHUB_REPO}`,
      branch: GITHUB_BRANCH,
      committed
    });
  } catch (err) {
    return json(res, 500, { ok: false, error: err?.message || 'Publish failed' });
  }
});

server.listen(PORT, () => {
  console.log(`[github-publish-server] running on http://127.0.0.1:${PORT}`);
});

