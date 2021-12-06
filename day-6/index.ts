import fs from "fs";

const data: number[] = fs
  .readFileSync(`${__dirname}/input.txt`, "utf-8")
  .trim()
  .split(",")
  .map(Number);

/**
 * Part 1
 */
let DAYS = 80;
let ocean = data.slice();

for (let i = 0; i < DAYS; i++) {
  ocean.forEach((fish, index) => {
    if (fish > 0) {
      ocean[index]--;
    } else {
      ocean[index] = 6;
      ocean.push(8);
    }
  });
}

console.log(ocean.length);

/**
 * Part 2
 */
DAYS = 256;
ocean = data.slice();

const spawns = Array(9).fill(0);

for (let fish of ocean) {
  spawns[fish]++;
}

for (let i = 0; i < DAYS; i++) {
  let fishes = spawns.shift();
  spawns.push(fishes);
  spawns[6] += fishes;
}

const sum = spawns.reduce((sum, cur) => sum + cur, 0);

console.log(sum);
