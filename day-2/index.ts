import * as fs from "fs";

type Command = [string, number];

const instructions: Array<Command> = fs
  .readFileSync(`${__dirname}/input.txt`, "utf-8")
  .trim()
  .split("\n")
  .map((e) => e.split(" "))
  .map((e) => [e[0], Number(e[1])]);

/**
 * Part 1
 */
const position = { x: 0, depth: 0, aim: 0 };

for (let [dir, steps] of instructions) {
  switch (dir) {
    case "up":
      position.depth -= steps;
      break;
    case "down":
      position.depth += steps;
      break;
    case "forward":
      position.x += steps;
      break;
  }
}

console.log(position.x * position.depth);

/**
 * Part 2
 */
position.x = 0;
position.depth = 0;

for (let [dir, steps] of instructions) {
  switch (dir) {
    case "up":
      position.aim -= steps;
      break;
    case "down":
      position.aim += steps;
      break;
    case "forward":
      position.x += steps;
      position.depth += position.aim * steps;
      break;
  }
}

console.log(position.x * position.depth);
