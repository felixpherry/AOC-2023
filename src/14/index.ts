import * as fs from 'fs';
import * as path from 'path';

const readInput = () => {
  try {
    return fs
      .readFileSync(path.join(__dirname, './input.txt'), 'utf-8')
      .split('\r\n')
      .map((row) => row.split(''));
  } catch (error) {
    console.log(error);
  }
};

const solve = () => {
  try {
    let rows = readInput();
    if (!rows) throw new Error('Failed to parse input');

    const r = rows.length,
      c = rows[0].length;

    const rotate = (rows: string[][]) =>
      rows.reduce(
        (curr, _, i) => (
          rows.forEach((_, j) => (curr[j][r - 1 - i] = rows[i][j])), curr
        ),
        Array.from({ length: c }, () => Array(r).fill(''))
      );

    const roll = (rows: string[][]) =>
      rows.reduce(
        (curr, _, i) => (
          rows.forEach((row, j) => {
            for (let k = 0; k < r; k++)
              if (rows[k][i] === 'O' && k > 0 && rows[k - 1][i] === '.') {
                rows[k][i] = '.';
                rows[k - 1][i] = 'O';
              }
          }),
          rows
        ),
        rows
      );
    const score = (rows: string[][]) =>
      rows.reduce(
        (ans, row, i) => (
          row.forEach((cell, j) => cell === 'O' && (ans += r - i)), ans
        ),
        0
      );

    const memo: Record<string, number> = {};
    const targetValue = 10 ** 9;
    let counter = 0;

    while (counter < targetValue) {
      counter++;
      const loopLimit = 4;

      Array.from({ length: loopLimit }).reduce((acc, _, j) => {
        rows = roll(rows!);
        if (counter === 1 && j === 0) console.log('Part 1', score(rows));
        rows = rotate(rows);

        const hashedRows = rows.map((row) => row.join('')).join('');
        if (memo[hashedRows]) {
          counter +=
            Math.floor((targetValue - counter) / (counter - memo[hashedRows])) *
            (counter - memo[hashedRows]);
        }
        memo[hashedRows] = counter;

        return acc;
      }, null);
    }

    console.log('Part 2', score(rows));
  } catch (error) {
    console.log(error);
  }
};

solve();
