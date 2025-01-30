const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

let limit = 5;
let page = 1;

const apiURL = "https://jsonplaceholder.typicode.com/users";

const searchSong = async (term) => {
  const res = await fetch(`${apiURL}?_limit=${limit}&_page=${page}`);
  const data = await res.json();
  console.log(data);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert("Please type in a search term!");
  } else {
    searchSong(searchTerm);
  }
});
