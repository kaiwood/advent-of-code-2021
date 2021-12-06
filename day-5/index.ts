import fs from "fs";

const data: number[][] = fs
  .readFileSync(`${__dirname}/input.txt`, "utf-8")
  .trim()
  .split("\n")
  .map((e) => e.split(" -> "))
  .map((e) => e.join(",").split(",").map(Number));

const horAndVert: number[][] = data.filter(
  (e) => e[0] === e[2] || e[1] === e[3]
);

const diagonals: number[][] = data.filter(
  (e) => !(e[0] === e[2] || e[1] === e[3])
);

function maxXandY(data: number[][]): [number, number] {
  const valuesX = data.flatMap((e) => [e[0], e[2]]);
  const valuesY = data.flatMap((e) => [e[1], e[3]]);

  const maxX = Math.max(...valuesX);
  const maxY = Math.max(...valuesY);

  return [maxX, maxY];
}

class Grid {
  _fields: number[][];

  constructor(maxX: number, maxY: number) {
    this._fields = [];
    for (let y = 0; y <= maxY; y++) {
      this._fields.push(Array(maxX).fill(0));
    }
  }

  get fields() {
    return this._fields;
  }

  addPoint(x: number, y: number) {
    this._fields[y][x] += 1;
  }
}

/**
 * Part 1
 */
let [maxX, maxY] = maxXandY(horAndVert);
let grid = new Grid(maxX, maxY);

for (let entry of horAndVert) {
  let [x1, y1, x2, y2] = entry;

  [x1, x2] = [Math.min(x1, x2), Math.max(x1, x2)];
  [y1, y2] = [Math.min(y1, y2), Math.max(y1, y2)];

  if (x1 === x2) {
    for (let y = y1; y <= y2; y++) {
      grid.addPoint(x1, y);
    }
  } else {
    for (let x = x1; x <= x2; x++) {
      grid.addPoint(x, y1);
    }
  }
}

let result = grid.fields.flatMap((e) => e).filter((e) => e >= 2).length;
console.log(result);

/**
 * Part 2
 */
[maxX, maxY] = maxXandY(data);

function extractDiagonalCoordinates(from: number[], to: number[]): number[][] {
  const result = [];
  const [sortedFrom, sortedTo] = [from, to].sort((a, b) => a[0] - b[0]);

  let directionX;
  if (sortedFrom[0] < sortedTo[1]) {
    directionX = 1;
  } else {
    directionX = 0;
  }

  let directionY;
  if (sortedFrom[1] > sortedTo[1]) {
    directionY = -1;
  } else if (sortedFrom[1] < sortedTo[1]) {
    directionY = 1;
  } else {
    directionY = 0;
  }

  for (
    let x = sortedFrom[0], y = sortedFrom[1];
    x <= sortedTo[0];
    x++, y += directionY
  ) {
    result.push([x, y]);
  }

  return result;
}

for (let entry of diagonals) {
  let [x1, y1, x2, y2] = entry;

  for (let set of extractDiagonalCoordinates([x1, y1], [x2, y2])) {
    grid.addPoint(set[0], set[1]);
  }
}

result = grid.fields.flatMap((e) => e).filter((e) => e >= 2).length;
console.log(result);
