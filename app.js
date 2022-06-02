//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById("main-box__input-add"),   //Add a new task.
      addButton = document.querySelector(".main-box__btn-add"),     //first button
      incompleteTaskHolder = document.querySelector(".main-box__todo-list"),  //ul of #main__tasks_todo-list
      completedTasksHolder = document.querySelector(".main-box__closed-list");//main__tasks_completed-list

//New task list item
const createNewTaskElement = function (taskString) {
    const listItem = document.createElement("li");
    listItem.classList = "main-box__list-item main-box__open-mode";

    //input (checkbox)
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList = "main-box__check-box";

    //label
    const label = document.createElement("label");
    label.className = "main-box__label-task";
    label.innerText = taskString;

    //input (text)
    const editInput = document.createElement("input");
    editInput.className = "main-box__task main-box__input-text";
    editInput.type = "text";

    //button.edit
    const editButton = document.createElement("button");
    editButton.className = "main-box__btn-edit main-box__btn";
    editButton.innerText = "Edit";

    //button.delete
    const deleteButton = document.createElement("button");
    deleteButton.className = "main-box__btn-delete main-box__btn";

    const deleteButtonImg = document.createElement("img");
    deleteButtonImg.src = './remove.svg';
    deleteButton.appendChild(deleteButtonImg);

    [checkBox, label, editInput, editButton, deleteButton].forEach(el => {
        listItem.appendChild(el);
    });
    return listItem;
}

const addTask = function () {
    console.log("Add Task...");
    //Create a new list item with the text from the #main__tasks_add:
    if (!taskInput.value) return;
    const listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";
}

//Edit an existing task.
const editTask = function () {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    const listItem = this.parentNode;

    const editInput = listItem.querySelector('.main-box__input-text');
    const label = listItem.querySelector(".main-box__label-task");
    const editBtn = listItem.querySelector(".main-box__btn-edit");
    const containsClass = listItem.classList.contains("main-box__edit-mode");

    //If class of the parent is .edit-mode
    if(containsClass){
        //switch to .edit-mode
        //label becomes the inputs value.
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    }else{
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    //toggle .edit-mode on the parent.
    listItem.classList.toggle("main-box__edit-mode");
}

//Delete task.
const deleteTask = function () {
    console.log("Delete Task...");

    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);
}

//Mark task completed
const taskCompleted = function(){
    console.log("Complete Task...");

    //Append the task list item to the #main__tasks_completed-list
    const listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function () {
    console.log("Incomplete Task...");
    //Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #main__tasks_todo-list.
    const listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

const ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


const bindTaskEvents = function(taskListItem, checkBoxEventHandler){
    console.log("bind list item events");

    //select ListItems children
    const checkBox = taskListItem.querySelector(".main-box__check-box");
    const editButton = taskListItem.querySelector(".main-box__btn-edit");
    const deleteButton = taskListItem.querySelector(".main-box__btn-delete");

    //Bind editTask to edit button.
    editButton.onclick = editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++){
    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.