let canvas, ctx;
let currentLetterIndex = 0;
let isDrawing = false;
let lastX, lastY;

const letters = ['A', 'B']; // Letters to be drawn
const fontSize = 300; // Font size for bubble letters

document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('coloring-canvas');
    ctx = canvas.getContext('2d');

    // Set up event listeners
    document.getElementById('start-game-btn').addEventListener('click', startGame);
    document.getElementById('restart-game-btn').addEventListener('click', restartGame);

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    // Touch events for mobile devices
    canvas.addEventListener('touchstart', startDrawing, { passive: true });
    canvas.addEventListener('touchmove', draw, { passive: true });
    canvas.addEventListener('touchend', stopDrawing);
});

function startGame() {
    // Hide the start screen and show the canvas
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('end-screen').classList.add('hidden');
    canvas.classList.remove('hidden');

    // Reset game variables and draw the first letter
    currentLetterIndex = 0;
    drawLetter(letters[currentLetterIndex]);
}

function restartGame() {
    // Reset and start the game again
    startGame();
}

function drawLetter(letter) {
    // Clear the canvas and draw the current letter as a bubble outline
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#000000'; // Outline color
    ctx.strokeText(letter, canvas.width / 2, canvas.height / 2);
}

function startDrawing(e) {
    isDrawing = true;
    const { x, y } = getCanvasCoordinates(e);
    lastX = x;
    lastY = y;
}

function stopDrawing() {
    if (!isDrawing) return;

    isDrawing = false;

    // If the last letter has been drawn, end the game
    if (currentLetterIndex === letters.length - 1) {
        endGame();
    } else {
        // Move to the next letter
        currentLetterIndex++;
        drawLetter(letters[currentLetterIndex]);
    }
}

function draw(e) {
    if (!isDrawing) return;

    const { x, y } = getCanvasCoordinates(e);

    // Draw a line from the last position to the current position
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#ff0000'; // Drawing color
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastX = x;
    lastY = y;
}

function getCanvasCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
    const y = e.clientY ? e.clientY - rect.top : e.touches[0].clientY - rect.top;
    return { x, y };
}

function endGame() {
    // Hide the canvas and show the end screen
    canvas.classList.add('hidden');
    document.getElementById('end-screen').classList.remove('hidden');
}

function toggleMenu() {
    const menu = document.getElementById("menu");
    const hamburger = document.querySelector(".hamburger");
    menu.classList.toggle("show");
    hamburger.classList.toggle("active");
}
