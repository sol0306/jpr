let words = [];
let timer = 0;
let stopwatchInterval;
let lastWord = null;

fetch('words.json')
  .then(response => response.json())
  .then(data => {
    words = data;
  });

function startApp() {
  document.getElementById("start_section").style.display = "none";
  document.getElementById("app_section").style.display = "block";
  generateWord();
}

function generateWord() {
  if (words.length === 0) return;

  let random;
  do {
    random = words[Math.floor(Math.random() * words.length)];
  } while (random.word === lastWord?.word); // 중복 방지

  lastWord = random;

  document.getElementById("word_display").innerText = `単語: ${random.word}`;
  document.getElementById("jp_word").innerText = random.ko_word;
  document.getElementById("jp_meaning").innerText = random.ko_meaning;

  // UI 초기화
  document.getElementById("jp_display").style.display = "none";
  document.getElementById("meaning_display").style.display = "none";

  document.getElementById("btn_show_jp").style.display = "inline-block";
  document.getElementById("btn_show_meaning").style.display = "none";
  document.getElementById("btn_next").style.display = "none";
  document.getElementById("btn_stop").style.display = "none";

  // 스톱워치 초기화
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
