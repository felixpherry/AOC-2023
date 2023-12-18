import * as fs from 'fs';
import * as path from 'path';
import Heap from 'heap-js';

const dirs = {
  top: 1,
  down: 2,
  right: 3,
  left: 4,
};

type ValueOf<T> = T[keyof T];

type Position = [number, number, ValueOf<typeof dirs>];

type Step = [number, Position, number, number];

const readInput = () => {
  try {
    return fs
      .readFileSync(path.join(__dirname, './input.txt'), 'utf8')
      .split('\r\n')
      .map((line) => line.split('').map(Number));
  } catch (error) {
    console.log(error);
  }
};

const getNextPositions: Record<
  ValueOf<typeof dirs>,
  (i: number, j: number) => Position[]
> = {
  1: (i, j) => [
    [i, j - 1, 1],
    [i + 1, j, 3],
    [i - 1, j, 4],
  ],
  2: (i, j) => [
    [i, j + 1, 2],
    [i + 1, j, 3],
    [i - 1, j, 4],
  ],
  3: (i, j) => [
    [i, j + 1, 2],
    [i, j - 1, 1],
    [i + 1, j, 3],
  ],
  4: (i, j) => [
    [i, j + 1, 2],
    [i, j - 1, 1],
    [i - 1, j, 4],
  ],
};

const generateKey = ([, [i, j, dir], _, ctr]: Step): number =>
  (j << 16) | (i << 8) | (dir << 4) | ctr;

export const part1 = () => {
  try {
    const map = readInput();
    if (!map) throw new Error('Failed to parse input');

    const startI = 0,
      startJ = 0,
      endI = map[0].length - 1,
      endJ = map.length - 1;

    const startingStepEast: Step = [0, [startI, startJ, dirs.right], 0, 0];
    const startingStepSouth: Step = [0, [startI, startJ, dirs.down], 0, 0];

    const queue = new Heap<Step>(([hA], [hb]) => hA - hb);
    queue.push(startingStepEast);
    queue.push(startingStepSouth);

    const visited = new Set<number>();

    while (queue.size() > 0) {
      const [, [i, j, dir], ans, ctr] = queue.pop()!;

      if (i === endI && j === endJ) return console.log('Part 1', ans);

      const nextPositions = getNextPositions[dir](i, j)
        .filter(([, , newDirection]) => (ctr > 2 ? newDirection !== dir : true))
        .filter(([i, j]) => !(i < 0 || j < 0 || j > endJ || i > endI));

      for (const [nextI, nextJ, nextDir] of nextPositions) {
        const nextStep: Step = [
          ans + map[nextJ][nextI] + endI - nextI + endJ - nextJ,
          [nextI, nextJ, nextDir],
          ans + map[nextJ][nextI],
          nextDir === dir ? ctr + 1 : 1,
        ];

        const key = generateKey(nextStep);
        if (!visited.has(key)) {
          visited.add(key);
          queue.push(nextStep);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const part2 = () => {
  try {
    const map = readInput();
    if (!map) throw new Error('Failed to parse input');

    const endI = map[0].length - 1;
    const endJ = map.length - 1;

    const startI = 0;
    const startJ = 0;

    const startingStepEast: Step = [0, [startI, startJ, dirs.right], 0, 0];
    const startingStepSouth: Step = [0, [startI, startJ, dirs.down], 0, 0];

    const queue = new Heap<Step>(([hA], [hB]) => hA - hB);
    queue.push(startingStepEast);
    queue.push(startingStepSouth);

    const visited = new Set<number>();

    while (queue.size() > 0) {
      const [, [i, j, dir], ans, ctr] = queue.pop()!;

      if (i === endI && j === endJ) {
        if (ctr < 4) continue;
        return console.log('Part 2', ans);
      }

      const nextPositions = getNextPositions[dir](i, j)
        .filter(([, , newDirection]) => {
          if (ctr < 4) return newDirection === dir;
          if (ctr > 9) return newDirection !== dir;
          return true;
        })
        .filter(([i, j]) => !(i < 0 || j < 0 || j > endJ || i > endI));

      for (const [nextI, nextJ, newDirection] of nextPositions) {
        const nextStep: Step = [
          ans + map[nextJ][nextI] + endI - nextI + endJ - nextJ,
          [nextI, nextJ, newDirection],
          ans + map[nextJ][nextI],
          newDirection === dir ? ctr + 1 : 1,
        ];

        const key = generateKey(nextStep);
        if (!visited.has(key)) {
          visited.add(key);
          queue.push(nextStep);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

part1();
part2();
