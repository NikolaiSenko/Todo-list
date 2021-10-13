//Templates
function createElement(tag, className, text = "") {
  //function for DOM-element creation
  const element = document.createElement(tag);
  const elementText = document.createTextNode(text);
  element.className = className;
  element.append(elementText);
  return element;
}

function createHeader() {
  const header = createElement(
    "header",
    "flex justify-between lg:justify-around flex-wrap px-4 py-2"
  );
  const deleteAllButton = createElement(
    "button",
    "px-4 py-2 mr-4 mb-2 border-2 rounded-xl",
    "Delete All"
  );
  deleteAllButton.id = "delete-btn";
  const deleteLastButton = createElement(
    "button",
    "px-4 py-2 mr-4 mb-2 border-2 rounded-xl",
    " Delete Last"
  );
  deleteLastButton.id = "delete_last-btn";
  const newTodo = createElement(
    "input",
    "px-4 py-2 mr-4 mb-2 sm:w-1/2 md:w-1/3 xl:w-1/2 text-center border-2"
  );
  newTodo.placeholder = "Enter todo name...";
  const addButton = createElement(
    "button",
    "px-4 py-2 mr-4 mb-2 border-2 rounded-xl",
    "Add"
  );
  addButton.id = "add-btn";
  const allCards = createElement(
    "div",
    "px-4 py-2 mr-4 mb-2 sm:w-1/4 lg:w-1/6 text-center border-2 rounded-xl",
    `All: 0`
  );
  const completedField = createElement(
    "div",
    "px-4 py-2 mr-4 mb-2 sm:w-1/4 lg:w-1/3 xl:w-1/4 text-center border-2 rounded-xl",
    "Completed: 0"
  );
  completedField.id = "completed-btn";
  const sortButton = createElement(
    "button",
    "sm:w-1/4 md:w-max px-4 py-2 mr-4 mb-2 border-2 rounded-xl",
    "Sort completed"
  );
  sortButton.id = "sort-btn";
  const searchField = createElement(
    "input",
    "px-4 py-2 mx-auto mb-2 sm:w-11/12 xl:w-1/5 text-center border-2 rounded-xl"
  );
  searchField.placeholder = "Search..";
  searchField.id = "search-input";
  header.append(
    deleteAllButton,
    deleteLastButton,
    newTodo,
    addButton,
    allCards,
    completedField,
    sortButton,
    searchField
  );
  return header;
}

function createMain() {
  const main = createElement("main", "py-2 px-4");
  main.id = "main";
  return main;
}

function createCard(todo) {
  //Create our Todo
  const card = createElement(
    "div",
    "todo w-11/12 mx-auto flex justify-between items-center mb-2 px-2 border-2 rounded-xl border-green-400"
  );
  card.id = todo.id;
  const checkbox = createElement("input", "checkbox text-center");
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.isChecked;
  const todoDescription = createElement(
    "div",
    "description text-center",
    todo.text
  );
  const wrapper = createElement("div", "flex flex-col justify-between");
  const closeButton = createElement(
    "input",
    "close-btn w-1/2 self-end mb-1.5 border-2 rounded-xl",
    "X"
  );
  closeButton.setAttribute("type", "button");
  closeButton.value = "X";
  const date = createElement("div", "mb-1 text-sm self-end", todo.time);
  wrapper.append(closeButton, date);
  card.append(checkbox, todoDescription, wrapper);
  if (todo.isChecked) {
    todoDescription.classList.add("line-through");
    card.classList.add("bg-green-400");
  }
  return card;
}
export { createHeader, createMain, createCard };
