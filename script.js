document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.getElementById('allBtn').addEventListener('click', () => filterTasks('all'));
document.getElementById('activeBtn').addEventListener('click', () => filterTasks('active'));
document.getElementById('completedBtn').addEventListener('click', () => filterTasks('completed'));

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function loadTasks() {
    tasks.forEach(task => addTaskToDOM(task));
}

function addTask() {
    const taskText = document.getElementById('todoText').value;
    const category = document.getElementById('categorySelect').value;

    // validate word count

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        text: taskText,
        category: category,
        completed: false
    };

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    addTaskToDOM(task);
    document.getElementById('todoText').value = '';
}

function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.completed) {
        li.classList.add('completed');
    }

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = function() {
        const newText = prompt('Edit your task:', task.text);
        if (newText) {
            task.text = newText;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            li.firstChild.textContent = newText; // Update the displayed text
        }
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = function() {
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        li.remove();
    };

    const completeBtn = document.createElement('button');
    completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
    completeBtn.onclick = function() {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        li.classList.toggle('completed');
        completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
    };

    li.appendChild(editBtn);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    document.getElementById('todoList').appendChild(li);
}

function filterTasks(filter) {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    tasks.forEach(task => {
        if (filter === 'all' || (filter === 'active' && !task.completed) || (filter === 'completed' && task.completed)) {
            addTaskToDOM(task);
        }
    });
}
