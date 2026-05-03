type Question = {
  question: string;
  answers: string[];
  correct: number;
  category: string;
};

const allQuestions: Question[] = [
 
  { question: "2 + 2?", answers: ["3", "4", "5", "6"], correct: 1, category: "Math" },
  { question: "10 * 2?", answers: ["10", "20", "30", "40"], correct: 1, category: "Math" },


  { question: "Capital of France?", answers: ["Berlin", "Paris", "Rome", "Madrid"], correct: 1, category: "Geography" },
  { question: "Capital of Japan?", answers: ["Seoul", "Tokyo", "Beijing", "Bangkok"], correct: 1, category: "Geography" },

  
  { question: "JS runs where?", answers: ["Server only", "Browser", "Database", "None"], correct: 1, category: "Programming" },
  { question: "HTML stands for?", answers: ["Hyper Text Markup Language", "Hot Mail", "How To Make Lasagna", "None"], correct: 0, category: "Programming" },

  
  { question: "Sun is a?", answers: ["Planet", "Star", "Moon", "Galaxy"], correct: 1, category: "General" },
  { question: "Water freezes at?", answers: ["0°C", "10°C", "100°C", "-10°C"], correct: 0, category: "General" },

  
  { question: "Fastest land animal?", answers: ["Lion", "Cheetah", "Tiger", "Horse"], correct: 1, category: "General" },
  { question: "Largest ocean?", answers: ["Atlantic", "Indian", "Pacific", "Arctic"], correct: 2, category: "Geography" },
];

let questions: Question[] = [];
let index = 0;
let score = 0;
let answered = false;
let timeLeft = 10;
let timer: number;
let selectedCategory = "All";

const app = document.getElementById("app")!;

// Filter by category
function getFilteredQuestions() {
  if (selectedCategory === "All") return allQuestions;
  return allQuestions.filter(q => q.category === selectedCategory);
}

//  Timer
function startTimer() {
  clearInterval(timer);
  timeLeft = 10;
  updateTimer();

  timer = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft <= 0) {
      clearInterval(timer);
      handleTimeout();
    }
  }, 1000);
}

function updateTimer() {
  const el = document.getElementById("timer");
  if (el) el.textContent = `⏱ ${timeLeft}s`;
}

function handleTimeout() {
  if (answered) return;
  answered = true;

  const q = questions[index];
  const buttons = document.querySelectorAll("#answers button");

  buttons.forEach((btn, i) => {
    const b = btn as HTMLButtonElement;
    if (i === q.correct) b.classList.add("correct");
    b.disabled = true;
  });

  document.getElementById("feedback")!.textContent = "⏰ Time's up!";
  enableNext();
}

function enableNext() {
  (document.getElementById("nextBtn") as HTMLButtonElement).disabled = false;
}

//  CATEGORY SCREEN
function renderCategorySelect() {
  const categories = ["All", ...new Set(allQuestions.map(q => q.category))];

  app.innerHTML = `
    <div class="card fade">
      <h2>Select Category</h2>
      <div id="categories"></div>
    </div>
  `;

  const container = document.getElementById("categories")!;

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;

    btn.onclick = () => {
      selectedCategory = cat;
      questions = getFilteredQuestions();
      index = 0;
      score = 0;
      render();
    };

    container.appendChild(btn);
  });
}

//  MAIN QUIZ
function render() {
  const q = questions[index];

  if (!q) {
    app.innerHTML = `
      <div class="card fade">
        <h1>🎉 Finished</h1>
        <p>Score: ${score} / ${questions.length}</p>
        <button onclick="location.reload()">Restart</button>
      </div>
    `;
    return;
  }

  const progress = ((index / questions.length) * 100).toFixed(0);

  app.innerHTML = `
    <div class="card fade">
      <div class="top-bar">
        <span>${selectedCategory}</span>
        <span id="timer"></span>
      </div>

      <div class="progress">
        <div class="progress-bar" style="width:${progress}%"></div>
      </div>

      <h2>${q.question}</h2>
      <div id="answers"></div>
      <p id="feedback"></p>
      <button id="nextBtn" disabled>Next</button>
    </div>
  `;

  const answersEl = document.getElementById("answers")!;
  const feedback = document.getElementById("feedback")!;
  const nextBtn = document.getElementById("nextBtn") as HTMLButtonElement;

  answered = false;
  startTimer();

  q.answers.forEach((answer, i) => {
    const btn = document.createElement("button");
    btn.textContent = answer;

    btn.onclick = () => {
      if (answered) return;
      answered = true;
      clearInterval(timer);

      const allBtns = answersEl.querySelectorAll("button");

      allBtns.forEach((b, idx) => {
        const button = b as HTMLButtonElement;
        if (idx === q.correct) button.classList.add("correct");
        if (idx === i && i !== q.correct) button.classList.add("wrong");
        button.disabled = true;
      });

      if (i === q.correct) {
        score++;
        feedback.textContent = "✅ Correct!";
      } else {
        feedback.textContent = "❌ Wrong!";
      }

      enableNext();
    };

    answersEl.appendChild(btn);
  });

  nextBtn.onclick = () => {
    index++;
    render();
  };
}

// 🚀 START
renderCategorySelect();