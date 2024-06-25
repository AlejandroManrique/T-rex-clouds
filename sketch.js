var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, edges, trex_Collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var newImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score;
var gameOverImg,restartImg;
var jumpSound, checkPointSound, dieSound;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  trex_Collided = loadImage("trex_collided.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  restartImg = loadImage("restart.png");
  gameOverImg =loadImage("gameOver.png");
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");

}

function setup(){
  createCanvas(600,200);
  
  //crear sprite de Trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_Collided);
  edges = createEdgeSprites();
  
  //agregar tamaño y posición al Trex
  trex.scale = 0.5;
  trex.x = 50
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  restart = createSprite(300,125);
  restart.addImage(restartImg);
  gameOver.scale = 1.5;
  restart.scale = 0.3;

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible =false;

  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  trex.setCollider("rectangle",0,0,70,trex.height);
  trex.debug = true;

  score = 0;
}


function draw(){
  
  background("white");
  text("Puntuación: "+ score, 500,50);
  
  
  
  console.log(trex.y)
  
  if(gameState === PLAY){
    gameOver.visible = false;
    restart.visible = false;
    ground.velocityX = -(6 + score/100) ;

    score = score + Math.round(frameCount/80);

    if(score>0 && score%100 === 0){
      checkPointSound.play();
    }

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(keyDown("space") && trex.y >= 155 ){
      trex.velocityY = -13 ; 
      jumpSound.play();
    }   
    trex.velocityY = trex.velocityY + 0.8;
    spawnClouds();

    spanwObstacles();
    if(obstaclesGroup.isTouching(trex)){
       gameState = END;
       dieSound.play();
      //trex.velocityY = -12;
      //jumpSound.play();
    }
  }
  else if(gameState === END){ 
    score = score + Math.round(frameCount= 0);
    gameOver.visible = true;
    restart.visible = true;

    ground.velocityX = 0;
  
    trex.velocityY = 0;
    trex.changeAnimation("collided", trex_Collided);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    if(mousePressedOver(restart)){
      reset();
    }

  }
  
  
  trex.collide(invisibleGround);
  
  drawSprites();
}

function reset() {
  gameState = PLAY;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();

  score = 0;
  restart.visible = false;
  gameOver.visible = false;

  trex.changeAnimation("running", trex_running);
  
}

function spanwObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(600 ,165,10,40);
    obstacle.velocityX = -(6 + score/100);

    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;        
    }
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  if (frameCount % 60 === 0) { 
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage);
    cloud.y = Math.round(random(10,60));
    cloud.scale = 0.4;
    cloud.velocityX= -3;

    cloud.lifetime = 200;

    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    cloudsGroup.add(cloud);
  }
}
