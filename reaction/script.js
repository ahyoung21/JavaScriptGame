const $screen = document.querySelector('#screen');
const $result = document.querySelector('#result');
let startTime;
let endTime;
const records = [];
let timeoutId;

const timer = () => {};

$screen.addEventListener('click', (e) => {
  if (e.target.classList.contains('waiting')) {
    $screen.classList.remove('waiting');
    $screen.classList.add('ready');
    $screen.textContent = '초록색이 되면 클릭하세요.';

    timeoutId = setTimeout(() => {
      $screen.classList.remove('ready');
      $screen.classList.add('now');
      $screen.textContent = '초록색이 되면 클릭하세요.';
      startTime = new Date();
    }, Math.floor(Math.random() * 1000) + 2000);
  } else if (e.target.classList.contains('ready')) {
    clearTimeout(timeoutId);
    $screen.classList.remove('ready');
    $screen.classList.add('waiting');
    $screen.textContent = '너무 성급하시군요';
  } else if (e.target.classList.contains('now')) {
    $screen.classList.remove('now');
    $screen.classList.add('waiting');
    $screen.textContent = '클릭해서 시작하세요.';
    endTime = new Date();
    const time = endTime - startTime;
    records.push(time);
    console.log(records);

    const average = records.reduce((a, c) => a + c) / records.length;

    $result.textContent = `현재 속도는 ${time}ms,
		
		평균 속도는 ${average}ms`;

    const topFive = records.sort((a, b) => a - b).slice(0, 5);
    topFive.forEach((item, index) => {
      $result.append(
        document.createElement('br'),
        `${index + 1}위는 ${item}ms`
      );
    });
    startTime = null;
    endTime = null;
  }
});
