const playList = [
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

const playerBtn = document.querySelectorAll(".player-icon");
const playListContainer = document.querySelector(".play-list");
const audio = new Audio();
let isPlay = false;
let playNum = 0;
const [prevBtn, playBtn, nextBtn] = playerBtn;
const tick = document.getElementsByClassName("play-item");

function playAudio() {
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  audio.play();
  tick[playNum].classList.add("item-active");
}
function startPlay() {
  if (!isPlay) {
    playAudio();
    isPlay = true;
  } else {
    audio.pause();
    isPlay = false;
  }
}

function toggleBtn() {
  playBtn.classList.toggle("pause");
}
playBtn.addEventListener("click", () => {
  toggleBtn();
  startPlay();
});
nextBtn.addEventListener("click", () => {
  playNext();
});
prevBtn.addEventListener("click", () => {
  playPrev();
});

function playNext() {
  if (playBtn.classList.contains("pause")) {
    if (playNum === playList.length - 1) {
      playNum = 0;
    } else {
      playNum = playNum + 1;
    }
    if (isPlay) {
      isPlay;
      tick[playNum].classList.add("item-active");
      if (playNum !== 0) {
        tick[playNum - 1].classList.remove("item-active");
      }
      if (playNum === 0) {
        tick[playList.length - 1].classList.remove("item-active");
      }
    }
    return playAudio();
  }
}

function playPrev() {
  if (playBtn.classList.contains("pause")) {
    if (playNum === 0) {
      playNum = playList.length - 1;
    } else {
      playNum = playNum - 1;
    }
    if (isPlay) {
      isPlay;
      tick[playNum].classList.add("item-active");
      if (playNum !== playList.length - 1) {
        tick[playNum + 1].classList.remove("item-active");
      }
      if (playNum === playList.length - 1) {
        tick[0].classList.remove("item-active");
      }
    }
    return playAudio();
  }
}

function getPlaylist() {
  playList.forEach((el) => {
    const li = document.createElement("li");
    li.classList.add("play-item");
    li.textContent = el.title;
    playListContainer.append(li);
  });
}

audio.onended = function () {
  if (playNum < playList.length - 1) {
    tick[playNum + 1].classList.add("item-active");
    tick[playNum].classList.remove("item-active");
    playNum++;
    this.src = playList[playNum].src;
    this.play();
  } else {
    tick[playList.length - 1].classList.remove("item-active");
    playNum = 0;
    playAudio();
  }
};
//
// playNext.addEventListener('click', ()=>{
//   playNext();
// })
// playPrev.addEventListener('click', ()=>{
//   playPrev();
// })
// if (isPlay) {
// isPlay;
// if (playNum !== playList.length - 1) {
//     tick[playNum + 1].classList.add("item-active");
//     tick[playNum].classList.remove("item-active");

//     // tick[playList.length - 1].classList.remove("item-active");
//     if (playNum == playList.length) {
//       tick[playList.length - 1].classList.remove("item-active");
//       playNum = 0;
//       playAudio()
//  } else{
//    playNum++;
//    this.src = playList[playNum].src;
//    this.play();
//  }
// tick[playList.length - 1].classList.remove("item-active");
//       playNum = 0;
//       playAudio()

// function resizeIconPlay() {

//     playBtn.style.width = "200px";
//     playBtn.style.width = "200px";

// }
