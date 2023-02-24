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
const changeQuote = document.querySelector(".change-quote");
const weatherBlock = document.querySelector(".weather");
const playerBlock = document.querySelector(".player");
const githubCheckbox = document.getElementById("github");
const unsplashCheckbox = document.getElementById("unsplash");
const flickrCheckbox = document.getElementById("flickr");
// const radioSource = document.querySelectorAll(".custom-radio");


const [timeInput, dateInput, greetingInput, quoteInput, weatherInput, playerInput] = checkboxes;
// const [githubInput, unsplashInput, flickrInput] = radioSource

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
window.addEventListener("beforeunload", () => addToStorage(state));
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
  }
});
//ансплеш
unsplashCheckbox.addEventListener("change", () => {
  if (unsplashCheckbox.checked) {
    state.photoSource = "unsplash";
    body.style.backgroundImage = `url(${linkUnsplash()})`;
    tagsInput.removeAttribute("disabled");
  }
});
//фликр
flickrCheckbox.addEventListener("change", () => {
  if (flickrCheckbox.checked) {
    state.photoSource = "flickr";
    body.style.backgroundImage = `url(${linkFlickr()})`;
    tagsInput.removeAttribute("disabled");
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
//клик по лупе
// loupe.addEventListener("click", () => {
//   tagsInput.blur();
//   saveTags();
// });
//клик вне search
document.addEventListener("click", (e) => {
  if (!tagsInput.contains(e.target)) {
    tagsInput.blur();
    saveTags();
  }
});
// tagsInput.addEventListener("keydown", (e) => {
// if (e.key === "Enter") {
//   setBg()
// }})

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
  }
});

//перевод placeholder поиска
function renamePlaceholderTag() {
  tagsInput.setAttribute("placeholder", `${lang().placeholderTag}`);
  tagsInput.textContent = lang().placeholderTag;
}

// function getSettings() {
//  return settingsHtml.innerHTML = `<ul class="settings-list">
//           <li class="title-list">Отображение:
//           </li>
//           <li>
//             <p>время</p>
//             <label class="switch">
//               <input type="checkbox" class="checkbox" />
//               <span class="slider round"></span>
//             </label>
//           </li>
//           <li>
//             <p>дата</p>
//             <label class="switch">
//               <input type="checkbox" class="checkbox" />
//               <span class="slider round"></span>
//             </label>
//           </li>
//           <li>
//             <p>приветствие</p>
//             <label class="switch">
//               <input type="checkbox" class="checkbox" />
//               <span class="slider round"></span>
//             </label>
//           </li>
//           <li>
//             <p>цитата</p>
//             <label class="switch">
//               <input type="checkbox" class="checkbox" />
//               <span class="slider round"></span>
//             </label>
//           </li>
//           <li>
//             <p>погода</p>
//             <label class="switch">
//               <input type="checkbox" class="checkbox" />
//               <span class="slider round"></span>
//             </label>
//           </li>            
//           <li class="title-list">Источник фото:
//             </li>
//           <li class="source-three">
//             <input
//               type="radio"
//               class="custom-radio"
//               name="source"
//               id="github"
//               value="github"
//               checked="true"
//             />

//             <label for="github">github</label
//             ><input
//               type="radio"
//               class="custom-radio"
//               name="source"
//               id="unsplash"
//               value="unsplash"
//             />
//             <label for="unsplash">unsplash</label
//             ><input
//               type="radio"
//               class="custom-radio"
//               name="source"
//               id="flickr"
//               value="flickr"
//             />
//             <label for="flickr">flickr</label>
//           </li>

//           <li>
//             <p>поиск</p>
//             <div class="search-input">
//               <input class="search" type="search" />
//               <!-- <img src="./assets/img/lup.png" alt="" class="loupe" /> -->
//             </div>
//           </li>
//           <li class="title-list">Язык:
//           </li>
//           <li class="language">
//             <input
//               type="radio"
//               class="custom-radio"
//               name="language"
//               id="ru"
//               value="ru"
//             />
//             <label for="ru">ru</label
//             ><input
//               type="radio"
//               class="custom-radio"
//               name="language"
//               id="en"
//               value="en"
//               checked="true"
//             />
//             <label for="en">en</label>
//           </li>
//         </ul>
// `}

