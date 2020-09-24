import {filterTasks} from "./filters.js";
import {removeLocalTasksFromStorage, saveLocalTasksToStorage, addNewElementToTask} from "./local_storage.js"
import {changePriority} from "./change_priority.js"

const taskInput = document.querySelector('.task-input');
const projectInput = document.querySelector('.project-input');
const taskButton = document.querySelector('.task-button');
const projectButton = document.querySelector('.project-button');
const tasksList = document.querySelector('.task-list');
const filterPriority = document.querySelector('.filter-priority');
const filterProject = document.querySelector('.filter-project');

let projectsList = [];

taskButton.addEventListener('click', addNewTask);
projectButton.addEventListener('click', addNewProjectToExistingTasks);
tasksList.addEventListener('click', clickTaskButton);
tasksList.addEventListener('click', changePriority);
filterPriority.addEventListener('click', filterTasks);
filterProject.addEventListener('click', filterTasks);

function addNewTask(event){
    event.preventDefault();
    if (taskInput.value !== '')
    {
        saveLocalTasksToStorage(taskInput.value);

        // ADDING ELEMENTS TO NEW TASK
        const taskBox = addNewElementToTask('div', ['task-box', 'low'], tasksList);
        const taskItem = addNewElementToTask('li', ['task-item'], taskBox, taskInput.value);
        const taskInfo = addNewElementToTask('button', ['info-button'], taskBox, '<i class="fas fa-info-circle"></i>');
        const taskPriority = addNewElementToTask('button', ['priority-button'], taskBox, '<i class="fas fa-layer-group"></i>');
        const taskDone = addNewElementToTask('button', ['complete-button'], taskBox, '<i class="fas fa-check-circle"></i>');
        const taskDelete = addNewElementToTask('button', ['delete-button'], taskBox, '<i class="fas fa-minus-circle"></i>');
        const taskDetails = addNewElementToTask('div', ['task-details', 'low'], tasksList, '<div id="task-project" class="task-project">Project: <select id="select-project" class="select-project"></select></div>');

        // ADDING 'NONE' PROJECT WHEN CREATING TASK
        var option = document.createElement("option");
        var length = document.querySelectorAll(".select-project").length;
        option.text = 'None';
        option.value = 'none';
        document.querySelectorAll(".select-project")[length-1].appendChild(option);

        // ADDING CURRENT PROJECTS TO NEW ADDED TASK
        if(typeof(projectsList[0]) != undefined){
            let projectSelectors = document.querySelectorAll(".select-project");
            let counter = document.querySelectorAll(".select-project").length;
            let lastSelector = projectSelectors[counter-1];

            for (const project of projectsList){
                option = document.createElement("option");
                option.text = project;
                lastSelector.appendChild(option);
            }
        }

        taskInput.value = '';
    }
}

// ADDING NEW PROJECT TO SELECT OPTION IN EXISTING TASKS AND IN PROJECT FILTER
function addNewProjectToExistingTasks(event){
    event.preventDefault()
    let projectSelectors = document.querySelectorAll(".select-project");

    if (projectInput.value !== '')
    {
        projectsList.push(projectInput.value);

        for (var selector of projectSelectors){
            var option = document.createElement("option");
            option.text = projectInput.value;
            selector.appendChild(option);     
        }

        option = document.createElement("option");
        option.text = projectInput.value;
        filterProject.appendChild(option);     

        projectInput.value = '';
    }
}

function clickTaskButton(event){
    event.preventDefault();
    const clickedButton = event.target;

    if (clickedButton.classList[0] === 'delete-button'){
        const deletedTask = clickedButton.parentElement;
        const deletedDescription = clickedButton.parentElement.nextSibling;

        deletedTask.classList.toggle('deleted');
        deletedDescription.classList.toggle('deleted');
        removeLocalTasksFromStorage(deletedTask);

        deletedDescription.addEventListener('transitionend', function (){
            deletedDescription.style.maxHeight = null;
        });
        deletedTask.addEventListener('transitionend', function (){
            deletedTask.remove();
            deletedDescription.remove();
        });
    }
    else if (clickedButton.classList[0] === 'complete-button'){
        const completedItem = clickedButton.parentElement;
        completedItem.nextSibling.classList.toggle('completed')
        completedItem.classList.toggle('completed')  
    }
    else if (clickedButton.classList[0] == 'info-button'){
        var taskDetails = event.target.parentElement.nextElementSibling;

        if (taskDetails.style.maxHeight){
            taskDetails.style.maxHeight = null;
        } else {
            taskDetails.style.maxHeight = taskDetails.scrollHeight + "px";
        }
    }
}

export { tasksList, projectsList, taskInput, filterProject, filterPriority};


