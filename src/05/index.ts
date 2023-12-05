import * as fs from 'fs';
import * as path from 'path';

interface Input {
  seeds: number[];
  mappers: {
    dest: number;
    src: number;
    range: number;
  }[][];
}

const readInput = () => {
  try {
    const lines = fs
      .readFileSync(path.join(__dirname, './input.txt'), 'utf-8')
      .split('\r\n')
      .filter(Boolean)
      .reduce(
        (acc, line, idx) => {
          if (line.startsWith('seeds')) {
            acc['seeds'] = line.split(': ')[1].split(' ').map(Number);
            return acc;
          }

          if (line[0] >= 'a' && line[0] <= 'z') {
            acc['mappers'].push([]);
            return acc;
          }
          const len = acc['mappers'].length;
          const [dest, src, range] = line.split(' ').map(Number);
          acc['mappers'][len - 1].push({
            dest,
            src,
            range,
          });

          return acc;
        },
        {
          seeds: [],
          mappers: [],
        } as Input
      );

    return lines;
  } catch (error) {
    console.log(error);
  }
};

interface RangeSeed {
  start: number;
  range: number;
}

const findLocation = (seed: number, mappers: Input['mappers']) => {
  let curr = seed;
  for (const mapper of mappers) {
    for (const { dest, src, range } of mapper) {
      if (src <= curr && src + range > curr) {
        curr = dest + curr - src;
        break;
      }
    }
  }

  return curr;
};

const part1 = () => {
  try {
    const data = readInput();
    if (!data) throw new Error('Failed to parse data');

    const { mappers, seeds } = data;
    const location = Math.min(
      ...seeds.map((seed) => findLocation(seed, mappers))
    );
    console.log('Part 1', location);
  } catch (error) {
    console.log(error);
  }
};

const findSeed = (location: number, mappers: Input['mappers']) => {
  let curr = location;
  for (const mapper of mappers.slice().reverse()) {
    for (const { dest, src, range } of mapper) {
      if (dest <= curr && dest + range > curr) {
        curr = src + curr - dest;
        break;
      }
    }
  }

  return curr;
};

const part2 = () => {
  try {
    const data = readInput();

    if (!data) {
      throw new Error('Could not parse input');
    }

    const { mappers, seeds } = data;

    const rangeSeeds = seeds.reduce((acc, _, idx, seeds) => {
      if (idx & 1) return acc;
      acc.push({
        start: seeds[idx],
        range: seeds[idx + 1],
      });
      return acc;
    }, [] as RangeSeed[]);

    let location: null | number = null;
    for (let i = 0; ; i++) {
      const seed = findSeed(i, mappers);

      if (
        rangeSeeds.some(
          (rangeSeed) =>
            rangeSeed.start <= seed &&
            rangeSeed.start + rangeSeed.range - 1 >= seed
        )
      ) {
        location = i;
        break;
      }
    }

    console.log('Part 2', location);
  } catch (error) {
    console.log(error);
  }
};
part1();
part2();
