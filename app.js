import {filterTasks} from "./filters.js";
import {removeLocalTasksFromStorage, saveLocalTasksToStorage} from "./local_storage.js"

const taskInput = document.querySelector('.task-input');
const projectInput = document.querySelector('.project-input');
const taskButton = document.querySelector('.task-button');
const projectButton = document.querySelector('.project-button');
const tasksList = document.querySelector('.task-list');
const filterPriority = document.querySelector('.filter-priority');
const filterProject = document.querySelector('.filter-project');

let projectsList = [];
let availableConnectionsDict = {};
var connectionKey = 0;


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
        const taskBox = document.createElement('div');
        taskBox.classList.add('task-box');
        taskBox.classList.add('low');
        tasksList.appendChild(taskBox);
    
        const taskItem = document.createElement('li');
        taskItem.innerText = taskInput.value;
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

        // ADDING 'NONE' PROJECT WHEN CREATING TASK
        var option = document.createElement("option");
        var length = document.querySelectorAll(".select-project").length;
        option.text = 'None';
        option.value = 'none';
        document.querySelectorAll(".select-project")[length-1].appendChild(option);

        // ADDING CURRENT PROJECTS TO NEW ADDED TASK
        if(typeof(projectsList[0]) != undefined){
            console.log('test')
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
    const projectSelectors = document.querySelectorAll(".select-project");
    const projectsFilter = document.querySelector('.filter-project')

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
        projectsFilter.appendChild(option);     

        projectInput.value = '';
    }
}



function clickTaskButton(event){
    event.preventDefault();
    const clickedButton = event.target;

    if (clickedButton.classList[0] === 'delete-button'){
        const deletedTask = clickedButton.parentElement;
        const deletedDescription = clickedButton.parentElement.nextSibling;
        const deletedName = deletedTask.childNodes[0].innerText;

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

function changePriority(event){
    event.preventDefault();
    var clickedButton = event.target;

    if (clickedButton.classList[0] === 'priority-button' && clickedButton.parentElement.classList[1] === 'low'){
        clickedButton.parentElement.classList.remove('low');
        clickedButton.parentElement.nextSibling.classList.remove('low');
        clickedButton.parentElement.classList.add('medium');
        clickedButton.parentElement.nextSibling.classList.add('medium');
    } else if(clickedButton.classList[0] === 'priority-button' && clickedButton.parentElement.classList[1] === 'medium'){
        clickedButton.parentElement.classList.remove('medium');
        clickedButton.parentElement.nextSibling.classList.remove('medium');
        clickedButton.parentElement.classList.add('high');
        clickedButton.parentElement.nextSibling.classList.add('high');
    } else if(clickedButton.classList[0] === 'priority-button' && clickedButton.parentElement.classList[1] === 'high'){
        clickedButton.parentElement.classList.remove('high');
        clickedButton.parentElement.nextSibling.classList.remove('high');
        clickedButton.parentElement.classList.add('low');
        clickedButton.parentElement.nextSibling.classList.add('low');
    }
}

export { tasksList, projectsList, availableConnectionsDict, connectionKey, taskInput,
          filterProject, filterPriority};


