import { tasksList, projectsList, availableConnectionsDict, taskInput } from './app.js';

    var connectionKey;

document.addEventListener("DOMContentLoaded", getTasksFromLocalStorage);


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

        const taskBox = document.createElement('div');
        taskBox.classList.add('task-box');
        taskBox.classList.add('low');
        tasksList.appendChild(taskBox);
    
        const taskItem = document.createElement('li');
        taskItem.innerText = task;
        taskItem.classList.add('task-item');
        taskBox.appendChild(taskItem);

        const taskInfo = document.createElement('button');
        taskInfo.innerHTML = '<i class="fas fa-info-circle"></i>';
        taskInfo.classList.add('info-button');
        taskBox.appendChild(taskInfo);

        const taskPriority = document.createElement('button');
        taskPriority.innerHTML = '<i class="fas fa-layer-group"></i>';
        taskPriority.classList.add('priority-button');
        taskBox.appendChild(taskPriority);

        const taskDone = document.createElement('button');
        taskDone.innerHTML = '<i class="fas fa-check-circle"></i>';
        taskDone.classList.add('complete-button');
        taskBox.appendChild(taskDone);
    
        const taskDelete = document.createElement('button');
        taskDelete.innerHTML = '<i class="fas fa-minus-circle"></i>';
        taskDelete.classList.add('delete-button');
        taskBox.appendChild(taskDelete);

        const taskDetails = document.createElement('div');
        taskDetails.innerHTML += '<div id="task-project" class="task-project">Project: <select id="select-project" class="select-project"></select></div>';
        taskDetails.classList.add('task-details');
        taskDetails.classList.add('low');
        tasksList.appendChild(taskDetails);

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

  export {removeLocalTasksFromStorage, saveLocalTasksToStorage};
