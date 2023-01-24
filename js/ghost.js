"use strict";

const GHOST = "👻";
var gGhosts;
var gGhostsInterval;

function createGhost(board) {
  const ghost = {
    location: {
      i: 3,
      j: 3,
    },
    currCellContent: FOOD,
    color: getRandomColor(),
  }
  gGhosts.push(ghost);
  board[ghost.location.i][ghost.location.j] = GHOST;
}

function createGhosts(board) {
  // 3 ghosts and an interval
  gGhosts = [];
  for (var i = 0; i < 3; i++) {
    createGhost(board);
  }

  gGhostsInterval = setInterval(moveGhosts, 1000);
}

function moveGhosts() {
  // loop through ghosts
  for (var i = 0; i < gGhosts.length; i++) {
    var ghost = gGhosts[i];
    moveGhost(ghost);
  }
}

function moveGhost(ghost) {
  // console.log('ghost', ghost)
  // figure out moveDiff, nextLocation, nextCell
  const moveDiff = getMoveDiff();
  // console.log('moveDiff', moveDiff)

  const nextLocation = {
    i: ghost.location.i + moveDiff.i,
    j: ghost.location.j + moveDiff.j,
  };
  // console.log('nextLocation', nextLocation)

  const nextCell = gBoard[nextLocation.i][nextLocation.j];
  // console.log('nextCell', nextCell)

  // return if cannot move
  if (nextCell === WALL) return;
  if (nextCell === GHOST) return;
  // hitting a pacman? call gameOver
  if (nextCell === PACMAN) {
    gameOver();
    return;
  }

  // moving from current location:
  // update the model (restore prev cell contents)
  gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
  // update the DOM
  renderCell(ghost.location, ghost.currCellContent);

  // Move the ghost to new location:
  // update the model (save cell contents so we can restore later)
  
  ghost.currCellContent = nextCell;
  ghost.location = nextLocation;
  gBoard[ghost.location.i][ghost.location.j] = GHOST

  // update the DOM
  renderCell(nextLocation, getGhostHTML(ghost));
}

function getMoveDiff() {
  const randNum = getRandomIntInclusive(1, 4);

  switch (randNum) {
    case 1:
      return { i: 0, j: 1 };
    case 2:
      return { i: 1, j: 0 };
    case 3:
      return { i: 0, j: -1 };
    case 4:
      return { i: -1, j: 0 };
  }
}

function getGhostHTML(ghost) {
    const color = gPacman.isSuper ? 'blue' : ghost.color
    return `<span style="background-color:${color};">${GHOST}</span>`
}

function renderGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i]
        renderCell(currGhost.location, getGhostHTML(currGhost))
    }
}


function killGhost(location) {
  for (let i = 0; i < gGhosts.length; i++) {
    var currLocation = gGhosts[i].location;
    if (currLocation.i === location.i && currLocation.j === location.j) {
      var deadGhost = gGhosts.splice(i, 1)[0];
      checkGhostsCellContent(deadGhost);
      setTimeout(reviveGhost, 5000, deadGhost);
    }
  }
}


function checkGhostsCellContent(ghost) {
    if(ghost.currCellContent === FOOD) {
    handleFood()
    ghost.currCellContent === EMPTY
    }
}

function reviveGhost(ghost) {
    gGhosts.push(ghost)
}
