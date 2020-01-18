'use strict';

function init() {
    console.log('Todos App');
    createTodos();
    render();
   
}
function render() {
    renderTodos();
    renderStats();
}

function renderTodos() {
    var todos = getTodosForDisplay();
    var strHtmls = todos.map(function (todo) {
        var className = (todo.isDone) ? 'done' : ''
        return `<li class="${className}" onclick="onTodoClicked(this, ${todo.id})">
                    ${todo.txt}
                    <span class="actions">
                        <button class="btn" onclick="onDeleteTodo(event, ${todo.id})">x</button>
                    </span>
                </li>`
    })
    document.querySelector('.todos').innerHTML = strHtmls.join('');
    if(todos.length===0)document.getElementsByTagName('h2')[0].style.display = 'block';
    else document.getElementsByTagName('h2')[0].style.display = 'none';

    console.table(todos);
}
function renderStats() {
    var todos = getTodosForDisplay();

    document.querySelector('.active-count').innerHTML = todos.length
}

function onAddTodo() {
    var txt = prompt('What needs to be done?', 'Nothing');
    var importance=+prompt('How important is it on scale 1-3?','3')
    addTodo(txt,importance);
    render();
}

function onTodoClicked(elTodo, todoId) {
    toggleTodo(todoId);
    saveToStorage(TODOS_KEY, gTodos);
    render();
}

function onDeleteTodo(ev, todoId) {
    ev.stopPropagation();
    if(confirm('are you sure you want to delete?'))
    { deleteTodo(todoId);
        render();}
   
}

function onFilterChange(filterByTxt) {
    console.log('filterByTxt', filterByTxt);
    setTodosFilter(filterByTxt);
    render();
}