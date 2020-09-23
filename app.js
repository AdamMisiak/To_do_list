const input = document.querySelector('.to-do-input');
const project_input = document.querySelector('.project-input');
const button = document.querySelector('.to-do-button');
const project_button = document.querySelector('.project-button');
const container = document.querySelector('.to-do-container');
const list = document.querySelector('.to-do-list');
const select_priority = document.querySelector('.filter-priority');
const select_project = document.querySelector('.filter-project');


var project_dict = {};
var connection_dict = {};
var done_connections_dict = {};
var key = 0;
var connection_key = 0;

button.addEventListener('click', addToDoTask);
project_button.addEventListener('click', addNewProjectToTasks);
list.addEventListener('click', changeToDoTask);
list.addEventListener('click', changePriority);
select_priority.addEventListener('click', filterTasks);
select_project.addEventListener('click', filterTasks);

function addToDoTask(event){
    event.preventDefault();
    if (input.value != '')
    {
        const todoBox = document.createElement('div');
        todoBox.classList.add('to-do-box');
        todoBox.classList.add('low');
        list.appendChild(todoBox);
    
        const todoTask = document.createElement('li');
        todoTask.innerText = input.value;
        todoTask.classList.add('to-do-item');
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
        todoDetails.classList.add('to-do-details');
        todoDetails.classList.add('low');

        list.appendChild(todoDetails);

        // ADDING NONE PROJECT WHEN CREATING TASK
        var option = document.createElement("option");
        var length = document.querySelectorAll(".select-project").length;
        option.text = 'None';
        option.value = 'none';
        document.querySelectorAll(".select-project")[length-1].appendChild(option);

        // ADDING NONE CONNECTION WHEN CREATING TASK
        var option = document.createElement("option");
        var length = document.querySelectorAll(".select-connection").length;
        option.text = 'None';
        option.value = 'none';
        document.querySelectorAll(".select-connection")[length-1].appendChild(option);


        // ADDING CURRENT PROJECTS TO NEW ADDED TASK
        if(project_dict[0] != undefined){
            const tasks = document.querySelectorAll(".select-project");
            var counter = document.querySelectorAll(".select-project").length;
            new_task = tasks[counter-1];

            for (const [key, value] of Object.entries(project_dict)) {
                var option = document.createElement("option");
                option.text = value;
                new_task.appendChild(option);
            }
        }

        // ADDING CURRENT CONNECTIONS TO NEW ADDED TASK
        if(connection_dict[0] != undefined){
            const connections = document.querySelectorAll(".select-connection");
            var counter = document.querySelectorAll(".select-connection").length;
            new_connection = connections[counter-1];

            for (const [key, value] of Object.entries(connection_dict)) {
                var option = document.createElement("option");
                option.text = value;
                option.value = value;
                new_connection.appendChild(option);
            }

            for (connection of connections){
                connection.addEventListener('click', connectTasks);
            }
        }

        // SAVING TASK TO CONNECTION DICT
        connection_dict[connection_key] = input.value;
        connection_key += 1;

        // ADDING NEW TASK TO CONNECTIONS
        addConnectionsToList(event);

        input.value = '';
    }
}


function addNewProjectToTasks(event){
    event.preventDefault()
    const tasks = document.querySelectorAll(".select-project");
    const projects_menu = document.querySelector('.filter-project')

    if (project_input.value != '')
    {
        project_dict[key] = project_input.value;
        key += 1;

        for (task of tasks){
            var option = document.createElement("option");
            option.text = project_input.value;
            task.appendChild(option);     
        }

        var option = document.createElement("option");
        option.text = project_input.value;
        projects_menu.appendChild(option);     

        project_input.value = '';
    }
}

function addConnectionsToList(event){
    event.preventDefault()

    const connections = document.querySelectorAll(".select-connection");
    var keys = Object.keys(connection_dict);
    var last = keys[keys.length-1];
    new_connection = connection_dict[last];

    for (connection of connections){
        var task_name = connection.parentElement.parentElement.previousElementSibling.childNodes[0].innerText;
        if (task_name != new_connection){
            var option = document.createElement("option");
            option.text = new_connection;
            option.value = new_connection;
            connection.appendChild(option);  
        }
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


        // WHEN DELETE BUTTON CLICKED DELETING TASK FROM CONNECTION LIST IN OTHER TASKS
        const connections = document.querySelectorAll(".select-connection");
        for (connection of connections){
            for (const [key, option] of Object.entries(connection.options)) {
                if (option.value == deleted_name){
                    connection.removeChild(option)
                    console.log(option.value);
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
    var clicked_item = event.target;

    if (clicked_item.classList[0] === 'priority-button' && clicked_item.parentElement.classList[1] === 'low'){
        clicked_item.parentElement.classList.remove('low');
        clicked_item.parentElement.nextSibling.classList.remove('low');
        clicked_item.parentElement.classList.add('medium');
        clicked_item.parentElement.nextSibling.classList.add('medium');
    } else if(clicked_item.classList[0] === 'priority-button' && clicked_item.parentElement.classList[1] === 'medium'){
        clicked_item.parentElement.classList.remove('medium');
        clicked_item.parentElement.nextSibling.classList.remove('medium');
        clicked_item.parentElement.classList.add('high');
        clicked_item.parentElement.nextSibling.classList.add('high');
    } else if(clicked_item.classList[0] === 'priority-button' && clicked_item.parentElement.classList[1] === 'high'){
        clicked_item.parentElement.classList.remove('high');
        clicked_item.parentElement.nextSibling.classList.remove('high');
        clicked_item.parentElement.classList.add('low');
        clicked_item.parentElement.nextSibling.classList.add('low');
    }
}

function filterTasks(){
    var tasks = document.querySelectorAll('.select-project');
    
    tasks.forEach(function(element){
        if (element.classList)
            var chosen_project = select_project.options[select_project.selectedIndex];
            var chosen_priority = select_priority.options[select_priority.selectedIndex];
            var task_project = element.options[element.selectedIndex];
            var task_priority = element.parentElement.parentElement.classList.item(1);

            // CHECKING PROJECTS
            if (chosen_project.value == task_project.value){
                element.parentElement.parentElement.style.display = 'block';
                element.parentElement.parentElement.previousSibling.style.display = 'flex';

                // CHECKING PRIORITIES
                if (chosen_priority.value == task_priority){
                    element.parentElement.parentElement.style.display = 'block';
                    element.parentElement.parentElement.previousSibling.style.display = 'flex';
                } else {
                    element.parentElement.parentElement.style.display = 'none';
                    element.parentElement.parentElement.previousSibling.style.display = 'none';
                } 

            // HIDDING ELEMENT FILTRY NA DOL!!!!!!!!!!!!!!!!
            } else {
                element.parentElement.parentElement.style.display = 'none';
                element.parentElement.parentElement.previousSibling.style.display = 'none';
            } 

            // CHECKING WHEN ONE OR TWO FILTERS ARE 'ALL'
            if ((chosen_project.value == 'all' && chosen_priority.value == task_priority) ||
                (chosen_priority.value == 'all' && chosen_project.value == task_project.value) ||
                (chosen_priority.value == 'all' && chosen_project.value == 'all')) {
                element.parentElement.parentElement.style.display = 'block';
                element.parentElement.parentElement.previousSibling.style.display = 'flex';
            }    
    });
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


