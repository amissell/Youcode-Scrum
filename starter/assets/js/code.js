// Element Selection
const buttonAdd = document.getElementById("addtask");
const form = document.getElementById("modal-task");
const returnBtn = document.getElementById("closee");
const cancelBtn = document.getElementById("CancelBtn");
const toDo = document.querySelector("#to-do-tasks");
const saveBtn = document.getElementById("task-save-btn");
const inProgress = document.querySelector("#in-progress-tasks");
const done = document.querySelector("#done-tasks");

// Input Fields
const inputTitle = document.querySelector("#task-title");
const inputDescription = document.getElementById("task-description");
const inputPriority = document.getElementById("task-priority");
const inputType = document.getElementById("typeTask");
const inputStatus = document.getElementById("task-status");
const inputDate = document.getElementById("task-date");

// Button Save, Update, Delete
let tasks = [];
const btnDelete = document.getElementById("task-delete-btn");
const btnUpdate = document.getElementById("task-update-btn");

//Hide Buttons
btnUpdate.style.display = "none";
btnDelete.style.display = "none"; 


// Modal Controls
buttonAdd.addEventListener("click", () => {
    form.classList.remove("modal", "fade");
});
returnBtn.addEventListener("click", () => form.classList.add("modal", "fade"));
cancelBtn.addEventListener("click", () => form.classList.add("modal", "fade"));

// Save Task Function
function saveFunction() {
    const task = {
        title: inputTitle.value,
        date: inputDate.value,
        description: inputDescription.value,
        priority: inputPriority.value,
        type: inputType.value,
        status: inputStatus.value,
        id: Date.now().toString(),
    };

    tasks.push(task);
    createTaskHtml(task);

    console.log(tasks);
    form.classList.add("modal", "fade"); 
  
    // Clear input fields
    inputTitle.value = '';
    inputDate.value = '';
    inputDescription.value = '';
    inputPriority.value = '';
    inputType.value = '';
    inputStatus.value = '';
}

saveBtn.addEventListener("click", saveFunction);

// Create Task HTML
function createTaskHtml(task) {
    const taskContainer = document.createElement("div");
    taskContainer.setAttribute("data-id", task.id);
    
    taskContainer.innerHTML = `
        <div>
            <div>${task.title}</div>
            <div>
                <div>${task.date}</div>
                <div>${task.description}</div>
            </div>
            <div>
                <span>${task.priority}</span>
                <span>${task.type}</span>
            </div>
            <button data-id='${task.id}' type="button" class="btn btn-danger task-action-btn delete-btn">Delete</button>
        </div>
    `;

    if (task.status === "To Do") {
        toDo.appendChild(taskContainer);
    } else if (task.status === "In Progress") {
        inProgress.appendChild(taskContainer);
    } else if (task.status === "Done") {
        done.appendChild(taskContainer);
    }

    // Add delete functionality
    taskContainer.querySelector(".delete-btn").addEventListener("click", function() {
        deleteTask(task.id);
    });
}

// Define deleteTask function to remove the task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    const taskElement = document.querySelector(`[data-id='${taskId}']`);
    if (taskElement) {
        taskElement.remove();
    }
}

