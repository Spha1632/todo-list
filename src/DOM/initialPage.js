import { getTodoByProjectName } from "../modules/todo.js";
import { layout } from "./layout.js";

export function InboxPage() {
  
  const todos = getTodoByProjectName("Default");
  layout("Default", todos)

}

