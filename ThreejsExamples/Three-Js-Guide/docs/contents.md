<style>
  .guide-table-wrapper {
    margin: 24px 0;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid rgba(168, 85, 247, 0.35);
    background: linear-gradient(180deg, rgba(30, 30, 36, 0.96), rgba(20, 20, 26, 0.96));
    box-shadow:
      0 8px 30px rgba(0, 0, 0, 0.35),
      0 0 0 1px rgba(168, 85, 247, 0.08) inset;
  }

  .guide-table {
    width: 100%;
    border-collapse: collapse;
    color: #f3f4f6;
    font-family: Inter, Segoe UI, Arial, sans-serif;
    font-size: 15px;
  }

  .guide-table thead tr {
    background: linear-gradient(90deg, #334155, #3b4d63);
  }

  .guide-table th {
    text-align: left;
    padding: 14px 16px;
    font-weight: 700;
    color: #ffffff;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    letter-spacing: 0.2px;
  }

  .guide-table td {
    padding: 14px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    color: #e5e7eb;
  }

  .guide-table tbody tr {
    background: rgba(255, 255, 255, 0.01);
    transition: background 0.2s ease, transform 0.2s ease;
  }

  .guide-table tbody tr:hover {
    background: rgba(168, 85, 247, 0.08);
  }

  .guide-table tbody tr:last-child td {
    border-bottom: none;
  }

  .guide-table .sr {
    width: 120px;
    color: #f8fafc;
  }

  .guide-table .topic {
    width: 60%;
    font-weight: 500;
  }

  .guide-table .link a {
    display: inline-block;
    color: #60a5fa;
    font-weight: 700;
    text-decoration: none;
    padding: 6px 12px;
    border-radius: 8px;
    background: rgba(59, 130, 246, 0.08);
    border: 1px solid rgba(96, 165, 250, 0.22);
    transition: all 0.2s ease;
  }

  .guide-table .link a:hover {
    color: #ffffff;
    background: linear-gradient(90deg, rgba(124, 58, 237, 0.85), rgba(168, 85, 247, 0.85));
    border-color: rgba(192, 132, 252, 0.6);
    box-shadow: 0 0 18px rgba(168, 85, 247, 0.28);
  }
</style>

<div class="guide-table-wrapper">
  <table class="guide-table">
    <thead>
      <tr>
        <th>Sr No</th>
        <th>Topic</th>
        <th>Link</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="sr">1</td>
        <td class="topic">Computer Fundamentals</td>
        <td class="link">
          <a href="https://threejsguide.vercel.app/#file=.%2FThreejsExamples%2FChapter-01-Basics%2Fdocs%2Fcomputer-fundamentals.md" target="_blank">
            Open
          </a>
        </td>
      </tr>
      <tr>
        <td class="sr">2</td>
        <td class="topic">Environment Setup</td>
        <td class="link">
          <a href="https://threejsguide.vercel.app/#file=.%2FThreejsExamples%2FChapter-01-Basics%2Fdocs%2Fenvironment-setup.md" target="_blank">
            Open
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</div>