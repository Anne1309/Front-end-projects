const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

const priorityOrder = { "top": 1, "middle": 2, "low": 3 };
let tasks = [];

addTaskButton.addEventListener("click", () => {
    const task = taskInput.value.trim();
    const priority = priorityInput.value;
    const deadline = deadlineInput.value;
    if (task === "" || deadline === "") {
        alert("Please enter a task and select an upcoming deadline.");
        return;
    }

    const selectedDate = new Date(deadline);
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
        alert("Please select an upcoming date for the deadline.");
        return;
    }

    // Add task to the array
    tasks.push({ task, priority, deadline, done: false });
    sortAndRenderTasks();

    // Clear inputs
    taskInput.value = "";
    priorityInput.value = "top";
    deadlineInput.value = "";
});

function sortAndRenderTasks() {
    
    tasks.sort((a, b) => {
        const dateA = new Date(a.deadline);
        const dateB = new Date(b.deadline);
        if (dateA - dateB !== 0) {
            return dateA - dateB;
        } else {
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
    });

    taskList.innerHTML = "";
    tasks.forEach((taskObj, index) => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task");
        if (taskObj.done) {
            taskItem.classList.add("done");
        }

        const taskContent = document.createElement("div");
        taskContent.classList.add("task-content");

        const taskText = document.createElement("span");
        taskText.classList.add("task-text");
        taskText.textContent = taskObj.task;

        const priorityContent = document.createElement("span");
        priorityContent.classList.add("priority-text");
        priorityContent.textContent = `Priority: ${taskObj.priority}`;

        const deadlineContent = document.createElement("span");
        deadlineContent.classList.add("deadline-text");
        deadlineContent.textContent = `Deadline: ${taskObj.deadline}`;

        taskContent.appendChild(taskText);
        taskContent.appendChild(priorityContent);
        taskContent.appendChild(deadlineContent);

        const markDoneButton = document.createElement("button");
        markDoneButton.classList.add("mark-done");
        markDoneButton.textContent = taskObj.done ? "Mark Undone" : "Mark Done";

        markDoneButton.addEventListener("click", () => {
            tasks[index].done = !tasks[index].done;
            sortAndRenderTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-task");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            sortAndRenderTasks();
        });

        taskItem.appendChild(taskContent);
        taskItem.appendChild(markDoneButton);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
}
