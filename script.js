let toggleSwitch = document.getElementById("toggle-mode");
let mode = document.getElementById("styles");
let burgerIcon = document.getElementById("navigation-bar");

const gameSound = new Audio("./gameSound.mp3");

toggleSwitch.addEventListener("click", (e) => {
  e.preventDefault();

  mode.setAttribute(
    "href",
    mode.getAttribute("href") === "lightstyle.css"
      ? mode.getAttribute("data-dark-mode")
      : "lightstyle.css"
  );
  if (
    toggleSwitch.innerText.includes("Light Mode") &&
    burgerIcon.classList.contains("navbar-light")
  ) {
    toggleSwitch.innerHTML = `Dark Mode <i class="fa-solid fa-circle-half-stroke fa-lg"></i>`;
    burgerIcon.classList.replace("navbar-light", "navbar-dark");
  } else {
    toggleSwitch.innerHTML = `Light Mode <i class="fa-solid fa-circle-half-stroke fa-lg"></i>`;
    burgerIcon.classList.replace("navbar-dark", "navbar-light");
  }
});

let content = JSON.parse(localStorage.getItem("content")) || [
  {
    id: 1,
    question: "How do you define the content of the web pages?",
    answer: "HTML",
    choices: ["HTML", "CSS", "Javascript", "Jquery"],
  },
  {
    id: 2,
    question: "What will specify the layout of the web pages?",
    answer: "CSS",
    choices: ["https", "HTML", "CSS", "Javascript"],
  },
  {
    id: 3,
    question: "What will you use to program the behavior of web pages?",
    answer: "Javascript",
    choices: ["Javascript", "CSS", "Sass", "HTML"],
  },
  {
    id: 4,
    question: `It is a block of JavaScript code, that can be executed when "called" for`,
    answer: "Function",
    choices: ["Head", "Body", "Array", "Function"],
  },
  {
    id: 5,
    question: "All are semantic elements except?",
    answer: "div",
    choices: ["header", "footer", "div", "section"],
  },
  {
    id: 6,
    question: "Spot the Javascript non-reserved word",
    answer: "returns",
    choices: ["continue", "await", "async", "returns"],
  },
  {
    id: 7,
    question: "What is the latest Javascript version?",
    answer: "ES6",
    choices: ["ES6", "ES5", "2016", "2017"],
  },
  {
    id: 8,
    question: "What will make the web page responsive?",
    answer: "@media",
    choices: ["response", "@media", "div", "section"],
  },
  {
    id: 9,
    question: "In the DOM, all HTML elements are defined as?",
    answer: "Objects",
    choices: ["Functions", "Property", "Objects", "Method"],
  },
  {
    id: 10,
    question: "It is a method to round down a number to its nearest integer",
    answer: "Math.floor",
    choices: ["Math.ceil", "Math.floor", "Math.get", "Math.set"],
  },
];
let currId = content.length;

let contentJSON = localStorage.setItem("content", JSON.stringify(content));

let newQuestion = {};

function newValues() {
  let inputQuestion = document.getElementById("input-question");
  let choice1 = document.getElementById("choice-1");
  let choice2 = document.getElementById("choice-2");
  let choice3 = document.getElementById("choice-3");
  let choice4 = document.getElementById("choice-4");
  let answer = document.getElementById("answer");

  let inputQuestionValue = inputQuestion.value;
  let choice1Value = choice1.value;
  let choice2Value = choice2.value;
  let choice3Value = choice3.value;
  let choice4Value = choice4.value;
  let answerValue = answer.value;

  if (
    inputQuestionValue === "" ||
    choice1Value === "" ||
    choice2Value === "" ||
    choice3Value === "" ||
    choice4Value === "" ||
    answerValue === ""
  ) {
    alert("No values");
    return;
  }

  newQuestion = {
    id: ++currId,
    question: inputQuestionValue,
    answer: answerValue,
    choices: [choice1Value, choice2Value, choice3Value, choice4Value],
  };
  content.push(newQuestion);
  console.log(content);
  localStorage.setItem("content", JSON.stringify(content));

  // Reset the form
  document.getElementById("quizForm").reset();
}

document
  .getElementById("quizForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();
    newValues();
  });

const quizStart = document.getElementById("start-quiz");
const customize = document.getElementById("customize");
const quizContainer = document.getElementById("quiz-container");
const marquee = document.getElementById("marquee");

quizStart?.addEventListener("click", () => {
  quizContainer.style.display = "inline-block";
  startAll();
  marquee.style.display = "none";
  customize.disabled = true;
  customize.style.display = "none";

  quizStart.disabled = true;
  quizStart.style.display = "none";
});

