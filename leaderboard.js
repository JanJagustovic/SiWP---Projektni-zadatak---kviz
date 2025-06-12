window.onload = function() {
  const container = document.getElementById('leaderboard-container');
  let sport = JSON.parse(localStorage.getItem('leaderboard_sport')) || [];
  let film = JSON.parse(localStorage.getItem('leaderboard_film')) || [];
  let general = JSON.parse(localStorage.getItem('leaderboard_general')) || [];

  function renderTable(title, data) {
    if (data.length === 0) {
      return `<h2>${title}</h2><p>No scores yet.</p>`;
    }
    data.sort((a, b) => b.score - a.score);
    return `
      <h2>${title}</h2>
      <table style="margin:auto;">
        <tr><th>Username</th><th>Score</th></tr>
        ${data.map(entry =>
          `<tr><td>${entry.username}</td><td>${entry.score} / ${entry.total}</td></tr>`
        ).join('')}
      </table>
    `;
  }

  container.innerHTML = `
    <div style="display: flex; flex-wrap: wrap; gap: 32px; justify-content: center;">
      <div>${renderTable("Sport Leaderboard", sport)}</div>
      <div>${renderTable("Film Leaderboard", film)}</div>
      <div>${renderTable("General Knowledge Leaderboard", general)}</div>
    </div>
  `;
};