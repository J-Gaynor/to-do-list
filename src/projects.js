class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }
}

export function getAllProjects() {
    const stored = localStorage.getItem("projects");
    if (!stored) {
        const defaultProjects = [new Project("default")];
        setProjects(defaultProjects);
        return defaultProjects;
    }
    return JSON.parse(stored);
}

export function setProjects(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
}

export function getProjectByName(name) {
    const projects = getAllProjects();
    return projects.find(project => project.name === name);
}

export function addTaskToProject(projectName, task) {
    const projects = getAllProjects();
    const project = projects.find(p => p.name === projectName);

    if (project) {
        project.tasks.push(task);
        setProjects(projects);
    }
}

export function createProject(name) {
    const projects = getAllProjects();
    const newProject = new Project(name);
    projects.push(newProject);
    setProjects(projects);
}