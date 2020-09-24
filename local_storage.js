import { tasksList, projectsList } from './app.js';


document.addEventListener("DOMContentLoaded", getTasksFromLocalStorage);

function addNewElementToTask(elementType, addedClasses, appendedTo, addedHTML){
    const createdElement = document.createElement(elementType);
    addedHTML = addedHTML || '';
    for (const addedClass of addedClasses){
        createdElement.classList.add(addedClass);
    }
    createdElement.innerHTML = addedHTML;
    appendedTo.appendChild(createdElement);
    return createdElement;
}


function saveLocalTasksToStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }



function removeLocalTasksFromStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    const taskName = task.children[0].innerText;
    tasks.splice(tasks.indexOf(taskName), 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }


function getTasksFromLocalStorage(event) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task) {

        // ADDING ELEMENTS TO NEW TASK
        const taskBox = addNewElementToTask('div', ['task-box', 'low'], tasksList);
        const taskItem = addNewElementToTask('li', ['task-item'], taskBox, task);
        const taskInfo = addNewElementToTask('button', ['info-button'], taskBox, '<i class="fas fa-info-circle"></i>');
        const taskPriority = addNewElementToTask('button', ['priority-button'], taskBox, '<i class="fas fa-layer-group"></i>');
        const taskDone = addNewElementToTask('button', ['complete-button'], taskBox, '<i class="fas fa-check-circle"></i>');
        const taskDelete = addNewElementToTask('button', ['delete-button'], taskBox, '<i class="fas fa-minus-circle"></i>');
        const taskDetails = addNewElementToTask('div', ['task-details', 'low'], tasksList, '<div id="task-project" class="task-project">Project: <select id="select-project" class="select-project"></select></div>');

        // ADDING NONE PROJECT WHEN CREATING TASK
        let option = document.createElement("option");
        let length = document.querySelectorAll(".select-project").length;
        option.text = 'None';
        option.value = 'none';
        document.querySelectorAll(".select-project")[length-1].appendChild(option);

        // ADDING CURRENT PROJECTS TO NEW ADDED TASK
        if(projectsList[0] != undefined){
            let project_selectors = document.querySelectorAll(".select-project");
            let counter = document.querySelectorAll(".select-project").length;
            last_selector = project_selectors[counter-1];

            for (const project of projects_list){
                option = document.createElement("option");
                option.text = project;
                last_selector.appendChild(option);
            }
        }

    });
  }

  export {removeLocalTasksFromStorage, saveLocalTasksToStorage, addNewElementToTask};
