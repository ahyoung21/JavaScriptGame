const $form = document.querySelector('#form');
const $input = document.querySelector('#input');
const $logs = document.querySelector('#logs');

let candidate = [];

for (let i = 0; i < 9; i++) {
  candidate.push(i + 1);
}
// let i = 0;
// while (i < 9) {
//   candidate.push(i + 1);
//   i++;
// }

let numbers = [];
for (let i = 0; i < 4; i++) {
  const index = Math.floor(Math.random() * candidate.length);
  numbers.push(candidate[index]);
  candidate.splice(index, 1);
}
console.log(numbers);

const tries = [];
function checkInput(input) {
  if (input.length !== 4) {
    return alert('4자리 숫자를 입력해주세요.');
  }
  if (new Set(input).size !== 4) {
    return alert('중복되지 않게 입력해주세요');
  }
  if (tries.includes(input)) {
    return alert('이미 시도한 값입니다.');
  }
  return true;
}

let out = 0;
function defeated() {
  const message = document.createTextNode(`패배! 정답은 ${numbers.join('')}`);
  $logs.appendChild(message);
}
$form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = e.target[0].value;

  e.target[0].value = '';
  if (!checkInput(value)) {
    return;
  }
  if (numbers.join('') === value) {
    $logs.textContent = '홈런';
    return;
  }
  if (tries.length >= 9) {
    defeated();
    return;
  }
  let strike = 0;
  let ball = 0;
  for (let i = 0; i < numbers.length; i++) {
    const index = value.indexOf(numbers[i]);
    if (index > -1) {
      if (index === i) {
        strike += 1;
      } else {
        ball += 1;
      }
    }
  }
  if (strike === 0 && ball === 0) {
    out++;
    $logs.append(`${value} ${out} out`, document.createElement('br'));
  } else {
    $logs.append(
      `${value}: ${strike} 스트라이트 ${ball} 볼`,
      document.createElement('br')
    );
  }
  if (out === 3) {
    defeated();
    return;
  }
  tries.push(value);

  console.log(tries);
});
