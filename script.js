const grid = document.getElementById('grid');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const finalScoreEl = document.getElementById('finalScore');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const gameOverMsg = document.getElementById('gameOverMsg');
const playAgainBtn = document.getElementById('playAgainBtn');

let score = 0;
let time = 30;
let moleInterval;
let timerInterval;
let currentMole = null;

// Create 9 holes
for (let i = 0; i < 9; i++) {
  const hole = document.createElement('div');
  hole.classList.add('hole');
  hole.dataset.index = i;
  grid.appendChild(hole);
}

// Mole click detection
grid.addEventListener('click', (e) => {
  if (!e.target.classList.contains('hole')) return;
  if (e.target.classList.contains('mole')) {
    score++;
    scoreEl.textContent = score;
    e.target.classList.remove('mole');
    currentMole = null;
  }
});

function showMole() {
  const holes = document.querySelectorAll('.hole');
  holes.forEach(hole => hole.classList.remove('mole'));
  const index = Math.floor(Math.random() * holes.length);
  holes[index].classList.add('mole');
  currentMole = index;
}

function startGame() {
  score = 0;
  time = 30;
  scoreEl.textContent = score;
  timerEl.textContent = time;
  gameOverMsg.style.display = 'none';
  startBtn.disabled = true;
  resetBtn.disabled = false;

  showMole();
  moleInterval = setInterval(showMole, 1000);
  timerInterval = setInterval(() => {
    time--;
    timerEl.textContent = time;
    if (time <= 0) endGame();
  }, 1000);
}

function endGame() {
  clearInterval(moleInterval);
  clearInterval(timerInterval);
  const holes = document.querySelectorAll('.hole');
  holes.forEach(hole => hole.classList.remove('mole'));
  gameOverMsg.style.display = 'block';
  finalScoreEl.textContent = score;
  startBtn.disabled = false;
  resetBtn.disabled = false;
}

function resetGame() {
  clearInterval(moleInterval);
  clearInterval(timerInterval);
  score = 0;
  time = 30;
  scoreEl.textContent = score;
  timerEl.textContent = time;
  const holes = document.querySelectorAll('.hole');
  holes.forEach(hole => hole.classList.remove('mole'));
  gameOverMsg.style.display = 'none';
  startBtn.disabled = false;
}

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
playAgainBtn.addEventListener('click', startGame);

// Initialize with reset
resetGame();
