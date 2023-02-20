//функция определения времени суток
function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();

  if (hours >= 6 && hours < 12) {
    return "утро";
  }
  if (hours >= 12 && hours < 18) {
    return "день";
  }
  if (hours >= 18 && hours < 24) {
    return "вечер";
  }
  if (hours >= 0 && hours < 6) {
    return "ночь";
  }
}
//функция приветствия
function timeOfDay() {
  let greeting = '';
  if(getTimeOfDay() == 'утро'){
    greeting = 'Доброе утро,'
  }
  if(getTimeOfDay() == 'день'){
    greeting = 'Добрый день,'
  }
  if(getTimeOfDay() == 'вечер'){
    greeting = 'Добрый вечер,'
  }
  if(getTimeOfDay() == 'ночь'){
    greeting = 'Доброй ночи,'
  }
  return greeting;
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
  nameInput.setAttribute("placeholder", "[Введите имя]");
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
