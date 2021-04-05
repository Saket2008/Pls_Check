var dog, dogImg, happyDog;
var database;
var foodS, foodStock;
var feed, add, vet, vaccine;
var feedTime, lastFed, currenttime;
var foodObj;  
var bowls, bowlImg1, bowlImg2;
var bedRoom, livingRoom, bathRoom, gardenI;
var readState, gameState;
var planSheet;

function preload()
{
	dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  lazyDog = loadImage("images/Lazy.png");
  illDog = loadImage("images/Ill.png")
  deadDog = loadImage("images/deadDog.png")

  bowlImg1 = loadImage("images/DogBowl.png");
  bowlImg2 = loadImage("images/DogMilk.png");

  bedRoom = loadImage("images/Bed Room.png");
  livingRoom = loadImage("images/Living Room.png");
  bathRoom = loadImage("images/Wash Room.png");
  gardenI = loadImage("images/Garden.png");

  inject = loadImage("images/Injection.png");
  vaccination = loadImage("images/dogVaccination.png")
}

function setup() {
	createCanvas(500, 800);

  database = firebase.database();

  foodObj = new Food();
  
  //Display = 685, 312, 1365, 624;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(300, 600);
  dog.addImage(dogImg);
  dog.scale = 0.2

  feed = createButton("Feed Dog");
  feed.position(500, 70);
  feed.mousePressed(feedDog);

  add = createButton("Add Food");
  add.position(600, 70);
  add.mousePressed(addFoods);

  vet = createButton("Go To Vet");
  vet.position(700, 70);
  vet.mousePressed(goToVet);

  vaccine = createButton("Vaccine Plan");
  vaccine.position(800, 70);
  vaccine.mousePressed(plan);

  home = createButton("Back To Home");
  home.position(650, 70);
  home.mousePressed(house);
  home.hide();

  back = createButton("Back");
  back.position(650, 70);
  back.mousePressed(goBack);
  back.hide();

  bowls = createSprite(190, 650, 50, 50);
  bowls.addImage(bowlImg1);
  bowls.scale = 0.4;
}


function draw() 
{  
  background(46, 139, 87);

  foodObj.display();

  currenttime = hour();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  readState = database.ref('gameState');
  readState.on("value", function(data){
    gameState = data.val();
  });

  fill("yellow");
  textSize(25);

  if(gameState === "hungry" || gameState === "dead")
  {
    if (lastFed >= 12)
    {
      text("Last feed: " + lastFed % 12 + " PM", 160, 30);
    }
    else if (lastFed === 0)
    {
      text("Last feed: 12 AM", 250, 30)
    }
    else
    {
      text("Last feed: " + lastFed + " AM", 160, 30)
    }
  }

  if (currenttime === lastFed + 1)
  {
    gameState = "playing";
    update(gameState);
    foodObj.garden();
  }
  else if(currenttime === lastFed + 2)
  {
    gameState = "sleeping";
    update(gameState);
    foodObj.bedroom();
  }
  else if(currenttime === lastFed + 3)
  {
    gameState = "enjoying";
    update(gameState);
    foodObj.livingroom();
  }
  else if(currenttime === lastFed + 4)
  {
    gameState = "bathing";
    update(gameState);
    foodObj.washroom();
  }
  else if(currenttime === lastFed + 5)
  {
    gameState = "hungry";
    update(gameState);
  }
  else if(currenttime === lastFed + 10)
  {
    gameState = "dead";
    update(gameState);
    foodObj.dead();
  }

  if (gameState === "hungry")
  {
    background(46, 139, 87);

    feed.show();
    add.show();
    vet.show();
    vaccine.show();
    home.hide()
  }
  
  drawSprites();
}

function readStock(data)
{
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog()
{  
  if(foodObj.getFoodStock()<= 0)
  {
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }
  else
  {
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    dog.addImage(happyDog);
    bowls.addImage(bowlImg2);
  }
  
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods()
{
  foodS++;

  database.ref('/').update({
    Food: foodS
  })
}

function goToVet()
{
  feed.hide();
  add.hide();
  vet.hide();
  vaccine.hide();
  home.show();

  dog.addImage(lazyDog);

  injection = createSprite();
  injection.addImage(inject);
}

function plan()
{
  feed.hide();
  add.hide();
  vet.hide();
  vaccine.hide();
  home.hide();
  back.show();

  dog.remove();
  bowls.remove();

  planSheet = createSprite();
  planSheet.addImage(vaccination);
}

function house()
{
  gameState = "hungry";
  update(gameState);

  feed.show();
  add.show();
  vet.show();
  vaccine.show();
  home.hide()

  dog.addImage(dogImg);
  bowls.addImage(bowlImg1);
}

function goBack()
{
  back.hide();
  feed.show();
  add.show();
  vet.show();
  vaccine.show();
  home.hide();

  dog.addImage(dogImg);
  bowls.addImage(bowlImg1);

  planSheet.remove();
}

function update(state)
{
  database.ref('/').update({
    gameState: state
  });
}