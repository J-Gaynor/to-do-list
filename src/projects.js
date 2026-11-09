export class Project {
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
    try {
        const parsed = JSON.parse(stored);
        if (!Array.isArray(parsed) || parsed.length === 0 || !parsed[0].name) {
            const defaultProjects = [new Project("default")];
            setProjects(defaultProjects);
            return defaultProjects;
        }
        return parsed;
    } catch {
        const defaultProjects = [new Project("default")];
        setProjects(defaultProjects);
        return defaultProjects;
    }
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
    let project = projects.find(p => p.name === projectName);

    if (!project) {
        project = new Project(projectName);
        projects.push(project);
    }

    project.tasks.push(task);
    setProjects(projects);
}

export function createProject(name) {
    const projects = getAllProjects();
    const newProject = new Project(name);
    projects.push(newProject);
    setProjects(projects);
}