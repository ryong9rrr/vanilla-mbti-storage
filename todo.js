const toDoForm = document.querySelector(".js-form-toDo"),
    toDoInput = document.querySelector(".js-form-input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "todos";
let toDos = [];

function saveToDos(todos) {
    localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function delBtn(event) {
    const btn = event.target;
    const li = btn.parentNode;

    toDoList.removeChild(li);

    const cleanToDos = toDos.filter(function(toDos) {
        return toDos.id !== parseInt(li.id);
    });

    toDos = cleanToDos;
    saveToDos(toDos);
}


function paintToDos(text){
    const li = document.createElement("li");
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    const span = document.createElement("span");
    span.innerText = text;
    const btn = document.createElement("button");
    btn.innerText = "X";

    btn.addEventListener("click", delBtn);

    const newId = toDos.length + 1;
    li.id = newId;

    const toDoObj = {
        id : newId,
        text : text
    };

    li.appendChild(checkBox);
    li.appendChild(span);
    li.appendChild(btn);

    toDoList.appendChild(li);
    toDos.push(toDoObj);
    saveToDos(toDos);

    
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
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDos) {
            paintToDos(toDos.text);
        })
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSummit);
}

init();