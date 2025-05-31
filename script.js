// Quiz Data
const quizData = [
  {
    question: "🌐 What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
    answer: 0
  },
  {
    question: "🎨 What does CSS stand for?",
    options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"],
    answer: 1
  }
];

const quizContainer = document.getElementById("quiz");

quizData.forEach((q, index) => {
  const questionDiv = document.createElement("div");
  questionDiv.innerHTML = `<p><strong>${q.question}</strong></p>`;
  q.options.forEach((opt, i) => {
    questionDiv.innerHTML += `
      <label>
        <input type="radio" name="q${index}" value="${i}"> ${opt}
      </label><br>`;
  });
  quizContainer.appendChild(questionDiv);
});

function submitQuiz() {
  let score = 0;
  quizData.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && parseInt(selected.value) === q.answer) {
      score++;
    }
  });
  document.getElementById("quizResult").textContent = `🎯 You scored ${score}/${quizData.length}`;
}

function getJoke() {
  fetch("https://official-joke-api.appspot.com/jokes/random")
    .then(response => response.json())
    .then(data => {
      document.getElementById("jokeText").textContent = `${data.setup} — ${data.punchline}`;
    })
    .catch(err => {
      document.getElementById("jokeText").textContent = "⚠️ Could not fetch joke. Try again later.";
      console.error(err);
    });
}

function getQuote() {
  fetch("https://api.quotable.io/random")
    .then(response => response.json())
    .then(data => {
      document.getElementById("quoteText").textContent = `💡 "${data.content}" — ${data.author}`;
    })
    .catch(err => {
      document.getElementById("quoteText").textContent = "⚠️ Could not fetch quote. Try again later.";
      console.error(err);
    });
}

function startExperience() {
  // Reveal hidden sections
  document.querySelectorAll(".section-purple, .section-green, .section-orange").forEach(section => {
    section.style.display = "block";
  });

  // Scroll smoothly to quiz
  document.querySelector(".section-purple").scrollIntoView({ behavior: 'smooth' });

  // Auto-fetch joke and quote
  getJoke();
  getQuote();
}
