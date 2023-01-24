"use strict";

const PACMAN = '<img src="img/pacman.gif"/>'
var gPacman;

function createPacman(board) {
  // initialize gPacman...
  gPacman = {
    location: {
      i: 6,
      j: 7,
    },
    isSuper: false,
    deg: 0,
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
  if (!gGame.isOn) return;
  // use getNextLocation(), nextCell
  const nextLocation = getNextLocation(ev);
  // console.log('nextLocation', nextLocation)
  const nextCell = gBoard[nextLocation.i][nextLocation.j];
  // console.log('nextCell', nextCell)

  // return if cannot move
  if (nextCell === WALL) return;
  // hitting a ghost? call gameOver
  else if (nextCell === GHOST) {
    if (gPacman.isSuper) {
      killGhost(nextLocation);
    } else {
      gameOver();
      return;
    }
  } else if (nextCell === FOOD) {
    handleFood();
    var audio1 = new Audio("audio/pop-94319.mp3");
    audio1.play();
  } else if (nextCell === CHERRY) {
    updateScore(10);
  } else if (nextCell === SUPER_FOOD) {
    if (gPacman.isSuper) return;
    handleSuperFood();
  }

  // moving from current location:
  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // update the DOM
  renderCell(gPacman.location, EMPTY);

  // Move the pacman to new location:
  // update the model
  gPacman.location = nextLocation;
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // update the DOM
  renderCell(nextLocation, getPacmanHTML(gPacman.deg));
}

function getNextLocation(eventKeyboard) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };
  // console.log('eventKeyboard.code', eventKeyboard.code)
  switch (eventKeyboard.code) {
    case "ArrowUp":
      gPacman.deg = -90;
      nextLocation.i--;
      break;
    case "ArrowDown":
      gPacman.deg = 90;
      nextLocation.i++;
      break;
    case "ArrowLeft":
      gPacman.deg = 180;
      nextLocation.j--;
      break;
    case "ArrowRight":
      gPacman.deg = 0;
      nextLocation.j++;
      break;
    default:
      return null;
  }
  return nextLocation;
}

function getPacmanHTML(deg) {
  return `<div style="transform: rotate(${deg}deg)">${PACMAN}</div>`;
}

function handleFood() {
  gGame.foodCount--
  updateScore(1)
  checkVictory()
}

function handleSuperFood() {
  gPacman.isSuper = true;
  renderGhosts();
  setTimeout(() => {
    gPacman.isSuper = false;
  }, 5000);
}
