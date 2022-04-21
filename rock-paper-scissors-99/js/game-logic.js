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

}

function setComputerMoves() {

}