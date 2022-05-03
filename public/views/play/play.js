import {hide,show} from "../../Utils/visible.js"
// DOMS ELEMENTS  ---------------------------------------------------------
const dom_start = document.getElementById("start");
const dom_quiz = document.getElementById("quiz");
const dom_score = document.getElementById("score");
const dom_score_p = document.getElementById("score_p");
const dom_score_img = document.getElementById("score_img");

// Global variable  ---------------------------------------------------------

let score = 0;
let currentQuestionIndex = 0;

function renderQuestion() {
  let id = sessionStorage.userId;
  let URL = "http://localhost:80/quiz/questions/" + id;
  axios.get(URL).then((results) => {
    while (dom_quiz.firstChild) {
      dom_quiz.removeChild(dom_quiz.lastChild);
    }
    let questions = results.data;
    let question = questions[currentQuestionIndex];
    let answers = question.answers;
    let dom_question = document.createElement("h2");
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
  let id = sessionStorage.userId;
  let URL = "http://localhost:80/quiz/questions/"+ id;
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

// Compute score
function showScore() {
    hide(dom_quiz);
    show(dom_score);
    // dom_score_p.textContent = score;
    let id = sessionStorage.userId;
    let URL = "http://localhost:80/quiz/questions/"+ id;
    axios.get(URL).then((results) => {
    // // calculate the amount of question percent answered by the user
      let questions = results.data;
      const scorePerCent = Math.round((100 * score) / questions.length);
      saveUserScore(scorePerCent);
      // // choose the image based on the scorePerCent
      let image = "../../img/";
      if (scorePerCent < 50) {
        image += "20.png";
      } else if (scorePerCent >= 50) {
        image += "80.png";
      } 
  
      dom_score_p.textContent = scorePerCent + " %";
      dom_score_img.src = image;
    });
  }

  
  // save score to database
  function saveUserScore(score){
    let id = sessionStorage.userId;
    let URL = "http://localhost:80/users/score/"+id;
    let body = {score: score};
    axios.post(URL, body).then((req, res) => {
      console.log("Score already stored");
    })
  }
