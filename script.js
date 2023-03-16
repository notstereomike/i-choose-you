const userScoreSpan = document.getElementById("user-score");
const compScoreSpan = document.getElementById("comp-score");
const resultText = document.getElementById("result-text");
const charmanderDiv = document.getElementById("charmander");
const squirtleDiv = document.getElementById("squirtle");
const bulbasaurDiv = document.getElementById("bulbasaur");

let userScore = 0;
let compScore = 0;

function getComputerChoice() {
  const choices = ["charmander", "squirtle", "bulbasaur"];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

function getResult(userChoice, computerChoice) {
  const combinations = {
    "charmandersquirtle": "lose",
    "charmanderbulbasaur": "win",
    "squirtlecharmander": "win",
    "squirtlebulbasaur": "lose",
    "bulbasaurcharmander": "lose",
    "bulbasaursquirtle": "win",
  };

  if (userChoice === computerChoice) {
    return "draw";
  }

  return combinations[userChoice + computerChoice];
}

function updateScore(result, userChoice, computerChoice) {
  if (result === "win") {
    userScore++;
    resultText.textContent = `You win! ${userChoice} beats ${computerChoice}.`;
  } else if (result === "lose") {
    compScore++;
    resultText.textContent = `You lose! ${computerChoice} beats ${userChoice}.`;
  } else {
    resultText.textContent = `It's a draw! Both chose ${userChoice}.`;
  }

  userScoreSpan.textContent = userScore;
  compScoreSpan.textContent = compScore;
}

/// Function to reset the game
function resetGame() {
    userScore = 0;
    compScore = 0;
    userScoreSpan.textContent = userScore;
    compScoreSpan.textContent = compScore;
    resultText.textContent = "Choose your Pokémon!";
    rematchButton.style.display = "none";
  }
  
  // Main function to handle the user's choice
  function game(userChoice) {
    const computerChoice = getComputerChoice();
    const result = getResult(userChoice, computerChoice);
    updateScore(result, userChoice, computerChoice);
  
    if (userScore === 3 || compScore === 3) {
      resultText.textContent = userScore === 3 ? "Congratulations, you won! Click on Rematch to play again." : "Sorry, you lost. Click on Rematch to try again.";
      rematchButton.style.display = "block";
    }
  }
  
  // Event listeners for user's choice
  charmanderDiv.addEventListener("click", function() {
    game("charmander");
  });
  
  squirtleDiv.addEventListener("click", function() {
    game("squirtle");
  });
  
  bulbasaurDiv.addEventListener("click", function() {
    game("bulbasaur");
  });
  
  // Create and append the rematch button
  const rematchButton = document.createElement("button");
  rematchButton.textContent = "Rematch";
  rematchButton.className = "rematch-button";
  document.getElementById("rematch-button-container").appendChild(rematchButton);
  
  // Add an event listener for the rematch button
  rematchButton.addEventListener("click", function() {
    resetGame();
  });
  

