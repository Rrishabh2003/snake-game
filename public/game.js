const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 10;
let snake = [{ x: 100, y: 100 }];
let food = { x: 200, y: 200 };
let direction = "right";
let score = 0;

const scoreElement = document.getElementById("score");

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  
  ctx.fillStyle = "black";
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });

  ctx.fillStyle = "#ff6347";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function update() {
  let head = { ...snake[0] };
  switch (direction) {
    case "up":
      head.y -= gridSize;
      break;
    case "down":
      head.y += gridSize;
      break;
    case "left":
      head.x -= gridSize;
      break;
    case "right":
      head.x += gridSize;
      break;
  }

  //collision with walls
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height
  ) {
    alert("Game Over! Your score is " + score);
    resetGame();
    return;
  }

  //collision with food
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreElement.textContent = score;
    snake.unshift({ ...head });
    generateFood();
  } else {
    snake.pop();
    snake.unshift({ ...head });
  }
}

function generateFood() {
  food.x = Math.floor(Math.random() * canvas.width / gridSize) * gridSize;
  food.y = Math.floor(Math.random() * canvas.height / gridSize) * gridSize;
}

function resetGame() {
  snake = [{ x: 100, y: 100 }];
  direction = "right";
  score = 0;
  scoreElement.textContent = score;
  generateFood();
}

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
    case "ArrowRight":
      direction = "right";
      break;
  }
});

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

generateFood();
gameLoop();
