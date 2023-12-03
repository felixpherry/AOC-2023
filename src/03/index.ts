import * as fs from 'fs';
import * as path from 'path';

const isSymbol = (ch: string) => {
  return ch[0] !== '.' && !isNumber(ch[0]);
};

const isNumber = (ch: string) => {
  return ch[0] <= '9' && ch[0] >= '0';
};

const outOfBound = (i: number, j: number, r: number, c: number) => {
  return i < 0 || j < 0 || i >= r || j >= c;
};

const part1 = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8');
    const rows = data.split('\r\n').map((row) => row + '.');

    const r = rows.length,
      c = rows[0].length;

    const di = [-1, -1, -1, 0, 0, 1, 1, 1];
    const dj = [-1, 0, 1, 1, -1, -1, 0, 1];
    let sum = 0;
    for (let i = 0; i < r; i++) {
      let num = 0;
      for (let j = 0; j < c; j++) {
        if (isNumber(rows[i][j])) {
          num = num * 10 + parseInt(rows[i][j]);
        } else {
          if (num > 0) {
            const digit = num.toString().length;

            // from j - digit to j - 1 gotta check the neighbors
            let hasAdjacentSymbol = false;
            for (let k = j - digit; k < j; k++) {
              for (let l = 0; l < di.length; l++) {
                const tempI = i + di[l],
                  tempJ = k + dj[l];

                if (outOfBound(tempI, tempJ, r, c)) {
                  continue;
                }

                if (isSymbol(rows[tempI][tempJ])) {
                  hasAdjacentSymbol = true;
                  break;
                }
              }
              if (hasAdjacentSymbol) break;
            }

            if (hasAdjacentSymbol) sum += num;
          }

          num = 0;
        }
      }
    }
    console.log('Part 1', sum);
  } catch (error) {
    console.log(error);
  }
};

const part2 = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8');
    const rows = data.split('\r\n');

    const r = rows.length,
      c = rows[0].length;

    const di = [-1, -1, -1, 0, 0, 1, 1, 1];
    const dj = [-1, 0, 1, 1, -1, -1, 0, 1];
    let sum = 0;

    for (let i = 0; i < r; i++) {
      let numOfGear = 0;
      for (let j = 0; j < c; j++) {
        if (rows[i][j] !== '*') continue;

        // string format: 'i.jStart.jEnd'
        const coordinates = new Set<string>();

        for (let k = 0; k < di.length; k++) {
          const tempI = i + di[k],
            tempJ = j + dj[k];

          if (outOfBound(tempI, tempJ, r, c)) continue;

          const coordinate: string[] = [
            tempI.toString(),
            tempJ.toString(),
            tempJ.toString(),
          ];

          if (isNumber(rows[tempI][tempJ])) {
            let jStart = tempJ,
              jEnd = tempJ;

            while (
              !outOfBound(tempI, jStart - 1, r, c) &&
              isNumber(rows[tempI][jStart - 1])
            ) {
              jStart--;
            }

            while (
              !outOfBound(tempI, jEnd + 1, r, c) &&
              isNumber(rows[tempI][jEnd + 1])
            ) {
              jEnd++;
            }

            coordinate[1] = jStart.toString();
            coordinate[2] = jEnd.toString();

            coordinates.add(coordinate.join('.'));
          }
        }

        if (coordinates.size !== 2) continue;

        let res = 1;
        for (const coordinate of Array.from(coordinates)) {
          const [tempI, jStart, jEnd] = coordinate
            .split('.')
            .map((x) => parseInt(x));

          let num = 0;
          for (let k = jStart; k <= jEnd; k++) {
            num = num * 10 + parseInt(rows[tempI][k]);
          }

          res *= num;
        }
        sum += res;
      }
    }

    console.log('Part 2', sum);
  } catch (error) {
    console.log(error);
  }
};

part1();
part2();
