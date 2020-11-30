const toDoForm = document.querySelector(".js-form-toDo"),
    toDoInput = document.querySelector(".js-form-input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "todos";

function saveToDos(todos) {
    localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function paintToDos(text){
    const li = document.createElement("li");
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    const span = document.createElement("span");
    const btn = document.createElement("button");
    btn.innerText = "X";
}

function handleSummit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    toDoInput.value="";
    paintToDos(currentValue);
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        //paintToDos();
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSummit);
}

init();