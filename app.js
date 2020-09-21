const input = document.querySelector('.to-do-input');
const button = document.querySelector('.to-do-button');
const container = document.querySelector('.to-do-container');
const list = document.querySelector('.to-do-list');


button.addEventListener('click', addToDoTask);
list.addEventListener('click', changeToDoTask);


function addToDoTask(event){
    event.preventDefault();
    if (input.value != '')
    {
        const todoBox = document.createElement('div');
        todoBox.classList.add('to-do-box');
        list.appendChild(todoBox);
    
        const todoTask = document.createElement('li');
        todoTask.innerText = input.value;
        todoTask.classList.add('to-do-item');
        todoBox.appendChild(todoTask);

        const todoMove = document.createElement('button');
        todoMove.innerHTML = '<i class="fas fa-arrow-circle-right"></i>';
        todoMove.classList.add('complete-button');
        todoBox.appendChild(todoMove);
    
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
        deleted_item.remove()  
    }

    if (clicked_item.classList[0] === 'complete-button'){
        const completed_item = clicked_item.parentElement;
        completed_item.classList.toggle('completed')  
    }

}