const langObj = {
  ru: {
    url: "ru",
    error: "Ой! Мы не нашли такого города!",
    minsk: "Минск",
    windSpeed: "Скорость ветра",
    humidity: "Влажность",
    ms: "м/c",
    time: "время",
    date: "дата",
    greeting: "приветствие",
    quote: "цитата",
    weather: "погода",
    search: "поиск",
    language: "язык",
    morning: "утро",
    evening: "вечер",
    afternoon: "день",
    night: "ночь",
    placeholder: "[Введите имя]",
    placeholderTag: " Введите тег...",
    dataFormat: "ru-RU",
    display: "Отображение",
    sourсe: "Источник фото",
    languageUp: "Язык",
    player: "плеер",
  },
  en: {
    url: "en",
    error: "Oops! Enter the name of the other city",
    minsk: "Minsk",
    windSpeed: "Wind speed",
    humidity: "Humidity",
    ms: "m/s",
    time: "time",
    date: "date",
    greeting: "greeting",
    quote: "quote",
    weather: "weather",
    search: "search",
    language: "language",
    morning: "morning",
    evening: "evening",
    afternoon: "afternoon",
    night: "night",
    placeholder: "[Enter name]",
    placeholderTag: " Enter a tag...",
    dataFormat: "en-US",
    display: "Display",
    sourсe: "Photo source",
    languageUp: "Language",
    player: "audio"
  },
};

const textSet = document.querySelectorAll(".text-set");
const [
  displayLang,
  timeLang,
  dateLang,
  greetingLang,
  quoteLang,
  weatherLang,
  playerLang,
  sourсeLang,
  searchLang,
  languageLang,
] = textSet;

function renameMinsk() {
  if (state.language === "ru" && city.value === "Minsk") {
    city.value = "Минск";
    city.textContent = "Минск";
  }
  if (state.language === "en" && city.value === "Минск") {
    city.value = "Minsk";
    city.textContent = "Minsk";
  }
}

function translateSettings() {
  if (state.language === "ru"){
  displayLang.textContent = langObj.ru.display + ":"
  timeLang.textContent = langObj.ru.time
  dateLang.textContent = langObj.ru.date
  greetingLang.textContent = langObj.ru.greeting
  quoteLang.textContent = langObj.ru.quote
  weatherLang.textContent = langObj.ru.weather
  playerLang.textContent = langObj.ru.player
  sourсeLang.textContent = langObj.ru.sourсe + ":"
  searchLang.textContent = langObj.ru.search
  languageLang.textContent = langObj.ru.languageUp + ":"
  }
  if (state.language === "en"){
  displayLang.textContent = langObj.en.display + ":"
  timeLang.textContent = langObj.en.time
  dateLang.textContent = langObj.en.date
  greetingLang.textContent = langObj.en.greeting
  quoteLang.textContent = langObj.en.quote
  weatherLang.textContent = langObj.en.weather
  playerLang.textContent = langObj.en.player
  sourсeLang.textContent = langObj.en.sourсe + ":"
  searchLang.textContent = langObj.en.search
  languageLang.textContent = langObj.en.languageUp + ":"
  }
}
