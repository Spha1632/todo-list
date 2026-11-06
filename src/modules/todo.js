import { getProjectIdByName } from "./projects.js";
import { setTodos, getTodos } from "./todoStorage.js";
import { v4 as uuidv4 } from 'uuid';

class TodoList {
	constructor(title, description, dueDate, priority, projectId) {
		if (!new.target) {
			throw Error("You must use the 'new' operator to call the constructor");
		}
		this.title = title;
		this.description = description;
		this.projectId = projectId;
		this.dueDate = dueDate;
		this.priority = priority;
		this.checklist = false;
	}
}

export function getTodoByProjectName(projectName) {
  const existingTodo = getTodos();
	const projectId = getProjectIdByName(projectName);
  const todosByProject = existingTodo.filter(storedTodo => storedTodo.projectId === projectId)
  return todosByProject;
}

export function getTodoById(id) {
  const existingTodo = getTodos();
  const filteredTodos = existingTodo.filter(storedTodo => storedTodo.id === id)
  return filteredTodos[0]
}

export function storeTodos(todoItem) {
	const existingTodo = getTodos();
	todoItem.id = uuidv4();
	existingTodo.push(todoItem);
	setTodos(existingTodo);
}

export function addTodo(title , description, dueDate, priority, projectId) {
	const todo = new TodoList(title, description, dueDate, priority, projectId)
	return storeTodos(todo)
}

export function editTodo(todoItem) {
	const existingTodo = getTodos();
	const filteredTodos = existingTodo.filter((storedTodoItem) => storedTodoItem.id != todoItem.id)
	return setTodos([todoItem, ...filteredTodos])
}

export function deleteTodos(todoId) {
	const existingTodo = getTodos()
	const filteredTodos = existingTodo.filter((storedTodoItem) => storedTodoItem.id != todoId)
	return setTodos(filteredTodos)
}

