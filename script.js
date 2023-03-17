const userScoreSpan = document.getElementById("user-score");
const compScoreSpan = document.getElementById("comp-score");
const resultText = document.getElementById("result-text");
const charmanderDiv = document.getElementById("charmander");
const squirtleDiv = document.getElementById("squirtle");
const bulbasaurDiv = document.getElementById("bulbasaur");

let userScore = 0;
let compScore = 0;

let gameInProgress = true;

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

function checkGameOver() {
  if (userScore >= 3 || compScore >= 3) {
    gameInProgress = false;
    resultText.textContent =
      userScore >= 3
        ? "Congratulations, you won! Click on Rematch to play again."
        : "Sorry, you lost. Click on Rematch to try again.";
    rematchButton.style.display = "block";
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function updateScore(result, userChoice, computerChoice) {
  if (!gameInProgress) {
    return;
  }

  checkGameOver(); // Call checkGameOver() before updating the scores

  if (!gameInProgress) {
    return;
  }

  const userChoiceDiv = document.getElementById(userChoice);
  const userChoiceImg = userChoiceDiv.querySelector('img');
  const userChoiceP = userChoiceDiv.querySelector('p');
  let bgColor;

  switch (userChoice) {
    case "charmander":
      bgColor = "rgba(255, 140, 0, 0.3)"; // Orange
      break;
    case "squirtle":
      bgColor = "rgba(30, 144, 255, 0.3)"; // Blue
      break;
    case "bulbasaur":
      bgColor = "rgba(34, 139, 34, 0.3)"; // Green
      break;
  }

  const capitalizedUserChoice = capitalizeFirstLetter(userChoice);
  const capitalizedComputerChoice = capitalizeFirstLetter(computerChoice);

  if (result === "win") {
    userScore++;
    userScoreSpan.textContent = userScore;
    resultText.textContent = `You win! ${capitalizedUserChoice} beats ${capitalizedComputerChoice}.`;

    userChoiceImg.style.backgroundColor = "";
    userChoiceP.style.backgroundColor = "";

    userChoiceImg.style.backgroundColor = bgColor;
    userChoiceP.style.backgroundColor = bgColor;
    userChoiceP.innerHTML = `<span style="font-weight: bold;">${capitalizedUserChoice}</span>`;
  } else if (result === "lose") {
    compScore++;
    compScoreSpan.textContent = compScore;
    resultText.textContent = `You lose! ${capitalizedComputerChoice} beats ${capitalizedUserChoice}.`;

    userChoiceImg.style.backgroundColor = "";
    userChoiceP.style.backgroundColor = "";

    userChoiceImg.style.backgroundColor = bgColor;
    userChoiceP.style.backgroundColor = bgColor;
    userChoiceP.innerHTML = `<span style="font-weight: bold;">${capitalizedUserChoice}</span>`;
  } else {
    resultText.textContent = `It's a draw! Both chose ${capitalizedUserChoice}.`;
  }
  
  setTimeout(() => {
    userChoiceImg.style.backgroundColor = "";
    userChoiceP.style.backgroundColor = "";
    userChoiceP.textContent = userChoice;
  }, 500);
  
}

/// Function to reset the game
function resetGame() {
    userScore = 0;
    compScore = 0;
    userScoreSpan.textContent = userScore;
    compScoreSpan.textContent = compScore;
    resultText.textContent = "Choose your Pokémon!";
    rematchButton.style.display = "none";
    gameInProgress = true;
  }
  
  
  // Main function to handle the user's choice
function game(userChoice) {
    if (!gameInProgress) {
      return;
    }
    
    const computerChoice = getComputerChoice();
    const result = getResult(userChoice, computerChoice);
    updateScore(result, userChoice, computerChoice);
  
    
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
  

