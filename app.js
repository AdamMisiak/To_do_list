const input = document.querySelector('.to-do-input');
const button = document.querySelector('.to-do-button');
const container = document.querySelector('.to-do-container');
const list = document.querySelector('.to-do-list');


button.addEventListener('click', addToDoTask);


function addToDoTask(event){
    if (input.value != '')
    {
        event.preventDefault()

        const todoBox = document.createElement('div')
        todoBox.classList.add('to-do-box')
        list.appendChild(todoBox)
    
        const todoTask = document.createElement('li')
        todoTask.innerText = input.value;
        todoTask.classList.add('to-do-item')
        todoBox.appendChild(todoTask)
    
        const todoDelete = document.createElement('button')
        todoDelete.innerHTML = '<i class="fas fa-minus-circle"></i>'
        todoDelete.classList.add('delete-button')
        todoBox.appendChild(todoDelete)
    
        const todoMove = document.createElement('button')
        todoMove.innerHTML = '<i class="fas fa-arrow-circle-right"></i>'
        todoMove.classList.add('move-button')
        todoBox.appendChild(todoMove)
    
        input.value = '';
    }







}