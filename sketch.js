var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running,monkey_collided;
var ground;

var banana,bananaGroup, bananaImage;
var obstacle , obstacleImage, obstacleGroup;

var survivalTime;

function preload(){
   monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage=loadImage("obstacle.png");
  monkey_collided=loadImage("sprite_8.png");
}
  


function setup() {
  createCanvas(600, 200);

  obstacleGroup=createGroup();
  bananaGroup=createGroup();
  
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.075;
  
  ground = createSprite(300,180,1600,20);
   ground.x = ground.width/2;
  
  monkey.setCollider("rectangle",0,0,0,monkey.height);
  
survivalTime=0;  
}

function draw() {
  
  background("green");
  textSize(25);
  text("Survival Time: "+ survivalTime,300,50);
  
    
  
 
 if(gameState === PLAY){
    
    ground.velocityX = -(4 + 3* survivalTime/300)
    //scoring
    survivalTime = survivalTime + Math.round(getFrameRate()/61);
    
     
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  if(keyDown("space")&&monkey.y>=140){
   monkey.velocityY=-12;
    }
  monkey.velocityY = monkey.velocityY + 0.8
  spawnBananas();
    spawnObstacle();
   if (obstacleGroup.isTouching(monkey)){
     gameState=END}
     
     if (bananaGroup.isTouching(monkey)){
     bananaGroup.destroyEach();
       }}

  if (gameState === END) {
     
     ground.velocityX = 0;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
     textSize(35)
    text("Game Over",220,100)
    obstacle.lifetime=-1;
    banana.lifetime=-1;
     
     obstacle.VelocityX=0;
     banana.velocityX=0;  
  }

  monkey.collide(ground);
  
 drawSprites();
}



function spawnObstacle(){
 if (frameCount % 80 === 0){
   
   obstacle = createSprite(600,150,10,40);
    obstacle.addImage(obstacleImage);
   obstacle.scale=0.1;
   
    obstacle.velocityX = -(6 + survivalTime/100);
    obstacle.lifetime = 300;
   
 obstacleGroup.add(obstacle)
}}

function spawnBananas() {
  if (frameCount % 100 === 0) {
    banana= createSprite(600,120,40,10);
     banana.y = Math.round(random(80,120));
     banana.addImage(bananaImage);
     banana.scale = 0.1; 
     banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    bananaGroup.add(banana);
  }}

  
  
  
  
  
  
