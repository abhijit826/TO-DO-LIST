document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });

    function addTask(taskText) {
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
        });

        li.querySelector('button.edit').addEventListener('click', () => {
            const newTaskText = prompt('Edit task:', li.querySelector('span').textContent);
            if (newTaskText) {
                li.querySelector('span').textContent = newTaskText;
            }
        });

        li.querySelector('button.complete').addEventListener('click', () => {
            li.classList.toggle('completed');
        });
    }
});
