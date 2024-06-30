//-------------------------------------- get Element ---------------------------------------------
let theInput = document.querySelector('.input'),
    submitTask = document.querySelector('.add'),
    containerTasks = document.querySelector('.tasks'),
    dellAllTasks = document.querySelector("#delete-all-tasks"),
    finishAll = document.querySelector('#finish-all-tasks'),
    arrayTasks = [];

// trigger function getElementFromLocalStorage
getElementFromLocalStorage();
// check if data local storage
if (localStorage.getItem("tasks")) {
    arrayTasks = JSON.parse(localStorage.getItem("tasks"));
}
//------------------------------------- on cclick button submit add -----------------------------
submitTask.onclick = function () {
    if (theInput.value == "") {
        // document.getElementById('errors').innerHTML = "*Please enter a username*";
        return false;
    }
    AddTaskToArray(theInput.value);
    theInput.value = '';
}

//----------------------------- function Add tasks to Array of tasks ----------------------------
function AddTaskToArray(task){
    let tasks = {
        id: Date.now(),
        title: task,
        completed : false,
    }
    arrayTasks.push(tasks);
    // trigger function addElementToPage 
    addElementToPage(arrayTasks)
    // trigger function addElementToLocalhost
    addEleToLocalStorage(arrayTasks);
}
// ----------------------------- start function add Element to page ------------------------------
function addElementToPage(arrayTasks) {
    // empty tasks div
    containerTasks.innerHTML = "";
    arrayTasks.forEach(task => {
        // create container box
        let divBox = document.createElement("div");
        divBox.className = "task";
        if (task.completed) {
            divBox.className = "task done";
        }
        divBox.setAttribute("data-id" , task.id);
        let divText = document.createTextNode(task.title);
        divBox.appendChild(divText);
        // create delete button in task element
        let delBtn = document.createElement('span');
        delBtn.className = "del";
        delBtn.appendChild(document.createTextNode("Delete"));
        // AppedChild Element
        divBox.appendChild(delBtn);
        containerTasks.appendChild(divBox);
    });
}
// -------------------------- start function add Element to local storage ---------------------------
function addEleToLocalStorage(arrayOfTasks) {
    let task = JSON.stringify(arrayOfTasks);
    window.localStorage.setItem('tasks', task);
}
// -------------------------- start function get Element from local storage ---------------------------
function getElementFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let task = JSON.parse(data);
        addElementToPage(task);
    }
}
// ------------------------------------- Click On Task Element -----------------------------------
containerTasks.addEventListener("click", (e) => {
    // Delete Button
    if (e.target.classList.contains("del")) {
      // Remove Element From Page
        e.target.parentElement.remove();
        // Remove Task From Local Storage
        deleteTaskWithId(e.target.parentElement.getAttribute("data-id"));
    }
    // Task Element to toggle
    if (e.target.classList.contains("task")) {
        toggleStatusTask(e.target.getAttribute("data-id"));
        e.target.classList.toggle('done');
    }
  });
// -------------------------- start function delete Element from page ---------------------------
function deleteTaskWithId(taskId) {
    arrayTasks = arrayTasks.filter(task => task.id != taskId);
    addEleToLocalStorage(arrayTasks);
}

function toggleStatusTask(taskId) {
    for (let i = 0; i < arrayTasks.length; i++){
        if (arrayTasks[i].id == taskId) {
            console.log( arrayTasks[i].completed == false ?  (arrayTasks[i].completed = true) : (arrayTasks[i].completed = false ))
        }
    }
    addEleToLocalStorage(arrayTasks);
}
// function Delete All
dellAllTasks.onclick = function () {
    arrayTasks = [];
    containerTasks.innerHTML = "";
    addEleToLocalStorage(arrayTasks);
}

finishAll.onclick = function () {
    arrayTasks.forEach((task) => {
        task.completed = true;
        task.classList.add('done');
    })
    addEleToLocalStorage(arrayTasks);

}
