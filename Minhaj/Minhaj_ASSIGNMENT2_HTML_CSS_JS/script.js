// ============================================================
//  QUIZ DATA
// ============================================================
const questions = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    question: "Who is credited with inventing the World Wide Web?",
    options: ["Bill Gates", "Steve Jobs", "Tim Berners-Lee", "Linus Torvalds"],
    answer: "Tim Berners-Lee"
  },
  {
    question: "What is the chemical symbol for Gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    answer: "Au"
  },
  {
    question: "In which year did the first iPhone launch?",
    options: ["2004", "2005", "2007", "2009"],
    answer: "2007"
  },
  {
    question: "How many bones are in the adult human body?",
    options: ["196", "206", "216", "226"],
    answer: "206"
  }
];

// ============================================================
//  STATE
// ============================================================
let currentIndex = 0;
let score = 0;
let answered = false;

// ============================================================
//  ELEMENT REFERENCES
// ============================================================
const startScreen   = document.getElementById("start-screen");
const quizScreen    = document.getElementById("quiz-screen");
const resultScreen  = document.getElementById("result-screen");

const startBtn      = document.getElementById("start-btn");
const nextBtn       = document.getElementById("next-btn");
const restartBtn    = document.getElementById("restart-btn");

const questionText  = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionCount = document.getElementById("question-count");
const scoreLive     = document.getElementById("score-live");
const progressFill  = document.getElementById("progress-fill");

const finalScore    = document.getElementById("final-score");
const resultTitle   = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");
const trophyEl      = document.getElementById("trophy");

// ============================================================
//  HELPER — show a screen
// ============================================================
function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach(s => s.classList.add("hidden"));
  screen.classList.remove("hidden");
  // Re-trigger animation
  screen.style.animation = "none";
  screen.offsetHeight; // reflow
  screen.style.animation = "";
}

// ============================================================
//  LOAD QUESTION
// ============================================================
function loadQuestion() {
  answered = false;
  nextBtn.disabled = true;

  const q = questions[currentIndex];

  // Update meta
  questionCount.textContent = `Question ${currentIndex + 1} / ${questions.length}`;
  scoreLive.textContent = `Score: ${score}`;
  progressFill.style.width = `${((currentIndex) / questions.length) * 100}%`;

  // Question text
  questionText.textContent = q.question;

  // Build options
  optionsContainer.innerHTML = "";
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.classList.add("option");
    btn.textContent = opt;
    btn.addEventListener("click", () => selectAnswer(btn, opt, q.answer));
    optionsContainer.appendChild(btn);
  });
}

// ============================================================
//  SELECT ANSWER
// ============================================================
function selectAnswer(selectedBtn, selected, correct) {
  if (answered) return;
  answered = true;

  const allOptions = optionsContainer.querySelectorAll(".option");

  allOptions.forEach(btn => {
    btn.classList.add("disabled");
    if (btn.textContent === correct) btn.classList.add("correct");
  });

  if (selected === correct) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  scoreLive.textContent = `Score: ${score}`;
  nextBtn.disabled = false;
}

// ============================================================
//  NEXT BUTTON
// ============================================================
nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

// ============================================================
//  SHOW RESULT
// ============================================================
function showResult() {
  progressFill.style.width = "100%";
  showScreen(resultScreen);

  finalScore.textContent = score;

  const pct = (score / questions.length) * 100;
  if (pct === 100) {
    trophyEl.textContent = "🏆";
    resultTitle.textContent = "Perfect Score!";
    resultMessage.textContent = "Outstanding! You got every single question right. You're a true genius!";
  } else if (pct >= 60) {
    trophyEl.textContent = "🎯";
    resultTitle.textContent = "Well Done!";
    resultMessage.textContent = "Great effort! You clearly know your stuff. Keep it up!";
  } else {
    trophyEl.textContent = "📚";
    resultTitle.textContent = "Keep Learning!";
    resultMessage.textContent = "Not bad for a start. Review the topics and give it another shot!";
  }
}

// ============================================================
//  START / RESTART
// ============================================================
startBtn.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  showScreen(quizScreen);
  loadQuestion();
});

restartBtn.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  showScreen(quizScreen);
  loadQuestion();
});
