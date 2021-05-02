'use strict';
const { body } = document;
const $table = document.createElement('table');
const $result = document.createElement('div');

let turn = 'X';
const rows = [];

// [
//   [td, td, td],
//   [td, td, td],
//   [td, td, td],
// ]

const checkWinner = (target) => {
  let rowIndex = target.parentNode.rowIndex;
  let cellIndex = target.cellIndex;

  // rows.forEach((row, ri) => {
  //   row.forEach((cell, ci) => {
  //     if (cell === target) {
  //       cellIndex = ci;
  //       rowIndex = ri;
  //     }
  //   });
  // });

  let hasWinner = false;
  console.log(`${rowIndex},${cellIndex}`);

  // 가로줄 검사
  if (
    rows[rowIndex][0].textContent === turn &&
    rows[rowIndex][1].textContent === turn &&
    rows[rowIndex][2].textContent === turn
  ) {
    hasWinner = true;
  }
  // 세로줄 검사
  if (
    rows[0][cellIndex].textContent === turn &&
    rows[1][cellIndex].textContent === turn &&
    rows[2][cellIndex].textContent === turn
  ) {
    hasWinner = true;
  }
  // 대각선 검사
  if (
    rows[0][0].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][2].textContent === turn
  ) {
    hasWinner = true;
  }
  if (
    rows[0][2].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][0].textContent === turn
  ) {
    hasWinner = true;
  }

  return hasWinner;
};

const clickEvent = (e) => {
  // e.stopPropagation();

  if (e.target.textContent) return;

  // console.log('빈칸입니다');
  e.target.textContent = turn;

  // if (turn === 'O') {

  //   turn = 'X';

  // } else if (turn === 'X') {

  //   turn = 'O';
  // }

  if (checkWinner(e.target)) {
    $result.textContent = `${turn}님이 승리!`;
    body.append($result);
    $table.removeEventListener('click', clickEvent);

    return;
  }

  // 무승부
  let draw = true;
  rows.forEach((row) => {
    row.forEach((cell) => {
      if (!cell.textContent) {
        draw = false;
      }
    });
  });
  if (draw) {
    $result.textContent = '무승부';
    body.append($result);
    return;
  }
  turn = turn === 'X' ? (turn = 'O') : (turn = 'X');
};

for (let j = 0; j < 3; j++) {
  const $tr = document.createElement('tr');
  const cells = [];
  for (let i = 0; i < 3; i++) {
    const $td = document.createElement('td');
    cells.push($td);
    $table.addEventListener('click', clickEvent);
    $tr.append($td);
  }
  rows.push(cells);
  $table.append($tr);
  console.log(rows);
}

body.append($table);
