let currentSet = 0;
let guessedNumber = 0;
const cards = document.querySelectorAll('.card');
const resultDiv = document.getElementById('result');
const restartBtn = document.querySelector('.restart-btn');

// Initialize game
function initializeGame() {
    const numberGrids = document.querySelectorAll('.numbers-grid');

    numberGrids.forEach((grid, index) => {
        grid.innerHTML = '';
        const bit = 1 << index;

        for (let num = 0; num < 32; num++) {
            if (num & bit) {
                const block = document.createElement('div');
                block.className = 'number-block';
                block.textContent = num;
                grid.appendChild(block);
            }
        }
    });
}

// Handle button clicks
function handleAnswer(e) {
    if (e.target.classList.contains('btn--yes')) {
        guessedNumber += 1 << currentSet;
    }

    cards[currentSet].classList.remove('active');

    if (currentSet < 4) {
        currentSet++;
        cards[currentSet].classList.add('active');
    } else {
        showResult();
    }
}

function showResult() {
    resultDiv.textContent = `Your number is ${guessedNumber}!`;
    restartBtn.style.display = 'block';
    resultDiv.style.animation = 'cardEnter 0.4s ease';
}

function restartGame() {
    currentSet = 0;
    guessedNumber = 0;

    cards.forEach(card => {
        card.classList.remove('active');
        card.style.display = '';
    });

    cards[0].classList.add('active');
    resultDiv.textContent = '';
    restartBtn.style.display = 'none';
    initializeGame();
}

// Initial setup
window.addEventListener('DOMContentLoaded', () => {
    initializeGame();
    document.querySelectorAll('.btn--yes, .btn--no').forEach(btn => {
        btn.addEventListener('click', handleAnswer);
    });
});