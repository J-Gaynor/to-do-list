import './styles.css';
import { getAllProjects, addTaskToProject } from './projects';
import { createTask } from './todo';

function createTaskModal() {
    const dialog = document.createElement("dialog");
    dialog.className = "modal";

    dialog.innerHTML = `
        <form method="dialog">
            <div class="form-element">
            <label for="title"> Title </label>
            <input name="title" placeholder="Task title" required autofocus>
            </div>
            <div class="form-element">
            <label for="desc"> Description </label>
            <input name="desc" placeholder="Description">
            </div>
            <div class="form-element">
            <label for="date"> Due Date </label>
            <input type="date" name="date">
            </div>
            <div class="form-element">
            <label for="priority"> Priority </label>
            <input type="radio name="priority">
            </div>
            <div>
            <button value="save">Add</button>
            <button value="cancel">Cancel</button>
            </div>
        </form>
    `;

    document.body.appendChild(dialog);
    dialog.showModal();

    dialog.addEventListener("close", () => {
        if (dialog.returnValue === "save") {
            const title = dialog.querySelector("input").value;
            const newTask = createTask(title);
            addTaskToProject("default", newTask)
        }
        dialog.remove();
    })
}

(() => {
    const projects = getAllProjects();
    console.log(projects);

    const mainColumns = document.querySelectorAll(".main-column");

    for (let i = 0; i < mainColumns.length; i++) {
        let newTaskBtn = document.createElement("button");
        newTaskBtn.className = "btn new-task-btn";
        newTaskBtn.textContent = "+";
        mainColumns[i].appendChild(newTaskBtn);

        newTaskBtn.addEventListener("click", createTaskModal);
    }
})();