function logout(){
    sessionStorage.clear();
    location.href = "../../login/login.html"
}


let LOGOUT_BUTTON = document.querySelector("#logout");
LOGOUT_BUTTON.addEventListener("click",logout);