

// DO INNEGO PLIKU!!!
function filterTasks(){
    var project_selectors = document.querySelectorAll('.select-project');
    
    project_selectors.forEach(function(selector){
        if (selector.classList)
            var filtered_project = filter_project.options[filter_project.selectedIndex];
            var filtered_priority = filter_priority.options[filter_priority.selectedIndex];
            var current_task_project = selector.options[selector.selectedIndex];
            var current_task_priority = selector.parentElement.parentElement.classList.item(1);

            // CHECKING/FILTERING PROJECTS
            if (filtered_project.value == current_task_project.value){
                selector.parentElement.parentElement.style.display = 'block';
                selector.parentElement.parentElement.previousSibling.style.display = 'flex';

                // CHECKING/FILTERING PRIORITIES
                if (filtered_priority.value == current_task_priority){
                    selector.parentElement.parentElement.style.display = 'block';
                    selector.parentElement.parentElement.previousSibling.style.display = 'flex';
                } else {
                    selector.parentElement.parentElement.style.display = 'none';
                    selector.parentElement.parentElement.previousSibling.style.display = 'none';
                } 

            // HIDDING NOT NEEDED ELEMENT
            } else {
                selector.parentElement.parentElement.style.display = 'none';
                selector.parentElement.parentElement.previousSibling.style.display = 'none';
            } 

            // CHECKING IF ONE OR TWO FILTERS ARE 'ALL'
            if ((filtered_project.value == 'all' && filtered_priority.value == current_task_priority) ||
                (filtered_priority.value == 'all' && filtered_project.value == current_task_project.value) ||
                (filtered_priority.value == 'all' && filtered_project.value == 'all')) {
                selector.parentElement.parentElement.style.display = 'block';
                selector.parentElement.parentElement.previousSibling.style.display = 'flex';
            }    
    });
}
