const toDoForm = document.getElementById("todo-form");
const toDoList = document.getElementById("todo-list");
const toDoInput = document.querySelector("#todo-form input");

const TODOS_KEY = "todos";

let toDos = [];

function handleToDoSummit(event) {
    event.preventDefault();
    const newToDo = toDoInput.value;
    toDoInput.value = "";
    const newToDoObj = {
        text: newToDo,
        id: Date.now(),
    };
    toDos.push(newToDoObj);
    paintToDo(newToDoObj);
    saveToDos();
}

function paintToDo(newToDo) {
    const li = document.createElement("li");
    li.id = newToDo.id;
    const span = document.createElement("span");
    span.innerText = newToDo.text;
    const button = document.createElement("button");
    button.innerHTML = `<i class="fas fa-eraser fa-lg"></i>`;
    button.addEventListener("click", deleteToDo);
    const buttonIcon = button.querySelector("i");
    buttonIcon.addEventListener("click",deleteToDoIcon);

    li.appendChild(span);
    li.appendChild(button);

    toDoList.appendChild(li);
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    saveToDos();        // 원래 있던 toDos 전역변수 배열
    
}

function deleteToDoIcon(event) {
    const icon = event.target.parentElement.parentElement;
    icon.remove();
    toDos = toDos.filter(toDo => toDo.id !== parseInt(icon.id));
    saveToDos();        // 원래 있던 toDos 전역변수 배열
}

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

toDoForm.addEventListener("submit", handleToDoSummit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);                                  // 배열의 각 요소에 대해서 해당 함수를 수행 
                                                                     // 수행되는 함수에 event매개변수를 넣으면 해당 배열의 각 요소가 event매개변수로 들어가서 수행됨
}                                                                    // 자체 함수 작성기능도 있다 arrow function =>