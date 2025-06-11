const filmPitanje = [
  {
    pitanje: "Who directed the movie 'Inception'?",
    odg: ["Christopher Nolan", "Steven Spielberg", "James Cameron", "Martin Scorsese"],
    tocno: 0
  },
  {
    pitanje: "Which movie won the Oscar for Best Picture in 2020?",
    odg: ["1917", "Joker", "Parasite", "Once Upon a Time in Hollywood"],
    tocno: 2
  },
  {
    pitanje: "Which actor played the character of Jack Dawson in 'Titanic'?",
    odg: ["Leonardo DiCaprio", "Brad Pitt", "Johnny Depp", "Matt Damon"],
    tocno: 0
  }
];

function randomPitanje(polje) {
  for (let i = polje.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [polje[i], polje[j]] = [polje[j], polje[i]];
  }
}

randomPitanje(filmPitanje);
filmPitanje.forEach(q => {
  const tocanOdg = q.odg[q.tocno];
  randomPitanje(q.odg);
  q.tocno = q.odg.indexOf(tocanOdg);
});

let trenPitanje = 0;
let bodovi = 0;

function prikaziPitanje(index) {
  const q = filmPitanje[index];
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

function provjera(pitanjeIndex, odgIndex) {
  const jeTocno = odgIndex === filmPitanje[pitanjeIndex].tocno;
  const feedback = document.getElementById('feedback');

  if (jeTocno) {
    feedback.textContent = "Correct!";
    feedback.style.color = "green";
    bodovi++;
  } else {
    feedback.textContent = "Incorrect!";
    feedback.style.color = "red";
  }

  document.getElementById('score').textContent = `Score: ${bodovi}`;
  document.querySelectorAll('#quiz-container button').forEach(btn => btn.disabled = true);

  setTimeout(() => {
    trenPitanje++;
    if (trenPitanje < filmPitanje.length) {
      prikaziPitanje(trenPitanje);
    } else {
      prikaziKraj();
    }
  }, 1000);
}

function prikaziKraj() {
  const container = document.getElementById('quiz-container');
  container.innerHTML = `
    <h2>Quiz finished!</h2>
    <div class = "prikaziKraj">
      Your score: ${bodovi} / ${filmPitanje.length}
    </div>`;
}

window.onload = function() {
  const container = document.getElementById('quiz-container');
  if (container) {
    prikaziPitanje(trenPitanje);
  }
};