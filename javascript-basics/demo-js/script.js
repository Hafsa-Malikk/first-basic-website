"use strict";
// const btn = document.querySelector("button");
// const txt = document.querySelector("p");

// btn.addEventListener("click",updateBtn);

// function updateBtn(){
//     if(btn.textContent === "Start the Button"){
//         btn.textContent = "Stop the Button";
//         txt.textContent = "The button is working!";
//     }
//     else{
//         btn.textContent = "Start the Button";
//         txt.textContent = "The button has stopped working :(";
//     }
// }

// <!-- I want you to create a simple guess the number type game. It should choose a
// random number between 1 and 100, then challenge the player to guess the
// number in 10 turns. After each turn, the player should be told if they are
// right or wrong, and if they are wrong, whether the guess was too low or too
// high. It should also tell the player what numbers they previously guessed.
// The game will end once the player guesses correctly, or once they run out of
// turns. When the game ends, the player should be given an option to start
// playing again. -->

// Generate a random number between 1 and 100.
let randomNumber = Math.floor(Math.random() * 100)+1;
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const hint = document.querySelector(".hint");

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");
// Record the turn number the player is on. Start it on 1.
let guessCount = 1;

let resetButton;

guessSubmit.addEventListener("click",checkGuess);

// Provide the player with a way to guess what the number is.
// to check whether a player's guess is correct or not
function checkGuess(){
    const userGuess = Number(guessField.value);
    // console.log(userGuess);
    if(guessCount === 1){
        guesses.textContent="Previous guesses: ";
    }
    guesses.textContent += ` ${userGuess}`;

    if(userGuess === randomNumber){
        lastResult.textContent = "Congrats! You got it right!";
        lastResult.style.backgroundColor = "green";
        hint.textContent = "";
        setGameOver();
    }
    else if (guessCount === 10){
        lastResult.textContent = "!!!GAME OVER !!!";
        hint.textContent = "";
        setGameOver();
    }
    else{
            lastResult.textContent= "Wrong!!";
            lastResult.style.backgroundColor ="red";
            if(userGuess < randomNumber){
                hint.textContent ="Your last guess is too small!";
            }
            else if(userGuess > randomNumber){
                hint.textContent = "Your last guess is too big!";
            }
    }

    guessCount++;
    guessField.value="";
    guessField.focus();
}

function setGameOver(){
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement("button");
    resetButton.textContent ="Start new game";
    document.body.append(resetButton);
    resetButton.addEventListener("click", resetGame);
}

function resetGame(){
    guessCount = -1;

    const resetParas = document.querySelectorAll(".result p");
    for(const resetPara of resetParas){
        resetPara.textContent = "";
    }
    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();

    lastResult.style.backgroundColor = "white";
    randomNumber = Math.floor(Math.random()*100)+1;
}