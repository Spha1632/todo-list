import { getProjects } from "../modules/projectStorage.js";
import { getTodoById } from "../modules/todo.js";
import { createTodoElement } from "./layout.js";

export function renderForm(ele) {

  const titleInput = document.createElement("input");
  titleInput.placeholder = "Title"
  titleInput.id = "title"
  titleInput.required = true;
  titleInput.type = "text"

  const descriptionInput = document.createElement("input");
  descriptionInput.placeholder = "Description"
  descriptionInput.id = "description"
  descriptionInput.required = true
  descriptionInput.type = "text"

  const duedateInput = document.createElement("input");
  duedateInput.id = "due-date"
  duedateInput.required = true;
  duedateInput.type = "date"

  const projectsInput = document.createElement("select")
  projectsInput.id = "projects"
  handleProjectsDropdown(projectsInput)

  const priorityArr = ["low", "medium", "high"]
  const priorityInput = priorityElementCreator(priorityArr, "priority");
  priorityInput.id = "priorities"

  const flexWrapper = document.createElement("div");
  flexWrapper.classList.add("flex");
  flexWrapper.append(projectsInput, duedateInput, priorityInput);

  const wrapper = document.createElement("div");

  const submitBtn = document.createElement("button")
  submitBtn.type = "submit"
  submitBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><title>check-circle</title> <path fill="currentColor" fill-rule="evenodd" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" /></svg>';

  const cancelBtn = document.createElement("button")
  cancelBtn.type = "button";
  handleCancelAddForm(cancelBtn);
  cancelBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"> <title>cancel</title> <path fill="currentColor" fill-rule="evenodd" d="M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z" /> </svg>';

  const buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add("buttons");
  buttonWrapper.append(submitBtn, cancelBtn);

  wrapper.append(flexWrapper, buttonWrapper);

  ele.append(
    titleInput,
    descriptionInput,
    wrapper
  )
}

export function editForm(ele, todo) {

  const titleInput = document.createElement("input");
  titleInput.placeholder = "Title"
  titleInput.id = "title"
  titleInput.required = true
  titleInput.value = todo.title
  titleInput.type = "text"

  const descriptionInput = document.createElement("input");
  descriptionInput.placeholder = "Description"
  descriptionInput.id = "description"
  descriptionInput.required = true
  descriptionInput.value = todo.description
  descriptionInput.type = "text"

  const duedateInput = document.createElement("input");
  duedateInput.id = "due-date"
  duedateInput.required = true
  duedateInput.value = todo.dueDate
  duedateInput.type = "date"

  const projectsInput = document.createElement("select")
  projectsInput.id = "projects"
  handleProjectsDropdown(projectsInput, todo.projectId)

  const priorityArr = ["low", "medium", "high"]
  const priorityInput = priorityElementCreator(priorityArr, "priority", todo.priority);
  priorityInput.id = "priorities"

  const flexWrapper = document.createElement("div");
  flexWrapper.classList.add("flex");
  flexWrapper.append(projectsInput, duedateInput, priorityInput);

  const wrapper = document.createElement("div");

  const submitBtn = document.createElement("button")
  submitBtn.type = "submit"
  submitBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"> <title>check-circle</title> <path fill="currentColor" fill-rule="evenodd"  d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" /> </svg>';

  const cancelBtn = document.createElement("button")
  cancelBtn.type = "button";
  handleCancelEditForm(cancelBtn, todo.id);
  cancelBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"> <title>cancel</title> <path fill="currentColor" fill-rule="evenodd" d="M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z" /> </svg>';

  const buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add("buttons");
  buttonWrapper.append(submitBtn, cancelBtn);

  wrapper.append(flexWrapper, buttonWrapper);

  ele.append(
    titleInput,
    descriptionInput,
    wrapper
  )
}

function priorityElementCreator(priorities, id, selectedPriority) {
  const createElement = document.createElement("select");
  createElement.id = id;

  priorities.forEach(priority => {
    const option = document.createElement("option")
    option.value = priority;
    option.id = priority
    if (priority === selectedPriority) {
      option.selected = true
    }
    option.textContent = priority;
    createElement.appendChild(option)
  })

  return createElement;
}

function handleCancelAddForm(button) {
  button.addEventListener("click", () => {
    const activeForm = document.querySelector(".form.show");
    activeForm.classList.remove("show")
    activeForm.reset()
  })
}

function handleCancelEditForm(button, todoId) {
  button.addEventListener("click", () => {
    const todoItem = document.getElementById(todoId);
    const todo = getTodoById(todoId);
    todoItem.replaceWith(createTodoElement(todo));
  });
}

function handleProjectsDropdown(ele, selectedProject) {
  const projects = getProjects()

  projects.forEach((project) => {
    const projectOption = document.createElement("option");
    projectOption.value = project.id;
    projectOption.textContent = project.projectName;

    if (project.id === selectedProject) {
      projectOption.selected = true;
    }

    ele.append(projectOption)
  })
}
