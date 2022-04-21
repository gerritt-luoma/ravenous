const MOVE_TYPES = ['rock', 'paper', 'scissors'];
// Globals for moves and strengths
let playerOneMoveOneType;
let playerOneMoveOneValue;
let playerOneMoveTwoType;
let playerOneMoveTwoValue;
let playerOneMoveThreeType;
let playerOneMoveThreeValue;

let playerTwoMoveOneType;
let playerTwoMoveOneValue;
let playerTwoMoveTwoType;
let playerTwoMoveTwoValue;
let playerTwoMoveThreeType;
let playerTwoMoveThreeValue;

function setPlayerMoves(player, moveOneType, moveOneValue, moveTwoType, moveTwoValue, moveThreeType, moveThreeValue) {
  if(!moveOneType || !moveTwoType || !moveThreeType) {
    return;
  } else if(!MOVE_TYPES.includes(moveOneType) || !MOVE_TYPES.includes(moveTwoType) || !MOVE_TYPES.includes(moveThreeType)) {
    return;
  }

  if(!moveOneValue || !moveTwoValue || !moveThreeValue) {
    return;
  } else if(0 > moveOneValue || 0 > moveTwoValue || 0 > moveThreeValue) {
    return;
  } else if(99 < (moveOneValue + moveTwoValue + moveThreeValue)) {
    return;
  }

  if(player === 'Player One') {
    playerOneMoveOneType = moveOneType;
    playerOneMoveOneValue = moveOneValue;
    playerOneMoveTwoType = moveTwoType;
    playerOneMoveTwoValue = moveTwoValue;
    playerOneMoveThreeType = moveThreeType;
    playerOneMoveThreeValue = moveThreeValue;
  } else if(player === 'Player Two') {
    playerTwoMoveOneType = moveOneType;
    playerTwoMoveOneValue = moveOneValue;
    playerTwoMoveTwoType = moveTwoType;
    playerTwoMoveTwoValue = moveTwoValue;
    playerTwoMoveThreeType = moveThreeType;
    playerTwoMoveThreeValue = moveThreeValue;
  }
}

function getRoundWinner(roundNumber) {
  switch(roundNumber) {
    case 1:
      return roundWinnerHelper(playerOneMoveOneType, playerTwoMoveOneType, playerOneMoveOneValue, playerTwoMoveOneValue);
    case 2:
      return roundWinnerHelper(playerOneMoveTwoType, playerTwoMoveTwoType, playerOneMoveTwoValue, playerTwoMoveTwoValue);
    case 3:
      return roundWinnerHelper(playerOneMoveThreeType, playerTwoMoveThreeType, playerOneMoveThreeValue, playerTwoMoveThreeValue);
    default:
      console.log(`Error: Provided roundNumber = ${roundNumber} is not valid`);
      return null;
  }
}

function roundWinnerHelper(move1, move2, power1, power2) {
  if(!move1 || !move2 || !power1 || !power2) {
    return null;
  }
  if(move1 !== move2) {
    switch(move1) {
      case "rock":
        if(move2 === "scissors") {
          return "Player One";
        } else {
          return "Player Two";
        }
      case "paper":
        if(move2 === "rock") {
          return "Player One";
        } else {
          return "Player Two";
        }
      case "scissors":
        if(move2 === "paper") {
          return "Player One";
        } else {
          return "Player Two";
        }
      default:
        console.log("ERROR");
    }
  } else {
    if(power1 > power2) {
      return 'Player One';
    } else if(power1 < power2) {
      return 'Player Two';
    } else {
      return 'Tie';
    }
  }
}

function getGameWinner() {
  if(!validateMoveTypes() || !validateMoveStrenths()) {
    return null;
  }
  let playerOneWins = 0;
  let playerTwoWins = 0;
  for(let i = 1; i < 4; i++) {
    let result = getRoundWinner(i);
    if(result === 'Player One') {
      playerOneWins += 1;
    } else if(result === 'Player Two') {
      playerTwoWins += 1;
    }
  }

  if(playerOneWins > playerTwoWins) {
    return 'Player One';
  } else if(playerTwoWins > playerOneWins) {
    return 'Player Two';
  } else {
    return 'Tie';
  }
}

function validateMoveTypes() {
  if(!playerOneMoveOneType || !playerOneMoveTwoType || !playerOneMoveThreeType || !playerTwoMoveOneType || !playerTwoMoveTwoType || !playerTwoMoveThreeType) {
    return false;
  }
  return true;
}

function validateMoveStrenths() {
  if(!playerOneMoveOneValue || !playerOneMoveTwoValue || !playerOneMoveThreeValue || !playerTwoMoveOneValue || !playerTwoMoveTwoValue || !playerTwoMoveThreeValue) {
    return false;
  }
  return true;
}

function setComputerMoves() {
  playerTwoMoveOneType = MOVE_TYPES[Math.floor(Math.random() * MOVE_TYPES.length)];
  playerTwoMoveTwoType = MOVE_TYPES[Math.floor(Math.random() * MOVE_TYPES.length)];
  playerTwoMoveThreeType = MOVE_TYPES[Math.floor(Math.random() * MOVE_TYPES.length)];

  // Move one cannoth have a value more than 97 since two and three cannot be less than one
  playerTwoMoveOneValue = Math.ceil(Math.random() * 97);
  // Move one plus move two cannot have a value more than 98 since move three cannot be less than one
  playerTwoMoveTwoValue = Math.ceil(Math.random() * (98 - playerTwoMoveOneValue));
  // No randomization needed, just subtract move one and move two from 99
  playerTwoMoveThreeValue = 99 - (playerTwoMoveOneValue + playerTwoMoveTwoValue);
}