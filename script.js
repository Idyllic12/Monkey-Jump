const game = document.getElementById("game");
const monkey = document.getElementById("monkey");
const scoreEl = document.getElementById("score");

let monkeyLeft = 185;
let monkeyBottom = 120;
let velocity = 0;

const gravity = 0.4;
const jumpPower = 10;

let branches = [];
let score = 0;
let running = true;

/* ---------- Controls ---------- */

function moveLeft() {
  monkeyLeft = Math.max(0, monkeyLeft - 20);
  monkey.style.left = monkeyLeft + "px";
}

function moveRight() {
  monkeyLeft = Math.min(370, monkeyLeft + 20);
  monkey.style.left = monkeyLeft + "px";
}

document.getElementById("left").onclick = moveLeft;
document.getElementById("right").onclick = moveRight;

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") moveLeft();
  if (e.key === "ArrowRight") moveRight();
});

/* ---------- Branch Logic ---------- */

function createBranch(bottom) {
  const branch = document.createElement("div");
  branch.className = "branch";

  const img = document.createElement("img");
  img.src = "images/branch.png";
  branch.appendChild(img);

  const left = Math.random() * 260;

  branch.style.left = left + "px";
  branch.style.bottom = bottom + "px";

  game.appendChild(branch);

  branches.push({
    el: branch,
    left: left,
    bottom: bottom
  });
}

function moveBranches() {
  branches.forEach((b, i) => {
    b.bottom -= 1.5;
    b.el.style.bottom = b.bottom + "px";

    if (b.bottom < -40) {
      b.el.remove();
      branches.splice(i, 1);
      createBranch(520);
    }
  });
}

/* ---------- Physics Loop ---------- */

function update() {
  if (!running) return;

  velocity -= gravity;
  monkeyBottom += velocity;

  if (monkeyBottom <= 0) {
    gameOver();
    return;
  }

  branches.forEach(b => {
    if (
      monkeyBottom <= b.bottom + 30 &&
      monkeyBottom >= b.bottom &&
      monkeyLeft + 50 > b.left &&
      monkeyLeft < b.left + 140 &&
      velocity < 0
    ) {
      velocity = jumpPower;
      score += 10;
      scoreEl.textContent = score;
    }
  });

  monkey.style.bottom = monkeyBottom + "px";
  requestAnimationFrame(update);
}

/* ---------- Game Over ---------- */

function gameOver() {
  running = false;
  alert("Game Over! Score: " + score);
  location.reload();
}

/* ---------- Start Game ---------- */

createBranch(100);
createBranch(260);
createBranch(420);

setInterval(moveBranches, 20);
update();
