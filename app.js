import filterTasks from "filters.js"

const task_input = document.querySelector('.task-input');
const project_input = document.querySelector('.project-input');
const task_button = document.querySelector('.task-button');
const project_button = document.querySelector('.project-button');
const tasks_container = document.querySelector('.task-container');
const tasks_list = document.querySelector('.task-list');
const filter_priority = document.querySelector('.filter-priority');
const filter_project = document.querySelector('.filter-project');

let projects_list = [];
let available_connections_dict = {};
let connection_key = 0;
let done_connections_dict = {};


task_button.addEventListener('click', addNewTask);
project_button.addEventListener('click', addNewProjectToExistingTasks);
tasks_list.addEventListener('click', changeToDoTask);
tasks_list.addEventListener('click', changePriority);
filter_priority.addEventListener('click', filterTasks);
filter_project.addEventListener('click', filterTasks);

function addNewTask(event){
    event.preventDefault();
    if (task_input.value != '')
    {
        saveLocalTasksToStorage(task_input.value);
        const taskBox = document.createElement('div');
        taskBox.classList.add('task-box');
        taskBox.classList.add('low');
        tasks_list.appendChild(taskBox);
    
        const taskItem = document.createElement('li');
        taskItem.innerText = task_input.value;
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
        taskDetails.innerHTML += '<div id="task-connection" class="task-connection">Connected with: <select id="select-connection" class="select-connection"></select></div>';
        taskDetails.classList.add('task-details');
        taskDetails.classList.add('low');
        tasks_list.appendChild(taskDetails);

        // ADDING 'NONE' PROJECT WHEN CREATING TASK
        option = document.createElement("option");
        length = document.querySelectorAll(".select-project").length;
        option.text = 'None';
        option.value = 'none';
        document.querySelectorAll(".select-project")[length-1].appendChild(option);

        // ADDING 'NONE' CONNECTION WHEN CREATING TASK
        option = document.createElement("option");
        length = document.querySelectorAll(".select-connection").length;
        option.text = 'None';
        option.value = 'none';
        document.querySelectorAll(".select-connection")[length-1].appendChild(option);


        // ADDING CURRENT PROJECTS TO NEW ADDED TASK
        if(projects_list[0] != undefined){
            let project_selectors = document.querySelectorAll(".select-project");
            let counter = document.querySelectorAll(".select-project").length;
            last_selector = project_selectors[counter-1];

            for (const project of projects_list){
                option = document.createElement("option");
                option.text = project;
                last_selector.appendChild(option);
            }
        }
        
        // ADDING AVAILABLE CURRENT CONNECTIONS TO NEW ADDED TASK
        if(available_connections_dict[0] != undefined){
            const connection_selectors = document.querySelectorAll(".select-connection");
            counter = document.querySelectorAll(".select-connection").length;
            last_selector = connection_selectors[counter-1];

            for (const [key, value] of Object.entries(available_connections_dict)) {
                option = document.createElement("option");
                option.text = value;
                option.value = value;
                last_selector.appendChild(option);
            }
        }

        // SAVING TASK TO AVAILABLE CONNECTION DICT
        available_connections_dict[connection_key] = task_input.value;
        connection_key += 1;

        // ADDING NEW TASK TO EXISTING AVAILABLE CONNECTIONS
        const connection_selectors = document.querySelectorAll(".select-connection");
        var available_connections_keys = Object.keys(available_connections_dict);
        var last_key = available_connections_keys[available_connections_keys.length-1];
        last_connection = available_connections_dict[last_key];
    
        for (selector of connection_selectors){
            let task_name = selector.parentElement.parentElement.previousElementSibling.childNodes[0].innerText;
            
            // ADDING CONNECT TASKS POSIBILITY - EVENT LISTENER 
            selector.addEventListener('click', connectTasks);

            if (task_name != last_connection){
                option = document.createElement("option");
                option.text = last_connection;
                option.value = last_connection;
                selector.appendChild(option);  
            }
        }

        task_input.value = '';
    }
}


