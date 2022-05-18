
function register(){
    let url = '/users/register';
    let username = USER_NAME.value;
    let email = USER_EMAIL.value;
    let password = USER_PASSWORD.value;
    
    if (username.match(namePatern) && email.match(emailPatern) && password.match(passwordPatern)){
        let body = {user_name: username, email: email, password: password};
        console.log(body);
        axios.post(url,body)
        .then((result)=>{
            if (result.data){
                sessionStorage.setItem('userId',result.data._id);
                sessionStorage.setItem('userName',result.data.user_name);
                location.href = "../login/login.html";
            }
        })
    }
    else{
        emailBox.className = "invalid";
        emailText.innerHTML = "Your email address is invalid.";
        passBox.className = "invalid";
        passText.innerHTML = "Your password is invalid";
        nameBox.className = "invalid";
        nameText.innerHTML = "Your name is invalid.";
    }
}


// -------main -------
let USER_NAME = document.getElementById("userName");
let USER_EMAIL = document.getElementById("email");
let USER_PASSWORD = document.getElementById("password");
let nameText = document.querySelector(".nameText");
let emailText = document.querySelector(".emailText");
let passText = document.querySelector(".passText");
let emailBox = document.querySelector(".emailBox");
let nameBox = document.querySelector(".nameBox");
let passBox = document.querySelector(".passBox");
let namePatern = /(?=.*[a-z]).{4,}/;
let emailPatern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z0-9]{3,63}$/;
let passwordPatern = /(?=.*[0-9]+)(?=.*[a-z])(?=.*[A-Z]+).{6,32}/;

USER_EMAIL.addEventListener("input", ()=>{
    if (USER_EMAIL.value.match(emailPatern)){
        emailBox.classList.add("valid");
        emailBox.classList.remove("invalid");
        emailText.innerHTML = "Your email address is valid.";
    }else{
        emailBox.className = "invalid";
        emailText.innerHTML = "Your email address is invalid, (exaple@gmail.com)";
    }
})

USER_PASSWORD.addEventListener("input", ()=>{
   
    if (USER_PASSWORD.value.match(passwordPatern)){
        passBox.className = "valid";
        passText.innerHTML = "Your password is valid.";
    }else{
        passBox.className = "invalid";
        passText.innerHTML = "Your password at least 6 characters and symbol and number, (Exaple@123)";
    }
})

USER_NAME.addEventListener("input", ()=>{
    if (USER_NAME.value.match(namePatern)){
        nameBox.className = "valid";
        nameText.innerHTML = "Your name is valid.";
    }else{
        nameBox.className = "invalid";
        nameText.innerHTML = "Your name must be at least 4 charactors.";
    }
})