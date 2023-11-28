// TODO: Shuffle the multiple choices

const content = [
  {
    id: 1,
    question: "What is the purpose of the 'typeof' operator in JavaScript?",
    answer: "Type",
    choices: ["Compare", "Declare", "Loop", "Type"],
  },
  {
    id: 2,
    question: "What is a closure in JavaScript?",
    answer: "Scope",
    choices: ["Looping", "Const", "Tag", "Scope"],
  },
  {
    id: 3,
    question: "What is the difference between 'let', 'const', and 'var'?",
    answer: "Scoping",
    choices: ["Interchangeable", "Mathematical", "DataTypes", "Scoping"],
  },
  {
    id: 4,
    question: "What is an arrow function in JavaScript?",
    answer: "Concise",
    choices: ["ThrowsError", "Sorting", "Loop", "Concise"],
  },
  {
    id: 5,
    question: "What does the 'this' keyword refer to in JavaScript?",
    answer: "Executing",
    choices: ["CallStack", "Global", "Parent", "Executing"],
  },
  // Add more questions as needed
];

let currId = 5;

const quizStart = document.getElementById("start-quiz");
const customize = document.getElementById("customize");
const quizContainer = document.getElementById("quiz-container");

quizStart.addEventListener("click", () => {
  quizContainer.style.display = "inline-block";
  startAll();
  customize.disabled = true;
  customize.style.display = "none";

  quizStart.disabled = true;
  quizStart.style.display = "none";
});

let currQuestionIndex = 0;

// to shuffle question and not show prev question
let prevQuestionIndex = [-1];
const keepQuestionIndex = prevQuestionIndex[0];

let score = 0;
let currQuestionIndexx;

let timer;
let timerRemaining = 120;

const questionContainer = document.getElementById("question-content");
const choicesContainer = document.getElementById("choices-content");
const timerContainer = document.getElementById("timer");
const button = document.getElementById("next-btn");

function startAll() {
  startQuiz();
  startTimer();
}

function startQuiz() {
  shuffleQuestion();
  currQuestionIndexx = shuffleQuestion();
  prevQuestionIndex.push(currQuestionIndexx);
  showQuestion();
  showChoices();
}

function startTimer() {
  // show timer before decrement
  timerContainer.innerHTML = timerRemaining;
  timer = setInterval(() => {
    timerRemaining--;
    // show timer during 0s
    timerContainer.innerHTML = timerRemaining;
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
  const question = content[currQuestionIndexx].question;
  questionContainer.innerText = content[currQuestionIndexx].question;
}

function showChoices() {
  const choices = content[currQuestionIndexx].choices;
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
  if (currAnswer.choices[index] === currAnswer.answer) {
    score++;
    document.getElementById(`options-${index}`).style.backgroundColor =
      "#66fcf1";
  } else {
    document.getElementById(`options-${index}`).style.backgroundColor =
      "#EC5656"; //
  }
  const buttons = document.querySelectorAll(".options");
  buttons.forEach((buttons) => (buttons.disabled = true));
}

function nextQuestion() {
  currQuestionIndex++;
  if (currQuestionIndex < content.length) {
    startQuiz();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  timerRemaining <= 0
    ? (questionContainer.innerHTML = `Times up!\nYour score is ${score}`)
    : (questionContainer.innerHTML = `Your score is ${score}`);
  stopTimer();
  choicesContainer.innerHTML = "";

  button.disabled = true;
  button.style.display = "none";

  const tryAgain = document.getElementById("try-again");
  tryAgain.disabled = false;
  tryAgain.style.display = "inline-block";

  tryAgain.addEventListener("click", () => {
    timerRemaining = 120;
    currQuestionIndex = 0;
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
