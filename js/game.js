'use strict'

const WALL = '🚪'
const FOOD = '🔸'
const EMPTY = ' '
const CHERRY = '🍒'
const SUPER_FOOD = '🥦'



var gBoard
var gGame
var gCherryInterval

function init() {
    gGame = {
        score: 0,
        isOn: true,
        isVictory: false,
        foodCount: -1
    }

    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')

    gCherryInterval = setInterval(addCherry,15000)
    closeModal()
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gGame.foodCount++
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                gGame.foodCount--
            }
           
        }
    }
    console.log(gGame.foodCount);
    addPowerFood(board)
    return board
}

function addPowerFood(board) {
    board[1][1] = SUPER_FOOD
    board[1][board[0].length - 2] = SUPER_FOOD
    board[board.length - 2][1] = SUPER_FOOD
    board[board.length - 2][board[0].length - 2] = SUPER_FOOD
    gGame.foodCount -= 4
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff
    var elSpan = document.querySelector('h2 span')
    elSpan.innerText = gGame.score
    
}
function addCherry() {
    const emptyPos = getEmptyPos()
    if (!emptyPos) return
    gBoard[emptyPos.i][emptyPos.j] = CHERRY
    renderCell(emptyPos, CHERRY)

  }
  function getEmptyPos() {
    const emptyLocations = []
    for (var i = 0; i < gBoard.length; i++) {
      for (var j = 0; j < gBoard[0].length; j++) {
        if (gBoard[i][j] === EMPTY) {
          emptyLocations.push({ i, j })
        }
      }
    }
    if(!emptyLocations.length)return null
    var randIdx = getRandomIntInclusive(0, emptyLocations.length -1)
    return emptyLocations[randIdx]
  }

function gameOver() {
    var audioLost = new Audio('audio/scary-game-effect-131801.mp3');
    var audioWin = new Audio('audio/tadaa-47995.mp3')

    clearInterval(gGhostsInterval)
    clearInterval(gCherryInterval)
    gGame.isOn = false
    renderCell(gPacman.location, EMPTY)
    var msg = (gGame.isVictory) ? 'You Win!' : 'Game Over'
    if(msg === 'You Win!') audioWin.play()
    else audioLost.play();
    openModal(msg)
}

function checkVictory() {
    if (gGame.foodCount === 0) {
        gGame.isVictory = true
        gameOver()
    }
}

function openModal(msg) {
    const elModal = document.querySelector('.modal')
    const elSpan = elModal.querySelector('.msg')
    elSpan.innerText = msg
    elModal.style.display = 'block'
}

function closeModal() {
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}





 
  



