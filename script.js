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

const questionContainer = document.getElementById("question-content");
const choicesContainer = document.getElementById("choices-content");

function startQuiz() {
  showQuestion();
  showChoices();
}

function showQuestion() {
  const question = content[currQuestionIndex].question;
  questionContainer.innerText = content[currQuestionIndex].question;
}

function showChoices() {
  const choices = content[currQuestionIndex].choices;

  // to refresh the prev choices
  choicesContainer.innerHTML = "";
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
  const currAnswer = content[currQuestionIndex];
  if (currAnswer.choices[index] === currAnswer.answer) {
    score++;
    document.getElementById(`options-${index}`).style.backgroundColor = "#66fcf1";
  } else {
    document.getElementById(`options-${index}`).style.backgroundColor = "#EC5656"; // 
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
  questionContainer.innerHTML = `Your score is ${score}`;
  choicesContainer.innerHTML = "";
  const button = document.getElementById("next-btn");
  button.innerHTML = "Try again";
  button.addEventListener("click", () => {
    score = 0;
    currQuestionIndex = 0;
    startQuiz();
  });
}

startQuiz();
