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
      <p id="feedback"></p>
    </div>
  `;

  const answersEl = document.getElementById("answers")!;
  const feedbackEl = document.getElementById("feedback")!;

  q.answers.forEach((answer, i) => {
    const btn = document.createElement("button");
    btn.textContent = answer;

    btn.onclick = () => {
   
      const allButtons = answersEl.querySelectorAll("button");
      allButtons.forEach(b => (b as HTMLButtonElement).disabled = true);

      if (i === q.correct) {
        score++;
        feedbackEl.textContent = "✅ Correct!";
        btn.style.background = "#4ade80"; 
      } else {
        feedbackEl.textContent = "❌ Wrong!";
        btn.style.background = "#f87171"; 

        allButtons[q.correct].classList.add("correct");
      }

  
      setTimeout(() => {
        index++;
        render();
      }, 1000);
    };

    answersEl.appendChild(btn);
  });
}

render();