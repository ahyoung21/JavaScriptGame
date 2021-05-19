'use strict';

const $tbody = document.querySelector('#table tbody');
const $result = document.querySelector('#result');
const row = 10;
const cell = 10;
const mine = 10;
const CODE = {
  NORMAL: -1, // 닫힌 칸(지뢰없음)
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  MINE: -6,
  OPENED: 0, // 0 이상이면 모두 다 열린 칸
};

let data;

function plantMine() {
  const candidate = Array(row * cell)
    .fill()
    .map((arr, index) => {
      return index;
    });
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }

  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  // shuffle = [85, 19. 93]
  for (let k = 0; k < shuffle.length; k++) {
    // const ver = Math.floor(85 / 10); 8번째 줄
    const ver = Math.floor(shuffle[k] / cell);

    // const hor = 85 % 10; 5번째 칸
    const hor = shuffle[k] % cell;
    // data[8][5] = CODE.MINE;
    data[ver][hor] = CODE.MINE;
  }
  return data;
}

function onRightClick(e) {
  e.preventDefault();
  const target = e.target;
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;
  const cellData = data[rowIndex][cellIndex];
  if (cellData === CODE.MINE) {
    data[rowIndex][cellIndex] = CODE.QUESTION_MINE;
    target.className = 'question';
    target.textContent = '?';
  } else if (cellData === CODE.QUESTION_MINE) {
    data[rowIndex][cellIndex] = CODE.FLAG_MINE;
    target.className = 'flag';
    target.textContent = '!';
  } else if (cellData === CODE.FLAG_MINE) {
    data[rowIndex][cellIndex] = CODE.MINE;
    target.className = '';
    target.textContent = 'X';
  } else if (cellData === CODE.NORMAL) {
    data[rowIndex][cellIndex] = CODE.QUESTION;
    target.className = 'question';
    target.textContent = '?';
  } else if (cellData === CODE.QUESTION) {
    data[rowIndex][cellIndex] = CODE.FLAG;
    target.className = 'flag';
    target.textContent = '!';
  } else if (cellData === CODE.FLAG) {
    data[rowIndex][cellIndex] = CODE.NORMAL;
    target.className = '';
    target.textContent = '';
  }
}

function countMine(rowIndex, cellIndex) {
  const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE];
  let i = 0;
  mines.includes(data[rowIndex - 1]?.[cellIndex - 1]) && i++;
  mines.includes(data[rowIndex - 1]?.[cellIndex]) && i++;
  mines.includes(data[rowIndex - 1]?.[cellIndex + 1]) && i++;
  mines.includes(data[rowIndex][cellIndex - 1]) && i++;
  mines.includes(data[rowIndex][cellIndex + 1]) && i++;
  mines.includes(data[rowIndex + 1]?.[cellIndex - 1]) && i++;
  mines.includes(data[rowIndex + 1]?.[cellIndex]) && i++;
  mines.includes(data[rowIndex + 1]?.[cellIndex + 1]) && i++;

  return i;
}

function open(rowIndex, cellIndex) {
  const target = $tbody.children[rowIndex].children[cellIndex];
  const count = countMine(rowIndex, cellIndex);
  target.textContent = count || '';
  target.className = 'opened';
  data[rowIndex][cellIndex] = count;
  return count;
}

function openArround(rowIndex, cellIndex) {
  const count = open(rowIndex, cellIndex);
  if (count === 0) {
    isNormal(data[rowIndex - 1]?.[cellIndex - 1]) && open(rowIndex - 1, cellIndex - 1);
  }
}

function onLeftClick(e) {
  const target = e.target;
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;
  const cellData = data[rowIndex][cellIndex];

  if (
    cellData === CODE.QUESTION ||
    cellData === CODE.FLAG ||
    cellData === CODE.QUESTION_MINE ||
    cellData === CODE.FLAG_MINE
  ) {
    return;
  } else if (cellData === CODE.MINE) {
    target.textContent = '펑';
    target.className = 'opened';
    $result.textContent = 'Game Over';
    $tbody.removeEventListener('click', onLeftClick);
    $tbody.removeEventListener('contextmenu', onRightClick);
  } else if (cellData === CODE.NORMAL) {
    // const count = countMine(rowIndex, cellIndex);
    // target.textContent = count || '';
    // target.className = 'opened';
    // data[rowIndex][cellIndex] = count;
    openArround(rowIndex, cellIndex);
  }
}

function drawTable() {
  data = plantMine();
  data.forEach((row) => {
    const $tr = document.createElement('tr');
    row.forEach((cell) => {
      const $td = document.createElement('td');
      if (cell === CODE.MINE) {
        $td.textContent = 'X';
      }
      $tr.append($td);
    });
    $tbody.append($tr);
    $tbody.addEventListener('contextmenu', onRightClick);
    $tbody.addEventListener('click', onLeftClick);
  });
}

drawTable();
