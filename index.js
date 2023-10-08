const canvas = document.getElementById('game');
const canvasContext = canvas.getContext('2d');
const scoreVal = document.getElementById('scoreVal')
const song = new Audio("audio/gameAudio.mp3")
const endSong = new Audio("/audio/gameEnd.mp3")
const toot = new Audio("audio/train-toot.mp3")
const trainHead = document.querySelector(".train-head")
const caboose = document.querySelector('.caboose')
const background = new Image();
background.src = "images/46636562-seamless-pattern-railway-with-trains.jpg"

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
    song.pause();
    endSong.play();
    canvasContext.fillStyle = "white";
    canvasContext.font = "50px Arial"
    canvasContext.fillText('Game Over',canvas.width / 6.5, canvas.height / 2);
  }

  return gameOver;
}

function clearScreen(){
  canvasContext.fillStyle = '#3392ff';
  canvasContext.fillRect(0,0, canvas.width , canvas.height)
}

// background.onload = function(){
//   canvasContext.drawImage(background,0,0)
// }


function changeSnakePosition(){
  headX = headX + xVel;
  headY = headY + yVel
}

function checkEatFood(){
  if (foodX === headX && foodY === headY){
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
    toot.play();
    tailLength++;
    score++;
    speed += .2;
    updateScore();
  }
}

function drawFood(){
  canvasContext.drawImage(caboose,foodX * tileCount, foodY * tileCount, tileSize + 4, tileSize + 4)
  // canvasContext.fillStyle = 'red';
  // canvasContext.fillRect(foodX * tileCount, foodY * tileCount, tileSize , tileSize)
}


function drawSnake(){
  canvasContext.drawImage(trainHead,headX * tileCount, headY * tileCount, tileSize + 4, tileSize + 4)
  // canvasContext.fillStyle = 'green';
  // canvasContext.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)
  // canvasContext.fillStyle = 'yellow';

  for (let i = 0; i < snakeBody.length; i++){
    let part = snakeBody[i];
    canvasContext.drawImage(caboose,part.x * tileCount, part.y * tileCount, tileSize + 4, tileSize + 4)

    // canvasContext.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
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

//play music on first key press
document.body.addEventListener('keydown', playMusic);

function playMusic(event){

  if (event.keyCode === 38 ||
    event.keyCode === 40 ||
    event.keyCode === 37 ||
    event.keyCode === 39
    ){
      song.play()
    }
}

song.addEventListener('ended', function() {
  this.currentTime = 0;
  this.play();
}, false);



drawGame();