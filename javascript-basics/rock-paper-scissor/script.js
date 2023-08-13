

let playerScore=0,computerScore=0;
let computerSelection,playerSelection;

const playerTxt = document.querySelector('.result #player');
const computerTxt = document.querySelector('.result #computer');
let resultTxt = document.querySelector('#resulttxt');
const buttons = document.querySelectorAll('.optionBtns .optionBtn');

buttons.forEach(button=>button.addEventListener('click',()=>{
    playerSelection = button.textContent;
    computerSelection = getComputerChoice();
    playerTxt.textContent = `Player: ${playerSelection}`;
    computerTxt.textContent = `Computer: ${computerSelection}`; 
    playRound(playerSelection,computerSelection);
}));




function getComputerChoice(){
    const choices = ["rock","paper","scissors"];
    return choices[Math.floor(Math.random()*choices.length)];
}

function playRound(playerSelection,computerSelection){
    playerSelection = playerSelection.toLowerCase();
    // console.log(`Your choice: ${playerSelection}`);
    // console.log(`Computer choice: ${computerSelection}`);
    if(playerSelection === computerSelection){
        resultTxt.textContent = "Game is tie! Play Again!";
        resultTxt.style.color = "#2E4053";   
    }
    else if((playerSelection === "rock" && computerSelection === "scissor")||
    (playerSelection === "paper" && computerSelection === "rock")||
    (playerSelection === "scissor" && computerSelection === "paper"))
    {
        resultTxt.textContent =`You won!\n ${playerSelection} beats ${computerSelection}`;
        resultTxt.style.color = "#27AE60";

    }
    else{
        resultTxt.textContent =`You lose! Computer wins!!\n ${computerSelection} beats ${playerSelection}`;
        resultTxt.style.color = "rgb(210, 4, 45)";
     }

}


