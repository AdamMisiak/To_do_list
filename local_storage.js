
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
        tasks_list.appendChild(taskBox);
    
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
        taskDetails.innerHTML += '<div id="task-connection" class="task-connection">Connected with: <select id="select-connection" class="select-connection"></select></div>';
        taskDetails.classList.add('task-details');
        taskDetails.classList.add('low');
        tasks_list.appendChild(taskDetails);

        // ADDING NONE PROJECT WHEN CREATING TASK
        option = document.createElement("option");
        length = document.querySelectorAll(".select-project").length;
        option.text = 'None';
        option.value = 'none';
        document.querySelectorAll(".select-project")[length-1].appendChild(option);

        // ADDING NONE CONNECTION WHEN CREATING TASK
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
    });
  }

