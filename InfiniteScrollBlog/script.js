const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;

// fetch post from api
const getPosts = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
};

// show posts in dom
const showPosts = async () => {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
      <div class="number">${post.id}</div>
        <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">
            ${post.body}
          </p>
        </div>
    `;
    postsContainer.append(postEl);
  });
};

showPosts();

// show loader & fetch more posts
const showLoading = () => {
  loading.classList.add("show");

  setTimeout(() => {
    page++;
    showPosts();
  }, 300);

  setTimeout(() => {
    loading.classList.remove("show");
  }, 1000);
};

window.addEventListener("scroll", () => {
  // const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  // if (scrollTop + clientHeight >= scrollHeight - 5) {
  //   showLoading();
  // }

  if (window.innerHeight + window.scrollY >= document.body.clientHeight - 1) {
    showLoading();
  }
});

const filterPosts = (e) => {
  const term = e.target.value;

  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText;
    const body = post.querySelector(".post-body").innerText;

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
};

filter.addEventListener("input", filterPosts);
