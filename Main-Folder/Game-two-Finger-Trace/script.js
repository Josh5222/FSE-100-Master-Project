const Start_Button = document.getElementById("Finger-Trace-Start");
const End_Button = document.getElementById("End-Game");
const Header = document.getElementById("Header");
const Info = document.getElementById("Info");
const Accuracy_Display = document.getElementById("Accuracy");
const Past_Accuracies_Display = document.getElementById("Past-Accuracies"); // Element to show past accuracies
const gameContainer = document.getElementById("game-container");
const canvas = document.getElementById("tracingCanvas");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let totalStrokes = 0;
let accurateStrokes = 0;
let pastAccuracies = []; // Array to store past accuracies

// Define the letter path (using a simple "A" shape as an example)
const letterPath = new Path2D("M 150 300 L 200 100 L 250 300 Z");

function drawLetter() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#00FF00"; // Green color for the letter
    ctx.lineWidth = 5;
    ctx.stroke(letterPath);
}

// Update accuracy display
function updateAccuracy() {
    const accuracy = totalStrokes ? Math.round((accurateStrokes / totalStrokes) * 100) : 0;
    Accuracy_Display.textContent = `Accuracy: ${accuracy}%`;
}

// Start tracing interaction
function startTracing(e) {
    if (ctx.isPointInPath(letterPath, e.offsetX, e.offsetY)) {
        isDrawing = true;
        ctx.strokeStyle = "#FF0000"; // Red for active tracing
    }
}

// Tracing effect
function traceLetter(e) {
    if (!isDrawing) return;
    
    totalStrokes++;

    // Check if the tracing point is within the letter path
    if (ctx.isPointInPath(letterPath, e.offsetX, e.offsetY)) {
        accurateStrokes++;
    }
    
    // Draw a small dot for each tracing stroke
    ctx.beginPath();
    ctx.arc(e.offsetX, e.offsetY, 5, 0, 2 * Math.PI);
    ctx.fill();

    // Update accuracy after each stroke
    updateAccuracy();
}

// End tracing
function stopTracing() {
    isDrawing = false;
}

// Event listeners for canvas actions
canvas.addEventListener("mousedown", startTracing);
canvas.addEventListener("mousemove", traceLetter);
canvas.addEventListener("mouseup", stopTracing);
canvas.addEventListener("mouseout", stopTracing);

// Show game and start drawing when 'Start Game' is clicked
Start_Button.addEventListener("click", function() {
    Start_Button.style.display = 'none';
    Header.innerHTML = '';
    Info.innerHTML = '';
    Accuracy_Display.textContent = 'Accuracy: 0%';
    totalStrokes = 0;
    accurateStrokes = 0;
    gameContainer.style.display = 'flex';  // Show the canvas
    drawLetter(); // Draw the initial letter for tracing
});

// Hide game and store accuracy when 'End Game' is clicked
End_Button.addEventListener("click", function() {
    const finalAccuracy = totalStrokes ? Math.round((accurateStrokes / totalStrokes) * 100) : 0;
    pastAccuracies.push(finalAccuracy); // Store the final accuracy

    // Update the past accuracies display
    Past_Accuracies_Display.textContent = `Past Accuracies: ${pastAccuracies.join(", ")}%`;

    // Reset and hide canvas
    gameContainer.style.display = 'none';
    Start_Button.style.display = 'inline';
    Header.innerHTML = 'Finger Trace';
    Info.innerHTML = 'Follow the Green Letter on your screen with your mouse.';
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear canvas
    Accuracy_Display.textContent = 'Accuracy: 0%';
});

function toggleMenu() {
    const menu = document.getElementById("menu");
    const hamburger = document.querySelector(".hamburger");
    menu.classList.toggle("show");
    hamburger.classList.toggle("active");
}
