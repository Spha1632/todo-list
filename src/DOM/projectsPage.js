import { getTodoByProjectName } from "../modules/todo.js";
import { layout } from "./layout.js";

export function projectsPage(projectName) {
  
  const todos = getTodoByProjectName(projectName);
  layout(projectName, todos)

}

