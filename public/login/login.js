// login request
function login(){
    let user_email = USER_EMAIL.value;
    let password = USER_PASSWORD.value;
    let url = "/users/login";
    if (user_email != "" && password != ""){
        axios.get(url)
        .then((responses)=>{
            let users = responses.data;
            let isCorrect = false;
            for(let user of users) {
                if (user_email == user.email && password == user.password){
                    isCorrect = true;
                    sessionStorage.setItem("userId", user._id);
                    sessionStorage.setItem('userName',user.user_name);
                    
                }
            }
            if (isCorrect){
                location.href = "../home/home.html";
            }else{
                document.querySelector("#error").style.display = "block";
                document.querySelector("#error").style.display = "flex";
                document.querySelector("#error").style.justifyContent = "space-between";
                document.querySelector("#error").style. alignItems= "center";
                document.querySelector(".erroeText").textContent = "Wrong email or password !";
            }
        })
    }else{
        document.querySelector("#error").style.display = "block";
        document.querySelector("#error").style.display = "flex";
        document.querySelector("#error").style.justifyContent = "space-between";
        document.querySelector("#error").style. alignItems= "center";
        document.querySelector(".erroeText").textContent = "Emial or password should not empty !"
    }

}


// ---------main --------
let USER_EMAIL = document.getElementById("email");
let USER_PASSWORD = document.getElementById("password");
let email_error = document.querySelector(".log-email");
let password_error = document.querySelector(".log-pass");
let passBox = document.querySelector(".passBox");
let emailText = document.querySelector(".emailText");
let passText = document.querySelector(".passText");
let emailBox = document.querySelector(".emailBox");
let showPass = document.querySelector(".input-group-addon");
let closeMessageBox = document.querySelector("#close");
closeMessageBox.addEventListener("click", function(e) {
    if (e.target.id == "close") {
        e.target.parentElement.style.display = "none";
    }
})
showPass.addEventListener("click",showPassword);

function showPassword(event){
    if (event.target.className = "input-group-addon"){
       if (USER_PASSWORD.type == "password"){
           USER_PASSWORD.type = "text";
           document.querySelector("#eye").className = "fa fa-eye";
       }else if (USER_PASSWORD.type == "text"){
        USER_PASSWORD.type = "password";
        document.querySelector("#eye").className = "fa fa-eye-slash";
       }
    }
}
