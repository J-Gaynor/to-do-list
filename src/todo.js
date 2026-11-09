import { getAllProjects, setProjects } from './projects';

export class Todo {
    constructor(title, description, dueDate, priority, project = "default") {
        this.id = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
        this.title = title;
        this.description = description;
        this.status = "to-do";
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }
}

export function createTask(title, description, dueDate, priority, project = "default") {
    const newTask = new Todo(title, description, dueDate, priority, project);
    return newTask;
}

export function deleteTask(id, projectName) {
    const projects = getAllProjects();
    const targetProject = projects.find(p => p.name === projectName);
    if (targetProject && Array.isArray(targetProject.tasks)) {
        targetProject.tasks = targetProject.tasks.filter(task => task.id !== id);
        setProjects(projects);
    }
}

export function changeStatus(shifter, task) {
    const direction = typeof shifter === "string" ? shifter : shifter?.value;
    if (direction === "left") {
        switch (task.status) {
            case "in-progress":
                task.status = "to-do";
                break;
            case "complete":
                task.status = "in-progress";
                break;
            default:
                break;
        }
    } else {
        switch (task.status) {
            case "to-do":
                task.status = "in-progress";
                break;
            case "in-progress":
                task.status = "complete";
                break;
            default:
                break;
        }
    }

    const projects = getAllProjects();
    const targetProject = projects.find(p => p.name === task.project);
    if (targetProject && Array.isArray(targetProject.tasks)) {
        const existing = targetProject.tasks.find(t => t.id === task.id);
        if (existing) {
            existing.status = task.status;
            setProjects(projects);
        }
    }
}