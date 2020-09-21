const input = document.querySelector('.to-do-input');
const button = document.querySelector('.to-do-button');
const container = document.querySelector('.to-do-container');
const list = document.querySelector('.to-do-list');


button.addEventListener('click', addToDoTask);
list.addEventListener('click', changeToDoTask);
list.addEventListener('click', changePriority);


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
    
        input.value = '';
    }
}


function changeToDoTask(event){
    event.preventDefault();
    const clicked_item = event.target;

    if (clicked_item.classList[0] === 'delete-button'){
        const deleted_item = clicked_item.parentElement;
        deleted_item.classList.toggle('deleted');
        deleted_item.addEventListener('transitionend', function (){
            deleted_item.remove();
        });
    }

    if (clicked_item.classList[0] === 'complete-button'){
        const completed_item = clicked_item.parentElement;
        completed_item.classList.toggle('completed')  
    }
}


function changePriority(event){
    event.preventDefault();
    var clicked_item = event.target;
    console.log(clicked_item.parentElement.classList[1])
    if (clicked_item.classList[0] === 'priority-button' && clicked_item.parentElement.classList[1] === 'low'){
        clicked_item.parentElement.classList.remove('low');
        clicked_item.parentElement.classList.add('medium');
    } else if(clicked_item.classList[0] === 'priority-button' && clicked_item.parentElement.classList[1] === 'medium'){
        clicked_item.parentElement.classList.remove('medium');
        clicked_item.parentElement.classList.add('high');
    } else if(clicked_item.classList[0] === 'priority-button' && clicked_item.parentElement.classList[1] === 'high'){
        clicked_item.parentElement.classList.remove('high');
        clicked_item.parentElement.classList.add('low');
    }
}

