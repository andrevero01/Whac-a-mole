import Timer from "../classes/Timer.js";
window.onload = () => {
  const canvas = document.getElementById("grid");
  const ctx = canvas.getContext("2d");

  //Drawing GRID
  const squareSize = 150;
  const horizontalLength = 4;
  const verticalLength = 4;
  canvas.setAttribute("width", squareSize * horizontalLength);
  canvas.setAttribute("height", squareSize * verticalLength);

  function drawGrid() {
    for (let row = 0; row < horizontalLength; row++) {
      for (let col = 0; col < verticalLength; col++) {
        const x = col * squareSize;
        const y = row * squareSize;
        ctx.strokeStyle = "#FFC0CB  ";
        ctx.strokeRect(x, y, squareSize, squareSize);
      }
    }
  }
  drawGrid();

  //CHARACTERS and gameover images
  const dolores = new Image();
  dolores.src = "/src/dolores final 4.webp";

  const dobby = new Image();
  dobby.src = "/src/dobby1.jpg";

  const finalDobby = new Image();
  finalDobby.src = "/src/dobby.webp";

  const deadDobby = new Image();
  deadDobby.src = "/src/final dead dobby.jpg";

  //Global variables
  let intervalID;
  let activeSquare = { x: -100, y: -100 };
  let isDobby = false;

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
    highScore.textContent = `Highscore:  ${highScoreCount}`;
  }

  updateScore();
  updateHighScore();

  // Lives update
  let dobbyLife = 3;
  function updateLives() {
    const lives = document.querySelector("#dobby-life");
    lives.textContent = `Lives: ${dobbyLife}`;
  }
  updateLives();

  //TIMER
  const timer = new Timer();
  timer.drawTimer();

  //Start game
  document.querySelector(".start-btn").onclick = () => {
    intervalID = setInterval(playGame, 1000);
  };

  // Event to detect the coordinate of the mouse click using detectCollision function
  document.addEventListener("click", function (event) {
    detectCollision(event.offsetX, event.offsetY, squareSize);
  });

  //SQUARES - Draw random character according to play game interval (1 second)
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
    // Clear square and draw outline after 7 seconds
    setTimeout(() => {
      ctx.clearRect(activeSquare.x, activeSquare.y, squareSize, squareSize);
      ctx.strokeRect(activeSquare.x, activeSquare.y, squareSize, squareSize);
    }, 700);
  }

  // Detect collision an update score or end game accordingly
  function detectCollision(x, y, squareSize) {
    if (
      x >= activeSquare.x &&
      x <= activeSquare.x + squareSize &&
      y >= activeSquare.y &&
      y <= activeSquare.y + squareSize
    ) {
      if (isDobby) {
        dobbyLife--;
        updateLives();
        if (dobbyLife <= 0) {
          gameOverDobby();
          updateHighScore();
        }
      } else {
        scoreCount++;
        updateScore();
      }
    }
  }

  //PLAY GAME
  function playGame() {
    if (timer.remainingSeconds < 40) {
      clearInterval(intervalID);
      intervalID = setInterval(playGame, 800);
    }
    if (timer.remainingSeconds < 20) {
      clearInterval(intervalID);
      intervalID = setInterval(playGame, 730);
    }
    isDobby = false;
    timer.updateTimer();
    if (Math.random() < 0.8) {
      getRandomSquare(dolores);
    } else {
      isDobby = true;
      getRandomSquare(dobby);
    }
    if (timer.remainingSeconds <= 0) {
      gameOverDolores();
      updateHighScore();
    }
  }

  // GAME OVER
  function gameOverDolores() {
    clearInterval(intervalID);
    setTimeout(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(finalDobby, 0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#fff";
      ctx.font = "65px Magic owl";
      ctx.textAlign = "center";
      ctx.fillText(
        "Great job!!   Your score: " + scoreCount,
        canvas.width / 2,
        60
      );
    }, 700);
  }

  function gameOverDobby() {
    clearInterval(intervalID);
    setTimeout(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(deadDobby, 0, 0, canvas.width, canvas.height);
      ctx.font = "70px Magic owl";
      ctx.fillStyle = "#af1c37";
      ctx.textAlign = "center";
      ctx.fillText(
        "Oh  no! Your score: ",
        canvas.width / 2,
        canvas.height - 80
      );
      ctx.fillText(scoreCount, canvas.width / 2, canvas.height - 25);
    }, 700);
  }

  //RESTART
  document.querySelector(".restart-btn").onclick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    scoreCount = 0;
    updateScore();
    dobbyLife = 3;
    updateLives();
    timer.resetTimer();
    intervalID = setInterval(playGame, 1000);
  };
};