// function toggleImgQuote(){
// if (quoteBlock.classList.contains("hide")){
// changeQuote.classList.add("hide")
// }}
// if (localStorage.settings) {
//   state = JSON.parse(localStorage.getItem("settings"));
// } else {
//   state = {
//     language: "ru",
//     photoSource: "github",
//     blocks: ["time", "date", "greeting", "quote", "weather"],
//   };
//   // settingsToggle();
// }
// //перед перезагрузой загружать данные в local storage
// window.addEventListener("beforeunload", () => {
//   localStorage.setItem("settings", JSON.stringify(state));
// });
// const lup = document.querySelector(".lup");
// const timeCheckbox = checkbox[0];
// const dateCheckbox = checkbox[1];
// const greetingCheckbox = checkbox[2];
// const quoteCheckbox = checkbox[3];
// const weatherCheckbox = checkbox[4];
// let tag;

// объект с default настройками
// let state = {
//   language: "ru",
//   photoSource: "github",
//   blocks: ["time", "date", "greeting", "quote", "weather"],
// };

// setBg();
// getQuotes()

// function settingsToggle() {
//   if (state.blocks.includes("time")) {
//     timeCheckbox.checked = true;
//   } else {
//     timeCheckbox.checked = false;
//   }
//   if (state.blocks.includes("date")) {
//     dateCheckbox.checked = true;
//   } else {
//     dateCheckbox.checked = false;
//   }
//   if (state.blocks.includes("greeting")) {
//     greetingCheckbox.checked = true;
//   } else {
//     greetingCheckbox.checked = false;
//   }
//   if (state.blocks.includes("quote")) {
//     quoteCheckbox.checked = true;
//   } else {
//     quoteCheckbox.checked = false;
//   }
//   if (state.blocks.includes("weather")) {
//     weatherCheckbox.checked = true;
//   } else {
//     weatherCheckbox.checked = false;
//   }
//   if (state.photoSource == "github") {
//     githubCheckbox.checked = true;
//   } else {
//     githubCheckbox.checked = false;
//   }
//   if (state.photoSource == "flickr") {
//     flickrCheckbox.checked = true;
//   } else {
//     flickrCheckbox.checked = false;
//   }
//   if (state.photoSource == "unsplash") {
//     unsplashCheckbox.checked = true;
//   } else {
//     unsplashCheckbox.checked = false;
//   }
//   if (state.language == "ru") {
//     ru.checked = true;
//   } else {
//     en.checked = true;
//   }
// }

//добавление-удаление настроек в объект state

// timeCheckbox.addEventListener("change", () => {
//   if (timeCheckbox.checked) {
//     state.blocks.push("time");
//     timeText.classList.remove("hide");
//   } else {
//     state.blocks = state.blocks.filter((a) => a != "time");
//     timeText.classList.add("hide");
//   }
// });
// //дата

// dateCheckbox.addEventListener("change", () => {
//   if (dateCheckbox.checked) {
//     state.blocks.push("date");
//     dateText.classList.remove("hide");
//   } else {
//     state.blocks = state.blocks.filter((a) => a != "date");
//     dateText.classList.add("hide");
//   }
// });
// //приветствие

// greetingCheckbox.addEventListener("change", () => {
//   if (greetingCheckbox.checked) {
//     state.blocks.push("greeting");
//     greetingContainer.forEach((m) => m.classList.remove("hide"));
//   } else {
//     state.blocks = state.blocks.filter((a) => a != "greeting");
//     greetingContainer.forEach((m) => m.classList.add("hide"));
//   }
// });
// //цитата

// quoteCheckbox.addEventListener("change", () => {
//   if (quoteCheckbox.checked) {
//     state.blocks.push("quote");
//     dataQuote.forEach((m) => m.classList.remove("hide"));
//     change.classList.remove("hide");
//   } else {
//     state.blocks = state.blocks.filter((a) => a != "quote");
//     dataQuote.forEach((m) => m.classList.add("hide"));
//     change.classList.add("hide");
//   }
// });
// //погода

// weatherCheckbox.addEventListener("change", () => {
//   if (weatherCheckbox.checked) {
//     state.blocks.push("weather");
//     weather.classList.remove("hide");
//   } else {
//     state.blocks = state.blocks.filter((a) => a != "weather");
//     weather.classList.add("hide");
//   }
// });
// if((e.code == "Spacedown") || (e.code == 188) || (e.code == 191))
// localStorage.setItem("tags", value);
