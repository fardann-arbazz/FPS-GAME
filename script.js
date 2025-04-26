let score = 0;
let countDown;
let timerInterval;
let selectedGun = "img/gun 1.png"; 

const gameArea = document.getElementById("game-area");
const playerName = document.getElementById("player-name");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("time");
const crosshair = document.getElementById("crosshair");
const gunHand = document.getElementById("gun");
const targetContainer = document.getElementById("target-container");
const leaderboard = document.getElementById("leaderboard");
const impactEffect = document.getElementById("impact-effect");
const gunImg = document.querySelectorAll(".box-gun img");

const TARGET_COUNT = 3;

document.querySelector(".btn-2").addEventListener("click", function () {
  document.querySelector(".wrapper-instruction").style.display = "block";
});

document.querySelector(".btn-close").addEventListener("click", function () {
  document.querySelector(".wrapper-instruction").style.display = "none";
});

gunImg.forEach((img) => {
    img.addEventListener("click", function(){
        selectedGun = img.getAttribute("src");
        gunImg.forEach(i => i.style.border = "none");
        img.style.border = "3px solid yellow";
    })
})

function startGame() {
  document.querySelector(".start-menu").style.display = "none";
  document.querySelector(".game-box").style.display = "flex";
  leaderboard.style.display = "block";

  const username = document.getElementById("username").value.trim();
  const level = document.getElementById("level").value;

  document.body.classList.add("hide-cursor");
  document.getElementById("gun").setAttribute("src", selectedGun);

  if (!username) {
    alert("Please enter a username.");
    return;
  }

  if (!level || level === "Select level") {
    alert("Pease select a level");
    return;
  }

  playerName.innerText = username;
  countDown = parseInt(level);

  generateTarget(TARGET_COUNT);
  startTimer();
}

document.addEventListener("mousemove", function (e) {
  const gameAreaRect = gameArea.getBoundingClientRect();

  let mouseX = e.clientX;
  let mouseY = e.clientY;

  if (mouseX < gameAreaRect.left) mouseX = gameAreaRect.left;
  if (mouseX > gameAreaRect.right) mouseX = gameAreaRect.right;
  if (mouseY < gameAreaRect.top) mouseY = gameAreaRect.top;
  if (mouseY > gameAreaRect.bottom) mouseY = gameAreaRect.bottom;

  crosshair.style.left = `${mouseX - 30}px`;
  crosshair.style.top = `${mouseY - 30}px`;

  gunHand.style.left = `${mouseX - 30}px`;
});

document.addEventListener("click", function (e) {
  const clickX = e.clientX;
  const clickY = e.clientY;

  const targets = document.querySelectorAll(".target");
  targets.forEach((target) => {
    const targetRect = target.getBoundingClientRect();
    if (
      clickX >= targetRect.left &&
      clickX <= targetRect.right &&
      clickY >= targetRect.top &&
      clickY <= targetRect.bottom
    ) {
      score += 10;
      scoreDisplay.innerText = score;

      showImpact(clickX, clickY);
      target.remove();
      spawnTarget();
    }
  });
});

function spawnTarget() {
  const gameAreaRect = gameArea.getBoundingClientRect();

  const maxX = gameAreaRect.width - 100;
  const maxY = (gameAreaRect.height * 0.7) - 100;

  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);

  const newTarget = document.createElement("div");
  newTarget.classList.add("target");
  newTarget.style.left = `${x}px`;
  newTarget.style.top = `${y}px`;
  newTarget.style.position = "absolute";

  targetContainer.appendChild(newTarget);
}

function generateTarget(count) {
  targetContainer.innerHTML = "";
  for (let i = 0; i < count; i++) {
    spawnTarget();
  }
}

function showImpact(x, y) {
  impactEffect.style.left = `${x - 30}px`;
  impactEffect.style.top = `${y - 30}px`;
  impactEffect.style.display = "block";

  setTimeout(() => {
    impactEffect.style.display = "none";
  }, 300);
}

function startTimer() {
    timerInterval = setInterval(() => {
        countDown--;
        timerDisplay.textContent = `00:${countDown < 10 ? "0" + countDown : countDown}`
        if(countDown <= 0) {
            clearInterval(timerInterval)
            alert("Game Over! Your score is " + score);
            location.reload();
        }
    }, 1000)
}
