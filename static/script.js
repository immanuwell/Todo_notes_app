async function loadTodos() {
    const response = await fetch('/api/todos');
    const todos = await response.json();
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" 
                   ${todo.completed ? 'checked' : ''} 
                   onchange="toggleTodo(${todo.id}, this.checked)">
            <span class="todo-text">${todo.title}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Удалить</button>
        `;
        todoList.appendChild(li);
    });
}

async function addTodo() {
    const input = document.getElementById('new-todo');
    const title = input.value.trim();
    
    if (!title) return;
    
    await fetch('/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
    });
    
    input.value = '';
    loadTodos();
}

async function toggleTodo(id, completed) {
    await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
    });
    
    loadTodos();
}

async function deleteTodo(id) {
    await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
    });
    
    loadTodos();
}

// Загрузка задач при старте
document.addEventListener('DOMContentLoaded', loadTodos);
