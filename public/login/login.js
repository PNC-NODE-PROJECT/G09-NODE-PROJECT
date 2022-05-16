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
                alert("Wrong email or password");
            }
        })
    }else{
        emailBox.className = "invalid";
        emailText.innerHTML = "Your email address is invalid.";
        passBox.className = "invalid";
        passText.innerHTML = "Your password is invalid";
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