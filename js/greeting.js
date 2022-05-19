const loginForm = document.querySelector("#login-form");
const logininput = loginForm.querySelector("input");
const greeting = document.querySelector("#greeting");
const logoutForm = document.querySelector("#logout-form");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";         // 본인이 작성한 string이 반복될 경우 상수변수를 선언하여 오류를 발견할 수 있게 만든다

function onLoginSubmit(event) {
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const submittedUsername = logininput.value;
    localStorage.setItem(USERNAME_KEY, submittedUsername);       // username과 savedUsername의 역할이 다르다
    paintGreetings(submittedUsername);                           // 처음에 제출된 username의 paint함수는 유저가 직접 쳤을 때 임시로 저장되는 것을 나타내기 위한 변수
    logoutForm.classList.remove(HIDDEN_CLASSNAME);               // if문에서 제출된 savedUsername의 paint함수는 이미 저장된 내용을 storage에서 불러온 것을 나타내기 위한 변수
}

function paintGreetings(username) {
    greeting.innerText = `Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

function logoutSubmit() {
    localStorage.removeItem(USERNAME_KEY);
    //window.location.reload();
}

logoutForm.addEventListener("submit", logoutSubmit);

const savedUsername = localStorage.getItem(USERNAME_KEY);
if(savedUsername === null) {
    // show the form
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
    
} else {
    // show the greetings
    paintGreetings(savedUsername);
    logoutForm.classList.remove(HIDDEN_CLASSNAME);
}