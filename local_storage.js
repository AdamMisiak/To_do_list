
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

        const todoBox = document.createElement('div');
        todoBox.classList.add('task-box');
        todoBox.classList.add('low');
        tasks_list.appendChild(todoBox);
    
        const todoTask = document.createElement('li');
        todoTask.innerText = task;
        todoTask.classList.add('task-item');
        todoBox.appendChild(todoTask);

        const todoInfo = document.createElement('button');
        todoInfo.innerHTML = '<i class="fas fa-info-circle"></i>';
        todoInfo.classList.add('info-button');
        todoBox.appendChild(todoInfo);

        const todoPriority = document.createElement('button');
        todoPriority.innerHTML = '<i class="fas fa-layer-group"></i>';
        todoPriority.classList.add('priority-button');
        todoBox.appendChild(todoPriority);

        const todoDone = document.createElement('button');
        todoDone.innerHTML = '<i class="fas fa-check-circle"></i>';
        todoDone.classList.add('complete-button');
        todoBox.appendChild(todoDone);
    
        const todoDelete = document.createElement('button');
        todoDelete.innerHTML = '<i class="fas fa-minus-circle"></i>';
        todoDelete.classList.add('delete-button');
        todoBox.appendChild(todoDelete);

        const todoDetails = document.createElement('div');
        todoDetails.innerHTML += '<div id="to-do-project" class="to-do-project">Project: <select id="select-project" class="select-project"></select></div>';
        todoDetails.innerHTML += '<div id="to-do-connection" class="to-do-connection">Connected with: <select id="select-connection" class="select-connection"></select></div>';
        todoDetails.classList.add('task-details');
        todoDetails.classList.add('low');
        tasks_list.appendChild(todoDetails);

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
            let tasks = document.querySelectorAll(".select-project");
            let counter = document.querySelectorAll(".select-project").length;
            new_task = tasks[counter-1];

            for (const project of projects_list){
                option = document.createElement("option");
                option.text = project;
                new_task.appendChild(option);
            }
        }
        
        // ADDING AVAILABLE CURRENT CONNECTIONS TO NEW ADDED TASK
        if(available_connections_dict[0] != undefined){
            const connections = document.querySelectorAll(".select-connection");
            var counter = document.querySelectorAll(".select-connection").length;
            new_connection = connections[counter-1];

            for (const [key, value] of Object.entries(available_connections_dict)) {
                option = document.createElement("option");
                option.text = value;
                option.value = value;
                new_connection.appendChild(option);
            }

            for (connection of connections){
                connection.addEventListener('click', connectTasks);
            }
        }

        // SAVING TASK TO AVAILABLE CONNECTION DICT
        available_connections_dict[connection_key] = task_input.value;
        connection_key += 1;

        // ADDING NEW TASK TO AVAILABLE CONNECTIONS
        addConnectionsToList(event);
    });
  }

