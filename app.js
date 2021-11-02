//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listiners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//Functions

function addTodo(event) {
    event.preventDefault(); // prevent from subbmiting form
    // Create A DIV class=todo
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create Li with class todo-item and inner text hey
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    
    saveLocalTodos(todoInput.value);


    // appending li to div
    todoDiv.appendChild(newTodo)

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"> </i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const thrashButton = document.createElement('button');
    thrashButton.innerHTML = '<i class="fas fa-trash"> </i>';
    thrashButton.classList.add("trash-btn");
    todoDiv.appendChild(thrashButton);
    todoList.appendChild(todoDiv);


    todoInput.value = "";
}

function deleteCheck(event) {
 const item = event.target;
 console.log(item)

 if(item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function() {
       todo.remove();
    
    });
 }

 if(item.classList[0] === "complete-btn") {
     const todo = item.parentElement;
     todo.classList.toggle('completed');
 }

}

function filterTodo(event) {
    const todos = Array.from(todoList.children);
    todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none"
                }
                break;
            case "uncompled":
                if(todo.classList.contains('uncompleted')) {
                    todo.style.display = 'none';
                } else {
                    todo.style.display = "flex"
                }
                break;

        }
    });

}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos() { 
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
    
        // Create Li with class todo-item and inner text hey
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        // appending li to div
        todoDiv.appendChild(newTodo)
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"> </i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        const thrashButton = document.createElement('button');
        thrashButton.innerHTML = '<i class="fas fa-trash"> </i>';
        thrashButton.classList.add("trash-btn");
        todoDiv.appendChild(thrashButton);
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todoIndex = (todo.children[0].innerText);
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos',JSON.stringify(todos));
}
