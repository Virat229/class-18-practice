
var monkey , monkey_running,monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var ground;
var obstacle,obstImg;
var obstaclesGroup;
var PLAY = 1,END = 0;
var gameState;
 gameState = PLAY;
var banana,bananaImg;
var score = 0;
var back,backImg;
var score2 = 0;
function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_collided = loadImage("sprite_1.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 obstImage = loadImage("obstacle.png");
  bananaImg = loadImage("banana.png");
  backImg = loadImage("jungle.jpg");
}



function setup() {
 createCanvas(windowWidth,windowHeight);
  back = createSprite(width/2 - 20,height/2,width,height);
  back.addImage(backImg);
  back.scale = 0.85;
  monkey = createSprite(50,height - 50,20,20);
    monkey.addAnimation("go",monkey_running);
    monkey.addImage("be",monkey_collided);
  monkey.scale = 0.1;
  ground = createSprite(width/2,height-15,width,10);
  obstaclesGroup = new Group();
  bananaGroup = new Group();
}


function draw() {
   // background("green");
    back.velocityX = -4;
  if(back.x < 200){
     back.x = 280; 
  }
  if(monkey.isTouching(obstaclesGroup)){
    score2 = score2 + 1;
    obstaclesGroup.destroyEach();
    switch(score2){
      case 1:monkey.scale = 0.08;
      break;
      case 2 : monkey.scale = 0.06;
        break;
        default : break;
    }
  }
  console.log(back.x);
  if(keyDown("space") || touches.length > 0 && monkey.y > 200){
    monkey.velocityY = -15;
    touches = [];
  }
  if(score2 === 3){
     gameState = END;
  }
  console.log(monkey.scale);
  if(gameState === END){
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    monkey.changeImage("be",monkey_collided);
    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    monkey.velocityY = 0;
    back.velocityX = 0;
    monkey.scale = 0.1;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
    obst();
  ban();
  //console.log(gameState);
  monkey.collide(ground);
  //monkey.debug = true;
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score = score + 1;
  }
  ground.visible = false;
  //console.log(score);
  switch(score){
    case 1 : monkey.scale = 0.15;
      break;
    case 5: monkey.scale = 0.2
      break;
      default : break;
  }
  drawSprites();
    stroke("blue");
  textSize(20);
    text("score :" + score,300,50);
}
function obst(){
  if(frameCount % 100 === 0){
  obstacle = createSprite(width + 20,height - 30,20,20);
  obstacle.addImage(obstImage);
    obstacle.velocityX = -4;
    obstacle.scale = 0.1;
      obstaclesGroup.add(obstacle);
    obstacle.lifetime = 200;
   // obstacle.debug = true;
      }
}
function ban(){
  if(frameCount % 80 === 0){
    banana = createSprite(650,random(50,height - 50),20,20);
    banana.addImage(bananaImg);
    banana.velocityX = -4;
    banana.scale = 0.1;
    bananaGroup.add(banana);
  }
}





