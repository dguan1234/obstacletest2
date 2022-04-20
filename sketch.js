var ground;
var sky;
var movingBackground
var bussin
var bozo
var potholeImage
var obstaclesGroup
var GROUND_Y = 200
let scrollSpeed

let score = 0

var GRAVITY = 1;
var JUMP = 20;

var x1 = 0;
var x2;

let gameState = 'start'

function preload() {
  potholeImage = loadImage("assets/pothole0001.png")
  movingBackground = loadImage("assets/ground.png")
  bussin = loadAnimation("assets/bus0001.png", "assets/bus0002.png")
  startMenu = loadImage("assets/gamestart.png")
  endMenu = loadImage("assets/gameend.png")
}

function setup() {
  createCanvas(1000, 500);

  x2 = width

  bozo = createSprite(100, 400);
  bozo.addAnimation('running', 'assets/running0001.png', 'assets/running0002.png');
  bozo.addAnimation('jumping', 'assets/jumping0001.png');
  bozo.setCollider('rectangle', 0, 0, 100, 150);

  ground = createSprite(100, 450);
  ground.addAnimation('normal', 'assets/small_platform0001.png', 'assets/small_platform0003.png');

  sky = createSprite(100, 35)
  sky.addAnimation('normal', 'assets/skybox0001.png', 'assets/skybox0002.png');
  sky.setCollider('rectangle', 0, 0, 200, 30);

  obstaclesGroup = new Group();
  score = 0

}

function draw() {
  switch (gameState) {
    case 'start':
      gameStart()
      break;
    case 'play':
      gamePlay()
      break;
    case 'end':
      gameEnd()
      break;
  }
}

function keyPressed() {
  if (gameState === 'start' || gameState === 'end') {
    if (key === 'G' || key === 'g') {
      gameState = 'play';
      bozo.position.x = 100
      bozo.position.y = 400
      score = 0
    }
  }
}


function backgroundMoving() {
  scrollSpeed = (10 + 3 * score / 100)
  image(movingBackground, x1, 0, width + 9, height);
  image(movingBackground, x2, 0, width + 9, height);

  x1 -= scrollSpeed;
  x2 -= scrollSpeed;

  if (x1 < -width) {
    x1 = width;
  }
  if (x2 < -width) {
    x2 = width;
  }

}


function gameStart() {
  image(startMenu, 0, 0)
}

function gamePlay() {

  backgroundMoving()

  score = score + Math.round(getFrameRate() / 60);

  push()
  textSize(20)
  fill(255, 255, 255)
  text("Score: " + score, 30, 50);
  pop()

  animation(bussin, 850, 175)

  bozo.collide(sky)

  bozo.velocity.y += GRAVITY;

  if (bozo.collide(ground)) {
    bozo.velocity.y = 0;
    bozo.changeAnimation('running');
  }



  if(mouseWentDown(LEFT)){
    if (bozo.position < 101,350,1)
    jump()
}else {
}





  bozo.debug = true;
  ground.debug = true;
  sky.debug = true



  drawSprites();

  for (var i = 0; i < obstaclesGroup.length; i++)
    if (obstaclesGroup[i].position.x < bozo.position.x - width / 2)
      obstaclesGroup[i].remove()


  if (bozo.overlap(obstaclesGroup))
    gameEnd()

  spawnPotholes()

}

function spawnPotholes() {
  if (frameCount % 60 === 0) {
    var obstacles = createSprite(1000, 415, 20, 30);
    obstacles.setCollider('circle', 0, 0, 45)
    obstacles.debug = true




    //generate random obstacles
    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1:
        obstacles.addImage(potholeImage);
        break;
      case 2:
        obstacles.addImage(potholeImage);
        break;
      default:
        break;
    }

    obstacles.lifetime = 300;

    obstaclesGroup.add(obstacles);
    obstacles.velocity.x = -(10 + 3 * score / 100);
    // console.log(obstacles.velocityX)
  }
}


function gameEnd() {
  gameState = 'end'
  image(endMenu, 0, 0)
  push()
  fill(8, 255, 69)
  textSize(30)
  text("your score was: " + score, 150, 360)
  pop()
  obstaclesGroup.removeSprites()
  scrollSpeed = score
}

function jump() {
  bozo.changeAnimation("jumping");
  bozo.animation.rewind();
  bozo.velocity.y = -JUMP;
}
