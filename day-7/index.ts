import * as fs from "fs";

const positions = fs
  .readFileSync(`${__dirname}/input.txt`, "utf-8")
  .trim()
  .split(",")
  .map(Number);

/**
 * Part 1
 */
const median = (array: number[]) => {
  let middle = Math.floor(array.length / 2);
  array = [...array].sort((a, b) => a - b);
  return array.length % 2 !== 0
    ? array[middle]
    : (array[middle - 1] + array[middle]) / 2;
};

const calcFuel = (array: number[], position: number) => {
  return array.reduce((sum, cur) => (sum += Math.abs(position - cur)), 0);
};

const m = median(positions);
const r = calcFuel(positions, m);

console.log(r);

/**
 * Part 2
 */
const cost = (from: number, to: number): number => {
  const distance = Math.abs(from - to);
  return (distance * (distance + 1)) / 2;
};

let possibleCosts: number[] = [];
for (let i = 1; i <= Math.max(...positions); i++) {
  possibleCosts.push(
    positions.map((e) => cost(e, i)).reduce((sum, cur) => sum + cur, 0)
  );
}

let result = Math.min(...possibleCosts);
console.log(result);
