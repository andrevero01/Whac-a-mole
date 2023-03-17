import Timer from "../classes/Timer.js";
window.onload = () => {
  const canvas = document.getElementById("grid");
  const ctx = canvas.getContext("2d");

  //GRID
  const squareSize = 100;
  const horizontalLength = 4;
  const verticalLength = 4;
  canvas.setAttribute("width", squareSize * horizontalLength);
  canvas.setAttribute("height", squareSize * verticalLength);

  function drawGrid() {
    for (let row = 0; row < horizontalLength; row++) {
      for (let col = 0; col < verticalLength; col++) {
        const x = col * squareSize;
        const y = row * squareSize;
        ctx.strokeStyle = "#FFC0CB	";
        ctx.strokeRect(x, y, squareSize, squareSize);
      }
    }
  }
  drawGrid();

  //CHARACTERS
  const dolores = new Image();
  dolores.src = "/src/dolores umbridge.jpeg";

  const dobby = new Image();
  dobby.src = "/src/dobby1.jpg";

  const finalDobby = new Image();
  finalDobby.src = "/src/dobby.webp";

  const deadDobby = new Image();
  deadDobby.src = "/src/dobby-dead.png";

  //Global variables
  let intervalID;
  let activeSquare = { x: -100, y: -100 };
  let isHit = false;

  //SCORES
  let scoreCount = 0;
  function updateScore() {
    const score = document.querySelector("#score");
    score.textContent = `Score: ${scoreCount}`;
  }
  let highScoreCount = 0;
  function updateHighScore() {
    if (scoreCount > highScoreCount) {
      highScoreCount = scoreCount;
    }
    const highScore = document.querySelector("#highscore");
    highScore.textContent = `Highscore: ${highScoreCount}`;
  }

  updateScore();
  updateHighScore();

  //TIMER
  const timer = new Timer();

  //Start game
  document.querySelector(".start-btn").onclick = () => {
    intervalID = setInterval(playGame, 1000);
  };

  // Event to detect the coordinate of the mouse click using detectCollision function
  document.addEventListener("click", function (event) {
    detectCollision(event.offsetX, event.offsetY, squareSize);
  });

  function playGame() {
    timer.drawTimer();
    timer.updateTimer();
    if (Math.random() < 0.8) {
      getRandomSquare(dolores);
    } else {
      getRandomSquare(dobby);
      if (isHit) {
        gameOver();
        updateHighScore();
        console.log(isHit);
        return;
      }
    }
    updateScoreOnCollision();
    console.log(isHit);
    if (timer.remainingSeconds < 0) {
      gameOver();
      updateHighScore();
    }
  }

  //SQUARES
  function getRandomSquare(character) {
    activeSquare = {
      x: Math.floor(Math.random() * horizontalLength) * squareSize,
      y: Math.floor(Math.random() * verticalLength) * squareSize,
    };
    ctx.drawImage(
      character,
      activeSquare.x,
      activeSquare.y,
      squareSize,
      squareSize
    );
    setTimeout(() => {
      ctx.clearRect(activeSquare.x, activeSquare.y, squareSize, squareSize);
      ctx.strokeRect(activeSquare.x, activeSquare.y, squareSize, squareSize);
    }, 700);
  }

  function detectCollision(x, y, squareSize) {
    if (
      x >= activeSquare.x &&
      x <= activeSquare.x + squareSize &&
      y >= activeSquare.y &&
      y <= activeSquare.y + squareSize
    ) {
      isHit = true;
    }
    if (isHit === false) {
      console.log("no hit");
    }
  }

  function updateScoreOnCollision() {
    if (isHit) {
      scoreCount++;
      updateScore();
      isHit = false;
    }
  }

  function gameOver() {
    clearInterval(intervalID);
    setTimeout(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(finalDobby, 0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#fff";
      ctx.font = "35px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(
        "Great job!! Your score: " + scoreCount,
        canvas.width / 2,
        15
      );
    }, 700);
  }

  // function gameOverDobby() {
  //   clearInterval(intervalID);
  //   setTimeout(() => {
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);
  //     ctx.drawImage(deadDobby, 0, 0, canvas.width, canvas.height);
  //     ctx.font = "40px Arial";
  //     ctx.fillStyle = "#fff";
  //     ctx.textAlign = "center";
  //     ctx.textBaseline = "top";
  //     ctx.fillText("Oh no! Your score: " + scoreCount, canvas.width / 2, 15);
  //   }, 700);
  // }

  //RESTART
  document.querySelector(".restart-btn").onclick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    scoreCount = 0;
    timer.resetTimer();
    intervalID = setInterval(playGame, 1000);
  };
};
