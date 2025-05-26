var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;

var currTile;
var otherTile;

window.onload = function() {
    startGame();
    window.setInterval(function(){
        crushCandy();
        slideCandy();
        generateCandy();
    }, 100);
}

function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)];
}

function startGame() {
    score = 0;
    document.getElementById("score").innerText = score;
    board = [];
    document.getElementById("board").innerHTML = "";

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomCandy() + ".png";

            // Drag and Drop Events
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    removeInitialMatches();
}

function removeInitialMatches() {
    let foundMatches = true;
    while (foundMatches) {
        foundMatches = false;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns - 2; c++) {
                if (board[r][c].src === board[r][c + 1].src && board[r][c].src === board[r][c + 2].src) {
                    board[r][c].src = "./images/" + randomCandy() + ".png";
                    foundMatches = true;
                }
            }
        }
        for (let c = 0; c < columns; c++) {
            for (let r = 0; r < rows - 2; r++) {
                if (board[r][c].src === board[r + 1][c].src && board[r][c].src === board[r + 2][c].src) {
                    board[r][c].src = "./images/" + randomCandy() + ".png";
                    foundMatches = true;
                }
            }
        }
    }
}

function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    if (!currTile || !otherTile) return;

    if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return;
    }

    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c-1 && r == r2;
    let moveRight = c2 == c+1 && r == r2;
    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let tempSrc = currTile.src;
        currTile.src = otherTile.src;
        otherTile.src = tempSrc;

        let validMove = checkValid();
        if (validMove) {
            crushCandy();
        } else {
            let tempSrc = currTile.src;
            currTile.src = otherTile.src;
            otherTile.src = tempSrc;
        }
    }
}

function crushCandy() {
    let crushed = crushThree();
    if (crushed) {
        document.getElementById("score").innerText = score;
    }
}

function crushThree() {
    let crushed = false;

    // Check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
                crushed = true;
            }
        }
    }

    // Check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
                crushed = true;
            }
        }
    }
    return crushed;
}

function checkValid() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            if (board[r][c].src == board[r][c+1].src && board[r][c+1].src == board[r][c+2].src && !board[r][c].src.includes("blank")) {
                return true;
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            if (board[r][c].src == board[r+1][c].src && board[r+1][c].src == board[r+2][c].src && !board[r][c].src.includes("blank")) {
                return true;
            }
        }
    }

    return false;
}

function slideCandy() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = columns-1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind--;
            }
        }
        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "./images/blank.png";
        }
    }
}

function generateCandy() {
    for (let c = 0; c < columns; c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "./images/" + randomCandy() + ".png";
        }
    }
}

function restartGame() {
    score = 0;
    document.getElementById("score").innerText = score;
    startGame();
}

function endGame() {
    alert("Game Over! Final Score: " + score);
    document.getElementById("board").innerHTML = "";
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("backButton").addEventListener("click", function () {
        window.location.href = "../games.html";  // Go back one folder
    });
});



