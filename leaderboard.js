localStorage.clear();
window.onload = function() {
  const sportDiv   = document.getElementById('sport-leaderboard');
  const filmDiv    = document.getElementById('film-leaderboard');
  const generalDiv = document.getElementById('general-leaderboard');

  let sport   = JSON.parse(localStorage.getItem('leaderboard_sport'))   || [];
  let film    = JSON.parse(localStorage.getItem('leaderboard_film'))    || [];
  let general = JSON.parse(localStorage.getItem('leaderboard_general')) || [];

  function renderTable(title, data) {
    if (data.length === 0) {
      return `<h2>${title}</h2><p>No scores yet.</p>`;
    }
    data.sort((a, b) => b.score - a.score);
    return `
      <h2>${title}</h2>
      <table>
        <tr><th>Username</th><th>Score</th></tr>
        ${data.map(e =>
          `<tr>
             <td>${e.username}</td>
             <td> ${e.score} / ${e.total}</td>
           </tr>`
        ).join('')}
      </table>
    `;
  }

  sportDiv.innerHTML = renderTable("Sport Leaderboard", sport);
  filmDiv.innerHTML = renderTable("Film Leaderboard", film);
  generalDiv.innerHTML = renderTable("General Knowledge Leaderboard", general);
};
