<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simulated OS with Games</title>
    <style>
        body {
            font-family: 'Courier New', monospace;
            background-color: black;
            color: green;
            padding: 20px;
            text-align: center;
        }
        #console {
            height: 80vh;
            overflow-y: scroll;
            white-space: pre-wrap;
            font-size: 16px;
        }
        input {
            background-color: black;
            color: green;
            border: none;
            width: 100%;
            font-size: 16px;
        }
        input:focus {
            outline: none;
        }
        canvas {
            background-color: black;
            margin-top: 20px;
            display: block;
            margin-left: auto;
            margin-right: auto;
        }
    </style>
</head>
<body>

<div id="console"></div>
<input type="text" id="command" placeholder="Type a command..." autofocus>

<script>
// Setup for the OS
const consoleElement = document.getElementById('console');
const commandInput = document.getElementById('command');

// Simulate OS - printing messages to the console
function print(message) {
    consoleElement.textContent += message + '\n';
    consoleElement.scrollTop = consoleElement.scrollHeight;
}

// Command input handling
function handleInput() {
    const command = commandInput.value.trim();
    commandInput.value = ''; // Clear the input field

    switch(command.toLowerCase()) {
        case 'help':
            print('Commands:\nhelp - Show this help message\nls - List files\nclear - Clear the console\nabout - Display system info\npong - Start Pong game');
            break;
        case 'ls':
            print('file1.txt\nfile2.txt\nfile3.txt');
            break;
        case 'clear':
            consoleElement.textContent = '';
            break;
        case 'about':
            print('Simulated OS Version 1.0\nDeveloped with JavaScript');
            break;
        case 'pong':
            startPongGame();
            break;
        default:
            print(`Command not found: ${command}`);
    }
}

// Event listener for command input
commandInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        print('> ' + commandInput.value);
        handleInput();
    }
});

// Initial welcome message
print('Welcome to the Simulated OS!');
print('Type "help" for a list of commands.');

// ===================== Pong Game =====================

// Pong game setup
const pongCanvas = document.createElement('canvas');
pongCanvas.width = 800;
pongCanvas.height = 400;
document.body.appendChild(pongCanvas);
const ctx = pongCanvas.getContext('2d');

// Paddle and ball properties
const paddleWidth = 10, paddleHeight = 100;
let leftPaddleY = (pongCanvas.height - paddleHeight) / 2;
let rightPaddleY = (pongCanvas.height - paddleHeight) / 2;
let paddleSpeed = 5;

let ballRadius = 10;
let ballX = pongCanvas.width / 2;
let ballY = pongCanvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Game state
let upPressed = false;
let downPressed = false;

// Set up paddle controls
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        upPressed = true;
    }
    if (event.key === 'ArrowDown') {
        downPressed = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp') {
        upPressed = false;
    }
    if (event.key === 'ArrowDown') {
        downPressed = false;
    }
});

// Update paddles and ball
function movePaddles() {
    if (upPressed && rightPaddleY > 0) {
        rightPaddleY -= paddleSpeed;
    }
    if (downPressed && rightPaddleY < pongCanvas.height - paddleHeight) {
        rightPaddleY += paddleSpeed;
    }
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top/bottom
    if (ballY + ballRadius > pongCanvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX - ballRadius < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX + ballRadius > pongCanvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball out of bounds
    if (ballX + ballRadius < 0 || ballX - ballRadius > pongCanvas.width) {
        ballX = pongCanvas.width / 2;
        ballY = pongCanvas.height / 2;
        ballSpeedX = -ballSpeedX;
    }
}

function draw() {
    ctx.clearRect(0, 0, pongCanvas.width, pongCanvas.height); // Clear the canvas

    // Draw paddles and ball
    ctx.fillStyle = 'green';
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
    ctx.fillRect(pongCanvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

// Game loop
function gameLoop() {
    movePaddles();
    moveBall();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start Pong game
function startPongGame() {
    pongCanvas.style.display = 'block';
    consoleElement.style.display = 'none';
    print("Pong game started! Use the UP and DOWN arrow keys to move the right paddle.");
    gameLoop();
}

// Function to go back to the console after game ends
function stopPongGame() {
    pongCanvas.style.display = 'none';
    consoleElement.style.display = 'block';
    print("Pong game ended. Type 'help' for more commands.");
}
</script>

</body>
</html>
  