var doggy, doggyImage, happyDog, database, foodS, foodStock

function preload()
{
  doggyImage = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
}

function setup() {
  database = firebase.database();
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  createCanvas(500, 500);
  doggy = createSprite(250,250,100,100);
  doggy.addImage("doge",doggyImage);
  doggy.scale = 0.5;
}


function draw() { 
  background(rgb(46, 139, 87));

  drawSprites();

  if (foodS !== undefined) {
    if (keyWentDown(UP_ARROW)) {
      writeStock(foodS);
      doggy.addImage("doge",happyDog);
    }
  }
  //add styles here

  stroke("black");
  fill("black");
  textSize(20);
  text("Note: Press UP_ARROW Key to Feed Doggy Milk", 30,50);
  text("Food Remaining: "+foodS, 150,470);
}

function readStock(data) {
    foodS=data.val();
}
function writeStock(x) {
    if (x<=0) {
      x=0
    } else {
      x=x-1
    }
    database.ref('/').update({
      food: x
    })
}




