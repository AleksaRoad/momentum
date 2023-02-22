const body = document.querySelector("body");
const nextImg = document.querySelector(".slide-next");
const prevImg = document.querySelector(".slide-prev");
let randomNum = getRandomNum(1, 20);

//функция нахождения рандомного числа от 1 до 20
function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//функция перевода времени суток
function daySet() {
  if (state.photoSource === "github" || !state.tags) {
    if (getTimeOfDay() === lang().morning) {
      return langObj.en.morning;
    }
    if (getTimeOfDay() === lang().afternoon) {
      return langObj.en.afternoon;
    }
    if (getTimeOfDay() === lang().evening) {
      return langObj.en.evening;
    }
    if (getTimeOfDay() === lang().night) {
      return langObj.en.night;
    }
  } else {
    return state.tags;
  }
}
function linkFlickr() {
  const img = new Image();
  img.src = localStorage.getItem("linkF");
  img.onload = () => {
    getLinkToImageFlickr();
    body.style.backgroundImage = `url(${localStorage.getItem("linkF")})`;
  };
  return img.src;
}
function linkUnsplash() {
  const img = new Image();
  img.src = localStorage.getItem("linkU");
  img.onload = () => {
    getLinkToImageUnsplash();
    body.style.backgroundImage = `url(${localStorage.getItem("linkU")})`;
  };
  return img.src;
}
function linkGithub() {
  let bgNum = String(randomNum).padStart(2, "0");
  //предзагрузка изображений до отображения
  const img = new Image();
  img.src = `https://github.com/AleksaRoad/momentum-brain-image/blob/main/${daySet()}/${bgNum}.webp?raw=true)`;
  img.onload = () => {
    body.style.backgroundImage = `url("https://github.com/AleksaRoad/momentum-brain-image/blob/main/${daySet()}/${bgNum}.webp?raw=true")`;
  };
  return img.src;
}
//функция вывода рандомной фотографии
function setBg() {
  //если фотохранилище Flickr
  if (state.photoSource === "flickr") {
    linkFlickr();
  }
  //если фотохранилище Unsplash
  if (state.photoSource === "unsplash") {
    linkUnsplash();
  }
  //если хранилище Github
  if (state.photoSource === "github") {
    linkGithub();
  }
}

//клик вперед
nextImg.addEventListener("click", getSlideNext);
//функция увеличения рандомного числа
function getSlideNext() {
  if (randomNum == 20) {
    randomNum = 1;
  } else {
    randomNum = randomNum + 1;
  }
  return setBg();
}
//клик назад
prevImg.addEventListener("click", getSlidePrev);
//функция уменьшения рандомного числа
function getSlidePrev() {
  if (randomNum == 1) {
    randomNum = 20;
  } else {
    randomNum = randomNum - 1;
  }
  return setBg();
}
