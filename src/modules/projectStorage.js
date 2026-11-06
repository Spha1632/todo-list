export function getProjects() {
  return JSON.parse(localStorage.getItem("projects")) || [];
}

export function setProjects(projectsArr) {
  localStorage.setItem("projects", JSON.stringify(projectsArr))
}

