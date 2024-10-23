const startgame = document.getElementById('Finger-Trace-Start');
const canvas = document.getElementById('tracingCanvas');
const score = document.getElementById('score');
const ctx = canvas.getContext('2d');

let drawing = false;
let accuracy = 0;
let traceDistance = 0;
let totalDistance = 0; 
let letterPath = [];

function DrawLetterA() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.beginPath(); 
    ctx.moveTo(250, 50); 
    ctx.lineTo(200, 450);
    ctx.lineTo(300, 450);
    ctx.closePath();
    ctx.stroke(); 

    letterPath = [{ x: 250, y: 50 }, { x: 200, y: 450 }, { x: 300, y: 450 }];

    totalDistance = 0;
    
}

// Mouse event listeners
canvas.addEventListener('mousedown', function () {
    drawing = true;
    traceDistance = 0;
    totalDistance = 0;
    ctx.beginPath();
});

canvas.addEventListener('mousemove', function (event) { 
    if (!drawing) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    ctx.lineTo(mouseX, mouseY);
    ctx.stroke();

    const lastPoint = letterPath[letterPath.length - 1];
    const distance = Math.sqrt(Math.pow(mouseX - lastPoint.x, 2) + Math.pow(mouseY - lastPoint.y, 2));
    traceDistance += distance;
    totalDistance += distance;
});

canvas.addEventListener('mouseup', function () {
    drawing = false;

    accuracy = calculateAccuracy(traceDistance, totalDistance);
    displayScore(accuracy);
});

// Accuracy calculation
function calculateAccuracy(traced, total) {
    return ((traced / total) * 100).toFixed(2);
}

// Score display
function displayScore(scoreValue) {
    score.innerText = `Your Score: ${scoreValue}%`; 
}

// Start game button click event
startgame.addEventListener('click', function () {

    DrawLetterA();
});
