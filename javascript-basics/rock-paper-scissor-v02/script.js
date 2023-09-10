let playerChoice,computerChoice,playerScore,computerScore;
playerScore = computerScore = 0;
let counter = 0;
let leftRound = 5;
const round = document.getElementById('round');
const roundLeft = document.getElementById('round-left');
const buttons = document.querySelectorAll('.btns');
const playerScr = document.querySelector('#player-score');
const computerScr = document.querySelector('#computer-score');
const text = document.getElementById('text');
const computer = document.getElementById('computer');
const result = document.getElementById('result');
const div = document.getElementById('last');
const playAgainBtn = document.createElement('button');


//getting user input and displaying it 
buttons.forEach(button => {
  button.addEventListener("click", () => {
      text.textContent=button.textContent.toLowerCase();
      playerChoice = text.textContent;
      result.textContent= playRound(playerChoice);
      counter++;
      leftRound--;
      roundLeft.textContent = `ROUND LEFT: ${leftRound}`;

      if(counter == 5){
        buttons.forEach(button=>{
          button.disabled = true;
        });
        text.textContent = computer.textContent = result.textContent = "";
        result.textContent = calculateWinner(playerScore,computerScore);
        playAgainBtn.classList.add('btn','btn-dark');
        playAgainBtn.textContent = "Play Again!"
        result.style.marginTop ="2px";
        div.appendChild(playAgainBtn);
        //playAgainBtn.classList.remove('d-none');
        // playAgainBtn.style.display = "block";


        playAgainBtn.addEventListener('click',()=>
        {
          buttons.forEach(button=>{
            button.disabled = false;
          });
          counter = 0;
          leftRound = 5;
          finalResult.textContent = "";
        });
      }});
});


 







//computer choice
  function getComputerChoice(){
    const choices =['rock','paper','scissors'];
    computerChoice = choices[Math.floor(Math.random()*choices.length)];
    return computerChoice;
  }


  function playRound(playerChoice){
    computer.textContent = getComputerChoice();
      if(playerChoice === computerChoice){
        playerScr.textContent = `${playerScore}`;
        computerScr.textContent = `${computerScore}`;
        return 'Game is draw...Try Again !!!';
      }
      else if((playerChoice === "rock" && computerChoice === "scissors")||
      (playerChoice === "paper" && computerChoice === "rock")||
      (playerChoice === "scissors" && computerChoice === "paper")){
        playerScore++;
        playerScr.textContent = `${playerScore}`;
        computerScr.textContent = `${computerScore}`;
        div.style.backgroundColor = '#EEEDE7';
        div.style.color = 'green';
        return `You won ... your ${playerChoice} beats computer ${computerChoice}!!`;
        playerScore++;
        
      }
      else{
        computerScore++;
        playerScr.textContent = `${playerScore}`;
        computerScr.textContent = `${computerScore}`;
        div.style.backgroundColor='#E7D2CC';
        div.style.color = 'red';
        return `Oops!..Computer's ${computerChoice} beats your ${playerChoice}`;
      }
  }

  function calculateWinner(playerScore,computerScore){
    if(playerScore ===computerScore){
      return 'Game is tie!';
    }  
    else if(playerScore>computerScore){
        return `Players won with score of ${playerScore}`;
      }
    else{
      return `Computer won with score of ${computerScore}`;
    }

  }