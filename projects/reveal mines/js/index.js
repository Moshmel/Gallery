'use strict';
var SMILEY_IMAGE = {
    cool: `<img src="img/cool.png"class="picsmiley">`,
    smile: `<img src="img/smile.png" class="picsmiley">`,
    dead: `<img src="img/dead.png" class="picsmiley">`,
}
var UNFLIPPED_IMG = '<img src="img/wall.png" class="pic">';
var FLAGGED_IMG = '<img src="img/flag.jpg" class="pic">';
var MINE_IMG = '<img src="img/mine.png" class="pic">';
var gTime;
var gBoard = [];
var gLevel = {
    SIZE: 4,
    MINES: 2
};
var gComponets = {
    menu: document.querySelector('.menu'),
    clock: document.querySelector('.clock'),
    score: document.querySelector('.score'),
    boardContainer: document.querySelector('.board-container'),
    smiley: document.querySelector('.smiley'),
    bestTime: document.querySelector('.best-time'),
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    firstClick: false,
};

initGame();
renderBoard(gBoard, gLevel);

//change the level functions
function easyLevel() {

    gLevel.SIZE = 4;
    gLevel.MINES = 2;
    initGame();
}

function hardLevel() {

    gLevel.SIZE = 8;
    gLevel.MINES = 15;
    initGame();
}
function mediumLevel() {

    gLevel.SIZE = 6;
    gLevel.MINES = 5;
    initGame();
}

//rendering a cell according to his content;
function renderCell(cell, i, j) {
    var elCell = document.querySelector(`#cell-${i}-${j}`);

    if (!cell.isShown) {
        if (cell.isMarked) elCell.innerHTML = FLAGGED_IMG;
        else { elCell.innerHTML = UNFLIPPED_IMG; }
    }
    else if (cell.isMine) elCell.innerHTML = MINE_IMG;
    else if (cell.minesAroundCount > 0) elCell.innerHTML = `${cell.minesAroundCount}`;
    else elCell.innerHTML = '';
}

function initGame() {
    clearInterval(gTime);
    gComponets.clock.innerText = 'Time: 0';
    gGame.isOn = true;
    gGame.firstClick = false;
    gGame.shownCount = 0;
    gComponets.score.innerText = '0';
    gGame.markedCount = 0;
    gBoard.secsPassed = 0;
    gComponets.smiley.innerHTML = SMILEY_IMAGE.smile;
    buildBoard(gLevel);
    renderBoard(gBoard, gLevel);
    //check is there is a high score at the same dificulty
    var bestTime = localStorage.getItem(`highscore${gLevel.SIZE}`);
    if (!bestTime ) gComponets.bestTime.innerText = 'Best time : ';
    else gComponets.bestTime.innerText = `Best time : ${bestTime}`;
}

function setMines(board) {
    var cell = createCell();
    cell.isMine = true;
    for (var i = 0; i < gLevel.MINES; i++) {
        var isFound = false;
        while (!isFound) {
            var randI = getRandomInt(0, (gLevel.SIZE - 1));
            var randJ = getRandomInt(0, (gLevel.SIZE - 1));
            //checking if the cell is not pressed or dont have mine in it
            if (board[randI][randJ].isShown === false &&
                board[randI][randJ].isMine === false &&
                isNegForFirstPress(randI, randJ) === true) {
                board[randI][randJ] = cell;
                countNegs(gBoard, randI, randJ);
                isFound = true;
            }
        }
    }
}

function renderBoard(board) {
    var strHTML = '<table border="1"><tbody>';
    for (var i = 0; i < gLevel.SIZE; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = gBoard[i][j];
            var className = 'cell cell' + i + '-' + j;
            var img = '';
            if (!cell.isShown) img = UNFLIPPED_IMG;
            else if (cell.isMarked) { img = FLAGGED_IMG; }
            else if (cell.isMine) { img = MINE_IMG; }
            else if (cell.minesAroundCount > 0) { img = `${cell.minesAroundCount}`; }
            else { img = '' }
            strHTML += `<td id ="cell-${i}-${j}" class="${className}" onmousedown="cellClicked(event,this.id)" > ${img} </td>`;
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    gComponets.boardContainer.innerHTML = strHTML;
}
//creating the board acording to the level
function buildBoard(gLevel) {
    for (let i = 0; i < gLevel.SIZE; i++) {
        gBoard[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            gBoard[i][j] = createCell();
        }
    }
}

function createCell() {
    var cell =
    {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
        isChecked: false
    }

    return cell;
}
//
function setMinesNegsCount(board) {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            if (gBoard[i][j].isMine) {
                countNegs(gBoard, i, j);
            }
        }
    }
}

