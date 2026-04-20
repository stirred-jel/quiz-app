type Question = {
  question: string;
  answers: string[];
  correct: number;
};

const quiz: Question[] = [
  {
    question: "What is 2 + 2?",
    answers: ["3", "4", "5", "6"],
    correct: 1,
  },
  {
    question: "Capital of France?",
    answers: ["Berlin", "Paris", "Rome", "Madrid"],
    correct: 1,
  },
  {
    question: "Which language runs in the browser?",
    answers: ["Java", "C", "JavaScript", "Python"],
    correct: 2,
  },
];

let index = 0;
let score = 0;

const app = document.getElementById("app")!;

function render() {
  const q = quiz[index];

  if (!q) {
    app.innerHTML = `
      <div class="quiz">
        <h1>Finished 🎉</h1>
        <p>Your score: ${score} / ${quiz.length}</p>
        <button onclick="location.reload()">Restart</button>
      </div>
    `;
    return;
  }

  app.innerHTML = `
    <div class="quiz">
      <h2>${q.question}</h2>
      <div id="answers"></div>
    </div>
  `;

  const answersEl = document.getElementById("answers")!;

  q.answers.forEach((answer, i) => {
    const btn = document.createElement("button");
    btn.textContent = answer;

    btn.onclick = () => {
      if (i === q.correct) score++;
      index++;
      render();
    };

    answersEl.appendChild(btn);
  });
}

render();