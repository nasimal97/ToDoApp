document.addEventListener('DOMContentLoaded', function () {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const errorMessage = document.getElementById('error-message');
    const todoList = document.getElementById('todo-list');

    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    
    renderTasks();

    todoForm.addEventListener('submit', function (e) {
        e.preventDefault(); 

        const taskValue = todoInput.value.trim();

        if (taskValue.length === 0) {
            displayErrorMessage('Task cannot be empty!');
            return;
        }

        if (taskValue.length < 3) {
            displayErrorMessage('Task must be at least 3 characters long!');
            return;
        }

        tasks.push({ text: taskValue, completed: false });
        saveTasks();
        renderTasks();

        todoInput.value = '';
        errorMessage.textContent = '';
    });

    function renderTasks() {
        todoList.innerHTML = '';
        tasks.forEach(function (task, index) {
            if (task && typeof task.completed !== 'undefined') { 
                const todoItem = document.createElement('div');
                todoItem.classList.add('todo-item');
                if (task.completed) {
                    todoItem.classList.add('completed');
                }
                todoItem.textContent = task.text;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', function () {
                    tasks.splice(index, 1);
                    saveTasks();
                    renderTasks();
                });

                const completeCheckbox = document.createElement('input');
                completeCheckbox.type = 'checkbox';
                completeCheckbox.checked = task.completed;
                completeCheckbox.addEventListener('change', function () {
                    task.completed = !task.completed;
                    saveTasks();
                    renderTasks();
                });

                todoItem.appendChild(completeCheckbox);
                todoItem.appendChild(deleteButton);
                todoList.appendChild(todoItem);
            }
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function displayErrorMessage(message) {
        errorMessage.textContent = message;
    }

    const completeAllButton = document.getElementById('complete-all-button');
    completeAllButton.addEventListener('click', function () {
        tasks.forEach(task => {
            task.completed = true;
        });
        saveTasks();
        renderTasks();
    });

    const deleteAllButton = document.getElementById('delete-all-button');
    deleteAllButton.addEventListener('click', function () {
        tasks = [];
        saveTasks();
        renderTasks();
    });
});
