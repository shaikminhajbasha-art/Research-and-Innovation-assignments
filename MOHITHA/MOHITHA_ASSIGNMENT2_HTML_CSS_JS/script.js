const questions = [
  {
    question: "What does 'AI' stand for?",
    options: ["Automated Integration", "Artificial Intelligence", "Advanced Interface", "Algorithmic Input"],
    answer: 1
  },
  {
    question: "Which of the following is a popular large language model (LLM) developed by OpenAI?",
    options: ["BERT", "LaMDA", "GPT-4", "PaLM"],
    answer: 2
  },
  {
    question: "What technique is used to train AI models by rewarding correct behavior and penalizing wrong behavior?",
    options: ["Supervised Learning", "Reinforcement Learning", "Clustering", "PCA"],
    answer: 1
  },
  {
    question: "Which company developed the AI assistant called 'Claude'?",
    options: ["Google", "Meta", "Anthropic", "Microsoft"],
    answer: 2
  },
  {
    question: "What is 'hallucination' in the context of AI language models?",
    options: [
      "When AI creates visual art",
      "When AI generates false or made-up information confidently",
      "When AI refuses to answer a question",
      "When AI runs too slowly"
    ],
    answer: 1
  }
];

const LABELS = ["A", "B", "C", "D"];
let currentIndex = 0;
let score = 0;
let answered = false;

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function startQuiz() {
  currentIndex = 0;
  score = 0;
  answered = false;
  loadQuestion();
  showScreen("screen-quiz");
}

function restartQuiz() {
  showScreen("screen-welcome");
}

function loadQuestion() {
  answered = false;
  const q = questions[currentIndex];
  const total = questions.length;

  document.getElementById("question-counter").textContent = "Question " + (currentIndex + 1) + " of " + total;
  document.getElementById("score-tracker").textContent = "Score: " + score;
  document.getElementById("progress-fill").style.width = ((currentIndex / total) * 100) + "%";
  document.getElementById("question-text").textContent = q.question;

  const grid = document.getElementById("options-grid");
  grid.innerHTML = "";
  q.options.forEach(function(opt, i) {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerHTML = '<span class="opt-label">' + LABELS[i] + '</span> ' + opt;
    btn.addEventListener("click", function() { selectOption(i); });
    grid.appendChild(btn);
  });

  const nextBtn = document.getElementById("next-btn");
  nextBtn.disabled = true;
  nextBtn.textContent = currentIndex === total - 1 ? "See Results 🏁" : "Next →";
}

function selectOption(selectedIndex) {
  if (answered) return;
  answered = true;

  const correct = questions[currentIndex].answer;
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach(function(btn, i) {
    btn.disabled = true;
    if (i === correct) btn.classList.add("correct");
    else if (i === selectedIndex) btn.classList.add("wrong");
  });

  if (selectedIndex === correct) score++;
  document.getElementById("score-tracker").textContent = "Score: " + score;
  document.getElementById("next-btn").disabled = false;
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const total = questions.length;
  const pct = (score / total) * 100;

  let emoji, title, msg;
  if (pct === 100) {
    emoji = "🏆"; title = "Perfect Score!"; msg = "Outstanding! You're an AI genius!";
  } else if (pct >= 60) {
    emoji = "🎉"; title = "Well Done!"; msg = "Great job! You know your AI stuff.";
  } else if (pct >= 40) {
    emoji = "👍"; title = "Not Bad!"; msg = "Good effort! Keep exploring AI.";
  } else {
    emoji = "📚"; title = "Keep Learning!"; msg = "Don't give up — AI is a big topic!";
  }

  document.getElementById("result-emoji").textContent = emoji;
  document.getElementById("result-title").textContent = title;
  document.getElementById("result-score").innerHTML = "You scored <strong>" + score + " / " + total + "</strong>";
  document.getElementById("result-msg").textContent = msg;
  document.getElementById("progress-fill").style.width = "100%";
  showScreen("screen-result");
}