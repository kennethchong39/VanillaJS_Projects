const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// show input error message
const showError = (element, message) => {
  const formControl = element.parentElement;
  formControl.classList.add("error");
  formControl.classList.remove("success");

  const small = formControl.querySelector("small");
  small.innerText = message;
};

// show input success
const showSuccess = (element) => {
  const formControl = element.parentElement;
  formControl.classList.add("success");
  formControl.classList.remove("error");
};

const isValidEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const checkEmail = (element) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(element.value.trim())) {
    showSuccess(element);
  } else {
    showError(element, "Email is not valid");
  }
};

// Check required fields
const checkRequired = (elementArray) => {
  elementArray.forEach((element) => {
    if (element.value.trim() === "") {
      showError(element, `${getFieldName(element.id)} is required`);
    } else {
      showSuccess(element);
    }
  });
};

const getFieldName = (id) => {
  return id[0].toUpperCase() + id.slice(1);
};

const checkLength = (element, min, max) => {
  if (element.value.length < min) {
    showError(
      element,
      `${getFieldName(element.id)} must be at least ${min} character`
    );
  } else if (element.value.length > max) {
    showError(
      element,
      `${getFieldName(element.id)} must be less than ${max} character`
    );
  } else {
    showSuccess(element);
  }
};

const checkPasswordMatch = (password, password2) => {
  if (password.value !== password2.value) {
    showError(password2, "Passwords do not match");
  } else {
    showSuccess(password2);
  }
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);

  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);

  console.log(password.value, password2.value);

  // if (username.value === "") {
  //   showError(username, "Username is required");
  // } else {
  //   showSuccess(username);
  // }

  // if (email.value === "") {
  //   showError(email, "Email is required");
  // } else if (!isValidEmail(email.value)) {
  //   showError(email, "Email is not valid");
  // } else {
  //   showSuccess(email);
  // }

  // if (password.value === "") {
  //   showError(password, "Password is required");
  // } else {
  //   showSuccess(password);
  // }

  // if (password2.value === "") {
  //   showError(password2, "Passwords is required");
  // } else {
  //   showSuccess(password2);
  // }
});
