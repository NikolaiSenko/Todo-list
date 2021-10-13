import { createHeader, createMain, createCard } from "./templates.js";
import { setStorageData, getStorageData } from "./localStorageApi.js";
import { Todo } from "./Todo.js";

document.addEventListener("DOMContentLoaded", app());

//APP
function app() {
  getStorageData();
  const root = document.getElementById("root");
  root.className = "box-border w-11/12 md:w-3/4 lg:w-3/5 mx-auto py-4";
  const header = createHeader();
  header.addEventListener("click", onHeader);
  header.addEventListener("input", onSearchInput);
  const main = createMain();
  root.append(header, main);

  renderTodos();
}
//render
function renderTodos() {
  const main = document.querySelector("main");
  main.innerHTML = "";
  getStorageData().forEach((todo) => {
    const card = createCard(todo);
    card.addEventListener("click", onCard);
    main.append(card);
  });
  showAllTodos();
  showCompletedTodos();
}
//Event Listeners
function onHeader(event) {
  const { target } = event;
  if (target.id === "delete-btn") onDeleteAll();
  else if (target.id === "add-btn") onAddBtn(event);
  else if (target.id === "delete_last-btn") onDeleteLast();
  else if (target.id === "sort-btn") onSortBtn(event);
}

//Event Handlers
function onDeleteAll() {
  setStorageData([]);
  renderTodos();
}
function onDeleteLast() {
  const todos = getStorageData();
  todos.pop();
  setStorageData(todos);
  renderTodos();
}
function onAddBtn(e) {
  const input = e.target.previousElementSibling;
  if (input.value) {
    const todo = new Todo(input.value);
    const todos = getStorageData();
    todos.push(todo);
    setStorageData(todos);
    renderTodos();
    input.value = "";
  } else {
    alert("Fill in the todo name field");
  }
}
function onSortBtn() {
  const [...cards] = document.querySelectorAll(".todo");
  for (let i = 0; i < cards.length; i++) {
    const [checkbox] = cards[i].children;
    if (checkbox.checked) {
      cards[i].classList.toggle("hidden");
    }
  }
}

function onSearchInput() {
  const header = document.querySelector("header");
  const input = header.lastElementChild;
  const [...cards] = document.querySelectorAll(".todo");
  cards.forEach((card) => card.classList.add("hidden"));
  const filteredCards = cards.filter((card) => {
    const [, description] = card.children;
    if (description.innerText.includes(input.value)) {
      return card;
    }
  });
  filteredCards.forEach((card) => card.classList.remove("hidden"));
}
function onCard(event) {
  const { target } = event;
  if (target.type === "button") {
    const todos = getStorageData().filter((card) => card.id !== this.id);
    setStorageData(todos);
    renderTodos();
  } else if (target.type === "checkbox") {
    const todos = getStorageData().map((todo) => {
      if (this.id === todo.id) {
        todo.isChecked = !todo.isChecked;
      }
      return todo;
    });
    setStorageData(todos);
    renderTodos();
  }
}
//Utils
function showAllTodos() {
  const header = document.querySelector("header");
  const todos = getStorageData();
  const [, , , , allCards] = [...header.children];
  allCards.innerText = `All: ${todos.length}`;
  return allCards;
}

function showCompletedTodos() {
  const header = document.querySelector("header");
  const [, , , , , completedField] = [...header.children];
  const completedTodos = getStorageData().filter((card) => card.isChecked);
  completedField.innerText = `Completed: ${completedTodos.length}`;
  return completedField;
}
