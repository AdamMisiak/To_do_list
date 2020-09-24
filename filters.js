import { filterProject, filterPriority} from './app.js';

function filterTasks(){
    var project_selectors = document.querySelectorAll('.select-project');
    
    project_selectors.forEach(function(selector){
        if (selector.classList)
            var filteredProject = filterProject.options[filterProject.selectedIndex];
            var filteredPriority = filterPriority.options[filterPriority.selectedIndex];
            var current_task_project = selector.options[selector.selectedIndex];
            var current_task_priority = selector.parentElement.parentElement.classList.item(1);

            // CHECKING/FILTERING PROJECTS
            if (filteredProject.value == current_task_project.value){
                selector.parentElement.parentElement.style.display = 'block';
                selector.parentElement.parentElement.previousSibling.style.display = 'flex';

                // CHECKING/FILTERING PRIORITIES
                if (filteredPriority.value == current_task_priority){
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
            if ((filteredProject.value == 'all' && filteredPriority.value == current_task_priority) ||
                (filteredPriority.value == 'all' && filteredProject.value == current_task_project.value) ||
                (filteredPriority.value == 'all' && filteredProject.value == 'all')) {
                selector.parentElement.parentElement.style.display = 'block';
                selector.parentElement.parentElement.previousSibling.style.display = 'flex';
            }    
    });
}

export { filterTasks };