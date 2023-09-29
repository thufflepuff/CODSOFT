document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span style="margin-right: 10px; opacity: 1;">${task}</span> <!-- Adjust margin-right and opacity as needed -->
                <button data-index="${index}" style="margin-right: 5px; opacity: 0.5;">Edit</button> <!-- Adjust margin-right and opacity as needed -->
                <button data-index="${index}" class="delete" style="opacity: 0.5;">Delete</button> <!-- Adjust opacity as needed -->
            `;
            li.style.display = 'flex';
            li.style.justifyContent = 'space-between';
            li.style.alignItems = 'center';
            li.style.padding = '10px';
            li.style.borderBottom = '2px solid #fff';
            taskList.appendChild(li);
        });
    }
    
    renderTasks();

    addTaskButton.addEventListener('click', function () {
        const newTask = taskInput.value.trim();
        if (newTask !== '') {
            tasks.push(newTask);
            updateLocalStorage();
            renderTasks();
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete')) {
            const index = event.target.getAttribute('data-index');
            tasks.splice(index, 1);
            updateLocalStorage();
            renderTasks();
        } else if (event.target.innerText === 'Edit') {
            const index = event.target.getAttribute('data-index');
            const updatedTask = prompt('Edit the task:', tasks[index]);
            if (updatedTask !== null) {
                tasks[index] = updatedTask;
                updateLocalStorage();
                renderTasks();
            }
        }
    });
});
