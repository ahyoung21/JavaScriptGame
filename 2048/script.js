'use strict';

const $table = document.querySelector('#table');
const $score = document.querySelector('#score');
let data = [];

function startGame() {
  const $fragment = document.createDocumentFragment();
  [1, 2, 3, 4].forEach(function () {
    const rowData = [];
    data.push(rowData);
    const $tr = document.createElement('tr');
    [1, 2, 3, 4].forEach(() => {
      rowData.push(0);
      const $td = document.createElement('td');
      $tr.appendChild($td);
    });
    $fragment.appendChild($tr);
  });
  $table.appendChild($fragment);
  put2ToRandomCell();
  draw();
}

function put2ToRandomCell() {
  const emptyCells = [];
  data.forEach(function (rowDate, i) {
    rowDate.forEach(function (cellData, j) {
      if (!cellData) {
        emptyCells.push([i, j]);
        console.log(emptyCells);
      }
    });
  });
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  data[randomCell[0]][randomCell[1]] = 2;
  console.log(randomCell);
}

function draw() {}

startGame();
