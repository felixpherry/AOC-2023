import * as fs from 'fs';
import * as path from 'path';

const readInput = () => {
  try {
    return fs
      .readFileSync(path.join(__dirname, './input.txt'), 'utf8')
      .split('\n')
      .reduce((acc, curr, j) => {
        curr
          .trim()
          .split('')
          .forEach((c, i) => {
            acc[`${i}.${j}`] = c;
          });
        return acc;
      }, {} as Record<string, string>);
  } catch (error) {
    console.log(error);
  }
};

const solve = () => {
  try {
    const grid = readInput();
    if (!grid) throw new Error('Failed to parse input');

    const w =
      Math.max(...Object.keys(grid).map((key) => +key.split('.')[0])) + 1;
    const h =
      Math.max(...Object.keys(grid).map((key) => +key.split('.')[1])) + 1;

    const count = (i: number, j: number, k: number) => {
      const visited: Record<string, boolean> = {};
      const visitedDir: Record<string, boolean> = {};
      const queue: [number, number, number][] = [[i, j, k]];

      while (queue.length > 0) {
        let [currI, currJ, currK] = queue.pop()!;

        while (true) {
          visited[`${currI}.${currJ}`] = true;
          visitedDir[`${currI}.${currJ}.${currK}`] = true;

          currI += [1, 0, -1, 0][currK];
          currJ += [0, 1, 0, -1][currK];

          const cell = grid[`${currI}.${currJ}`];

          if (cell === undefined) break;
          else if (cell === '\\') currK = [1, 0, 3, 2][currK];
          else if (cell === '/') currK = [3, 2, 1, 0][currK];
          else if (cell === '|' && [0, 2].includes(currK)) {
            if (!visitedDir[`${currI}.${currJ}.3`])
              queue.push([currI, currJ, 3]);
            if (visitedDir[`${currI}.${currJ}.1`]) break;
            currK = 1;
          } else if (cell === '-' && [1, 3].includes(currK)) {
            if (!visitedDir[`${currI}.${currJ}.2`])
              queue.push([currI, currJ, 2]);
            if (visitedDir[`${currI}.${currJ}.0`]) break;
            currK = 0;
          }
        }
      }

      return Object.keys(visited).length - 1;
    };

    console.log('Part 1', count(-1, 0, 0));
    const ans2 = Array.from({ length: Math.max(w, h) }, (_, i) => {
      const horizontalCount =
        i < w ? Math.max(count(i, -1, 1), count(i, h, 3)) : 0;
      const verticalCount =
        i < h ? Math.max(count(-1, i, 0), count(w, i, 2)) : 0;
      return Math.max(horizontalCount, verticalCount);
    }).reduce((acc, current) => Math.max(acc, current), 0);

    console.log('Part 2', ans2);
  } catch (error) {
    console.log(error);
  }
};

solve();
