const ALL_TASK = 0;
const NOT_COMPLETED_TASK = 1;
const COMPLETED_TASK = 2;

class TodoList {
    constructor() {
        this.todos = [];
    }

    addTodo(newTodo) {
        this.todos.push(newTodo);
        let dataPost = JSON.stringify(newTodo);

        fetch(`http://${config.development.host}:${config.development.port}/todos`, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: dataPost
        }).then(res => res.json());
        this.renderList();
    }

    deleteAllTodos() {
        this.todos.length = 0;

        fetch(`http://${config.development.host}:${config.development.port}/todos`, {
            method: 'delete',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: ''
        }).then(res => res.json());

        this.renderList();
    }

    deleteCompletedTodos() {
        for (let i = 0; i < this.todos.length; i++) {
            let arr = this.todos;

            function removeElementByStatus(arr, isDone) {
                return arr.filter(e => e.isDone !== true);
            }

            arr = removeElementByStatus(arr, true);
            this.todos = arr;

            this.renderList();
        }
        fetch(`http://${config.development.host}:${config.development.port}/selected-todos`, {
            method: 'delete',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: ''
        }).then(res => res.json());

        hideButtons();
    }

    showAllTodos() {
        this.renderList();
    }

    showCompletedTodos() {
        this.renderList(COMPLETED_TASK);
    }

    showNotCompletedTodos() {
        this.renderList(NOT_COMPLETED_TASK);
    }

    refreshPage() {
        fetch(`http://${config.development.host}:${config.development.port}/todos`)
            .then(response => response.json())
            .then(json => {
                for (let i = 0; i<json.length; i++) {
                    let data = json[i];
                    this.todos.push(new Todo(data.taskText, data.id, data.isDone));
                    this.renderList(ALL_TASK);
                }
                hideButtons();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    renderList(view = ALL_TASK) {
        // remove all appended todos
        let todos = document.getElementsByClassName('todo-message');
        while (todos.length > 0) todos[0].remove();

        this.todos.forEach(function (current) {
            // add container for new to-do
            let textElement;
            let doneButtonElement;
            switch (view) {

                case ALL_TASK :
                    textElement = document.createElement('div');
                    textElement.classList.add('todo-message');

                    if(current.isDone) {
                        textElement.setAttribute('data-text-decoration','text-decoration');
                    }

                    // append a new to-do into container
                    document.getElementById('todo-block').appendChild(textElement);

                    // add button for change isDone property
                    doneButtonElement = document.createElement('button');
                    doneButtonElement.setAttribute('data-id', current.id);
                    doneButtonElement.classList.add('done-button');
                    doneButtonElement.type = 'button';

                    // add to-do text
                    textElement.innerText = current.taskText;

                    // append button into to-do block
                    textElement.appendChild(doneButtonElement);

                    break;

                case NOT_COMPLETED_TASK :
                    textElement = document.createElement('div');
                    textElement.classList.add('todo-message');

                    if(current.isDone) {
                        textElement.setAttribute('data-text-decoration','text-decoration');
                    }
                    if(!current.isDone) {
                        // append a new to-do into container
                        document.getElementById('todo-block').appendChild(textElement);

                        // add button for change isDone property
                        doneButtonElement = document.createElement('button');
                        doneButtonElement.setAttribute('data-id', current.id);
                        doneButtonElement.classList.add('done-button');
                        doneButtonElement.type = 'button';

                        // add to-do text
                        textElement.innerText = current.taskText;

                        // append button into to-do block
                        textElement.appendChild(doneButtonElement);}

                    break;

                case COMPLETED_TASK :
                    textElement = document.createElement('div');
                    textElement.classList.add('todo-message');

                    if(current.isDone) {
                        textElement.setAttribute('data-text-decoration','text-decoration');
                    }
                    if(current.isDone) {
                        // append a new to-do into container
                        document.getElementById('todo-block').appendChild(textElement);

                        // add button for change isDone property
                        doneButtonElement = document.createElement('button');
                        doneButtonElement.setAttribute('data-id', current.id);
                        doneButtonElement.classList.add('done-button');
                        doneButtonElement.type = 'button';

                        // add to-do text
                        textElement.innerText = current.taskText;

                        // append button into to-do block
                        textElement.appendChild(doneButtonElement);
                    }
                    break;
            }
        });

    };

    findInstanceById(id) {
        return this.todos.find(todo => todo.id == id);
    };

}