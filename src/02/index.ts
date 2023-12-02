import * as fs from 'fs';
import * as path from 'path';

const part1 = () => {
  const availableCubeMap = {
    red: 12,
    green: 13,
    blue: 14,
  } as const;
  try {
    const data = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8');

    const games = data.split('\r');

    let sum = 0;
    for (let i = 0; i < games.length; i++) {
      const sets = games[i].split(': ')[1].split('; ');
      let isValid = true;

      for (const set of sets) {
        const cubes = set.split(', ');
        for (const cube of cubes) {
          const [num, color] = cube.split(' ');
          if (
            availableCubeMap[color as keyof typeof availableCubeMap] <
            parseInt(num)
          ) {
            isValid = false;
            break;
          }
        }
        if (!isValid) break;
      }
      if (isValid) sum += i + 1;
    }

    console.log('Part 1', sum);
  } catch (error) {
    console.log(error);
  }
};

const part2 = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8');

    const games = data.split('\r');

    let sum = 0;
    for (let i = 0; i < games.length; i++) {
      const sets = games[i].split(': ')[1].split('; ');
      const minColorMap = {
        red: 0,
        green: 0,
        blue: 0,
      };

      for (const set of sets) {
        const cubes = set.split(', ');
        for (const cube of cubes) {
          const [num, color] = cube.split(' ') as [
            string,
            keyof typeof minColorMap
          ];
          minColorMap[color] = Math.max(minColorMap[color], parseInt(num));
        }
      }
      sum += minColorMap.red * minColorMap.green * minColorMap.blue;
    }

    console.log('Part 2', sum);
  } catch (error) {
    console.log(error);
  }
};

part1();
part2();
