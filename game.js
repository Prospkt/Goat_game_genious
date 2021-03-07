
// 1 - setting basic elements and generating random numbers and game gamePattern
// 2 - creating the gamability of the user
// 3 - sounds and buttons effects
// 4 - undertanding the start of the game and setting level 0
// 5 - just checking the answer  - not judging yet
// 6 - defining game over
// 7 - restart game


var buttonColours = ["red", "blue", "green", "yellow"];      // 1 - setting the inicial colors
var gamePattern = [];                                        // 1 - setting game patern
var userClickedPattern = [];                                     // 2 create a new empty array with the name userClickedPattern.


var started = false;                                                              // 4 -  keeping track of whether the game has started or not, so you only call nextSequence() on the first keypress.
var level = 0;                                                                   //4. Create a new variable called level and start at level 0.



// ************** START OF FUNCTIONS***************************



// 4 - FUNCTION - START GAME
$(document).keypress(function() {                          //1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().

  if (!started) {                                                                    //4 -  if has not started
    $("#level-title").text("Level " + level);                                        //4 - The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
  nextSequence();                                                                   // 4 - activating the sequence  - 1 Game Parten
    started = true;                                                                 // 4 -  Changing the status of the game to started
  }
});




// 2 - FUNCTION  - USER GAMING -                           Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");                         // 2. Inside the handler, created a new variable called userChosenColour to store the id of the button that got clicked.
  userClickedPattern.push(userChosenColour);                        // 2. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern

  playSound(userChosenColour);                                             // 3. In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
  animatePress(userChosenColour);                                          // 3.Add also the animation of button pressed

  checkAnswer(userClickedPattern.length-1);                                                     //5 . Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
});




// 5 - FUNCTION  - CHECK ANSWER -                         WIll match user to the answer


function checkAnswer(currentLevel) {                                                              // 5 . Create a new function called checkAnswer(), it should take one input with the name currentLevel


    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {                          //5. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".

    console.log("success");

      if (userClickedPattern.length === gamePattern.length){                                       //5. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.

        setTimeout(function () {                                                                   //5. Call nextSequence() after a 1000 millisecond delay.
          nextSequence();                                                                          // 5. Call next sequence
        }, 1000);                                                                                  // 5. Delay to go to the next
      }


    } else {
      console.log("wrong");                                                                         // 5. If doesnt fullfill the if  - it calls for wrong


      playSound("wrong");                                                                                     //6. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.


      $("body").addClass("game-over");                                                                         //6. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.

      setTimeout(function () {                                                                                 // 6. transition to stop GAME OVER
        $("body").removeClass("game-over");
      }, 300);                                                                                                 // 6. Ttransition to stop GAME OVER he amount of delay to expect

      $("#level-title").text("Game Over, Press Any Key to Restart");                                            // 6. restarting  - Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.

      startOver();                                                                                                         // 7. Call startOver() if the user gets the sequence wrong.

    }
}





// 1 - FUNCTIONS - CREATING THE NEXT IN GAME SEQUENCE                      - CREATES A RANDOM NUMBER AND PUTS IN ARRAY.
function nextSequence(){

  userClickedPattern = [];                                                          //5. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.

  level++;                                                                 //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
$("#level-title").text("Level " + level);                                  //4. Inside nextSequence(), update the h1 with this change in the value of level.

var randomNumber = Math.floor(Math.random() * 4);                // 1. generating random number
var randomChosenColour = buttonColours[randomNumber];           // 1. directioning the random to something inside the inicial color array -
gamePattern.push(randomChosenColour);                          // 1. Putting the random generated new color inside the patter array

$("#" + randomChosenColour).fadeIn(150).fadeOut(150).fadeIn(150);     //  3. setting  animation - jQuery to select the button with the same id as the randomChosenColour. jQuery to animate a flash to the button selected in step 1.
playSound(randomChosenColour);                                       // 3. playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
}


// 3 - FUNCTION - PLAY SOUND                                                - takes a single input parameter called name.
function playSound(name) {
                                                                      //3. Take the code we used to play sound in the nextSequence() function and add it to playSound().
var audio = new Audio("sounds/" + name+ ".mp3");      // 3. Javascript to play the sound for the button colour selected in step 1.
audio.play();                                                       // 3. calling the audio created - linked to the random chosen color - to play
}



//3 - FUNCTION - PRESS AND ANIMATE BUTTONS
function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");                     //3. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().

  setTimeout(function () {                                       // 3. FUNCTION INSIDE A FUNCTION -  use Javascript to remove the pressed class after a 100 milliseconds.
    $("#" + currentColor).removeClass("pressed");
  }, 170);
}



//7 . Create a new function called startOver().
function startOver() {

  level = 0;                                                                                       //7. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  gamePattern = [];                                                                               //7 . restarting game pattern
  started = false;                                                                                //7 . reseting to the status non started
}
