// Documents
const mode = document.querySelector('.mode');
const photo = document.querySelector('.photo img');
const nameOfPerson = document.querySelector('.name-of-person');
const currentTimeEl = document.querySelector('.current-time');
const finishTimeEl = document.querySelector('.finish-time');
const progressEl = document.querySelector('.progress-el');
const progress = document.querySelector('.current-progress');
const heart = document.querySelector('.favorite');
const random = document.querySelector('.random');
const prevSong = document.querySelector('.prev');
const play = document.querySelector('.play');
const nextSong = document.querySelector('.next');
const audio = document.querySelector('#music');

// Variables 
let indexOfSong = 0;
let timeWidth = 0;

// Array 
const songs = ['tarek', 'alafasy', 'alghamdi'];

nameOfPerson.innerHTML = songs[indexOfSong];

// Function to random music from array 
random.addEventListener('click', () => {
  randomMusic(songs);
})
function randomMusic(array) {
  let randomSong = array[Math.floor(Math.random() * array.length)];
  indexOfSong = array.indexOf(randomSong);
  playMusic(array, indexOfSong);
}

// Function to prev song 
prevSong.addEventListener('click', () => {
  indexOfSong--;
  (indexOfSong < 0) ? indexOfSong = songs.length - 1 : false;
  playMusic(songs, indexOfSong);
  timeWidth = 0;
  updateProgress(audio);
  progress.style.width = '0';
})

// Function to next song 
nextSong.addEventListener('click', () => {
  increaseIndex(songs);
  timeWidth = 0;
  updateProgress(audio);
  progress.style.width = '0';
})

// function to increase the indexOfSong
function increaseIndex(array) {
  indexOfSong++;
  (indexOfSong > array.length - 1) ? indexOfSong = 0 : false;
  playMusic(array, indexOfSong);
}

// Function to play music
function playMusic(array, index) {
  photo.src = `Photos/${array[index]}.jpg`;
  nameOfPerson.innerHTML = array[index]; 
  if (array[index] == 'tarek') {
    audio.src = `audio/tarek.opus`;
  }

  else {
    audio.src = `audio/${array[index]}.mp3`;
  }

  if (play.classList.contains('add-music')) {
    audio.play();
  }

  else {
    audio.pause();
  }
}

// Function update audio progress
function updateProgress(music) {
  let { duration, currentTime } = music;
  (isNaN(duration)) ? duration = 0 : false; 

  timeWidth = currentTime;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  let secondsCurrent = Math.floor(currentTime);
  let minutesCurrent = Math.floor(currentTime / 60);

  let secondsFinish = Math.floor(duration);
  let minutesFinish = Math.floor(duration / 60);

  currentTimeEl.innerHTML = `${(minutesCurrent < 10) ? `0${minutesCurrent}` : minutesCurrent}:${(secondsCurrent - (minutesCurrent * 60) < 10) ? `0${secondsCurrent - (minutesCurrent * 60)}` : secondsCurrent - (minutesCurrent * 60)}`;
  finishTimeEl.innerHTML = `${(minutesFinish < 10) ? `0${minutesFinish}` : minutesFinish}:${(secondsFinish - (minutesFinish * 60) < 10) ? `0${secondsFinish - (minutesFinish * 60)}` : secondsFinish - (minutesFinish * 60)}`;
}

// Set progress bar 
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

progressEl.addEventListener('click', setProgress);

// Time song update
audio.addEventListener('timeupdate', () => {
  updateProgress(audio);
});

// Function to change dark to light mode and reverse
mode.addEventListener('click', () => {
  mode.classList.toggle("add");
  if (mode.classList.contains("add")) {
    lightMode();
  }

  else {
    darkMode();
  }

})

// Function to add favorite music
heart.addEventListener('click', () => {
  heart.classList.toggle('add-heart');
  if (heart.classList.contains('add-heart')) {
    heart.innerHTML = '<i class="fa-solid fa-heart"></i>';
  }

  else {
    heart.innerHTML = '<i class="fa-regular fa-heart"></i>';
  }

})

// Function to play or stop music
play.addEventListener('click', () => {
  play.classList.toggle('add-music');
  if (play.classList.contains('add-music')) {
    play.innerHTML = '<i class="fa-solid fa-pause"></i>';
    playMusic(songs, indexOfSong);
    audio.currentTime = timeWidth + .1;
    audio.play();
  }

  else {
    play.innerHTML = '<i class="fa-solid fa-play"></i>';
    audio.pause();
  }
})

// Function to make lightMode
function lightMode() {
  document.documentElement.style.setProperty('--darkColor', '#eee');
  document.documentElement.style.setProperty('--whiteColor', '#111');
  document.documentElement.style.setProperty('--shadowInDark', '#ccc');
  document.documentElement.style.setProperty('--shadowInLight', '#111');
}


// Function to make darkMode
function darkMode() {
  document.documentElement.style.setProperty('--darkColor', '#111');
  document.documentElement.style.setProperty('--whiteColor', '#fff');
  document.documentElement.style.setProperty('--shadowInDark', '#08090ad9');
  document.documentElement.style.setProperty('--shadowInLight', '#eee');
}
