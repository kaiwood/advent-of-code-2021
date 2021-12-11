import * as fs from "fs";

const depthMeasurements: number[] = fs
  .readFileSync(`${__dirname}/input.txt`, "utf-8")
  .trim()
  .split("\n")
  .map(Number);

/**
 * Part 1
 */
const countIncreases = (measurements: number[]) => {
  let count = 0;

  measurements.reduce((prev, cur) => {
    if (cur > prev) count++;
    return cur;
  });

  return count;
};

console.log(countIncreases(depthMeasurements));

/**
 * Part 2
 */
const sumOfChunks: number[] = depthMeasurements
  .map((m, i) => [m, depthMeasurements[i + 1], depthMeasurements[i + 2]])
  .slice(0, -2)
  .map((e) => e.reduce((sum, n) => sum + n, 0));

console.log(countIncreases(sumOfChunks));
