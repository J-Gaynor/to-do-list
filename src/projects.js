class Project {
    constructor(name, tasks) {
        this.name = name;
        this.task = tasks;
    }
}

export function getProjects() {
    let projects;
    if (!localStorage.getItem("projects")) {
        localStorage.setItem("projects", [new Project("default")]);
    }
    projects = localStorage.getItem("projects");
    return projects;
}