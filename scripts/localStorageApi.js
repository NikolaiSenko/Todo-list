//function for putting data to our local storage
function setStorageData(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
//function for pulling out data from our local storage
function getStorageData() {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (localStorage.getItem("todos")) {
    return todos;
  } else {
    return [];
  }
}
export { setStorageData, getStorageData };
