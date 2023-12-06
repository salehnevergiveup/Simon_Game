let colorArray = ["red",  "blue", "green", "yellow"];  
let  gamePattern = [];  
let userClickedPattern =[]; 
let startGame = false;  
let level = 0; 

function nextSequance() { 
    userClickedPattern = [];  
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random()*4);  
    color =  colorArray[randomNumber];
     gamePattern.push(color);  
     animatePress(color) 
    soundEffect(color) 
}

function soundEffect(color) { 
    let sound = new Audio(`./sounds/${color}.mp3`);
    sound.play();
}



function  animatePress(color) { 
        $(`.${color}`).fadeOut(100);  
        $(`.${color}`).fadeToggle(250);  
}

function startOver() { 
    level =0;  

    $("h1").text("Press Any Key To Restart");
    gamePattern = [];  
    userClickedPattern =[]; 
    startGame = false;
}



function checkAnswer(currentLevel) { 
       if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequance();
          }, 1000);
         
        }
  
      } else {
  
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function() { 
            $("body").removeClass("game-over"); 
        },200)
        
        soundEffect("wrong");
        startOver();
      }
}

$(".btn").click(function() { 
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    soundEffect(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
})

$(document).keypress(function(e) { 
   if(startGame ==false ) { 
    nextSequance();
    $("h1").text("Level " + level);
    startGame = true;
   }
   
})
