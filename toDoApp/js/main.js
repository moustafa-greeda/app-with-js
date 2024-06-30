let theInput = document.querySelector('#input');
let blusBtn = document.querySelector('.plus');
let containerTasks = document.querySelector(".tasks-content");
let msgNoTask = document.querySelector('.no-tasks-message');
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");
let count = 0,
    countCompleted = 0,
    deleteAll = document.querySelector("#delete-all"),
    finishAll = document.getElementById("finish-all"),
    ArrayOfTasks = [];

// focus in input field
window.onload = function () {
    theInput.focus();
}

blusBtn.onclick = function () {
    if (theInput.value == "") {
        Swal.fire({
            title: "Error!",
            text: "Field Can't be Empty!",
            icon: "error"
          });
    }
    else {
        // Check If Span With No Tasks Message Is Exist
        if (document.body.contains(document.querySelector(".no-tasks-message"))) {

            // Remove No Tasks Message
            msgNoTask.remove();
  
        }
        //------------------------- set item in local storage ---------------------------------------//
        // ArrayOfTasks.push(input.value);
        // console.log(ArrayOfTasks);
        // window.localStorage.setItem('task', ArrayOfTasks);

        let task = document.createElement("span");
        task.className = "task-box";
        task.innerHTML = input.value;
        // //
        // let X = window.localStorage.getItem('task');
        // console.log(X);
        // // 
        let deleteTask = document.createElement("span");
        deleteTask.className = "delete";
        deleteTask.innerText = "delete";
    
        task.appendChild(deleteTask);
        containerTasks.appendChild(task);
        input.value = "";
        input.focus();
    }
}

document.addEventListener('click', function (e) {

    if (e.target.classList.contains('delete')) {
        e.target.parentNode.remove();
        if (containerTasks.childElementCount == 0) {
            createNoTasks();
        }
    }
    // toggle box task if finshed
    if (e.target.classList.contains('task-box')) {
        e.target.classList.toggle("finished")
    }
    countTask();
    countTasksFinished();
});

// Function To Create No Tasks Message
function createNoTasks() {

    // Create Message Span Element
    let msgSpan = document.createElement("span");
  
    // Create The Text Message
    let msgText = document.createTextNode("No Tasks To Show");
  
    // Add Text To Message Span Element
    msgSpan.appendChild(msgText);
  
    // Add Class To Message Span
    msgSpan.className = 'no-tasks-message';
  
    // Append The Message Span Element To The Task Container
    containerTasks.appendChild(msgSpan);
  
}

function countTask() {
    count = Array.from(document.querySelectorAll('.tasks-content .task-box'));
    tasksCount.innerText = count.length;
}

function countTasksFinished() {
    tasksCompleted.innerText  = document.querySelectorAll('.task-box.finished').length;
}
// delete all tasks
deleteAll.addEventListener('click' , function () {
    let tasksEle = document.querySelectorAll(".tasks-content .task-box");

    tasksEle.forEach(function (e) {
        e.remove();
    });
    containerTasks.appendChild(msgNoTask);

});
// finish All tasks
finishAll.onclick = function () {
    tasksEle = document.querySelectorAll(".tasks-content .task-box");
    tasksEle.forEach(function (ele) {
        ele.classList.toggle('finished');
    })
}

