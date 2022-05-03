
function login(){
    let user_email = USER_EMAIL.value;
    let password = USER_PASSWORD.value;
    let url = "http://localhost:80/users/login";
    if (user_email && password !=""){
        axios.get(url)
        .then((responses)=>{
            let users = responses.data;
            for (let user of users) {
                if (user_email == user.email && password == user.password){
                    sessionStorage.setItem("userId", user._id);
                    location.href = "../home/home.html";
                }else{
                    alert("account not defined");
                }
            }
        })
    }

}








// ---------main --------
let USER_EMAIL = document.getElementById("email");
let USER_PASSWORD = document.getElementById("password");