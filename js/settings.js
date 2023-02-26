// import SetBg from "./slider";
const checkboxes = document.querySelectorAll(".checkbox");
const settings = document.querySelector(".settings-list");
const settingsHtml = document.querySelector(".render-settings");
const settingsIcon = document.querySelector(".settings-icon");
const ru = document.getElementById("ru");
const en = document.getElementById("en");
const tagsInput = document.querySelector(".search");
const date = new Date();
const timeBlock = document.querySelector(".time");
const dateBlock = document.querySelector(".date");
const greetingBlock = document.querySelector(".greeting-container");
const quoteBlock = document.querySelector(".data-quote");
const weatherBlock = document.querySelector(".weather");
const playerBlock = document.querySelector(".player");
const githubCheckbox = document.getElementById("github");
const unsplashCheckbox = document.getElementById("unsplash");
const flickrCheckbox = document.getElementById("flickr");
// const radioSource = document.querySelectorAll(".custom-radio");


const [timeInput, dateInput, greetingInput, quoteInput, weatherInput, playerInput] = checkboxes;

const nodes = [
  {
    nodeName: "time",
    node: timeInput,
    block: timeBlock,
  },
  {
    nodeName: "date",
    node: dateInput,
    block: dateBlock,
  },
  {
    nodeName: "greeting",
    node: greetingInput,
    block: greetingBlock,
  },
  {
    nodeName: "quote",
    node: quoteInput,
    block: quoteBlock,
  },
  {
    nodeName: "weather",
    node: weatherInput,
    block: weatherBlock,
  },
    {
    nodeName: "player",
    node: playerInput,
    block: playerBlock,
  }
];

const state = {
  language: "en",
  photoSource: "github",
  tags: false,
  blocks: [
    { name: "time", isVisible: true },
    { name: "date", isVisible: true },
    { name: "greeting", isVisible: true },
    { name: "quote", isVisible: true },
    { name: "weather", isVisible: true },
    { name: "player", isVisible: true },
  ],
};

const lang = () => (state.language === "ru" ? langObj.ru : langObj.en);
const SETTINGS = "settings";
//выгрузка настроек из local storage
const initState = (state) => {
  if (localStorage.settings) {
    const settings = JSON.parse(localStorage.getItem(SETTINGS));
    Object.assign(state, settings);
  }
};
//загрузка настроек в local storage
const addToStorage = (state) => {
  localStorage.setItem(SETTINGS, JSON.stringify(state));
};
//добаление hide
const renderLayout = (state) => {
  nodes.forEach(({ nodeName, node, block }) => {
    const element = state.blocks.find((el) => el.name === nodeName);
    const isChecked = element.isVisible;
    node.checked = isChecked;
    if (!isChecked) {
      block.classList.add("hide");
    } else {
      block.classList.remove("hide");
    }
  });
};
//запись state
const setState = (inputName, isChecked, state) => {
  const element = state.blocks.find((el) => el.name === inputName);
  element.isVisible = isChecked;
};
//для каждого чекбокса при изменении записывать в local storage и изменять state
nodes.forEach((el) =>
  el.node.addEventListener("change", () => {
    setState(el.nodeName, el.node.checked, state);
    renderLayout(state);
    addToStorage(state);
  })
);

//при закрытии окна добавлять state в local storage
// window.addEventListener("beforeunload", () => addToStorage(state));
//при загрузке окна выгружать state и записыать значения в checkboxes
window.addEventListener("DOMContentLoaded", () => {
  initState(state);
  renderLayout(state);
});

