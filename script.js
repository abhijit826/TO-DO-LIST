document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage when the page loads
    loadTasks();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });

    function addTask(taskText) {
        if (!taskText) return; // Prevent adding empty tasks

        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <div class="button-group">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
                <button class="complete">Complete</button>
            </div>
        `;
        taskList.appendChild(li);

        li.querySelector('button.delete').addEventListener('click', () => {
            taskList.removeChild(li);
            updateLocalStorage();
        });

        li.querySelector('button.edit').addEventListener('click', () => {
            const newTaskText = prompt('Edit task:', li.querySelector('span').textContent);
            if (newTaskText) {
                li.querySelector('span').textContent = newTaskText;
                updateLocalStorage();
            }
        });

        li.querySelector('button.complete').addEventListener('click', () => {
            li.classList.toggle('completed');
            updateLocalStorage();
        });

        // Save to localStorage
        saveTask(taskText);
    }

    function saveTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: taskText, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task.text}</span>
                <div class="button-group">
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                    <button class="complete">${task.completed ? 'Uncomplete' : 'Complete'}</button>
                </div>
            `;
            if (task.completed) {
                li.classList.add('completed');
            }
            taskList.appendChild(li);

            li.querySelector('button.delete').addEventListener('click', () => {
                taskList.removeChild(li);
                updateLocalStorage();
            });

            li.querySelector('button.edit').addEventListener('click', () => {
                const newTaskText = prompt('Edit task:', li.querySelector('span').textContent);
                if (newTaskText) {
                    li.querySelector('span').textContent = newTaskText;
                    updateLocalStorage();
                }
            });

            li.querySelector('button.complete').addEventListener('click', () => {
                li.classList.toggle('completed');
                updateLocalStorage();
            });
        });
    }

    function updateLocalStorage() {
        let tasks = [];
        document.querySelectorAll('#task-list li').forEach(li => {
            const taskText = li.querySelector('span').textContent;
            const completed = li.classList.contains('completed');
            tasks.push({ text: taskText, completed });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
