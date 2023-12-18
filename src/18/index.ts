import * as fs from 'fs';
import * as path from 'path';

const readInput = () =>
  fs
    .readFileSync(path.join(__dirname, './input.txt'), 'utf-8')
    .trim()
    .split('\n');

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const n: string[] = ['R', 'D', 'L', 'U'];

(() => {
  const lines = readInput();

  const solve = (p2: boolean) => {
    let p = [0, 0];
    const pts = [p];
    let border = 0;

    for (const line of lines) {
      let dd: number[];
      let dst: number;

      if (p2) {
        const prts = line.split('#')[1].split(')');
        dd = dirs[parseInt(prts[0].charAt(prts[0].length - 1), 16)];
        dst = parseInt(prts[0].slice(0, -1), 16);
      } else {
        const prts = line.split(' ');
        dd = dirs[n.indexOf(prts[0])];
        dst = parseInt(prts[1]);
      }

      p = [p[0] + dd[0] * dst, p[1] + dd[1] * dst];
      border += dst;
      pts.push([...p]);
    }

    const rPts = pts.slice().reverse();
    let area = 0;

    rPts.reduce(
      (_, curr, idx, arr) => {
        if (idx < arr.length - 1) {
          area += (curr[1] + arr[idx + 1][1]) * (curr[0] - arr[idx + 1][0]);
        }
        return curr;
      },
      [0, 0]
    );

    return Math.floor(border / 2 + area / 2 + 1);
  };

  console.log('Part 1', solve(false));
  console.log('Part 2', solve(true));
})();
