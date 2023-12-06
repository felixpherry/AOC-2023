import * as fs from 'fs';
import * as path from 'path';

const readInput = (replacingStr: string) => {
  try {
    const data: number[][] = fs
      .readFileSync(path.join(__dirname, './input.txt'), 'utf8')
      .replaceAll(/ +/g, replacingStr)
      .split('\r\n')
      .map((line) => line.split(':')[1].trim().split(' ').map(Number));
    return data;
  } catch (error) {
    console.log(error);
  }
};

const solve = (replacingStr: string) => {
  try {
    const data = readInput(replacingStr);

    if (!data) throw new Error('Failed to parse input');

    const [times, distances] = data;

    let ans = 1;
    times.forEach((time, idx) => {
      let count = 0;
      for (let i = 1; i < time; i++) {
        const dist = (time - i) * i;
        if (dist > distances[idx]) count++;
      }
      ans *= count;
    });

    return ans;
  } catch (error) {
    console.log(error);
  }
};

console.log('Part 1', solve(' '));
console.log('Part 2', solve(''));
