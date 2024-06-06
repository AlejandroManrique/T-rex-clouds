var trex, trex_running, edges, trex_collided;
var groundImage, invisibleGround, groundImage;
var cloud, cloudsGroups, cloudImage;
var nerImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
}

function setup(){
  createCanvas(600,200);
  
  //crear sprite de Trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  
  //agregar tamaño y posición al Trex
  trex.scale = 0.5;
  trex.x = 50
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible =false;
}


function draw(){
  //establecer color de fondo.
  background("white");
  
  //cargar la posición Y del Trex
  console.log(trex.y)
  
  //hacer que el Trex salte al presionar la barra espaciadora
  if(keyDown("space") && trex.y >= 150 ){
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.5;

  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //evitar que el Trex caiga
  trex.collide(invisibleGround);

  spawnClouds();
  
  drawSprites();
}

function spawnClouds() {
  cloud = createCanvas(600,100,40,10);
  cloud.addImage(cloudImage);
  cloud.y = Maht.round(random(10,60));
  cloud.scale = 0,4;
  cloud.velocityX= -3;

  cloud.depth = trex.depth;
  trex.depth = tres.depth + 1;
}
