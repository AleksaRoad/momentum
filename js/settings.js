const checkbox = document.querySelectorAll(".checkbox");
const settings = document.querySelector(".settings-list");
const settingsIcon = document.querySelector(".settings-icon");
const ru = document.getElementById("ru");
const en = document.getElementById("en");
const date = new Date();
const greetingContainer = document.querySelectorAll(".greeting-container");
const dataQuote = document.querySelectorAll(".data-quote");
const tagsInput = document.querySelector(".search");
const lup = document.querySelector(".lup");
const timeCheckbox = checkbox[0];
const dateCheckbox = checkbox[1];
const greetingCheckbox = checkbox[2];
const quoteCheckbox = checkbox[3];
const weatherCheckbox = checkbox[4];
const githubCheckbox = checkbox[5];
const unsplashCheckbox = checkbox[6];
const flickrCheckbox = checkbox[7];
let tag;
let state;
// объект с default настройками
// let state = {
//   language: "ru",
//   photoSource: "github",
//   blocks: ["time", "date", "greeting", "quote", "weather"],
// };
//во время загрузки данные выгружать из local storage

if (localStorage.settings) {
  state = JSON.parse(localStorage.getItem("settings"));
  settingsToggle();
} else {
  state = {
    language: "ru",
    photoSource: "github",
    blocks: ["time", "date", "greeting", "quote", "weather"],
  };
}
//перед перезагрузой загружать данные в local storage
window.addEventListener("beforeunload", () => {
  localStorage.setItem("settings", JSON.stringify(state));
});
// setBg();
// getQuotes()

function settingsToggle() {
  if (state.blocks.includes("time")) {
    timeCheckbox.checked = true;
  } else {
    timeCheckbox.checked = false;
  }
  if (state.blocks.includes("date")) {
    dateCheckbox.checked = true;
  } else {
    dateCheckbox.checked = false;
  }
  if (state.blocks.includes("greeting")) {
    greetingCheckbox.checked = true;
  } else {
    greetingCheckbox.checked = false;
  }
  if (state.blocks.includes("quote")) {
    quoteCheckbox.checked = true;
  } else {
    quoteCheckbox.checked = false;
  }
  if (state.blocks.includes("weather")) {
    weatherCheckbox.checked = true;
  } else {
    weatherCheckbox.checked = false;
  }
  if (state.photoSource == "github") {
    githubCheckbox.checked = true;
  } else {
    githubCheckbox.checked = false;
  }
  if (state.photoSource == "flickr") {
    flickrCheckbox.checked = true;
  } else {
    flickrCheckbox.checked = false;
  }
  if (state.photoSource == "unsplash") {
    unsplashCheckbox.checked = true;
  } else {
    unsplashCheckbox.checked = false;
  }
  if (state.language == "ru") {
    ru.checked = true;
  } else {
    en.checked = true;
  }
}

//добавление-удаление настроек в объект state

timeCheckbox.addEventListener("change", () => {
  if (timeCheckbox.checked) {
    state.blocks.push("time");
    timeText.classList.remove("hide");
  } else {
    state.blocks = state.blocks.filter((a) => a != "time");
    timeText.classList.add("hide");
  }
});
//дата

dateCheckbox.addEventListener("change", () => {
  if (dateCheckbox.checked) {
    state.blocks.push("date");
    dateText.classList.remove("hide");
  } else {
    state.blocks = state.blocks.filter((a) => a != "date");
    dateText.classList.add("hide");
  }
});
//приветствие

greetingCheckbox.addEventListener("change", () => {
  if (greetingCheckbox.checked) {
    state.blocks.push("greeting");
    greetingContainer.forEach((m) => m.classList.remove("hide"));
  } else {
    state.blocks = state.blocks.filter((a) => a != "greeting");
    greetingContainer.forEach((m) => m.classList.add("hide"));
  }
});
//цитата

quoteCheckbox.addEventListener("change", () => {
  if (quoteCheckbox.checked) {
    state.blocks.push("quote");
    dataQuote.forEach((m) => m.classList.remove("hide"));
    change.classList.remove("hide");
  } else {
    state.blocks = state.blocks.filter((a) => a != "quote");
    dataQuote.forEach((m) => m.classList.add("hide"));
    change.classList.add("hide");
  }
});
//погода

weatherCheckbox.addEventListener("change", () => {
  if (weatherCheckbox.checked) {
    state.blocks.push("weather");
    weather.classList.remove("hide");
  } else {
    state.blocks = state.blocks.filter((a) => a != "weather");
    weather.classList.add("hide");
  }
});
//гитхаб

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

lup.addEventListener("click", (e) => { 
  let tags = tagsInput.value;
  if (tagsInput.value == true && tagsInput.value != " " && tagsInput.value != ""){
    state.blocks.push("tag")
  }else{
    state.blocks = state.blocks.filter((a) => a != "tag")
  }
  console.log(tags);
  tagsInput.blur();
  search = tags;
});
// if((e.code == "Spacedown") || (e.code == 188) || (e.code == 191))
// localStorage.setItem("tags", value);

// })
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