let currIndex = 0;

// to shuffle question and not show prev question
let currQuestionIndex;
let prevQuestionIndex = [-1];
const keepQuestionIndex = prevQuestionIndex[0];

let score = 0;
let timer;
let timerRemaining = 10 * content.length;

const questionContainer = document.getElementById("question-content");
const choicesContainer = document.getElementById("choices-content");
const timerContainer = document.getElementById("timer");
const button = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");
const exitButton = document.getElementById("exit-btn");
let points = document.getElementById("points");
let highscore = document.getElementById("highscore");

let highestScore =
  localStorage.getItem("highscore") ||
  localStorage.setItem("highscore", Number(score));

function startAll() {
  gameSound.play();
  startQuiz();
  startTimer();
}

function startQuiz() {
  shuffleQuestion();
  showQuestion();
  showChoices();
}

function startTimer() {
  // show timer before decrement
  timerContainer.innerHTML = `Timer: ${timerRemaining}`;
  timer = setInterval(() => {
    timerRemaining--;
    // show timer during 0s
    timerContainer.innerHTML = `Timer: ${timerRemaining}`;
    if (timerRemaining <= 0) {
      endQuiz();
      clearInterval(timer);
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function shuffleQuestion() {
  let index;
  do {
    index = Math.floor(Math.random() * content.length);
  } while (prevQuestionIndex.includes(index));
  return index;
}

function showQuestion() {
  points.innerHTML = `Points: ${score}`;
  highscore.innerHTML = `High Score: ${localStorage.getItem("highscore")}`;
  exitButton.disabled = true;
  exitButton.style.display = "none";
  submitButton.disabled = false;
  submitButton.style.display = "inline-block";
  currQuestionIndex = shuffleQuestion();
  prevQuestionIndex.push(currQuestionIndex);
  const question = content[currQuestionIndex].question;
  questionContainer.innerText = content[currQuestionIndex].question;
}

function showChoices() {
  const choices = content[currQuestionIndex].choices;
  button.disabled = true;

  // to refresh the prev choices
  choicesContainer.innerHTML = "";

  // map new button choices
  choices.map((choice, index) => {
    const buttons = document.createElement("button");
    buttons.innerHTML = choice;
    buttons.classList.add("options");
    buttons.id = `options-${index}`;
    buttons.addEventListener("click", () => checkAnswer(index));
    choicesContainer.appendChild(buttons);
  });
}

function checkAnswer(index) {
  button.disabled = false;
  const currAnswer = content[currQuestionIndex];
  if (
    currAnswer.choices[index].toUpperCase() === currAnswer.answer.toUpperCase()
  ) {
    score += 10;
    document.getElementById(`options-${index}`).style.backgroundColor =
      "#66fcf1";
    points.innerHTML = `Points: ${score}`;
  } else {
    document.getElementById(`options-${index}`).style.backgroundColor =
      "#EC5656"; //
  }
  const buttons = document.querySelectorAll(".options");
  buttons.forEach((buttons) => (buttons.disabled = true));
}

function nextQuestion() {
  currIndex++;
  if (currIndex < content.length) {
    startQuiz();
  } else {
    endQuiz();
  }
}

function handleSubmit() {
  let confirmation = confirm("Are you sure you want to submit?");
  confirmation ? endQuiz() : null;
}

function endQuiz() {
  highestScore =
    score > localStorage.getItem("highscore")
      ? localStorage.setItem("highscore", score)
      : localStorage.getItem("highscore");
  highscore.innerHTML = `Highscore: ${localStorage.getItem("highscore")}`;
  timerRemaining <= 0
    ? (questionContainer.innerHTML = `Times up!\nYour score is ${score}`)
    : (questionContainer.innerHTML = `Your score is ${score}`);
  stopTimer();
  choicesContainer.innerHTML = "";

  button.disabled = true;
  button.style.display = "none";

  submitButton.disabled = true;
  submitButton.style.display = "none";

  const tryAgain = document.getElementById("try-again");
  tryAgain.disabled = false;
  tryAgain.style.display = "inline-block";

  exitButton.disabled = false;
  exitButton.style.display = "inline-block";

  tryAgain.addEventListener("click", () => {
    timerRemaining = 120;
    currIndex = 0;
    score = 0;
    prevQuestionIndex = [keepQuestionIndex];
    stopTimer();

    tryAgain.disabled = true;
    tryAgain.style.display = "none";

    button.disabled = false;
    button.style.display = "inline-block";
    startAll();
  });
}

function handleExit() {
  window.location.href = "./index.html";
}
