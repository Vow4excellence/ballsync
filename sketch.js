var hypBall, database, position;

function setup(){
    database = firebase.database();
    console.log(database);
    createCanvas(500,500);
    hypBall = createSprite(250,250,10,10);
    hypBall.shapeColor = "red";

    var hypBallPosition = database.ref('ball/position');
    hypBallPosition.on("value", readPosition, showError);
}

function draw(){
    background("white");

    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}

function writePosition(x,y){
    database.ref('ball/position').set({
        'x':position.x + x,
        'y':position.y + y
    })
}
function readPosition(data){
    position = data.val();
    console.log(position.x);
    hypBall.x = position.x;
    hypBall.y = position.y;
}

function showError(){
    console.log("Error in writing to the database");
  }