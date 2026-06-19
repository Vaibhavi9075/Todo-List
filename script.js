let theme = "light";
let themeIcon = document.querySelector("#themeChanger");

themeIcon.addEventListener("click", () => {
  if (theme === "light") {
    theme = "dark";
    themeIcon.classList.replace("fa-sun", "fa-moon");
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
  } else {
    theme = "light";
    themeIcon.classList.replace("fa-moon", "fa-sun");
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
  }
});
/*-------------todolist------------------*/
let userInputOneEl = document.querySelector("#userInputOne");
let userInputTwoEl = document.querySelector("#userInputTwo");
let errorMsgFirstEl = document.querySelector("#errorMsgFirst");
let errorMsgSecondEl = document.querySelector("#errorMsgSecond");
let addUserInputEl = document.querySelector("#addUserInput");
let userTaskEl = document.querySelector("#userTask");

let todoList ;
let gainDataToStore = localStorage.getItem("userTaskData")

if(gainDataToStore === null){
    todoList = [];
}
else{
    let stringToObject = JSON.parse(gainDataToStore);
    todoList = stringToObject;
}

function onStatuChangeTodo(titleId,checkBoxId){
    let myTodoCheckId = document.getElementById(checkBoxId);
    let myTitleId = document.getElementById(titleId);

    if(myTodoCheckId.checked === true){
        myTitleId.style.textDecoration = "line-through";
    }
    else {
    myTitleId.style.textDecoration = "none";
    }

    let myId = titleId.slice(5);
    for(let each of todoList){
        if(each.id == myId){
            if(each.isChecked === true){
                each.isChecked = false;
            }
            else{
                each.isChecked = true;
            }
        }
    }
}

function  onDeleteTodo(userInputDel){
  userTaskEl.removeChild(document.getElementById(userInputDel));

 let myId = userInputDel.slice(4);
    let index = todoList.findIndex((e)=>e.id == myId);
    todoList.splice(index,1);
     saveInfo();
}

function  onCreateandAppendTodo(todo){
    let checkBoxId = "checkbox" + todo.id;
    let titleId = "title" + todo.id;
    let userInputDel = "todo" + todo.id

    let listEl = document.createElement("li");
    listEl.classList.add("list-cont");
    listEl.id = userInputDel;
    userTaskEl.appendChild(listEl);

    let checkBoxEl = document.createElement("input");
    checkBoxEl.type = "checkbox";
    checkBoxEl.checked = false;
    checkBoxEl.id = checkBoxId;
    checkBoxEl.onclick =()=>{
        onStatuChangeTodo(titleId,checkBoxId);
    }
    if(todo.isChecked === true){
        checkBoxEl.checked = true;
    }
    listEl.appendChild(checkBoxEl);

    let labelEl = document.createElement("label");
    labelEl.classList.add("label-cont");
    labelEl.htmlFor = checkBoxId;
    listEl.appendChild(labelEl);

    let titleEl = document.createElement("h5");
    titleEl.textContent = todo.title;
    titleEl.id = titleId;
    if(todo.isChecked === true){
        titleEl.style.textDecoration = "line-through";
    }
    labelEl.appendChild(titleEl);

     if (todo.description && todo.description.trim() !== "") {
        let descEl = document.createElement("textarea");
        descEl.textContent = todo.description;
        descEl.classList.add("task-desc");
        labelEl.appendChild(descEl);
    }

    let deleteBtnEl = document.createElement("button");
    deleteBtnEl.classList.add("delBtn");
    deleteBtnEl.onclick =()=>{
        onDeleteTodo(userInputDel);
    }
    labelEl.appendChild(deleteBtnEl);

    let deleteIconEl = document.createElement("i");
    deleteIconEl.classList.add("fa-solid" ,"fa-trash");
    deleteBtnEl.appendChild(deleteIconEl);
}

for(let each of todoList){
    onCreateandAppendTodo(each);
}


addUserInputEl.addEventListener("click",()=>{
    if(userInputOneEl.value === "" || userInputTwoEl.value === ""){
        errorMsgFirstEl.textContent = "please write any task";
        errorMsgSecondEl.textContent = "please write task description";
        errorMsgFirstEl.style.color = "red";
        errorMsgSecondEl.style.color = "red";
    }
    else{
        errorMsgFirstEl.textContent = "";
        errorMsgSecondEl.textContent = "";

        let userWriteTaskId = Date.now();
        let userWriteTaskTitle = userInputOneEl.value;
        let userWriteTaskDesc = userInputTwoEl.value;

        let newTodoList = {
            id : userWriteTaskId,
            title : userWriteTaskTitle,
           description: userWriteTaskDesc,
            isChecked : false
        }
        onCreateandAppendTodo(newTodoList);
        todoList.push(newTodoList);
        userInputOneEl.value = "";
        userInputTwoEl.value = "";

        saveInfo();
    }
});

function saveInfo(){
    let objectToString = JSON.stringify(todoList);
    localStorage.setItem("userTaskData",objectToString);
}