function addNewProjectToExistingTasks(event){
    event.preventDefault()
    const tasks = document.querySelectorAll(".select-project");
    const projects_menu = document.querySelector('.filter-project')

    if (project_input.value != '')
    {
        projects_list.push(project_input.value);

        for (task of tasks){
            option = document.createElement("option");
            option.text = project_input.value;
            task.appendChild(option);     
        }

        option = document.createElement("option");
        option.text = project_input.value;
        projects_menu.appendChild(option);     

        project_input.value = '';
    }
}



function changeToDoTask(event){
    event.preventDefault();
    const clicked_item = event.target;

    if (clicked_item.classList[0] === 'delete-button'){
        const deleted_task = clicked_item.parentElement;
        const deleted_description = clicked_item.parentElement.nextSibling;
        const deleted_name = deleted_task.childNodes[0].innerText;

        deleted_task.classList.toggle('deleted');
        deleted_description.classList.toggle('deleted');
        removeLocalTasksFromStorage(deleted_task);


        // WHEN DELETE BUTTON CLICKED DELETING TASK FROM CONNECTION LIST IN OTHER TASKS
        const connections = document.querySelectorAll(".select-connection");
        for (connection of connections){
            for (const [key, option] of Object.entries(connection.options)) {
                if (option.value == deleted_name){
                    connection.removeChild(option)
                }
            }
        }


        deleted_description.addEventListener('transitionend', function (){
            deleted_description.style.maxHeight = null;
        });
        deleted_task.addEventListener('transitionend', function (){
            deleted_task.remove();
            deleted_description.remove();
        });
    }
    else if (clicked_item.classList[0] === 'complete-button'){
        const completed_item = clicked_item.parentElement;
        completed_item.nextSibling.classList.toggle('completed')
        completed_item.classList.toggle('completed')  
    }
    else if (clicked_item.classList[0] == 'info-button'){
        var details = event.target.parentElement.nextElementSibling;

        if (details.style.maxHeight){
            details.style.maxHeight = null;
        } else {
            details.style.maxHeight = details.scrollHeight + "px";
        }
    }
}


function changePriority(event){
    event.preventDefault();
    var clicked_button = event.target;

    if (clicked_button.classList[0] === 'priority-button' && clicked_button.parentElement.classList[1] === 'low'){
        clicked_button.parentElement.classList.remove('low');
        clicked_button.parentElement.nextSibling.classList.remove('low');
        clicked_button.parentElement.classList.add('medium');
        clicked_button.parentElement.nextSibling.classList.add('medium');
    } else if(clicked_button.classList[0] === 'priority-button' && clicked_button.parentElement.classList[1] === 'medium'){
        clicked_button.parentElement.classList.remove('medium');
        clicked_button.parentElement.nextSibling.classList.remove('medium');
        clicked_button.parentElement.classList.add('high');
        clicked_button.parentElement.nextSibling.classList.add('high');
    } else if(clicked_button.classList[0] === 'priority-button' && clicked_button.parentElement.classList[1] === 'high'){
        clicked_button.parentElement.classList.remove('high');
        clicked_button.parentElement.nextSibling.classList.remove('high');
        clicked_button.parentElement.classList.add('low');
        clicked_button.parentElement.nextSibling.classList.add('low');
    }
}

function connectTasks(event){
    event.preventDefault();

    var clicked_partner = event.target.value;
    var clicked_task = event.target.parentElement.parentElement.previousSibling.children[0].innerText;

    done_connections_dict[clicked_task] = clicked_partner;

    const tasks = document.querySelectorAll(".select-connection");
    for (task of tasks){
        task_name = task.parentElement.parentElement.previousSibling.children[0].innerText;

        for (const [key, option] of Object.entries(task.options)){

            if (task_name == clicked_partner && task.options.selectedIndex == 0){  
                task.options.selectedIndex = key;
            }
            
            if (option.value == clicked_task && task_name != clicked_partner){
                task.removeChild(option);
            } else if (option.value == clicked_partner && task_name != clicked_task) {
                task.removeChild(option);
            }
        }
    }
}



