// DOMS ELEMENTS  ---------------------------------------------------------
const dom_start = document.getElementById("start");
const dom_quiz = document.getElementById("quiz");
const dom_question = document.getElementById("question");
const dom_choice = document.querySelectorAll(".choice");


const dom_score = document.getElementById("score");
const dom_score_p = document.getElementById("score_p");
const dom_score_img = document.getElementById("score_img");

// Global variable  ---------------------------------------------------------

let score = 0;
let currentQuestionIndex = 0;
let percent = 0;

// Hide a given element
function hide(element) {
  element.style.display = "none";
}


// Show a given element
function show(element) {
  element.style.display = "block";
}


function renderQuestion() {
  let URL = "http://localhost:80/quiz/questions";
  axios.get(URL).then((results) => {
    while (dom_quiz.firstChild) {
      dom_quiz.removeChild(dom_quiz.lastChild);
    }
    let questions = results.data;
    let question = questions[currentQuestionIndex];
    let answers = question.answers;
    let dom_question = document.createElement("div");
    dom_question.id = "question";
    dom_question.textContent = question.title;
    dom_quiz.appendChild(dom_question);
    let choices = document.createElement("div");
    choices.id = "choices";
    
    for (let i = 0;i<answers.length;i++){
      let button = document.createElement("button");
      button.textContent = answers[i].choice;
      button.value = answers[i].corrected;
      button.addEventListener("click", returnValue);
      choices.appendChild(button);
      dom_quiz.appendChild(choices);
    }

  })
}

dom_start.addEventListener("click", (event) => {
  hide(dom_start);
  show(dom_quiz);

  // 2- Reet the question index to 0
  currentQuestionIndex = 0;

  // 2 - Render the first question
  renderQuestion();
});

// Return value when click on ansBtn
function returnValue(event){

  checkAnswer(event.target.textContent);
}

// Check correct ans
function checkAnswer(choice) {
  let URL = "http://localhost:80/quiz/questions";
  axios.get(URL).then((results) => {
    let questions = results.data;
    let question = questions[currentQuestionIndex];
    let answers = question.answers;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].corrected == true) {
        if (answers[i].choice == choice) {
          score += 1;
        }else{
          score +=0;
        }
      }
    }

    if (currentQuestionIndex < questions.length - 1) {
      // Go to the next question
      currentQuestionIndex += 1;
      // render question
      renderQuestion();
    }else{
      showScore();
    }
  })
  
}