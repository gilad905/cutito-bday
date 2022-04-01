const starBeziers = [
  [0.85, -0.03, 1, 1],
  [0.41, -0.27, 1, 1],
  [0.6, -0.1, 1, 1],
  [0.7, -0.2, 1, 1],
];
const starChars = ["sext", "#x2735"];
// const starChars = ["sext", "#x2735", "#x272F", "#10039"];
const starCount = 20;
const starXClassCount = 20;
const starRotateClassCount = 2;

// const startImmiediately = true;
const startImmiediately = false;

const heart = document.querySelector("#heart");
let audio;

const playTimers = {
  audio: 0,
  skyScroll: 0,
  sliders: 1.5,
  attributions: 10,
  heart: 12,
  bday: 19,
};

const inits = {
  audio: function() {
    audio = new Audio("./media/burbujas w voice 2.mp3");
    audio.onended = _ => {
      audio.currentTime = 5.75;
      audio.play();
    };
  },
  heart: function() {
    const starTemplate = document.querySelector("#template-star");
    for (let i = 0; i < starCount; i++)
      initStar(starTemplate, i);
  },
  attributions: function() {
    const attributions = document.querySelector("#attributions");
    attributions.querySelector("img").onclick = function() {
      attributions.classList.toggle("open");
    };
  },
};

const players = {
  audio: function() {
    audio.play();
  },
  skyScroll: function() {
    document.querySelector("#sky").classList.add("sky-scroll");
  },
  sliders: function() {
    for (const el of document.querySelectorAll(".slider"))
      el.classList.add("sliding");
  },
  heart: function() {
    heart.classList.add("shown");
  },
  attributions: function() {
    attributions.classList.add("shown");
  },
  bday: function() {
    document.querySelector("#bday").classList.add("flying");
  },
};

function initStar(template, i) {
  const star = template.content.firstElementChild.cloneNode();
  const char = itemAtLoop(starChars, i);
  const bezier = itemAtLoop(starBeziers, i).join(',');
  const xI = (i % starXClassCount) + 1;
  const rotateI = (i % starRotateClassCount) + 1;

  star.innerHTML = `&${char};`;
  star.style.animation = `
    star-x-${xI} linear,
    star-rotate-${rotateI} ease-in-out,
    star-y cubic-bezier(${bezier})
  `;

  heart.querySelector("#stars-wrap").appendChild(star);
}

function play() {
  const playWrap = document.querySelector("#play-wrap");
  playWrap.ontransitionend = _ => playWrap.style.display = "none";
  playWrap.classList.remove("shown");

  for (const key in players) {
    const time = (startImmiediately ? 0 : playTimers[key] * 1000)
    setTimeout(players[key], time);
  }
}

function init() {
  for (const key in inits)
    inits[key]();

  if (startImmiediately)
    play();
  else
    document.querySelector("#play-button").onclick = play;
}

function itemAtLoop(arr, i) {
  return arr[i % arr.length];
}

init();
