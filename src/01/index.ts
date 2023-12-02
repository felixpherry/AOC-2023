import * as fs from 'fs';
import * as path from 'path';

const isNum = (ch: string) => {
  return ch[0] <= '9' && ch[0] >= '0';
};

const part1 = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8');
    const items = data.split('\n');
    let sum = items.reduce((tot, item) => {
      let first: number | null = null,
        second: number | null = null;
      for (const ch of item) {
        if (isNum(ch)) {
          if (first === null) first = parseInt(ch);
          second = parseInt(ch);
        }
      }
      if (!first || !second) {
        console.log({ item, first, second });
        throw new Error('Data is invalid');
      }
      return tot + 10 * first + second;
    }, 0);
    console.log('Part 1', sum);
  } catch (error) {
    console.log(error);
  }
};

const part2 = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8');
    const items = data.split('\n');
    let sum = items.reduce((tot, item) => {
      let first: number | null = null,
        second: number | null = null;
      for (let i = 0; i < item.length; i++) {
        if (isNum(item[i])) {
          if (first === null) first = parseInt(item[i]);
          second = parseInt(item[i]);
        } else if (
          item[i] === 'o' &&
          item[i + 1] === 'n' &&
          item[i + 2] === 'e'
        ) {
          if (first === null) first = 1;
          second = 1;
        } else if (
          item[i] === 't' &&
          item[i + 1] === 'w' &&
          item[i + 2] === 'o'
        ) {
          if (first === null) first = 2;
          second = 2;
        } else if (
          item[i] === 't' &&
          item[i + 1] === 'h' &&
          item[i + 2] === 'r' &&
          item[i + 3] === 'e' &&
          item[i + 4] === 'e'
        ) {
          if (first === null) first = 3;
          second = 3;
        } else if (
          item[i] === 'f' &&
          item[i + 1] === 'o' &&
          item[i + 2] === 'u' &&
          item[i + 3] === 'r'
        ) {
          if (first === null) first = 4;
          second = 4;
        } else if (
          item[i] === 'f' &&
          item[i + 1] === 'i' &&
          item[i + 2] === 'v' &&
          item[i + 3] === 'e'
        ) {
          if (first === null) first = 5;
          second = 5;
        } else if (
          item[i] === 's' &&
          item[i + 1] === 'i' &&
          item[i + 2] === 'x'
        ) {
          if (first === null) first = 6;
          second = 6;
        } else if (
          item[i] === 's' &&
          item[i + 1] === 'e' &&
          item[i + 2] === 'v' &&
          item[i + 3] === 'e' &&
          item[i + 4] === 'n'
        ) {
          if (first === null) first = 7;
          second = 7;
        } else if (
          item[i] === 'e' &&
          item[i + 1] === 'i' &&
          item[i + 2] === 'g' &&
          item[i + 3] === 'h' &&
          item[i + 4] === 't'
        ) {
          if (first === null) first = 8;
          second = 8;
        } else if (
          item[i] === 'n' &&
          item[i + 1] === 'i' &&
          item[i + 2] === 'n' &&
          item[i + 3] === 'e'
        ) {
          if (first === null) first = 9;
          second = 9;
        }
      }
      if (!first || !second) {
        console.log({ item, first, second });
        throw new Error('Data is invalid');
      }
      return tot + 10 * first + second;
    }, 0);
    console.log('Part 2', sum);
  } catch (error) {
    console.log(error);
  }
};

// Time Complexity for both: O(row * col)
// Space Complexity for both: O(1)
part1();
part2();
