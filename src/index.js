import './styles.css';
import { getAllProjects, addTaskToProject, getProjectByName } from './projects';
import { createTask, deleteTask, changeStatus } from './todo';

function createTaskModal() {
    const dialog = document.createElement("dialog");
    dialog.className = "modal";

    dialog.innerHTML = `
        <form method="dialog">
            <div class="form-element">
            <label for="title"> Title </label>
            <input name="title" id="title" placeholder="Task title" required autofocus>
            </div>
            <div class="form-element">
            <label for="desc"> Description </label>
            <input name="desc" id="desc" placeholder="Description">
            </div>
            <div class="form-element">
            <label for="date"> Due Date </label>
            <input type="date" name="date" id="date">
            </div>
            <div class="form-element">
            <label for="priority"> Priority </label>
            <input name="priority" id="priority" placeholder="Priority">
            </div>
            <div>
            <button value="save">Add</button>
            <button value="cancel" formnovalidate>Cancel</button>
            </div>
        </form>
    `;

    document.body.appendChild(dialog);
    dialog.showModal();

    dialog.addEventListener("close", () => {
        if (dialog.returnValue === "save") {
            const titleInput = dialog.querySelector("input[name='title']");
            const descInput = dialog.querySelector("input[name='desc']");
            const dateInput = dialog.querySelector("input[name='date']");
            const priorityInput = dialog.querySelector("input[name='priority']");

            const title = titleInput ? titleInput.value : "";
            const desc = descInput ? descInput.value : "";
            const date = dateInput ? dateInput.value : "";
            const priority = priorityInput ? priorityInput.value : "";

            const newTask = createTask(title, desc, date, priority, "default");
            addTaskToProject("default", newTask);
            renderTasks("default");
        }
        dialog.remove();
    });
}

function renderTasks(project) {
    const projectObj = getProjectByName(project);
    const projectTasks = projectObj && Array.isArray(projectObj.tasks) ? projectObj.tasks : [];

    document.querySelectorAll(".task-div").forEach(el => el.remove());

    projectTasks.forEach(task => {
        let col = document.querySelector("#to-do-column");
        if (task.status === "in-progress") {
            col = document.querySelector("#in-progress-column");
        } else if (task.status === "complete") {
            col = document.querySelector("#completed-column");
        }
        if (!col) return;

        const taskDiv = document.createElement("div");
        const taskTitle = document.createElement("h3");
        const taskDesc = document.createElement("p");
        const taskDue = document.createElement("p");
        const taskPriority = document.createElement("p");
        const taskShift = document.createElement("div");
        const taskDel = document.createElement("button");
        const leftShift = document.createElement("button");
        const rightShift = document.createElement("button");

        taskDiv.className = "task-div";
        taskTitle.textContent = task.title;
        taskDesc.textContent = task.description;
        taskDue.textContent = task.dueDate;
        taskPriority.textContent = task.priority;

        taskDel.textContent = "X";
        taskDel.className = "del-button";
        taskDel.addEventListener("click", () => {
            deleteTask(task.id, task.project || project);
            renderTasks(project);
        });

        leftShift.textContent = "<";
        leftShift.className = "shift-button";
        leftShift.value = "left";
        leftShift.addEventListener("click", () => {
            changeStatus(leftShift, task);
            renderTasks(project);
        });

        rightShift.textContent = ">";
        rightShift.className = "shift-button";
        rightShift.value = "right";
        rightShift.addEventListener("click", () => {
            changeStatus(rightShift, task);
            renderTasks(project);
        });

        taskShift.appendChild(taskDel);
        taskShift.appendChild(leftShift);
        taskShift.appendChild(rightShift);
        taskDiv.appendChild(taskTitle);
        taskDiv.appendChild(taskDesc);
        taskDiv.appendChild(taskDue);
        taskDiv.appendChild(taskPriority);
        taskDiv.appendChild(taskShift);

        const newTaskBtn = col.querySelector(".new-task-btn");
        if (newTaskBtn) {
            col.insertBefore(taskDiv, newTaskBtn);
        } else {
            col.appendChild(taskDiv);
        }
    });
}

(() => {
    getAllProjects();

    const headerNewTaskBtn = document.querySelector("#new-task");
    if (headerNewTaskBtn) {
        headerNewTaskBtn.addEventListener("click", createTaskModal);
    }

    const mainColumns = document.querySelectorAll(".main-column");
    for (let i = 0; i < mainColumns.length; i++) {
        let newTaskBtn = document.createElement("button");
        newTaskBtn.className = "btn new-task-btn";
        newTaskBtn.textContent = "+";
        newTaskBtn.addEventListener("click", createTaskModal);
        mainColumns[i].appendChild(newTaskBtn);
    }

    renderTasks("default");
})();