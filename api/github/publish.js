function sanitizePath(path) {
  const p = String(path || '')
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')
    .replace(/^\.\//, '');
  if (!p || p.includes('..')) return '';
  return p;
}

async function githubRequest(path, method = 'GET', body) {
  const token = process.env.GITHUB_TOKEN || '';
  const response = await fetch(`https://api.github.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'User-Agent': 'ThreejsGuide-Vercel-Publisher'
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await response.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }
  return { ok: response.ok, status: response.status, data };
}

async function getExistingSha(owner, repo, branch, path) {
  const encoded = encodeURIComponent(path).replace(/%2F/g, '/');
  const endpoint = `/repos/${owner}/${repo}/contents/${encoded}?ref=${encodeURIComponent(branch)}`;
  const res = await githubRequest(endpoint, 'GET');
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Failed to fetch existing file ${path}: ${res.status}`);
  }
  return res.data && res.data.sha ? res.data.sha : null;
}

async function upsertFile(owner, repo, branch, path, content, message) {
  const safePath = sanitizePath(path);
  if (!safePath) throw new Error(`Invalid file path: ${path}`);
  const sha = await getExistingSha(owner, repo, branch, safePath);
  const encoded = encodeURIComponent(safePath).replace(/%2F/g, '/');
  const endpoint = `/repos/${owner}/${repo}/contents/${encoded}`;
  const payload = {
    message,
    content: Buffer.from(String(content ?? ''), 'utf8').toString('base64'),
    branch
  };
  if (sha) payload.sha = sha;

  const res = await githubRequest(endpoint, 'PUT', payload);
  if (!res.ok) {
    const msg =
      (res.data && (res.data.message || res.data.error)) ||
      `GitHub API error ${res.status}`;
    throw new Error(`Failed to publish ${safePath}: ${msg}`);
  }
  return { path: safePath, sha: res.data?.content?.sha || null };
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const owner = process.env.GITHUB_OWNER || '';
  const repo = process.env.GITHUB_REPO || '';
  const branch = process.env.GITHUB_BRANCH || 'main';
  const token = process.env.GITHUB_TOKEN || '';
  if (!owner || !repo || !token) {
    return res.status(500).json({
      ok: false,
      error: 'Missing env vars: GITHUB_OWNER, GITHUB_REPO, GITHUB_TOKEN'
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const files = Array.isArray(body.files) ? body.files : [];
    if (!files.length) {
      return res.status(400).json({ ok: false, error: 'files[] is required' });
    }

    const baseMessage = String(body.message || 'Studio publish');
    const committed = [];
    for (const file of files) {
      const result = await upsertFile(
        owner,
        repo,
        branch,
        file.path,
        file.content || '',
        `${baseMessage} (${file.path})`
      );
      committed.push(result);
    }

    return res.status(200).json({
      ok: true,
      repo: `${owner}/${repo}`,
      branch,
      committed
    });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error?.message || 'Publish failed' });
  }
};

