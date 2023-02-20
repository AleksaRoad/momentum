const checkbox = document.querySelectorAll(".checkbox");
const settings = document.querySelector(".settings-list");
const settingsIcon = document.querySelector(".settings-icon");
const ru = document.getElementById("ru");
const en = document.getElementById("en");
const date = new Date();
const greetingContainer = document.querySelectorAll(".greeting-container");
const dataQuote = document.querySelectorAll(".data-quote");
// const timeText = document.querySelector(".time");
// const dateText = document.querySelector(".date");
// const greetingText = document.querySelector(".greeting");

//объект с настройками
const state = {
  language: "ru",
  photoSource: "github",
  blocks: ["time", "date", "greeting", "quote", "weather"],
};

//добавление-удаление настроек в объект state
const timeCheckbox = checkbox[0];
timeCheckbox.addEventListener("change", () => {
  if (timeCheckbox.checked) {
    state.blocks.push("time");
    timeText.classList.remove('hide')
  } else {
    state.blocks = state.blocks.filter((a) => a != "time");
    timeText.classList.add('hide')
  }
});
//дата
const dateCheckbox = checkbox[1];
dateCheckbox.addEventListener("change", () => {
  if (dateCheckbox.checked) {
    state.blocks.push("date");
    dateText.classList.remove('hide')
  } else {
    state.blocks = state.blocks.filter((a) => a != "date");
    dateText.classList.add('hide')
  }
});
//приветствие
const greetingCheckbox = checkbox[2];
greetingCheckbox.addEventListener("change", () => {
  if (greetingCheckbox.checked) {
    state.blocks.push("greeting");
    greetingContainer.forEach(m => m.classList.remove('hide'))
  } else {
    state.blocks = state.blocks.filter((a) => a != "greeting");
    greetingContainer.forEach(m => m.classList.add('hide'))
  }
});
//цитата
const quoteCheckbox = checkbox[3];
quoteCheckbox.addEventListener("change", () => {
  if (quoteCheckbox.checked) {
    state.blocks.push("quote");
    dataQuote.forEach(m => m.classList.remove('hide'));
    change.classList.remove('hide')
  } else {
    state.blocks = state.blocks.filter((a) => a != "quote");
    dataQuote.forEach(m => m.classList.add('hide'));
    change.classList.add('hide')
  }
});
//погода
const weatherCheckbox = checkbox[4];
weatherCheckbox.addEventListener("change", () => {
  if (weatherCheckbox.checked) {
    state.blocks.push("weather");
    weather.classList.remove('hide')
  } else {
    state.blocks = state.blocks.filter((a) => a != "weather");
    weather.classList.add('hide')
  }
});
//гитхаб
const githubCheckbox = checkbox[5];
githubCheckbox.addEventListener("change", () => {
  if (githubCheckbox.checked) {
    state.photoSource = "github";
    body.style.backgroundImage = `url(${setBg()})`;
    unsplashCheckbox.checked = false;
    flickrCheckbox.checked = false;
  }
});
//ансплеш
let linkBodyU = localStorage.getItem("linkU");
const unsplashCheckbox = checkbox[6];
unsplashCheckbox.addEventListener("change", () => {
  if (unsplashCheckbox.checked) {
    state.photoSource = "unsplash";
    body.style.backgroundImage = `url(${linkBodyU})`;
    githubCheckbox.checked = false;
    flickrCheckbox.checked = false;
    getLinkToImageUnsplash();
  }
});
//фликр
const flickrCheckbox = checkbox[7];
let linkBodyF = localStorage.getItem("linkF");
flickrCheckbox.addEventListener("change", () => {
  if (flickrCheckbox.checked) {
    state.photoSource = "flickr";
    body.style.backgroundImage = `url(${linkBodyF})`;
    githubCheckbox.checked = false;
    unsplashCheckbox.checked = false;
    getLinkToImageFlickr();
  }
});

//закрытие и открытие меню
document.addEventListener("mouseup", (e) => {
  if (
    (!settings.contains(e.target) && settings.classList.contains("active")) ||
    settingsIcon.contains(e.target)
  ) {
    settings.classList.toggle("active");
  }
  resizeIcon();
});
//изменение размера иконки настроек
function resizeIcon() {
  if (settings.classList.contains("active")) {
    settingsIcon.style.width = "32px";
    settingsIcon.style.height = "32px";
  } else {
    settingsIcon.style.width = "45px";
    settingsIcon.style.height = "45px";
  }
}
