var balloon,balloonImage1,balloonImage2;
var db,position,height,scale,ground;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  db=firebase.database();
  db.ref("balloon/height").on("value",readHeight,showError)
  createCanvas(1500,700);
  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  db.ref("balloon/scale").on("value",readScale,showError);
  textSize(20);
  ground=createSprite(width/2,height-10,width,20);
  ground.shapeColor=("#C6A08E");
}

// function to display UI
function draw() {
  background(bg);
  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    if(balloon.scale>0.1)
    updateScale(-0.004)
  }
  else if(keyDown(DOWN_ARROW)&&balloon.y<520){
    updateHeight(0,10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateScale(0.004);
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  console.log(height.x+","+height.y);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function updateHeight(x,y)  {
  db.ref("balloon/height").update({"x": height.x+x,"y": height.y+y});
}

function readHeight(data)  {
  height=data.val();
  balloon.x=height.x;
  balloon.y=height.y;
}

function updateScale(y)  {
db.ref("balloon").update({scale:balloon.scale+y});
}

function readScale(data)  {
  balloon.scale=data.val();
}

function showError()  {
  console.log("Fail to read database");
}