const form = document.getElementById("form");
const userInput = document.getElementById("user-input");
const todoList = document.getElementById("todo-list");
const remaining = document.getElementById("remaining");
const total = document.getElementById("total");

const list = [];
let left = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  list.push(userInput.value);

  const itemElement = document.createElement("li");
  itemElement.innerText = userInput.value;

  itemElement.addEventListener("click", (e) => {
    e.target.classList.toggle("complete");

    if (e.target.classList.contains("complete")) {
      remaining.innerText = --left;
    } else {
      remaining.innerText = ++left;
    }
  });

  left++;
  remaining.innerText = left;
  total.innerText = list.length;

  todoList.appendChild(itemElement);

  userInput.value = "";
});
