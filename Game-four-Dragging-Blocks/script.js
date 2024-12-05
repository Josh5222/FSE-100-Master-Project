document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const gameCanvas = document.getElementById('game-canvas');
    const endScreen = document.getElementById('end-screen');
    const startGameBtn = document.getElementById('start-game-btn');
    const restartGameBtn = document.getElementById('restart-game-btn');
    const finalScoreElement = document.getElementById('final-score');

    const ctx = gameCanvas.getContext('2d');
    const canvasWidth = 800;
    const canvasHeight = 600;
    gameCanvas.width = canvasWidth;
    gameCanvas.height = canvasHeight;

    let score = 0;
    let timer = 30;
    let player = { x: canvasWidth / 2 - 50, y: canvasHeight - 30, width: 100, height: 20 };
    let fallingItems = [];
    let gameInterval;

    // Start Game
    function startGame() {
        score = 0;
        timer = 30;
        fallingItems = [];

        startScreen.classList.add('hidden');
        endScreen.classList.add('hidden');
        gameCanvas.classList.remove('hidden');

        gameInterval = setInterval(() => {
            updateGame();
        }, 30);

        const timerInterval = setInterval(() => {
            timer--;
            if (timer <= 0) {
                clearInterval(timerInterval);
                endGame();
            }
        }, 1000);
    }

    // End Game
    function endGame() {
        clearInterval(gameInterval);
        gameCanvas.classList.add('hidden');
        endScreen.classList.remove('hidden');
        finalScoreElement.textContent = score;
    }

    // Update Game
    function updateGame() {
        // Clear Canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Draw Player
        ctx.fillStyle = '#242526';
        ctx.fillRect(player.x, player.y, player.width, player.height);

        // Draw Falling Items
        fallingItems.forEach((item, index) => {
            item.y += item.speed;
            ctx.fillStyle = '#878788';
            ctx.beginPath();
            ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();

            // Check Collision
            if (
                item.y + item.radius > player.y &&
                item.x > player.x &&
                item.x < player.x + player.width
                
            ) {
                score++;
                fallingItems.splice(index, 1);
            }

            // Remove Item if Out of Bounds
            if (item.y - item.radius > canvasHeight) {
                fallingItems.splice(index, 1);
            }
        });

        // Spawn New Item
        if (Math.random() < 0.05) {
            const newItem = {
                x: Math.random() * canvasWidth,
                y: 0,
                radius: 10,
                speed: Math.random() * 2 + 2,
            };
            fallingItems.push(newItem);
        }
    }

    // Track Player Movement
    document.addEventListener('mousemove', (e) => {
        const rect = gameCanvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        player.x = Math.max(0, Math.min(mouseX - player.width / 2, canvasWidth - player.width));
    });

    // Button Event Listeners
    startGameBtn.addEventListener('click', startGame);
    restartGameBtn.addEventListener('click', startGame);
});


function toggleMenu() {
    const menu = document.getElementById("menu");
    const hamburger = document.querySelector(".hamburger");
    menu.classList.toggle("show");
    hamburger.classList.toggle("active");
}
