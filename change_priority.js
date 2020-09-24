function addAndRemoveClasses(button, add, remove) {
    button.parentElement.classList.remove(remove);
    button.parentElement.nextSibling.classList.remove(remove);
    button.parentElement.classList.add(add);
    button.parentElement.nextSibling.classList.add(add);
}

function changePriority(event){
    event.preventDefault();
    var clickedButton = event.target;

    if (clickedButton.classList[0] === 'priority-button' && clickedButton.parentElement.classList[1] === 'low'){
        addAndRemoveClasses(clickedButton, 'medium', 'low');
    } else if(clickedButton.classList[0] === 'priority-button' && clickedButton.parentElement.classList[1] === 'medium'){
        addAndRemoveClasses(clickedButton, 'high', 'medium');
    } else if(clickedButton.classList[0] === 'priority-button' && clickedButton.parentElement.classList[1] === 'high'){
        addAndRemoveClasses(clickedButton, 'low', 'high');
    }
}

export { changePriority };