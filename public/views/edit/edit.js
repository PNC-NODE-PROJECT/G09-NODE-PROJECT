let questionToEdit = null;

// HIDE / SHOW ---------------------------------------------------------
function hide(element) {
  element.style.display = "none";
}

function show(element) {
  element.style.display = "block";
}

// Add question to mongodb ---------------------------------------------
function addQuestion() {
  if (title.value !== "" && choiceA.value !== "" && choiceB.value !== "" && choiceC.value !== "" && choiceD.value !== ""){
    let inputTitle = title.value;
    let answer = [{choice:choiceA.value,corrected:false},{choice:choiceB.value,corrected:false},{choice:choiceC.value,corrected:false},{choice:choiceD.value,corrected:false}];
    let check = false;
    for( let i=0; i<correctAns.length; i++){

      if(correctAns[i].checked){

        answer[i].corrected = true;
        check = true;

      }
    }

    if(check){
      // TODO: request the server to create new student
      let URL = "http://localhost:80/quiz/create";
      let body = {title: inputTitle, answers:answer };
      console.log(body);
      axios.post(URL, body).then((req, res) => {
      
        displayQuestion();
        clearForm();
      })}else{
        alert("Correct answer should be choose.")
      }
  }else{
    alert("The field should not be empty")
  }
  
}

// Get all qestion from mongodb and display -----------------------------
function displayQuestion() {
  
  let URL = "http://localhost:80/quiz/questions";
  
    axios.get(URL).then((results) => {
   
      renderQuestions(results.data);
     
  
    })
  
}

// Create Element and Refresh Dom ---------------------------------------
function renderQuestions(questions) {
  while (dom_questions_container.firstChild) {
    dom_questions_container.removeChild(dom_questions_container.lastChild);
  }


  // 2 - For all questions,  create a new div (class : item), and append it the container
  for (let index = 0; index < questions.length; index++) {
    let question = questions[index];

    let card = document.createElement("div");
    card.className = "cards";
    card.id = question._id;
   
    dom_questions_container.appendChild(card);

    let questionInfos = document.createElement("div");
    questionInfos.className = "question-info";
    questionInfos.id = question._id;
    card.appendChild(questionInfos);

    let title = document.createElement("p");
    title.className = "title";
    title.textContent = question.title;
    questionInfos.appendChild(title);



      let card_ans = document.createElement('div');
      card_ans.className=card_ans;
      questionInfos.appendChild(card_ans);
      let allAnswer = question.answers;
      for(let answer of allAnswer){
        let ans=document.createElement('span');
        ans.className="ans"
        ans.textContent = answer.choice;
        card_ans.appendChild(ans);
        if(answer.corrected){
          ans.style.backgroundColor="green";

        }

      }

    // Create spams for title and author
    let actions = document.createElement("div");
    actions.className = "actions";
    actions.id = question._id;
    card.appendChild(actions);

    let editAction = document.createElement("button");
    editAction.addEventListener("click", isClickEdit);
    editAction.className = "update";
    editAction.id=question._id;
    actions.appendChild(editAction);

    let trashAction = document.createElement("img");
    trashAction.className = 'delete';
    trashAction.src = "../../img/trash.png";
    trashAction.addEventListener("click", romoveQuestion);
    actions.appendChild(trashAction);

    let i = document.createElement("i");
    i.className = "fa fa-edit";
    i.id = question._id;
    i.setAttribute("data-target","#myModal");
    i.setAttribute("data-toggle","modal");
    editAction.appendChild(i);
  }
  
}

// Remove specific id ---------------------------------------------------
function romoveQuestion(e) {
  e.preventDefault();
  if (e.target.className === "delete") {
    let isExecuted = confirm("Are you sure to delete this task?");
    if (isExecuted) {
      // TODO: Request to the server to detele one question
      let id = e.target.parentElement.parentElement.id;
      
      let URL = "http://localhost:80/quiz/delete/"+id;
      axios.delete(URL).then(displayQuestion());
    }
  } 
  displayQuestion();
}

// change modal header,color and clear Form -----------------------------
function isClickAdd(){
  questionToEdit = null;
  modal_title.textContent = "Create new question";
  modal_header.style.backgroundColor="#fff9c4";
  clearForm();
}

function isClickEdit(event){
  questionToEdit = event.target.parentElement.id ;
  // change header modal edite question
  modal_title.textContent = "Edit question";
  modal_header.style.backgroundColor="#ffab91";
  let URL = "http://localhost:80/quiz/questions";
  if (questionToEdit !== null){
    axios.get(URL).then((results) => {
      let questions = results.data;
      for ( let question of questions){
        if (questionToEdit == question._id){
          document.querySelector("#title").value = question.title;
          for (let i=0;i<allChoice.length;i++){
            allChoice[i].value = question.answers[i].choice;
          }
          for (let i=0; i<correctAns.length;i++){
            if (question.answers[i].corrected == true){
              correctAns[i].checked = true;
            }
          }
        }
      }
    })
  }
}

function editQuestion(e){
  e.preventDefault();
    // check form empty or not
    if (title.value !== "" && choiceA.value !== "" && choiceB.value !== "" && choiceC.value !== "" && choiceD.value !== ""){
      // console.log('hi2');
      let inputTitle = title.value;
      let answer = [{choice:choiceA.value,corrected:false},{choice:choiceB.value,corrected:false},{choice:choiceC.value,corrected:false},{choice:choiceD.value,corrected:false}];
      let check = false;
      for( let i=0; i<correctAns.length; i++){
        if(correctAns[i].checked){
          answer[i].corrected = true;
          check = true;
        }
      }
      if(check){
        
        let body = {title: inputTitle, answers:answer };
        // Request to the server to update one question
        let id = questionToEdit;
        let URL = "http://localhost:80/quiz/update/" + id;
        axios.put(URL,body).then((req, res) => {
          displayQuestion();
  
        })}else{
          alert("Correct answer should be choose.")
        }
    }else{
      alert("The field should not be empty")
    }
  
}

function submit(e) {
  if(questionToEdit == null){
    addQuestion()
  }else{
    editQuestion(e);

  }
}

function clearForm(){

  document.querySelector("#title").value = "";
  document.querySelector("#choiceA").value = "";
  document.querySelector("#choiceB").value = "";
  document.querySelector("#choiceC").value = "";
  document.querySelector("#choiceD").value = "";
  document.querySelectorAll('#check').checked = false;
  for (let correct of correctAns){
    if(correct.checked = true){
      correct.checked = false;
    }
  }

}
// MAIN  ---------------------------------------------------------
const dom_questions_container = document.querySelector("#questions-container");

const dom_questions_view = document.getElementById("questions-view");
const modal_title = document.querySelector(".modal-title");
const modal_header = document.querySelector('.modal-header');
const title = document.querySelector("#title");
const choiceA = document.querySelector("#choiceA");
const choiceB = document.querySelector("#choiceB");
const choiceC = document.querySelector("#choiceC");
const choiceD = document.querySelector("#choiceD");
const correctAns = document.querySelectorAll('#check');
const sumit = document.querySelector("#sumit");
const allChoice = document.getElementsByName("choice");
const btn_add = document.querySelector('#btn-add');
sumit.addEventListener('click', submit);

displayQuestion();
