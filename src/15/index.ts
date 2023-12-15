import * as fs from 'fs';
import * as path from 'path';

const sequences = fs
  .readFileSync(path.join(__dirname, './input.txt'), 'utf8')
  .split(',');

const hash = (str: string) =>
  str.split('').reduce((acc, ch) => {
    acc = (17 * (acc + ch.charCodeAt(0))) % 256;
    return acc;
  }, 0);

console.log(
  'Part 1',
  sequences.map(hash).reduce((acc, ch) => acc + ch)
);

const boxes: Record<string, Record<string, number>> = new Array(256)
  .fill(0)
  .reduce((acc, _, i) => {
    acc[i] = {};
    return acc;
  }, {} as Record<string, number>);

sequences.forEach((sequence) => {
  if (sequence.includes('=')) {
    const [i, j] = sequence.split('=');
    boxes[hash(i)][i] = parseInt(j);
  } else {
    const [i] = sequence.split('-');
    delete boxes[hash(i)][i];
  }
});

console.log(
  'Part 2',
  Object.entries(boxes).reduce(
    (acc1, curr1, idx1) =>
      acc1 +
      (idx1 + 1) *
        Object.values(curr1[1]).reduce(
          (acc2, curr2, idx2) => acc2 + (idx2 + 1) * curr2,
          0
        ),
    0
  )
);
