export function getTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

export function setTodos(todoArr) {
  localStorage.setItem("todos", JSON.stringify(todoArr))
}

