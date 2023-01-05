// TIME AND DATE
const time = document.querySelector('.time');
const date = document.querySelector('.date');
//GREETING
const greeting = document.querySelector('.greeting');
const greetingNameInput = document.querySelector('.name');
//IMAGE SLIDER
const body = document.querySelector('body');
let randomNum = getRandomNum(1, 20);
const prevBtn = document.querySelector('.slide-prev');
const nextBtn = document.querySelector('.slide-next');
let city;
const userCity = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuoteBtn = document.querySelector('.change-quote');
const quotesLength = 7;
let quotRandomNumber = getRandomNum(0, (quotesLength - 1)); 
let quotesNumbers = [];
const ruBtn = document.querySelector('.ru-btn');
const enBtn = document.querySelector('.en-btn');
const toggleAudioBtn = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
const playlistContainer = document.querySelector('.play-list');
const audio = new Audio();
let playNum = 0;
const volumeLine = document.querySelector('.volume-slider');
let mousedown = false;
const timeLine = document.querySelector(".timeline");
const audioName = document.querySelector('.audio-name-text');
let isPlay = false;


const msInLang = {
  ru : 'м/с',
  en : 'm/s'
};

let language = 'en';

// const dateLang = {
//     ru : 'ru-Ru',
//     en : 'en-Us'
// };

// const placeholderLang = {
//     ru : '[Введите имя]',
//     en : '[Enter name]'
// }

const playList = [
  {      
    title: 'Aqua Caelestis',
    src: './assets/sounds/Aqua-Caelestis.mp3',
    duration: '00:58'
  },  
  {      
    title: 'River Flows In You',
    src: './assets/sounds/River-Flows-In-You.mp3',
    duration: '03:50'
  },
  {      
      title: 'Ennio Morricone',
      src: './assets/sounds/Ennio-Morricone.mp3',
      duration: '00:58'
  },
  {      
      title: 'Summer Wind',
      src: './assets/sounds/Summer-Wind.mp3',
      duration: '00:58'
  }
];




(function showTime() {
  const newDate = new Date();
  const currentTime = newDate.toLocaleTimeString();
  time.textContent = `${currentTime}`;
  showDate();
  getTimeOfDay();
  showGreeting();
  setTimeout(showTime, 1000);
})();

function showDate() {
  const newDate = new Date();
  const currentDateOptions = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'}
  const currentDate = newDate.toLocaleDateString('en-US', currentDateOptions);
  date.textContent = `${currentDate}`;
};


//GREETING
function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  let timeOfDay;

  if (hours >= 0 && hours < 6) {
      timeOfDay = 'Night';
  } else if (hours >= 6 && hours < 12) {
      timeOfDay = 'Morning';
  } else if (hours >= 12 && hours < 18) {
      timeOfDay = 'Afternoon';
  } else if (hours >= 18 ) {
      timeOfDay = 'Evening';
  }

  return timeOfDay;
};

function showGreeting () {
  greeting.textContent = `Good ${getTimeOfDay()}`;
};

function setLocalStorage() {
  localStorage.setItem('name', greetingNameInput.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage);

//IMAGE SLIDER
function getRandomNum(n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}

function setBG() { 
  const img = new Image();
  let imgLink = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay().toLocaleLowerCase()}/${randomNum.toString().padStart(2, 0)}.jpg`

  img.src = `${imgLink}`;
  
  img.onload = () => {      
    body.style.backgroundImage = `url(${img.src})`;
  };
}

setBG();

function getSlideNext() {
  if (randomNum < 20) {
      randomNum++;
      setBG();
  } else {
      randomNum = 1;
      setBG();
  }
}
nextBtn.addEventListener('click', getSlideNext);

function getSlidePrev() {
  if (randomNum > 1) {
      randomNum--;
      setBG();
  } else {
      randomNum = 20;
      setBG();
  }
}
prevBtn.addEventListener('click', getSlidePrev);



//WEATHER
if (localStorage.getItem('userCity')) {
  city = localStorage.getItem('userCity');
  userCity.value = localStorage.getItem('userCity');
} else {
  city = 'Minsk';
  userCity.value = 'Minsk';
}
async function getWeather(c, l, m) { 
  try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${c}&lang=${l}&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
      const res = await fetch(url);
      const data = await res.json(); 

      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${Math.round(Number(data.main.temp))}°C`;
      weatherDescription.textContent = data.weather[0].description;

      wind.textContent = `${Math.round(Number(data.wind.speed))}${m}`;
      humidity.textContent = `${Math.round(Number(data.main.humidity))}%`;      
      
      localStorage.setItem('userCity', userCity.value);
      userCity.value = data.name;
  } catch (e) {
      userCity.value = 'Please, enter city';
      console.log(`Error! ${e}`);
  }
}

getWeather(city, language, msInLang[language]);

userCity.addEventListener('change', function() {
  getWeather(userCity.value, language, msInLang[language]);
});




//QUOTE
// async function getQuotes(lang) {  
//   const quotes = 'data.json';
//   const res = await fetch(quotes);
//   const data = await res.json(); 
//   console.log(data);
//   quote.textContent = data[quotRandomNumber][lang].text;
//   author.textContent = data[quotRandomNumber][lang].author;

//   quotesNumbers.push(quotRandomNumber);
// }
// getQuotes(language);

// changeQuoteBtn.addEventListener('click', function() {
//   quotRandomNumber = getRandomNum(0, (quotesLength - 1));
//   getQuotes(language);
// });


//RU-ENG TOGGLE
// ruBtn.addEventListener('click', function() {
//   language = 'ru';
//   getWeather(userCity.value, language, ms[language]);
//   nameInput.placeholder = placeholderLang[language];
//   showTime();
//   quotRandomNumber = quotesNumbers[quotesNumbers.length - 1];
//   getQuotes(language);
// });

// enBtn.addEventListener('click', function() {
//   language = 'en'; 
//   getWeather(userCity.value, language, ms[language]);
//   nameInput.placeholder = placeholderLang[language];
//   showTime();
//   quotRandomNumber = quotesNumbers[quotesNumbers.length - 1];
//   getQuotes(language);
// });




// AUDIO
playList.forEach(el => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = el.title;
  li.setAttribute('data-src', el.src);
  playlistContainer.append(li);
});

const playItems = document.querySelectorAll('.play-item');

function playAudio() { 
  if (!isPlay) {
      audio.src = playList[playNum].src;
      audio.currentTime = 0;
      audio.play();
      
      audioName.textContent = playList[playNum].title;

      isPlay = true;
  } else {
      audio.pause();
      isPlay = false;
  }

  toggleAudioIcon();
  let currentAudio = document.querySelector(`[data-src="${playList[playNum].src}"]`);
  playItems.forEach(item => item.classList.remove('item-active'));
  currentAudio.classList.add('item-active');
}

function toggleAudioIcon() { 
  if (isPlay) {
      toggleAudioBtn.classList.add('pause');
  } else {
      toggleAudioBtn.classList.remove('pause');
  }
}

function prevAudio() {
  isPlay = false;

  if (playNum > 0) {
      playNum--;
  } else {
      playNum = playList.length - 1;
  }

  playAudio();
  toggleAudioIcon();
}

function nextAudio() {
  isPlay = false;

  if (playNum < playList.length - 1) {
      playNum++;
  } else {
      playNum = 0;
  }  

  playAudio();
  toggleAudioIcon();
}

toggleAudioBtn.addEventListener('click', playAudio);

playPrevBtn.addEventListener('click', prevAudio);
playNextBtn.addEventListener('click', nextAudio);

audio.addEventListener('ended', nextAudio);

