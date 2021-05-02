let numOne = '';
let numTwo = '';
let operator = '';
const $operator = document.querySelector('#operator');
const $result = document.querySelector('#result');

//고차함수(high order function)
const onClickNumber = (e) => {
  e.target.value;
  if (!operator) {
    numOne += e.target.textContent;
    $result.value += e.target.textContent;
    return;
  }
  if (!numTwo) {
    $result.value = '';
  }
  numTwo += e.target.textContent;
  $result.value += e.target.textContent;
};

const onClickOperator = (op) => () => {
  if (numOne) {
    operator = op;
    $operator.value = op;
  } else {
    alert('숫자를 먼저 입력하세요');
  }
};

document.querySelector('#num-0').addEventListener('click', onClickNumber);
document.querySelector('#num-1').addEventListener('click', onClickNumber);
document.querySelector('#num-2').addEventListener('click', onClickNumber);
document.querySelector('#num-3').addEventListener('click', onClickNumber);
document.querySelector('#num-4').addEventListener('click', onClickNumber);
document.querySelector('#num-5').addEventListener('click', onClickNumber);
document.querySelector('#num-6').addEventListener('click', onClickNumber);
document.querySelector('#num-7').addEventListener('click', onClickNumber);
document.querySelector('#num-8').addEventListener('click', onClickNumber);
document.querySelector('#num-9').addEventListener('click', onClickNumber);

document.querySelector('#plus').addEventListener('click', onClickOperator('+'));
document
  .querySelector('#minus')
  .addEventListener('click', onClickOperator('-'));
document
  .querySelector('#divide')
  .addEventListener('click', onClickOperator('/'));
document
  .querySelector('#multiply')
  .addEventListener('click', onClickOperator('*'));

document.querySelector('#calculate').addEventListener('click', () => {
  if (numTwo) {
    // switch (operator) {
    //   case '+':
    //     $result.value = parseInt(numOne) + parseInt(numTwo);
    //     break;
    //   case '-':
    //     $result.value = parseInt(numOne) - parseInt(numTwo);
    //     break;
    //   case '*':
    //     $result.value = parseInt(numOne) * parseInt(numTwo);
    //     break;
    //   case '/':
    //     $result.value = parseInt(numOne) / parseInt(numTwo);
    //     break;
    //   default:
    //     break;
    // }

    if (operator === '+') {
      $result.value = parseInt(numOne) + parseInt(numTwo);
    } else if (operator === '-') {
      $result.value = parseInt(numOne) - parseInt(numTwo);
    } else if (operator === '/') {
      $result.value = parseInt(numOne) / parseInt(numTwo);
    } else if (operator === '*') {
      $result.value = parseInt(numOne) * parseInt(numTwo);
    }
    $operator.value = '';
    numOne = $result.value;
    operator = '';
    numTwo = '';
  } else {
    alert('숫자를 먼저 입력하세요!');
  }
});
document.querySelector('#clear').addEventListener('click', () => {
  numOne = '';
  numTwo = '';
  operator = '';
  $operator.value = '';
  $result.value = '';
});
