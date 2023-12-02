// TODO: when the exit button is added, should also display the marque again as it was included when the start quiz is clicked,
// the marquee's display would be none
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

  // Reset the form
  document.getElementById("quizForm").reset();
}

document
  .getElementById("quizForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();
    newValues();
  });

const content = [
  {
    id: 1,
    question: "What is the purpose of the 'typeof' operator in JavaScript?",
    answer: "Type",
    choices: ["Compare", "Declare", "Loop", "type"],
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

// TODO: No use as of now
let currId = 5;
console.log(content);

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
  currIndex++;
  if (currIndex < content.length) {
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
