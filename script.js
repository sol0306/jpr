let words = [];
let shuffledWords = [];
let currentIndex = 0;
let timer = 0;
let stopwatchInterval;

fetch('words_ja_unique_300.json?_=' + Date.now())
  .then(response => response.json())
  .then(data => {
    words = data;
    shuffleWords();
  });

function shuffleWords() {
  shuffledWords = [...words].sort(() => Math.random() - 0.5);
  currentIndex = 0;
}

function startApp() {
  document.getElementById("start_section").style.display = "none";
  document.getElementById("app_section").style.display = "block";
  generateWord();
}

function generateWord() {
  if (shuffledWords.length === 0) return;

  if (currentIndex >= shuffledWords.length) {
    shuffleWords();
  }

  const random = shuffledWords[currentIndex++];

  // HTML에서 접두어 출력하므로 여기선 값만 입력
  document.getElementById("jp_word_display").innerText = `単語: ${random.jp_word}`;
  document.getElementById("jp_pronunciation").innerText = random.jp_pronunciation;
  document.getElementById("ko_meaning").innerText = random.ko_meaning;

  document.getElementById("jp_display").style.display = "none";
  document.getElementById("meaning_display").style.display = "none";

  document.getElementById("btn_show_jp").style.display = "inline-block";
  document.getElementById("btn_show_meaning").style.display = "none";
  document.getElementById("btn_next").style.display = "none";
  document.getElementById("btn_stop").style.display = "none";

  clearInterval(stopwatchInterval);
  timer = 0;
  document.getElementById("stopwatch").innerText = "タイマー: 00:00";
  stopwatchInterval = setInterval(updateStopwatch, 1000);
}

function revealJapanese() {
  document.getElementById("jp_display").style.display = "block";
  document.getElementById("btn_show_jp").style.display = "none";
  document.getElementById("btn_show_meaning").style.display = "inline-block";
}

function revealMeaning() {
  document.getElementById("meaning_display").style.display = "block";
  document.getElementById("btn_show_meaning").style.display = "none";
  document.getElementById("btn_next").style.display = "inline-block";
  document.getElementById("btn_stop").style.display = "inline-block";
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
}

function updateStopwatch() {
  timer++;
  const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
  const seconds = String(timer % 60).padStart(2, '0');
  document.getElementById("stopwatch").innerText = `タイマー: ${minutes}:${seconds}`;
}
