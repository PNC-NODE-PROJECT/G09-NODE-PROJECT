// HIDE / SHOW ---------------------------------------------------------
function hide(element) {
  element.style.display = "none";
}

function show(element) {
  element.style.display = "block";
}

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
      
      
        clearForm();
      })}else{
        alert("Correct answer should be choose.")
      }
  }else{
    alert("The field should not be empty")
  }
  
}

// change header modal create question
function isClickAdd(){
  questionToEdit = null;
  modal_title.textContent = "Create new question";
  modal_header.style.backgroundColor="#fff9c4";
  clearForm();
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

const modal_title = document.querySelector(".modal-title");
const modal_header = document.querySelector('.modal-header');
const title = document.querySelector("#title");
const choiceA = document.querySelector("#choiceA");
const choiceB = document.querySelector("#choiceB");
const choiceC = document.querySelector("#choiceC");
const choiceD = document.querySelector("#choiceD");
const correctAns = document.querySelectorAll('#check');



const btn_add = document.querySelector('#btn-add');




