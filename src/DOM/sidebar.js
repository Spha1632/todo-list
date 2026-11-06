import { addProject, deleteProject, getProjectIdByName } from "../modules/projects.js";
import { getProjects, setProjects } from "../modules/projectStorage.js";
import { getTodoByProjectName } from "../modules/todo.js";
import { createAddTodoBtn } from "./addNewTodoBtn.js";
import { projectsPage } from "./projectsPage.js";
import { v4 as uuidv4 } from 'uuid';

export function sidebar() {

  const sidebarNav = document.querySelector(".sidebar");

  const logo = document.createElement("div");
  logo.classList.add("logo");
  logo.textContent = "ODIN-TODO";

  const addNewbtn = document.createElement("div");
  addNewbtn.classList.add("add-todo")
  handleAddNew(addNewbtn)
  createAddTodoBtn(addNewbtn);

  const todoItems = document.createElement("ul");
  todoItems.classList.add("todo-items");
  createNavItems(todoItems)

  const projectsWrapper = document.createElement("div")
  projectsWrapper.classList.add("projects");

  const projectsHeading = document.createElement("div");
  projectsHeading.classList.add("projects-heading");
  const projectsHeadingText = document.createElement("span");
  const projectsHeadingIcon = document.createElement("span");
  projectsHeadingIcon.classList.add("projects-heading-icon")
  projectsHeadingText.textContent = "Projects"
  projectsHeadingIcon.textContent = "+"
  handleProjectAddClick(projectsHeadingIcon)
  projectsHeading.append(projectsHeadingText, projectsHeadingIcon)


  const projects = document.createElement("ul");
  getProjectItems(projects);
  projectsWrapper.append(projectsHeading, projects)

  sidebarNav.append(logo, addNewbtn, todoItems, projectsWrapper);
}

function createNavItems(todoItems) {
  const navigationDetails = [
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24"><title>inbox</title><path fill="currentColor" fill-rule="evenodd" d="M19,15H15A3,3 0 0,1 12,18A3,3 0 0,1 9,15H5V5H19M19,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" /></svg>',
      text: "Inbox",
      projectName: "Default",
      id: "41066c2a-0f8b-422b-96bc-0e88c68a1ef4"
    }
  ]

  const project = getProjectIdByName("Default")
  if (project === null) {
    setProjects([{id: "41066c2a-0f8b-422b-96bc-0e88c68a1ef4", projectName: "Default"}])
  }
  
  navigationDetails.forEach((navItems) => {

    
    const navItem = document.createElement("li")
    navItem.id = navItems.id;
    navItem.dataset.projectName = navItems.projectName
    const navIcon = document.createElement("span")
    navIcon.innerHTML = navItems.icon
    const navText = document.createElement("span")
    navText.textContent = navItems.text

    navItem.append(navIcon, navText)
    
    handleProjectClick(navItem)
    todoItems.append(navItem)

  })
}

function getProjectItems(projectsList) {
  const projectItems = getProjects()
  projectItems.forEach((project) => {
    if (project.projectName != "Default") {

      const projectItem = document.createElement("li");
      projectItem.id = project.id
      projectItem.dataset.projectName = project.projectName
      projectItem.classList.add("project-item")
      handleProjectClick(projectItem)

      const projectItemText = document.createElement("span")
      projectItemText.classList.add("project-text")
      projectItemText.textContent = project.projectName

      const projectItemIcon = document.createElement("span")
      projectItemIcon.classList.add("project-icon")
      projectItemIcon.textContent = "x"
      handleProjectDelete(projectItemIcon)
      projectItemIcon.dataset.projectId = project.id
      
      projectItem.append(projectItemText, projectItemIcon)
      projectsList.append(projectItem)
    }
  })
}

function handleProjectClick(ele) {
  ele.addEventListener("click", () => {
    const projectName = ele.dataset.projectName
    if (projectName != undefined && projectsPage != null) {
      projectsPage(projectName)
    }
  })
}

function handleAddNew(button) {
  button.addEventListener("click", () => {
    const addForm = document.querySelector(".form");
    addForm.classList.add("show")
  })
}

function handleProjectAddClick(button) {
  button.addEventListener("click", () => {

    const formActive = document.querySelector(".add-new-project");

    if (formActive === null) {
      const form = document.createElement("form");
      handleAddProjectSubmit(form)
      form.classList.add("add-new-project")
      const projectInput = document.createElement("input");
      projectInput.focus();
      projectInput.required = true;
      projectInput.classList.add("projects-input")
      projectInput.placeholder = "Enter project name";
      const projectsIcon = document.createElement("button");
      projectsIcon.type = "submit"
      projectsIcon.classList.add("projects-icon")
      projectsIcon.innerHTML = "&check;";
      form.append(projectInput, projectsIcon);

      const projectsHeading = document.querySelector(".projects-heading");
      projectsHeading.after(form)
    }
  })
}

function handleAddProjectSubmit(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault()

    const page = "Default"
    const projectName = document.querySelector(".projects-input").value;

    if (projectName.toLowerCase() != page.toLowerCase()) {
      const todos = getTodoByProjectName(projectName);;

      addProject(projectName)
      form.remove();

      const oldProjectsList = document.querySelector(".projects ul");
      const newProjectsList = document.createElement("ul");
      getProjectItems(newProjectsList)
      oldProjectsList.replaceWith(newProjectsList);

      projectsPage(projectName, todos)
    }
  })
}

function handleProjectDelete(button) {
  button.addEventListener("click", (e) => {
    e.stopPropagation();

    const page = "Default";
    const id = button.dataset.projectId;

    deleteProject(id);

    const projectItem = document.getElementById(id);
    projectItem.remove();

    projectsPage(page);
  });
}