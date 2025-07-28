const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const scoreBotom = document.querySelector('.score');
const bestScoreDisplay = document.querySelector('.best-score');
const gameOverScreen = document.getElementById('game-over-screen');
const restartButton = gameOverScreen.querySelector('button');
const gameBoard = document.querySelector('.game-board');

// sons de pulo e quando perde
const somPulo = new Audio('./audios/pulo.wav');
const overSom = new Audio('./audios/over.wav');

let score = 0;
let scored = false;

let bestScore = localStorage.getItem('bestScore') || 0;
bestScoreDisplay.textContent = `Best Score: ${bestScore}`;

let estaDeNoite = false;

function alternarFundo() {
    gameBoard.classList.remove('to-night');
    gameBoard.classList.remove('to-day');

    if (estaDeNoite) {
        // animacao para dia
        gameBoard.classList.add('to-day');
    } else {
        // animacao para noite
        gameBoard.classList.add('to-night');
    }

    estaDeNoite = !estaDeNoite;
}

// alterna o fundo a cada 30s
setInterval(alternarFundo, 30000);


const jump = () => {
    mario.classList.add('jump');
    somPulo.play();

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    const cloudsPosition = window.getComputedStyle(clouds).right;

    if (pipePosition < 0 && !scored) {
        score++;
        scoreBotom.textContent = `Score: ${score}`;
        scored = true;
    }

    if (pipePosition > 0) {
        scored = false;
    }

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        clouds.style.animation = 'none';
        clouds.style.right = `${cloudsPosition}`;

        mario.src = './imagens/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        overSom.play();

        clearInterval(loop);

        if (score > bestScore) {
            bestScore = score;
            localStorage.setItem('bestScore', bestScore);
            bestScoreDisplay.textContent = `Best: ${bestScore}`;
        }

        gameOverScreen.style.display = 'flex';
    }

}, 10);

document.addEventListener('keydown', jump);
document.addEventListener('touchstart', () => jump());

function reiniciar() {
    location.reload();
}
