//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, fallingObject;
let score = 0;
let backgroundImg;
let catcherImg;
let fallingObjectImg;

/* PRELOAD LOADS FILES */
function preload() {
  backgroundImg = loadImage("assets/background-image.png");
  catcherImg = loadImage("assets/catcher-image.png");
  fallingObjectImg = loadImage("assets/falling-object.png");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);

  //Resize images
  backgroundImg.resize(0, 0);
  catcherImg.resize(150, 150);
  fallingObjectImg.resize(40, 0);
  
  //Create catcher 
  catcher = new Sprite(catcherImg, 200,320,0,20,'k');
  catcher.color = color(95,158,160);
  
  //Create falling object
  fallingObject = new Sprite(fallingObjectImg, 100,0,10);
  fallingObject.color = color(0,128,128);
  fallingObject.vel.y = 5;
}

/* DRAW LOOP REPEATS */
function draw() {
background('#D4AF37');

//Draw background image
image(backgroundImg, 0, -200);

  //Check to see if player won
if (score == 5) {
 youWin();

  //Restart the game if player clicks the mouse
  if (mouseIsPressed) {
    restart();
  }
 }

/* FUNCTIONS */
function youWin() {
  background(244,194,194);

  //Draw sprites off of screen
  catcher.pos = { x: 600, y: -300 };
  fallingObject.pos = { x: -100, y: 0 };

    //Draw end of game text
  textSize(20);
  fill('#FFFFFF');
  text("You Win!", width/2 - 50, height/2 - 30);
  textSize(15);
  text("Click the mouse anywhere to play again.", width/2 - 120, height/2);
}

function restart() {
  //Reset score
  score = 0;
  
  //Reset sprites
  catcher.pos = { x: 200, y: 290 };
  fallingObject.y = 0;
  fallingObject.x = random(width);
  fallingObject.velocity.y = random(1,5);
  fallingObject.direction = "down";
}
 
  // Draw directions to screen
  fill(255,255,255);
  textSize(18);
  text("Move the catcher \nwith the left and \nright arrow keys to \ncatch the falling \nobjects.", width-170, 20);

  //If fallingObject reaches bottom, move back to random position at top
  if (fallingObject.y >= height) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1,5);

  
  score = score - 1;
}
  
  // Move catcher
  if (kb.pressing("left")) {
    catcher.vel.x = -3;
  } else if (kb.pressing("right")) {
    catcher.vel.x = 3;
  } else {
    catcher.vel.x = 0;
  }
  
  // Stop catcher at edges of screen
  if (catcher.x < 50) {
  catcher.x = 50;
  } else if (catcher.x > 350) {
  catcher.x = 350;
   }

  // If fallingObject collides with catcher, move back to random position at top
  if (fallingObject.collides(catcher)) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1,5);
    fallingObject.direction = "down";
    score = score + 1;
  }

  // Score display
  fill(255,255,255);
  textSize(30);
  text(" Score = " + score, 10, 30);
}