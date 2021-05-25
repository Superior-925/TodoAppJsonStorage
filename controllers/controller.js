class Controller {
    constructor(todoList) {
        this.todoList = todoList;
    };

    onNewTodo() {
        let addToDoButton = document.getElementById("todo-button");
        addToDoButton.addEventListener('click', () => {
            let inputValue = document.getElementById("new-todo-input").value;
            if (!inputValue || inputValue.trim().length === 0) {
                alert("Enter the tasks text!");
                return;
            }
            let id = new Date().getTime() + getRandomIntInclusive(1, 10000);

            let newTodo = new Todo(inputValue, id, false);

            this.todoList.addTodo(newTodo);

            showHideButtons();
        });
    };


    deleteAll() {

        // deleting all records in todos array
        let deleteAllButton = document.getElementById('delete-all-button');

        deleteAllButton.addEventListener('click', () => {
            this.todoList.deleteAllTodos();
            showHideButtons();
        });
    }

    deleteCompleted() {
        // deleting completed records in todos array
        let deleteCompletedButton = document.getElementById('delete-completed-button');
        deleteCompletedButton.addEventListener('click', () => {
            this.todoList.deleteCompletedTodos();
        });
    }

    showAll() {
        //filtering displayed tasks
        let showAllTodosButton = document.getElementById('show-all-todos-button');
        showAllTodosButton.addEventListener('click', () => {
            this.todoList.showAllTodos();
        });
    }

    showCompleted() {
        //filtering displayed tasks
        let showCompletedTodosButton = document.getElementById('show-completed-todos-button');
        showCompletedTodosButton.addEventListener('click', () => {
            this.todoList.showCompletedTodos();
        });
    }

    showNotCompleted() {
        //filtering displayed tasks
        let showNotCompletedTodosButton = document.getElementById('show-not-completed-todos-button');
        showNotCompletedTodosButton.addEventListener('click', () => {
            this.todoList.showNotCompletedTodos();
        });
    }

    buttonsListeners() {
        this.onNewTodo();
        this.deleteAll();
        this.deleteCompleted();
        this.showAll();
        this.showCompleted();
        this.showNotCompleted()
    }
}

let newTodoList = new TodoList();
let controller = new Controller(newTodoList);
let todoChanging = new Todo();

controller.buttonsListeners();
todoChanging.changeIsDone();


document.addEventListener('DOMContentLoaded', function (){
    controller.todoList.refreshPage();
});
