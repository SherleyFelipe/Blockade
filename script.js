const gameBoard = document.getElementById('gameBoard');
const boardSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = { x: 0, y: 0 };
let gameInterval;

function createBoard() {
    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            const square = document.createElement('div');
            square.style.left = `${x * 20}px`;
            square.style.top = `${y * 20}px`;
            square.classList.add('square');
            gameBoard.appendChild(square);
        }
    }
}

function drawSnake() {
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.left = `${segment.x * 20}px`;
        snakeElement.style.top = `${segment.y * 20}px`;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });
}

function drawFood() {
    const foodElement = document.createElement('div');
    foodElement.style.left = `${food.x * 20}px`;
    foodElement.style.top = `${food.y * 20}px`;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

function update() {
    // Atualiza a posição da cobra
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    // Verifica se a cobra comeu a comida
    if (head.x === food.x && head.y === food.y) {
        food = { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) };
    } else {
        snake.pop();
    }

    // Verifica se a cobra bateu nas bordas ou em si mesma
    if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize || snakeCollision(head)) {
        clearInterval(gameInterval);
        alert('Game Over');
    }

    gameBoard.innerHTML = '';
    drawSnake();
    drawFood();
}

function snakeCollision(head) {
    return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
}

document.addEventListener('keydown', changeDirection);

createBoard();
drawSnake();
drawFood();
gameInterval = setInterval(update, 100);
