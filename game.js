var boje = ["red", "blue", "green", "yellow"], randomPattern = [], userPattern =  [];
var level = 0;
var gameStarted = false, patternStarted = false, waitingForUser=false;

function nextSequence(){

  patternStarted = true;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = boje[randomNumber];

  randomPattern.push(randomColor);

  setTimeout(function(){

    printColor(0);
  }, 1000);

  patternStarted = false;
  level++;
  naziv(level);
  waitingForUser = true;
}

$(".btn").on("click", function(event){

  if(!patternStarted){
    var targetID = event.target.id;
    var nameOfSound = "sounds/" + targetID + ".mp3";

    animatePress(targetID);
    playSound(nameOfSound);

    userPattern.push(targetID);

    if(!checkAnswer()){

      wrongFunction();
    }
    else if(userPattern.length == randomPattern.length){

      waitingForUser = false;
      userPattern = [];
      nextSequence();
    }
  }
})

function printColor(i){

  if(i<randomPattern.length){

    var nameOfSound = "sounds/" + randomPattern[i] + ".mp3";

    $("#" + randomPattern[i]).fadeOut(100).fadeIn(100);
    playSound(nameOfSound);

    setTimeout(function(){

      printColor(i+1);
    }, 100*(i+2));
  }
}

function wrongFunction(){

  $("body").addClass("game-over");

  $("#level-title").text("Game Over! 😢");

  setTimeout(function(){

    $("body").removeClass("game-over");
    $("#level-title").text("Press any key to play!");
    level = 0;
    gameStarted = false;
    waitingForUser = false;
  }, 1000);
}

function checkAnswer(){

  if(userPattern.length>randomPattern.length) return false;

  for(var i=0; i<userPattern.length; i++)
    if(userPattern[i] != randomPattern[i]) return false;

  return true;
}

function playSound(nameOfSound){

  var zvuk = new Audio(nameOfSound);
  zvuk.play();
}

function animatePress(curentColor){

  $("#" + curentColor).addClass("pressed");

  setTimeout(function(){

    $("#" + curentColor).removeClass("pressed");
  }, 100);
}

$("body").on("keydown", function(){

  if(!gameStarted){

    level = 0;
    gameStarted = true;
    randomPattern = [];
    userPattern = [];
    nextSequence();
  }
})

function naziv(lvl){

  $("#level-title").text("Level: " + lvl);
}
