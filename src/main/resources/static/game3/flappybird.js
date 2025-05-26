let bgMusic = new Audio("./bgm_mario.mp3");
let collisionSound = new Audio("./sfx_die.wav");
let scoreSound = new Audio("./sfx_point.wav");

bgMusic.loop = true;
bgMusic.volume = 0.5; // Adjust volume


// Board
let board;
let boardWidth = 360; // Fixed width
let boardHeight = window.innerHeight; // Dynamic height based on screen size
let context;

// Bird
let birdWidth = 34; 
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
};

// Pipes
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

// Physics
let velocityX = -2; 
let velocityY = 0; 
let gravity = 0.4;

let gameOver = false;
let score = 0;

window.onload = function () {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    // Load images
    birdImg = new Image();
    birdImg.src = "./flappybird.png";
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    };

    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./bottompipe.png";

   // bgMusic.play();

    document.getElementById("startButton").addEventListener("click", startGame);

    setInterval(placePipes, 1500);
    document.addEventListener("keydown", moveBird);
};

function startGame() {
    document.getElementById("startButton").style.display = "none"; // Hide button
    bgMusic.play();
    requestAnimationFrame(update); // Start game loop
}


function update() {
    requestAnimationFrame(update);

    if (gameOver) {
        // Small centered pop-up
        context.fillStyle = "rgba(0, 0, 0, 0.7)";
        let boxWidth = 250;
        let boxHeight = 120;
        let boxX = (board.width - boxWidth) / 2;
        let boxY = (board.height - boxHeight) / 2;
        context.fillRect(boxX, boxY, boxWidth, boxHeight);

        context.fillStyle = "white";
        context.font = "22px sans-serif";
        context.textAlign = "center";
        context.fillText("Game Over", board.width / 2, boxY + 40);
        context.fillText("Press space bar", board.width / 2, boxY + 75);
        context.fillText("to restart", board.width / 2, boxY + 100);

        return;
    }

    context.clearRect(0, 0, board.width, board.height);

    // Bird physics
    velocityY += gravity;
    bird.y = Math.max(bird.y + velocityY, 0);
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y > board.height) {
        if (!gameOver) bgMusic.pause();
        gameOver = true;
    }

    // Pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5;
            pipe.passed = true;
            scoreSound.play();
        }

        if (detectCollision(bird, pipe)) {
            if (!gameOver){ collisionSound.play();
            bgMusic.pause();
            }
            gameOver = true;
        }
    }

    // Clear old pipes
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift();
    }

    // Display Score at Top Left Corner
    context.fillStyle = "white";
    context.font = "30px sans-serif";
    context.textAlign = "left";
    context.fillText("Score: " + Math.floor(score), 10, 40);
}

function placePipes() {
    if (gameOver) {
        return;
    }

    let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
    let openingSpace = board.height / 4;

    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    };
    pipeArray.push(topPipe);

    let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    };
    pipeArray.push(bottomPipe);
}

function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
        velocityY = -6;
        if (!bgMusic.playing) {
            bgMusic.play().catch(error => console.log("Autoplay blocked:", error));
        }

        // Reset game on key press
        if (gameOver) {
            bird.y = birdY;
            pipeArray = [];
            score = 0;
            gameOver = false;
            bgMusic.currentTime=0;
            bgMusic.play();
            
        }
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("backButton").addEventListener("click", function () {
        window.location.href = "../games.html";  // Go back one folder
    });
});


