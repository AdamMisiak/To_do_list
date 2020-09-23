const input = document.querySelector('.to-do-input');
const project_input = document.querySelector('.project-input');
const button = document.querySelector('.to-do-button');
const project_button = document.querySelector('.project-button');
const container = document.querySelector('.to-do-container');
const list = document.querySelector('.to-do-list');
const select = document.querySelector('.filter-priority')

var project_dict = {};
var key = 0;

button.addEventListener('click', addToDoTask);
project_button.addEventListener('click', addNewProjectToTasks);
list.addEventListener('click', changeToDoTask);
list.addEventListener('click', changePriority);
select.addEventListener('click', filterPriority);

function dictIsEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

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
        todoDetails.innerHTML = '<div id="to-do-description" class="to-do-description">Description of task:</div>';
        todoDetails.innerHTML += '<div id="to-do-project" class="to-do-project">Project: <select id="select-project" class="select-project"></select></div>';
        // todoDetails.innerHTML += '<select id="select-project" class="select-project"></select>';
        // todoDetails.innerHTML += '</div>';
        todoDetails.innerHTML += '<div id="to-do-connection" class="to-do-connection">Connected with:</div>';
        todoDetails.classList.add('to-do-details');
        todoDetails.classList.add('low');

        list.appendChild(todoDetails);

        // ADDING NONE PROJECT WHEN CREATING TASK
        var option = document.createElement("option");
        var length = document.querySelectorAll(".select-project").length;
        option.text = 'None';
        document.querySelectorAll(".select-project")[length-1].appendChild(option);


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

        input.value = '';
    }
}


function addNewProjectToTasks(event){
    event.preventDefault()
    const tasks = document.querySelectorAll(".select-project");

    if (project_input.value != '')
    {
        project_dict[key] = project_input.value;
        key += 1;

        for (task of tasks){
            var option = document.createElement("option");
            option.text = project_input.value;
            task.appendChild(option);     
        }
        project_input.value = '';
    }
}


function changeToDoTask(event){
    event.preventDefault();
    const clicked_item = event.target;

    if (clicked_item.classList[0] === 'delete-button'){
        const deleted_task = clicked_item.parentElement;
        const deleted_description = clicked_item.parentElement.nextSibling;
        deleted_task.classList.toggle('deleted');
        deleted_description.classList.toggle('deleted');

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


function filterPriority(event){
    const elements_list = list.childNodes;

    elements_list.forEach(function(element){

        if (element.classList)
            if (element.classList.item(0) == 'to-do-box' || element.classList.item(0) == 'to-do-details'){
                priority = element.classList.item(1)
                switch(event.target.value){

                    case "all":
                        if (element.classList.item(0) == 'to-do-box')
                            element.style.display = 'flex';
                        if (element.classList.item(0) == 'to-do-details')
                            element.style.display = 'block';
                        break;

                    case "low-priority":
                        if (priority == 'low'){
                            if (element.classList.item(0) == 'to-do-box')
                                element.style.display = 'flex';
                            if (element.classList.item(0) == 'to-do-details')
                                element.style.display = 'block';
                        } else {
                            element.style.display = 'none';
                        }
                        break;

                    case "medium-priority":
                        if (priority == 'medium'){
                            if (element.classList.item(0) == 'to-do-box')
                                element.style.display = 'flex';
                            if (element.classList.item(0) == 'to-do-details')
                                element.style.display = 'block';
                        } else {
                            element.style.display = 'none';
                        }
                        break;

                    case "high-priority":
                        if (priority == 'high'){
                            if (element.classList.item(0) == 'to-do-box')
                                element.style.display = 'flex';
                            if (element.classList.item(0) == 'to-do-details')
                                element.style.display = 'block';
                        } else {
                            element.style.display = 'none';
                        }
                        break;
                }
            }
    });
}


