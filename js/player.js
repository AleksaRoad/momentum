const playlist = [
  {
    title: "Aqua Caelestis",
    src: "./assets/sounds/Aqua Caelestis.mp3",
    duration: "00:17",
  },
  {
    title: "River Flows In You",
    src: "./assets/sounds/River Flows In You.mp3",
    duration: "00:07",
  },
  {
    title: "Ennio Morricone",
    src: "./assets/sounds/Ennio Morricone.mp3",
    duration: "00:26",
  },
  {
    title: "Summer Wind",
    src: "./assets/sounds/Summer Wind.mp3",
    duration: "00:12",
  },
  {
    title: "Sunny Day",
    src: "./assets/sounds/Sunny Day.mp3",
    duration: "00:19",
  },
];

const player_buttons = document.querySelectorAll(".player-icon");
const playListContainer = document.querySelector(".play-list");
const title = document.querySelector(".title");
const recent_volume = document.querySelector("#volume");
const volume_show = document.querySelector("#volume_show");
const slider = document.querySelector("#duration_slider");
const auto_play = document.querySelector(".auto");
const volume_icon = document.querySelector(".volume_icon");
const time_song = document.querySelector(".time-song");
const realtime = document.querySelector(".realtime");

const playBtn = player_buttons[1];

let timer;
let autoplay = 1;

let playNum = 0;
let isPlay = false;
let arrPlaylist = [];

let audio = document.createElement("audio");

//генерация плейлиста
function getPlaylist() {
  playlist.forEach((el, i) => {
    const li = document.createElement("li");
    let = li.classList.add("play-item");
    li.innerHTML =
      `<img src="./assets/svg/play2.svg" alt="play2" class="fu${i}"> ` +
      el.title;
    arrPlaylist.push(li);
    li.addEventListener("click", (e) => {
      if (playNum === i) {
        if (isPlay) {
          pausesong();
        } else {
          document
            .querySelector(`.fu${i}`)
            .setAttribute("src", "./assets/svg/pause2.svg ");
          playNum = i;
          playsong();
        }
      } else {
        document
          .querySelector(`.fu${playNum}`)
          .setAttribute("src", "./assets/svg/play2.svg ");
        console.log(document.querySelector(`.fu${playNum}`));
        console.log(playNum);
        // li.
        document
          .querySelector(`.fu${i}`)
          .setAttribute("src", "./assets/svg/pause2.svg ");
        load_audio(i);
        playNum = i;
        playsong();
      }
    });
    playListContainer.append(li);
  });
}

//функция загрузки трека
function load_audio(playNum) {
  clearInterval();
  reset_slider();
  audio.src = playlist[playNum].src;
  title.innerHTML = playlist[playNum].title;
  audio.load();

  timer = setInterval(range_slider, 1000);
}
load_audio(playNum);

//сброс значения слайдера
function reset_slider() {
  slider.value = 0;
}

//проверка звучит ли песня или нет
function justplay() {
  if (isPlay == false) {
    playsong();
  } else {
    pausesong();
  }
}
//обновление позиции слайдера
function range_slider() {
  audio.currentTime = slider.value;
}

//воспроизведение песни
function playsong() {
  audio.play();
  isPlay = true;
  playBtn.innerHTML = '<img src="./assets/svg/pause.svg" alt="pause">';
  document
    .querySelector(`.fu${playNum}`)
    .setAttribute("src", "./assets/svg/pause2.svg ");
  arrPlaylist.forEach((e) => e.classList.remove("item-active"));
  arrPlaylist[playNum].classList.add("item-active");
}

//остановка песни
function pausesong() {
  audio.pause();
  isPlay = false;
  playBtn.innerHTML = '<img src="./assets/svg/play.svg" alt="play">';
  document
    .querySelector(`.fu${playNum}`)
    .setAttribute("src", "./assets/svg/play2.svg ");
}

