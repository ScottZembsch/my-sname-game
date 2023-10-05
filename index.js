const canvas = document.getElementById('game');
const canvasContext = canvas.getContext('2d');
const scoreVal = document.getElementById('scoreVal')


class SnakePart{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}


let speed = 7;
let score = 0;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeBody = [];
let tailLength = 0;

let foodX = Math.floor(Math.random() * tileCount);;
let foodY = Math.floor(Math.random() * tileCount);;

let xVel = 0;
let yVel = 0;

// GAME LOOP
function drawGame(){
  changeSnakePosition();
  let result = isGameOver();
  if (result) return;
  clearScreen();
  checkEatFood();
  drawFood();
  drawSnake();
  setTimeout(drawGame, 1000/speed);
}

function isGameOver(){
  let gameOver = false;

  // walls
  if (headX < 0 || headX === tileCount || headY < 0 || headY === tileCount){
    gameOver = true;
  } 

  for (let i = 0; i < snakeBody.length; i++){
    let part = snakeBody[i];
    if (part.x === headX && part.y === headY){
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    canvasContext.fillStyle = "white";
    canvasContext.font = "50px Arial"
    canvasContext.fillText('Game Over',canvas.width / 6.5, canvas.height / 2);
  }
  return gameOver;
}

function clearScreen(){
  canvasContext.fillStyle = 'black';
  canvasContext.fillRect(0,0, canvas.width , canvas.height)
}

function changeSnakePosition(){
  headX = headX + xVel;
  headY = headY + yVel
}

function checkEatFood(){
  if (foodX === headX && foodY === headY){
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
    updateScore();
  }
}

function drawFood(){
  canvasContext.fillStyle = 'red';
  canvasContext.fillRect(foodX * tileCount, foodY * tileCount, tileSize , tileSize)
}


function drawSnake(){
  canvasContext.fillStyle = 'green';
  canvasContext.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)
  canvasContext.fillStyle = 'yellow';
  for (let i = 0; i < snakeBody.length; i++){
    let part = snakeBody[i];
    canvasContext.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }
  snakeBody.push(new SnakePart(headX, headY));
  while (snakeBody.length > tailLength){
    snakeBody.shift();
  }
}

function updateScore() {
  scoreVal.innerHTML = score;
}




document.body.addEventListener('keydown', keyDown);

//MOVEMENT LOGIC
function keyDown(event){
  //up
  if (event.keyCode === 38){
    if (yVel === 1) return;
    yVel = -1;
    xVel = 0;
  }
  //down
  if (event.keyCode === 40){
    if (yVel === -1) return;
    yVel = 1;
    xVel = 0;
  }
    //left
    if (event.keyCode === 37){
      if (xVel === 1) return;
      yVel = 0;
      xVel = -1;
    }
      //right
  if (event.keyCode === 39){
    if (xVel === -1) return;
    yVel = 0;
    xVel = 1;
  }
}

drawGame();