import { v4 as uuidv4 } from 'uuid';
import { getProjects, setProjects } from "./projectStorage.js";
import { getTodos, setTodos } from './todoStorage.js';

class Projects {
	constructor(projectName) {
		if (!new.target) {
			throw Error("You must use the 'new' operator to call the constructor");
		}
		this.projectName = projectName;
	}
}

export function storeProjects(project) {
	const existingProjects = getProjects();
	project.id = uuidv4();
	existingProjects.push(project);
	setProjects(existingProjects);
}

export function addProject(projectName) {
	const project = new Projects(projectName)
	storeProjects(project)
}

export function getProjectIdByName(projectName) {
  const existingProjects = getProjects();

  const project = existingProjects.find(
    (storedProjectItem) => storedProjectItem.projectName === projectName
  );

  return project ? project.id : null;
}

export function getPojectNameByTodo(todo) {
  const existingProjects = getProjects();
  const filteredProjects = existingProjects.filter((storedProject) => storedProject.id === todo.projectId);
  return filteredProjects[0].projectName
}

export function getProjectNameById(projectId) {
  const existingProjects = getProjects()
  const filteredProjects = existingProjects.filter((storedProjectItem) => storedProjectItem.id === projectId)
  return filteredProjects[0].projectName;
}

export function deleteProject(projectId) {
  const existingProjects = getProjects()
  const existingTodos = getTodos();
  const filteredProjects = existingProjects.filter((storedProjectItem) => storedProjectItem.id != projectId)
  const filteredTodos = existingTodos.filter((storedTodos) => storedTodos.projectId != projectId)
  setTodos(filteredTodos)
  setProjects(filteredProjects)
}