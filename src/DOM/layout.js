import { getPojectNameByTodo, getProjectNameById } from "../modules/projects.js";
import { addTodo, deleteTodos, editTodo, getTodoById, getTodoByProjectName } from "../modules/todo.js";
import { projectsPage } from "./projectsPage.js";
import { editForm, renderForm } from "./todoForm.js";
import { formatDistance } from "date-fns";

export function layout(headingText, todos) {

  const container = document.querySelector(".container");
  container.textContent = "";

  const heading = document.createElement("h1");
  heading.classList.add("heading");
  heading.textContent = headingText

  const form = document.createElement("form")
  form.classList.add("form", "add-new")
  handleAddNewSave(form)
  renderForm(form)

  const todoItems = document.createElement("div")
  todoItems.classList.add("todo-items")
  displayTodos(todos, todoItems)

  container.append(heading, form, todoItems)

}

function displayTodos(todos, ele) {

  ele.textContent = "";

  if (todos.length <= 0) {

    const emptyPage = createEmptyPage()
    
    ele.append(emptyPage)
  } else {
    
    todos.forEach(todo => {
    const todoItem = createTodoElement(todo)
    if (todo.checklist === true) {
      todoItem.classList.add("completed")
    }
    ele.append(todoItem)
  });
  }
}

function createEmptyPage() {
  const emptyTask = document.createElement("div")
    emptyTask.classList.add("no-task");

    const emptyTaskHeading = document.createElement("h2")
    emptyTaskHeading.textContent = "Your Project Is Empty"

    const emptyTaskText = document.createElement("p");
    emptyTaskText.textContent = "Click add new todo to add a Task ";

    emptyTask.append(emptyTaskHeading, emptyTaskText)

    return emptyTask

}

export function createTodoElement(todo) {

  const priorities = {
    low: "green",
    medium: "orange",
    high: "red"
  }

  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");
  todoItem.id = todo.id;

  const priority = document.createElement("div");
  priority.style.borderLeftColor = priorities[todo.priority]
  priority.classList.add("priority");

  const completed = document.createElement("input")
  completed.type = "checkbox"
  handleCheckboxClick(completed, todo)
  completed.checked = todo.checklist
  completed.classList.add("checkbox")

  const details = document.createElement("div");
  details.classList.add("details");

  const title = document.createElement("div")
  title.classList.add("title")
  title.textContent = todo.title;

  const description = document.createElement("div")
  description.classList.add("description")
  description.textContent = todo.description;

  const dueDate = document.createElement("div")
  dueDate.classList.add("due-date")
  dueDate.textContent = handleDateDisplay(todo.dueDate)

  details.append(title, description, dueDate);

  const wrapper = document.createElement("div");
  wrapper.append(priority, completed, details)

  const buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add("buttons");

  const editBtn = document.createElement("button")
  editBtn.dataset.todoId = todo.id
  handleEditClick(editBtn)
  editBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24"> <title>square-edit-outline</title> <path fill="currentColor" fill-rule="evenodd" d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" /> </svg>'
  const deleteBtn = document.createElement("button")
  deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24"> <title>trash-can-outline</title> <path fill="currentColor" fill-rule="evenodd" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /> </svg>'
  deleteBtn.dataset.todoId = todo.id
  handleDelete(deleteBtn)
  buttonWrapper.append(editBtn, deleteBtn)

  todoItem.append(wrapper, buttonWrapper)

  return todoItem;
}

function handleEditClick(button) {

  button.addEventListener("click", (e) => {

    const id = e.currentTarget.dataset.todoId
    const todo = getTodoById(id)

    const activeForms = document.querySelectorAll(".active")
    activeForms.forEach((activeForm) => {
      activeForm.classList.remove("active");
      activeForm.classList.add("todo-item");
      activeForm.textContent = ""
      const todoItem = createTodoElement(getTodoById(activeForm.id))
      activeForm.replaceWith(todoItem)
    })

    const todoItem = document.getElementById(`${id}`)
    todoItem.classList.remove("todo-item")
    todoItem.classList.add("active")
    todoItem.textContent = "";

    const form = document.createElement("form")
    form.classList.add("form", "edit-form")
    editForm(form, todo)
    handleEditSave(form)

    todoItem.append(form)
  })
}

function handleEditSave(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector(".edit-form #title").value
    const description = document.querySelector(".edit-form #description").value
    const dueDate = document.querySelector(".edit-form #due-date").value
    const priority = document.querySelector(".edit-form #priorities").value
    const project = document.querySelector(".edit-form #projects").value;
    const todoId = document.querySelector(".active").id;
    const checklist = getTodoById(todoId)

    editTodo({id: todoId, projectId: project, dueDate, description, title, checklist: checklist.checklist, priority})

    const projectName = getProjectNameById(project)
    const todos = getTodoByProjectName(projectName)
    
    projectsPage(projectName, todos)
  })
}

function handleAddNewSave(form) {
  form.addEventListener("submit", (e) => {

    e.preventDefault()

    const title = document.querySelector(".add-new #title").value
    const description = document.querySelector(".add-new #description").value
    const dueDate = document.querySelector(".add-new #due-date").value
    const priority = document.querySelector(".add-new #priorities").value
    const projectId = document.querySelector(".add-new #projects").value;

    addTodo(title , description, dueDate, priority, projectId)

    const projectName = getProjectNameById(projectId)
    const todos = getTodoByProjectName(projectName)

    projectsPage(projectName, todos)

  })
}

function handleDelete(button) {
  button.addEventListener("click", () => {
    const todoId = button.dataset.todoId

    const todo = getTodoById(todoId)
    const projectName = getPojectNameByTodo(todo)
    const todos = getTodoByProjectName(projectName)

    deleteTodos(todoId)
    projectsPage(projectName, todos)
    
  })
}

function handleCheckboxClick(checkbox, todo) {
  checkbox.addEventListener("click", () => {
    todo.checklist = checkbox.checked

    editTodo(todo)

    const projectName = getProjectNameById(todo.projectId)
    const todos = getTodoByProjectName(projectName)
    
    projectsPage(projectName, todos)
  })
}

function handleDateDisplay(date) {
  const result = formatDistance(date, new Date(), {
    addSuffix: true
  })

  return result
}