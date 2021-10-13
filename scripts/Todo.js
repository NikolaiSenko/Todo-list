//Todos cunstructor
function Todo(text) {
  this.id = (Math.random() * 10).toString().slice(2,8);
  this.isChecked = false;
  this.time = new Date().toDateString();
  this.text = text;
}
export {Todo}