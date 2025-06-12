const sportPitanje = [
  {
    pitanje: "Which country won the FIFA World Cup in 2018?",
    odg: ["Brazil", "Germany", "France", "Argentina"],
    tocno: 2
  },
  {
    pitanje: "How many players are there in a basketball team on the court?",
    odg: ["5", "6", "7", "11"],
    tocno: 0
  },
  {
    pitanje: "Who holds the record for the most Grand Slam tennis titles (men's singles)?",
    odg: ["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Pete Sampras"],
    tocno: 2
  }
];

function randomPitanje(polje) {
  for (let i = polje.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [polje[i], polje[j]] = [polje[j], polje[i]];
  }
}

randomPitanje(sportPitanje);

sportPitanje.forEach(q => {
  const tocanOdg = q.odg[q.tocno];
  randomPitanje(q.odg);
  q.tocno = q.odg.indexOf(tocanOdg);
});

let trenPitanje = 0;
let bodovi = 0;

function prikaziPitanje(index) {
  const q = sportPitanje[index];
  const container = document.getElementById('quiz-container');
  container.innerHTML = `
    <h2>${q.pitanje}</h2>
    <ul style="list-style:none; padding:0;">
      ${q.odg.map((ans, i) => 
        `<li style="margin-bottom:10px;">
          <button onclick="provjera(${index}, ${i})" style="padding:10px 20px;">${ans}</button>
        </li>`
      ).join('')}
    </ul>
    <div id="feedback" style="margin-top:10px;"></div>
    <div id="score" style="margin-top:16px;font-weight:bold;">Score: ${bodovi}</div>
  `;
}

function provjera(qIndex, odgIndex) {
  const jeTocno = odgIndex === sportPitanje[qIndex].tocno;
  const feedback = document.getElementById('feedback');
  
  if (jeTocno) {
    feedback.textContent = "Correct!";
    feedback.style.color = "green";
    bodovi++;
  } else {
    feedback.textContent = "Incorrect!";
    feedback.style.color = "red";
  }

  const scoreDiv = document.getElementById('score');
  if (scoreDiv) scoreDiv.textContent = `Score: ${bodovi}`;

  document.querySelectorAll('#quiz-container button').forEach(btn => btn.disabled = true);

  setTimeout(() => {
    trenPitanje++;
    if (trenPitanje < sportPitanje.length) {
      prikaziPitanje(trenPitanje);
    } else {
      prikaziKraj();
    }
  }, 1000);
}

window.onload = function() {
  if (document.getElementById('quiz-container')) {
    prikaziPitanje(trenPitanje);
  }
};

let username = "";

document.getElementById('login-form').onsubmit = function(e) {
  e.preventDefault();
  username = document.getElementById('username').value.trim();
  if (username) {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = '';
    prikaziPitanje(trenPitanje);
  }
};

function prikaziKraj() {
  const container = document.getElementById('quiz-container');
  container.innerHTML = `<h2>Quiz finished!</h2>
    <div class="prikaziKraj">Your score: ${bodovi} / ${sportPitanje.length}</div>`;

  let leaderboard = JSON.parse(localStorage.getItem('leaderboard_sport')) || [];
  leaderboard.push({ username, score: bodovi, total: sportPitanje.length });
  localStorage.setItem('leaderboard_sport', JSON.stringify(leaderboard));
}