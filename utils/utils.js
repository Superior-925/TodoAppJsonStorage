function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

//delete selected to-do and hide buttons if not have todos after tap deleteSelectedButton

let deleteCompletedButton = document.getElementById('delete-completed-button');
let deleteAllButton = document.getElementById('delete-all-button');
let showAllTodosButton = document.getElementById('show-all-todos-button');
let showCompletedTodosButton = document.getElementById('show-completed-todos-button');
let showNotCompletedTodosButton = document.getElementById('show-not-completed-todos-button');

function hideButtons() {
    if (controller.todoList.todos.length == 0) {
        deleteCompletedButton.setAttribute('button-display', 'display-none');
        deleteAllButton.setAttribute('button-display', 'display-none');
        showAllTodosButton.setAttribute('button-display', 'display-none');
        showCompletedTodosButton.setAttribute('button-display', 'display-none');
        showNotCompletedTodosButton.setAttribute('button-display', 'display-none');
    }
}

//----------------------------------------

// show / hide buttons depending on the state of todos array or
// add todos after refresh the page

function showHideButtons() {
    if (controller.todoList.todos.length == 0) {
        deleteCompletedButton.setAttribute('button-display', 'display-none');
        deleteAllButton.setAttribute('button-display', 'display-none');
        showAllTodosButton.setAttribute('button-display', 'display-none');
        showCompletedTodosButton.setAttribute('button-display', 'display-none');
        showNotCompletedTodosButton.setAttribute('button-display', 'display-none');
    }
    else {
        deleteCompletedButton.removeAttribute('button-display');
        deleteAllButton.removeAttribute('button-display');
        showAllTodosButton.removeAttribute('button-display');
        showCompletedTodosButton.removeAttribute('button-display');
        showNotCompletedTodosButton.removeAttribute('button-display');
    }
}

//-----------------create drag and drop of elements

let divOfTask = document.getElementById('todo-block');
divOfTask.addEventListener('click', function() {

    // Query the list element
    const list = document.getElementById('todo-block');

    let draggingEle;
    let placeholder;
    let isDraggingStarted = false;

    // The current position of mouse relative to the dragging element
    let x = 0;
    let y = 0;

    // Swap two nodes
    const swap = function(nodeA, nodeB) {
        const parentA = nodeA.parentNode;
        const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

        // Move `nodeA` to before the `nodeB`
        nodeB.parentNode.insertBefore(nodeA, nodeB);

        // Move `nodeB` to before the sibling of `nodeA`
        parentA.insertBefore(nodeB, siblingA);
    };

    // Check if `nodeA` is above `nodeB`
    const isAbove = function(nodeA, nodeB) {
        // Get the bounding rectangle of nodes
        const rectA = nodeA.getBoundingClientRect();
        const rectB = nodeB.getBoundingClientRect();

        return (rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2);
    };

    const mouseDownHandler = function(e) {
        draggingEle = e.target;

        // Calculate the mouse position
        const rect = draggingEle.getBoundingClientRect();
        x = e.pageX - rect.left;
        y = e.pageY - rect.top;

        // Attach the listeners to `document`
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function(e) {
        const draggingRect = draggingEle.getBoundingClientRect();

        if (!isDraggingStarted) {
            isDraggingStarted = true;

            // Let the placeholder take the height of dragging element
            // So the next element won't move up
            placeholder = document.createElement('div');
            placeholder.classList.add('placeholder');
            draggingEle.parentNode.insertBefore(placeholder, draggingEle.nextSibling);
            placeholder.style.height = `${draggingRect.height}px`;
        }

        // Set position for dragging element
        draggingEle.style.position = 'absolute';
        draggingEle.style.top = `${e.pageY - y}px`;
        draggingEle.style.left = `${e.pageX - x}px`;

        // The current order
        // prevEle
        // draggingEle
        // placeholder
        // nextEle
        const prevEle = draggingEle.previousElementSibling;
        const nextEle = placeholder.nextElementSibling;

        // The dragging element is above the previous element
        // User moves the dragging element to the top
        if (prevEle && isAbove(draggingEle, prevEle)) {
            // The current order    -> The new order
            // prevEle              -> placeholder
            // draggingEle          -> draggingEle
            // placeholder          -> prevEle
            swap(placeholder, draggingEle);
            swap(placeholder, prevEle);
            return;
        }

        // The dragging element is below the next element
        // User moves the dragging element to the bottom
        if (nextEle && isAbove(nextEle, draggingEle)) {
            // The current order    -> The new order
            // draggingEle          -> nextEle
            // placeholder          -> placeholder
            // nextEle              -> draggingEle
            swap(nextEle, placeholder);
            swap(nextEle, draggingEle);
        }
    };

    const mouseUpHandler = function() {
        // Remove the placeholder
        placeholder && placeholder.parentNode.removeChild(placeholder);

        draggingEle.style.removeProperty('top');
        draggingEle.style.removeProperty('left');
        draggingEle.style.removeProperty('position');

        x = null;
        y = null;
        draggingEle = null;
        isDraggingStarted = false;

        // Remove the handlers of `mousemove` and `mouseup`
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    // Query all items
    [].slice.call(list.querySelectorAll('.todo-message')).forEach(function(item) {
        item.addEventListener('mousedown', mouseDownHandler);
    });
});
