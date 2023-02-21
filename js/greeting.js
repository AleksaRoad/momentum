//функция определения времени суток
function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();

  if (hours >= 6 && hours < 12) {
    return lang().morning;
  }
  if (hours >= 12 && hours < 18) {
    return lang().afternoon;
  }
  if (hours >= 18 && hours < 24) {
    return lang().evening;
  }
  if (hours >= 0 && hours < 6) {
    return lang().night;
  }
}
//функция приветствия
function timeOfDay() {
  let greeting = "";

  if (state.language === "en") {
    if (getTimeOfDay() === lang().morning) {
      greeting = "Good morning,";
    }
    if (getTimeOfDay() === lang().afternoon) {
      greeting = "Good day,";
    }
    if (getTimeOfDay() === lang().evening) {
      greeting = "Good evening,";
    }
    if (getTimeOfDay() === lang().night) {
      greeting = "Good night,";
    }
    return greeting;
  }
  if (state.language === "ru") {
    if (getTimeOfDay() === lang().morning) {
      greeting = "Доброе утро,";
    }
    if (getTimeOfDay() === lang().afternoon) {
      greeting = "Добрый день,";
    }
    if (getTimeOfDay() === lang().evening) {
      greeting = "Добрый вечер,";
    }
    if (getTimeOfDay() === lang().night) {
      greeting = "Доброй ночи,";
    }
    return greeting;
  }
}

const nameInput = document.querySelector(".nameInput");
//функция занесения информации в local storage
function setLocalStorage(value) {
  localStorage.setItem("name", value);
}
window.addEventListener("beforeunload", () => {
  setLocalStorage(nameInput.value.trim());
});
//функция возвращения информации из local storage
function getLocalStorage() {
  if (localStorage.getItem("name")) {
    nameInput.value = localStorage.getItem("name");
  }
}
//функция отрисовки placeholder
function placeholder() {
  nameInput.setAttribute("placeholder", lang().placeholder);
}
//отрисовка placeholder или информации из local storage
window.addEventListener("load", placeholder);
window.addEventListener("load", getLocalStorage);
//функция очищения local storage при изменении input
nameInput.addEventListener("change", () => {
  setLocalStorage(nameInput.value.trim());
});
//функция очистки input при клике на него
nameInput.addEventListener("click", () => {
  if (nameInput.value != "") {
    nameInput.value = "";
  }
});

function keyPressInput(event) {
  if (event.code === "Enter") {
    nameInput.blur();
  }
}
nameInput.addEventListener("keypress", keyPressInput);
