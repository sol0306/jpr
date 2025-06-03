let words = [];
let shuffledWords = [];
let currentIndex = 0;
let timer = 0;
let stopwatchInterval;

fetch('words_ja_unique_300.json?_=' + Date.now())
  .then(response => response.json())
  .then(data => {
    words = data;
    shuffleWords(); // 처음 셔플
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
    shuffleWords(); // 모든 단어 다 본 경우 다시 셔플
  }

  const random = shuffledWords[currentIndex++];

  // 필드명에 맞게 수정
  document.getElementById("jp_word_display").innerText = `単語: ${random.jp_word}`;
  document.getElementById("jp_pronunciation").innerText = `読み方: ${random.jp_pronunciation}`;
  document.getElementById("ko_meaning").innerText = `뜻: ${random.ko_meaning}`;

  // 초기 상태 설정
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