//следующая песня
function next_song() {
  if (playNum < playlist.length - 1) {
    document
      .querySelector(`.fu${playNum}`)
      .setAttribute("src", "./assets/svg/play2.svg ");
    playNum++;
    load_audio(playNum);
    playsong();
  } else {
    document
      .querySelector(`.fu${playNum}`)
      .setAttribute("src", "./assets/svg/play2.svg ");
    playNum = 0;
    load_audio(playNum);
    playsong();
  }
}

//предыдущая песня
function previous_song() {    
  console.log(playNum)
  console.log( document.querySelector(`.fu${playNum}`))
  if (playNum > 0) {    
    document
      .querySelector(`.fu${playNum}`)
      .setAttribute("src", "./assets/svg/play2.svg ");
    playNum--;

    load_audio(playNum);
    playsong();
  } else {
    document
      .querySelector(`.fu${playNum}`)
      .setAttribute("src", "./assets/svg/play2.svg ");
    playNum = playlist.length - 1;
    load_audio(playNum);
    playsong();
  }
}
window.addEventListener("load", () => {
  volume.value = localStorage.getItem("volume");
  volume_change();
});

//mute sound
function mute_sound() {
  if (audio.volume != 0) {
    localStorage.setItem("volume", volume.value);
    audio.volume = 0;
    volume.value = 0;
    volume_show.innerHTML = 0;
    volume_icon.innerHTML = '<img src="./assets/svg/mute.svg" alt="mute">';
  } else {
    volume.value = localStorage.getItem("volume");
    volume_change();
  }
}

//изменение громкости
function volume_change() {
  volume_show.innerHTML = recent_volume.value;
  audio.volume = recent_volume.value / 100;
  localStorage.setItem("volume", volume.value);
  if (volume.value != 0) {
    volume_icon.innerHTML = '<img src="./assets/svg/maxsound.svg" alt="max">';
  } else {
    volume_icon.innerHTML = '<img src="./assets/svg/mute.svg" alt="mute">';
  }
}

//смена позиции сладера
function change_duration() {
  slider_position = audio.duration * (slider.value / 100);
  audio.currentTime = slider_position;
}

//автоповтор
function autoplay_switch() {
  if (autoplay === 1) {
    autoplay = 0;
    auto_play.innerHTML =
      '<img src="./assets/svg/switch-active.svg" alt="sw-active">';
  } else {
    autoplay = 1;
    auto_play.innerHTML = '<img src="./assets/svg/switch.svg" alt="sw">';
  }
}

//запуск следующей песни когда закончилась проигрываемая
audio.onended = () => {
  playBtn.innerHTML = '<img src="./assets/svg/play.svg" alt="play">';
  document
    .querySelector(`.fu${playNum}`)
    .setAttribute("src", "./assets/svg/play2.svg ");
  // arrPlaylist.forEach((e) => e.classList.remove("item-active"));
  // time_song.innerHTML = "00:00";
  // realtime.innerHTML = "00:00";
  // slider.value = 0;

  if (autoplay === 1) {
    if (playNum < playlist.length - 1) {
      playNum++;
      load_audio(playNum);
      playsong();
    } else {
      playNum = 0;
      load_audio(playNum);
      playsong();
    }
  }
};
//обновление позиции слайдера
function range_slider() {
  let position = 0;

  //обновление позиции слайдера
  if (!isNaN(audio.duration)) {
    position = audio.currentTime * (100 / audio.duration);
    slider.value = position;
  }
}
function updateProgressValue() {
  time_song.innerHTML = convertTime(Math.floor(audio.currentTime));
  if (realtime.innerHTML === "NaN:NaN") {
    realtime.innerHTML = "0:00";
  } else {
    realtime.innerHTML = convertTime(Math.floor(audio.duration));
  }
}
setInterval(updateProgressValue, 500);

//конвертация времени
function convertTime(secondes) {
  let sec = secondes % 60;
  let min = Math.floor(secondes / 60);
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  return min + ":" + sec;
}
