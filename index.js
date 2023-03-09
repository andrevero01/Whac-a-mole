const canvas = document.getElementById("grid");
const ctx = canvas.getContext("2d");

//GRID
const squareSize = 100;
for (let row = 0; row < 3; row++) {
  for (let col = 0; col < 3; col++) {
    const x = col * squareSize;
    const y = row * squareSize;
    ctx.strokeRect(x, y, squareSize, squareSize);
  }
}

//SQUARES
const squares = [
  { x: 0, y: 0 },
  { x: 100, y: 0 },
  { x: 200, y: 0 },
  { x: 0, y: 100 },
  { x: 100, y: 100 },
  { x: 200, y: 100 },
  { x: 0, y: 200 },
  { x: 100, y: 200 },
  { x: 200, y: 200 },
];

//Global variables
let intervalID;

// Game functions
document.getElementById("start-button").onclick = () => {
  startGame();
};

function startGame() {
  intervalID = setInterval(playGame, 1000);
}

function getRandomSquare() {
  const activeSquare = squares[Math.floor(Math.random() * squares.length)];
  console.log(activeSquare);
  ctx.fillStyle = "#000";
  ctx.fillRect(activeSquare.x, activeSquare.y, squareSize, squareSize);
  setTimeout(() => {
    ctx.clearRect(activeSquare.x, activeSquare.y, squareSize, squareSize);
    ctx.strokeRect(activeSquare.x, activeSquare.y, squareSize, squareSize);
  }, 700);
}

function playGame() {
  getRandomSquare();
}

const hitPosition = document.addEventListener("click", function (event) {
  console.log(`Mouse x:${event.clientX} , Screen y:${event.clientY}`);
});
