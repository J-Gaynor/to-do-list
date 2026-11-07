export class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
};

export function createTask(title, description, dueDate, priority, project) {
    const newTask = new Todo(title, description, dueDate, priority);
    return newTask;
}