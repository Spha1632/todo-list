import "./style.css"
import { sidebar } from "./DOM/sidebar.js";
import { InboxPage } from "./DOM/initialPage.js";

const container = document.querySelector(".container")

sidebar();
InboxPage(container);
