const form = document.querySelector(".new-todo-input form");
const itemsLeft = document.querySelector(".items-left");
const btnActive = document.querySelector(".items-statuses :nth-child(2)");
const btnCompleted = document.querySelector(".items-statuses :last-child");
const btnClear = document.querySelector(".items-clear");
const ITEMS_KEY = "items";
let items = [];

const addItem = (e) => {
  e.preventDefault();
  const text = document.querySelector(".new-todo-input input");
  if (!text.value) return;
  const itemsObj = {
    text: text.value,
    id: Date.now(),
    completed: false,
  };
  text.value = "";
  items.unshift(itemsObj);
  saveItems();
  createItems();
};

const saveItems = () => {
  localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
};
const loadItems = () => {
  const getItems = localStorage.getItem(ITEMS_KEY);
  if (getItems !== null) {
    const parsedItems = JSON.parse(getItems);
    items = parsedItems;
  }
};
const deleteItems = (id) => {
  items = items.filter((items) => {
    return items.id !== id;
  });
  saveItems();
};

const createItems = () => {
  let itemsHtml = items
    .map(({ text, id, completed }, index) => {
      return `<div class="todo-item ${completed && "completed"} " id=${id}>
  <div class="check" onclick="onClickActive(this)">
  <div class="check-mark">
  <img src="img/icon-check.svg" />
</div>
</div>
<div class="todo-text ">${text}</div>
</div>`;
    })
    .join("");
  document.querySelector(".todo-items").innerHTML = itemsHtml;
  itemsLeft.innerText = `${items.length} items left`;
};

const onClickstatuses = (value) => {
  const todoItem = document.querySelectorAll(".todo-item");
  todoItem.forEach((item) => {
    if (value === false) {
      item.classList.add("completed");
      items.forEach((item) => (item.completed = true));
      saveItems();
      return;
    }
    item.classList.remove("completed");
    items.forEach((item) => (item.completed = false));
    saveItems();
  });
};

const clearItems = () => {
  const todoItem = document.querySelectorAll(".todo-item");
  todoItem.forEach((item) => {
    if (item.classList.contains("completed")) {
      deleteItems(+item.id);
      item.remove();
    }
  });
  itemsLeft.innerText = `${items.length} items left`;
};

const onClickActive = (e) => {
  e.parentNode.classList.toggle("completed");
  items.forEach((item) => {
    if (item.id === +e.parentNode.id) {
      item.completed = !item.completed;
    }
  });
  saveItems();
};

const init = () => {
  form.addEventListener("submit", addItem);
  btnActive.addEventListener("click", () => onClickstatuses(true));
  btnCompleted.addEventListener("click", () => onClickstatuses(false));
  btnClear.addEventListener("click", clearItems);
  loadItems();
  createItems();
};
init();