//посе загрузки генерироать фон в зависимости от настроек
window.addEventListener("DOMContentLoaded", () => {
  //  getSettings()
  optionSource(state);
  getQuotes();
  getTags();
  translateSettings();
  getPlaylist();
  // daySet();
  // setBg();
  if (state.photoSource === "github") {
    body.style.backgroundImage = `url(${linkGithub()})`;
    githubCheckbox.checked;
    tagsInput.setAttribute("disabled", true);
  }
  if (state.photoSource === "unsplash") {
    body.style.backgroundImage = `url(${linkUnsplash()})`;
    githubCheckbox.checked;
  }
  if (state.photoSource === "flickr") {
    body.style.backgroundImage = `url(${linkFlickr()})`;
    githubCheckbox.checked;
  }
  if (quoteInput.checked === true) {
    change.classList.remove("hide");
  }
  if (quoteInput.checked === false) {
    change.classList.add("hide");
  }
});
//запись значений в radio
function optionSource(state) {
  if (state.photoSource === "github") {
    githubCheckbox.checked = true;
  } else {
    githubCheckbox.checked = false;
  }
  if (state.photoSource === "flickr") {
    flickrCheckbox.checked = true;
  } else {
    flickrCheckbox.checked = false;
  }
  if (state.photoSource === "unsplash") {
    unsplashCheckbox.checked = true;
  } else {
    unsplashCheckbox.checked = false;
  }
  if (state.language === "ru") {
    ru.checked = true;
  } else {
    ru.checked = false;
  }
  if (state.language === "en") {
    en.checked = true;
  } else {
    en.checked = false;
  }
}
//гитхаб
githubCheckbox.addEventListener("change", () => {
  if (githubCheckbox.checked) {
    state.photoSource = "github";
    body.style.backgroundImage = `url(${linkGithub()})`;
    tagsInput.setAttribute("disabled", true);
    addToStorage(state);
  }
});
//ансплеш
unsplashCheckbox.addEventListener("change", () => {
  if (unsplashCheckbox.checked) {
    state.photoSource = "unsplash";
    body.style.backgroundImage = `url(${linkUnsplash()})`;
    tagsInput.removeAttribute("disabled");
    addToStorage(state);
  }
});
//фликр
flickrCheckbox.addEventListener("change", () => {
  if (flickrCheckbox.checked) {
    state.photoSource = "flickr";
    body.style.backgroundImage = `url(${linkFlickr()})`;
    tagsInput.removeAttribute("disabled");
    addToStorage(state);
  }
});

//закрытие и открытие меню
document.addEventListener("mouseup", (e) => {
  if (
    (!settings.contains(e.target) && settings.classList.contains("active")) ||
    settingsIcon.contains(e.target)
  ) {
    settings.classList.toggle("active");
    if (state.tags === false) {
      renamePlaceholderTag();
    } else {
      tagsInput.value = state.tags;
    }
  }
  resizeIcon();
});
//функция выгрузки тега
function getTags() {
  if (state.tags != false) {
    tagsInput.textContent = state.tags;
  }
}

//клик вне search
document.addEventListener("click", (e) => {
  if (!tagsInput.contains(e.target)) {
    tagsInput.blur();
    saveTags();
  }
});


//Enter при вводе в Input
tagsInput.addEventListener("keyup", (e) => {
  saveTags();

  if (e.key === "Enter") {
    if (state.photoSource === "flickr") {
      linkFlickr();
    }
    if (state.photoSource === "unsplash") {
      linkUnsplash();
    }
  tagsInput.blur()
}});
//функция сохранения тегов
function saveTags() {
  if (tagsInput.value != " " && tagsInput.value != "") {
    state.tags = tagsInput.value;
    tagsInput.textContent = state.tags;
  } else {
    state.tags = false;
  }
}

//изменение размера иконки настроек
function resizeIcon() {
  if (settings.classList.contains("active")) {
    settingsIcon.style.width = "32px";
    settingsIcon.style.height = "32px";
  } else {
    settingsIcon.style.width = "40px";
    settingsIcon.style.height = "40px";
  }
}

//клик по радиокнопке с языком(выбор языка, запись в настройки, перевод )
en.addEventListener("click", () => {
  if (en.type === "radio" && en.checked) {
    ru.removeAttribute("checked");
    en.setAttribute("checked", true);
    state.language = "en";
    getQuotes();
    timeOfDay();
    placeholder();
    renamePlaceholderTag();
    renameMinsk();
    translateSettings();
    addToStorage(state);
  }
});

ru.addEventListener("click", () => {
  if (ru.type === "radio" && ru.checked) {
    en.removeAttribute("checked");
    ru.setAttribute("checked", true);
    state.language = "ru";
    getQuotes();
    timeOfDay();
    placeholder();
    getWeather();
    renamePlaceholderTag();
    renameMinsk();
    translateSettings();
    addToStorage(state);
  }
});

//перевод placeholder поиска
function renamePlaceholderTag() {
  tagsInput.setAttribute("placeholder", `${lang().placeholderTag}`);
  tagsInput.textContent = lang().placeholderTag;
}