///checking negs of specific mine cell and update thier mines count
function countNegs(mat, cellI, cellJ) {
    var count = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {

        if (i < 0 || i >= mat.length) continue;

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= mat[0].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (!mat[i][j].isMine) mat[i][j].minesAroundCount++;
        }
    }
}
///activated every time a user click on a cell
function cellClicked(ev, id) {

    if (gGame.isOn) {
        var i = +id.charAt(5);
        var j = +id.charAt(7);
        var cell = gBoard[i][j];
        if (ev.button === 2) {
            if (!cell.isShown) {
                if (!cell.isMarked) {
                    ///put flag image  
                    gGame.markedCount++;
                    cell.isMarked = true;
                }
                else {
                    //remove the flag
                    cell.isMarked = false;
                    gGame.markedCount--;
                }
                renderCell(cell, i, j);
            }
        }
        else if (ev.button === 0) {
            leftClickedPressed(i, j);
        }
    } else { gameOver(); }
}

function gameOver() {

    clearInterval(gTime);
    gGame.isOn = false;
    gComponets.smiley.innerHTML = SMILEY_IMAGE.dead;
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            if (gBoard[i][j].isMine) {
                var elCell = document.querySelector(`#cell-${i}-${j}`);
                elCell.classList.add("show");
                gBoard[i][j].isShown = true;
                renderCell(gBoard[i][j], i, j);
            }
        }
    }
}
//activate after first left click on the board
function startGame() {
    timer();
    setMines(gBoard);
    renderBoard(gBoard, gLevel);

}
function leftClickedPressed(i, j) {

    var cell = gBoard[i][j];
    //first click of user in the game
    if (gGame.firstClick === false && !cell.isMarked) {
        gBoard[i][j].isShown = true;
        gGame.firstClick = true;

        startGame();
        expandShown(gBoard, i, j);
        calcShown();
        return;
    }
    if (cell.isMine === true) {
        gameOver();}
    if (cell.isShown === false && cell.isMarked === false) {
        if (cell.isMine === true) {
            gameOver();
        }
        else {
            if (cell.minesAroundCount === 0) {
                cell.isShown = true;
                renderCell(cell, i, j);
                expandShown(gBoard, i, j)
            }
        }
        cell.isShown = true;
        renderCell(cell, i, j);
        calcShown();
        checkWin();
    }
}
//working recursivly
function expandShown(mat, cellI, cellJ) {
    if (cellI === undefined || cellJ === undefined) return;
    if (gBoard[cellI][cellJ].minesAroundCount > 0) return;
    if (gBoard[cellI][cellJ].isChecked === true) return;       //condition for the  recurtion to stop
    gBoard[cellI][cellJ].isChecked = true;
    for (var i = cellI - 1; i <= cellI + 1; i++) {

        if (i < 0 || i >= mat.length) continue;

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= mat[0].length) continue;
            if (i === cellI && j === cellJ) continue;

            if (!mat[i][j].isMine || !mat[i][j].isShown) {

                if (mat[i][j].minesAroundCount > 0) {
                    mat[i][j].isShown = true;
                    renderCell(mat[i][j], i, j);

                }
                if (mat[i][j].minesAroundCount === 0) {

                    mat[i][j].isShown = true;
                    renderCell(mat[i][j], i, j);
                    expandShown(gBoard, i, j);
                }
            }
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calcShown() {
    var count = 0;
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            if ((gBoard[i][j].isShown) && (!gBoard[i][j].isMine)) {
                count++;
            }
        }
    }
    gGame.shownCount = count;
    gComponets.score.innerText = gGame.shownCount;
}

function isNegForFirstPress(gBoard, cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {

        if (i < 0 || i >= gBoard.length) continue;

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (gBoard[i][j].isShown) return false;
        }
    }
    return true;
}

function timer() {
    var counter = 0;
    gTime = setInterval(function () {
        if (counter < 999) {
            counter++;
            gGame.secsPassed = counter;
            gComponets.clock.innerText = `Time: ${counter} `;
        }
        else {
            gameOver();
        }
    }, 1000);
}

function checkWin() {
    var score = gGame.shownCount;
    var winScore = (gLevel.SIZE * gLevel.SIZE) - gLevel.MINES;
    if (score === winScore) {
        clearInterval(gTime);
        gGame.isOn = false;
        gComponets.smiley.innerHTML = SMILEY_IMAGE.cool;

        var time = gGame.secsPassed;
        var bestTime = localStorage.getItem(`highscore${gLevel.SIZE}`);
        if (!bestTime) {
            if (time < bestTime) {
                localStorage.setItem(`highscore${gLevel.SIZE}`, time);
                gComponets.bestTime.innerText = `Best time : ${time}`

            }
        }
        else {
            localStorage.setItem(`highscore${gLevel.SIZE}`, time);
            gComponets.bestTime.innerText = `Best time : ${time}`

        }


    }
}

///bugs that havent fix:
//1.on start mines can be neiboors to first click
//3.dident do the hints part