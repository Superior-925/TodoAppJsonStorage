class Todo {
    constructor(taskText, id, isDone) {
        this.taskText = taskText;
        this.id = id;
        this.isDone = isDone;
    };

    changeIsDone() {
        // changing 'isDone' value
        document.addEventListener('click',function(e){
            if(!e.target || e.target.className !== 'done-button') {
                return;
            }

            let id = e.target.getAttribute('data-id'); // get id of clicked element

            let currentTodo = controller.todoList.findInstanceById(id);
            currentTodo.isDone = !currentTodo.isDone;

            fetch(`http://${config.development.host}:${config.development.port}/isDone`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'id': id})
            });

            controller.todoList.renderList();
            e.stopPropagation();
        });
    }
}

