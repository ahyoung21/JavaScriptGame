const $computer = document.querySelector('#computer');
const $score = document.querySelector('#score');
const $rock = document.querySelector('#rock');
const $scissors = document.querySelector('#scissors');
const $paper = document.querySelector('#paper');

const IMG_URL = './rsp.png';

const rspX = {
  scissors: '0',
  rock: '-220px',
  paper: '-440px',
};

let computerChoice = 'rock';

const interval = () => {
  if (computerChoice === 'rock') {
    computerChoice = 'scissors';
  } else if (computerChoice === 'scissors') {
    computerChoice = 'paper';
  } else if (computerChoice === 'paper') {
    computerChoice = 'rock';
  }

  $computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`;
  $computer.style.backgroundSize = 'auto 200px';
};

let intervalId = setInterval(interval, 100);

const scoreTable = {
  rock: 0,
  scissors: 1,
  paper: -1,
};

let clickable = true;
let score = 0;
let message = '';
let computer;
let me;
const clickButton = (e) => {
  if (clickable) {
    clearInterval(intervalId);
    clickable = false;

    const myChoice = e.target.id;

    const myScore = scoreTable[myChoice];
    const computerScore = scoreTable[computerChoice];
    const diff = myScore - computerScore;

    if ([2, -1].includes(diff)) {
      score += 1;
      message = '승리';
    } else if (diff === -2 || diff === 1) {
      score -= 1;
      message = '패배';
    } else {
      message = '무승부';
    }

    $score.textContent = `${message} 총 점수는 ${score}`;

    setTimeout(() => {
      clickable = true;
      intervalId = setInterval(interval, 100);
    }, 1000);
  }
};

$rock.addEventListener('click', clickButton);
$scissors.addEventListener('click', clickButton);
$paper.addEventListener('click', clickButton);
