const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const city = document.querySelector(".city");
const error = document.querySelector(".error img");
const weather = document.querySelector(".weather");

// https://api.openweathermap.org/data/2.5/weather?q=%D0%9C%D0%B8%D0%BD%D1%81%D0%BA&lang=ru&appid=d2c7b0c7e51b3b0b62f5f6253e7edf70&units=metric

//асинхронная функция загрузки погоды
async function getWeather() {
  lang();
  const BASE_URL = "https://api.openweathermap.org";
  const ID_URL = "d2c7b0c7e51b3b0b62f5f6253e7edf70";
  const url = `${BASE_URL}/data/2.5/weather?q=${city.value}&lang=${
    lang().url
  }&appid=${ID_URL}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === "404") {
    temperature.textContent = lang().error;
    weatherIcon.classList.remove();
    weatherIcon.style.display = "none";
    weatherDescription.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
    error.classList.add("active");
  } else {
    weatherIcon.style.display = "block";
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${lang().windSpeed}: ${Math.round(data.wind.speed)} ${
      lang().ms
    }`;
    humidity.textContent = `${lang().humidity}: ${Math.round(
      data.main.humidity
    )}%`;
    error.classList.remove("active");
  }
}
//функция вывода данных, изменения ссылки и сброса таргета при нажатии на клавишу Enter
function setCity(event) {
  if (event.code === "Enter") {
    setLocalStorageCity(city.value);
    getWeather();
    city.blur();
  }
}

city.addEventListener("keypress", setCity);
//функция внесения города в local storage
function setLocalStorageCity(value) {
  localStorage.setItem("city", value);
}
//перед перезагрузкой окна запись в local storage
window.addEventListener("beforeunload", () => {
  setLocalStorageCity(city.value);
  if (error.classList.contains("active")) {
    city.value = "";
    setLocalStorageCity(city.value);
  }
});
//функция возвращения города из local storage
function getLocalStorageCity() {
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  }
}
//при загрузке окна выгружать local storage или при пустом значении грузить Минск
window.addEventListener("load", () => {
  getLocalStorageCity();
  getWeather();
  if (
    city.value === false ||
    error.classList.contains("active") ||
    city.value === ""
  ) {
    city.value = lang().minsk;
    city.textContent = lang().minsk;
    getWeather();
  }
});
//при клике вне инпута загружать значения city по введенному пользователем
document.addEventListener("click", (e) => {
  setLocalStorageCity(city.value);
  if (!city.contains(e.target)) {
    getWeather();
    city.textContent = localStorage.getItem("city");
    if (city.value == "") {
      temperature.textContent = lang().error;
      weatherIcon.classList.remove();
      weatherIcon.style.display = "none";
      weatherDescription.textContent = "";
      wind.textContent = "";
      humidity.textContent = "";
      error.classList.add("active");
    }
  }
});
//при клике по инпуту очищать строку и значение city
city.addEventListener("click", () => {
  if (city.value != "") {
    city.value = "";
  }
});

