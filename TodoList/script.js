const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const errorMessage = document.getElementById("errorMessage");
const clearCompleted = document.getElementById("clearCompleted");
const filterButtons = document.querySelectorAll(".filter-btn");

// Load saved tasks from Local Storage
let tasks = [];

try {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (!Array.isArray(tasks)) {
        tasks = [];
    }
} catch (error) {
    tasks = [];
}

// Default filter
let currentFilter = "all";

// Save tasks to Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();

    // Validate input
    if (taskText === "") {
        errorMessage.textContent = "Please enter a task!";
        return;
    }

    errorMessage.textContent = "";

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    // Save tasks
    saveTasks();

    taskInput.value = "";

    displayTasks();
}

// Display tasks
function displayTasks() {
    taskList.innerHTML = "";

    // Filter tasks
    const filteredTasks = tasks.filter(function(task) {
        if (currentFilter === "active") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

        return true;
    });

    // Create each task
    filteredTasks.forEach(function(task) {
        const li = document.createElement("li");

        li.className = "list-group-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        // Checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function() {
            task.completed = checkbox.checked;

            saveTasks();
            displayTasks();
        });

        // Task text
        const span = document.createElement("span");

        span.className = "task-text";
        span.textContent = task.text;

        // Delete button
        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";
        deleteBtn.className = "btn btn-sm btn-danger";

        deleteBtn.addEventListener("click", function() {
            tasks = tasks.filter(function(item) {
                return item.id !== task.id;
            });

            saveTasks();
            displayTasks();
        });

        // Add elements to list item
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    // Count incomplete tasks
    const remaining = tasks.filter(function(task) {
        return !task.completed;
    }).length;

    taskCount.textContent = remaining;

    // Highlight selected filter
    updateFilterButtons();
}

// Update filter button colors
function updateFilterButtons() {
    filterButtons.forEach(function(button) {
        if (button.dataset.filter === currentFilter) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });
}

// Add task when Add Task button is clicked
addBtn.addEventListener("click", addTask);

// Add task when Enter key is pressed
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Clear error message when typing
taskInput.addEventListener("input", function() {
    errorMessage.textContent = "";
});

// Filter buttons
filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        currentFilter = button.dataset.filter;

        displayTasks();
    });
});

// Clear completed tasks
clearCompleted.addEventListener("click", function() {
    tasks = tasks.filter(function(task) {
        return !task.completed;
    });

    saveTasks();
    displayTasks();
});

// Display saved tasks and selected filter on page load
displayTasks();
