const body = document.querySelector("body");
const nextImg = document.querySelector(".slide-next");
const prevImg = document.querySelector(".slide-prev");
let randomNum = getRandomNum(1, 20);
const BASE_URL_FLICKR = "https://www.flickr.com";
const BASE_URL_UNSPLASH = "https://api.unsplash.com";
const BASE_URL_GITHUB = "https://github.com";
const BASE_ID_FLICKR = "090e27573acc9823416e53bfaaa1658d";
const BASE_ID_UNSPLASH = "qKUaPCGozqoytA7ENUmHmQvlrboqG6dVh0GZ";
const sizeImgFlickr = "url_h";
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
async function linkUnsplash() {
  const urlU = `${BASE_URL_UNSPLASH}/photos/random?orientation=landscape&query=${daySet()}&client_id=${BASE_ID_UNSPLASH}-FzpVds`;
  const resU = await fetch(urlU);
  const dataU = await resU.json();
  let linkU = dataU.urls.regular;
  localStorage.setItem("linkU", linkU);
  const img = new Image();
  img.src = localStorage.getItem("linkU");
  img.onload = () => {
    body.style.backgroundImage = "url('" + linkU + "')";
  };
  return img.src;
}
async function linkFlickr() {
  const urlF = `${BASE_URL_FLICKR}/services/rest/?method=flickr.photos.search&api_key=${BASE_ID_FLICKR}&per_page=500&tags=${daySet()}&extras=${sizeImgFlickr}&format=json&nojsoncallback=1`;
  const resF = await fetch(urlF);
  const dataF = await resF.json();
  let links = dataF.photos.photo.filter((a) =>
    Object.keys(a).includes(sizeImgFlickr)
  );
  const randomIndex = Math.floor(Math.random() * links.length);
  // console.log(links[randomIndex].url_h)
  let linkF = links[randomIndex].url_h;
  localStorage.setItem("linkF", linkF);
  const img = new Image();
  img.src = localStorage.getItem("linkF");
  img.onload = () => {
    body.style.backgroundImage = "url('" + linkF + "')";
  };
  return img.src;
}
function linkGithub() {
  let bgNum = String(randomNum).padStart(2, "0");
  //предзагрузка изображений до отображения
  const img = new Image();
  img.src = `${BASE_URL_GITHUB}/AleksaRoad/momentum-brain-image/blob/main/${daySet()}/${bgNum}.webp?raw=true`;
  img.onload = () => {
    body.style.backgroundImage = `url("${BASE_URL_GITHUB}/AleksaRoad/momentum-brain-image/blob/main/${daySet()}/${bgNum}.webp?raw=true")`;
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
