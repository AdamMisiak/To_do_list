const input = document.querySelector('.to-do-input');
const button = document.querySelector('.to-do-button');
const container = document.querySelector('.to-do-container');
const list = document.querySelector('.to-do-list');


button.addEventListener('click', addToDoTask);


function addToDoTask(event){
    event.preventDefault()
    container.style.display = 'flex';

    const todoDiv = document.getElementById("to-do");
    todoDiv.style.display = 'block';

    const todoTask = document.createElement('li')
    todoTask.innerText = input.value;
    todoTask.classList.add('to-do-item')
    todoDiv.appendChild(todoTask)

    const todoDelete = document.createElement('button')
    todoDelete.innerHTML = '<i class="fas fa-minus-circle"></i>'
    todoDelete.classList.add('delete-button')
    todoTask.appendChild(todoDelete)

    const todoMove = document.createElement('button')
    todoMove.innerHTML = '<i class="fas fa-arrow-circle-right"></i>'
    todoMove.classList.add('move-button')
    todoTask.appendChild(todoMove)

    input.value = '';






}