const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const city = document.querySelector(".city");
const error = document.querySelector(".error img");
const weather = document.querySelector(".weather");

//асинхронная функция загрузки погоды
async function getWeather() {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=d2c7b0c7e51b3b0b62f5f6253e7edf70&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod == "404") {
    temperature.textContent = "Ой! Мы не нашли такого города!";
    weatherIcon.classList.remove();
    weatherIcon.style.display = "none";
    weatherDescription.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
    error.classList.add("active")
  } else {
    weatherIcon.style.display = "block";
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/c`;
    humidity.textContent = `Влажность: ${Math.round(data.main.humidity)}%`;
    error.classList.remove("active")
  }
};
//функция вывода данных, изменения ссылки и сброса таргета при нажатии на клавишу Enter
function setCity(event) {
  if (event.code === "Enter") {
    setLocalStorageCity(city.value)
    getWeather();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=d2c7b0c7e51b3b0b62f5f6253e7edf70&units=metric`;
    city.blur();
  }
};
city.addEventListener("keypress", setCity);
//функция внесения города в local storage
function setLocalStorageCity(value) {
  localStorage.setItem("city", value)
}
//перед перезагрузкой окна запись в local storage
window.addEventListener("beforeunload", () => {
  setLocalStorageCity(city.value);
});
//функция возвращения города из local storage
function getLocalStorageCity() {
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  }
};
//при загрузке окна выгружать local storage или при пустом значении грузить Минск
window.addEventListener("load", () => {
  getLocalStorageCity();
  getWeather();
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=d2c7b0c7e51b3b0b62f5f6253e7edf70&units=metric`;
  if ((city.value == false) || (temperature.textContent == "Ой! Мы не нашли такого города!")) {
    city.value = "Минск";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=ru&appid=d2c7b0c7e51b3b0b62f5f6253e7edf70&units=metric`;
    getWeather();
  }
});
//при клике вне инпута загружать значения city по введенному пользователем
document.addEventListener("click", (e) => {
  setLocalStorageCity(city.value);
  if (!city.contains(e.target)) {
    getWeather();
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=d2c7b0c7e51b3b0b62f5f6253e7edf70&units=metric`;
  city.textContent = localStorage.getItem("city");
    if (city.value == "") {
    temperature.textContent = "Ой! Мы не нашли такого города!";
    weatherIcon.classList.remove();
    weatherIcon.style.display = "none";
    weatherDescription.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
    error.classList.add("active")
}}});
//при клике по инпуту очищать строку и значение city
city.addEventListener("click", () => {
  if (city.value != "") {
    city.value = "";
  }
});

// document.addEventListener("DOMContentLoaded", getWeather);
// city.textContent = localStorage.getItem("city");
