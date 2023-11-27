const content = [
  {
    question: "What is the purpose of the 'typeof' operator in JavaScript?",
    answer: "Type",
    choices: ["Compare", "Declare", "Loop", "Type"],
  },
  {
    question: "What is a closure in JavaScript?",
    answer: "Scope",
    choices: ["Looping", "Const", "Tag", "Scope"],
  },
  {
    question: "What is the difference between 'let', 'const', and 'var'?",
    answer: "Scoping",
    choices: ["Interchangeable", "Mathematical", "DataTypes", "Scoping"],
  },
  {
    question: "What is an arrow function in JavaScript?",
    answer: "Concise",
    choices: ["ThrowsError", "Sorting", "Loop", "Concise"],
  },
  {
    question: "What does the 'this' keyword refer to in JavaScript?",
    answer: "Executing",
    choices: ["CallStack", "Global", "Parent", "Executing"],
  },
  // Add more questions as needed
];

let currQuestionIndex = 0;
let score = 0;

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

function showQuestion() {
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
    stopTimer();

    tryAgain.disabled = true;
    tryAgain.style.display = "none";

    button.disabled = false;
    button.style.display = "inline-block";
    startAll();
  });
}

startAll();
