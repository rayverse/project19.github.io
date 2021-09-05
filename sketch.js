var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var invisibleRail, invisibleRail2;
var gameOver, endImg, reset, resetImg;
var checkSound, dieSound;

var score = 0;


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  endImg = loadAnimation("gameOver.png");
  resetImg = loadAnimation("unnamed.png");

  checkSound = loadSound("checkpoint.mp3");
  dieSound = loadSound("die.mp3");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 4;

  ghost = createSprite(200, 500, 50, 50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.6;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost.setCollider("rectangle", 0, 0, 180, 300);
  ghost.debug = false;

  invisibleRail = createSprite(10,400,10,800);
  invisibleRail.visible = false;

  invisibleRail2 = createSprite(600,400,10,800);
  invisibleRail2.visible = false;

  gameOver = createSprite(300, 300);
  gameOver.addAnimation("over", endImg);
  gameOver.scale = 0.5;

  reset = createSprite(300, 350);
  reset.addAnimation("restart", resetImg);
  reset.scale = 0.2;
}

function draw() {
  background(200);
  
  //if (score >= 0 && score % 100 == 0){
    //checkSound.play();
  //}

if (gameState == "play"){

  gameOver.visible = false; 
  reset.visible = false;
  score = score + Math.round(getFrameRate()/60);

  if (keyDown("left_arrow")){
    ghost.x = ghost.x - 8;
  }

  if (keyDown("right_arrow")){
    ghost.x = ghost.x + 8;
  }

  //ghost.velocityY = ghost.velocityY + 0.8;

if (climbersGroup.isTouching(ghost) || doorsGroup.isTouching(ghost)){
  gameState = "end";
  climber.velocityY = 0;
  door.velocityY = 0;
  dieSound.play();
}

if(invisibleRail.isTouching(ghost)){
  gameState = "end";
}

if(invisibleRail2.isTouching(ghost)){
  gameState = "end";
}

  if(tower.y > 400){
      tower.y = 300
    }

    spawnDoors();
}
if (mousePressedOver(reset)){
  restart();
}
    drawSprites();
  textSize(20);
  fill("black")
  text("Score : " +score, 250, 40);
  score = score + Math.round(getFrameRate()/60);

if (gameState == "end"){
  tower.velocityY = 0;
  doorsGroup.destroyEach();
  climbersGroup.destroyEach();
  gameOver.visible = true;
  reset.visible = true;
  score = 0;
}

ghost.collide(invisibleRail);
ghost.collide(invisibleRail2);

}

function spawnDoors(){
  if (frameCount % 240 === 0){
    door = createSprite(300, -50, 50, 50);
    door.addImage(doorImg);
    door.velocityY = 4;
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
    
    climber = createSprite(300, 10, 50, 50);
    climber.addImage(climberImg);
    climber.velocityY = 4;

    ghost.depth = climber.depth;
    ghost.depth = ghost.depth + 1;

    door.x = Math.round(random(120, 400));
    climber.x = door.x;
    
    door.lifetime = 800;
    climber.lifetime = 800;

    doorsGroup.add(door);
    climbersGroup.add(climber);
  }
}

function restart(){
  gameState = "play";
  gameOver.visible = false;
  reset.visible = false;

  tower.velocityY = 4;
  ghost.x = 200;

  doorsGroup.destroyEach();
  climbersGroup.destroyEach();

  score = 0;
}
