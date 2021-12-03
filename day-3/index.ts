import fs from "fs";

const nums: string[] = fs
  .readFileSync(`${__dirname}/input.txt`, "utf-8")
  .trim()
  .split("\n");

const flip = (binStr: string): string => {
  return binStr
    .split("")
    .map((e) => (e === "0" ? "1" : "0"))
    .join("");
};

/**
 * Part 1
 */
let mostCommon = "";

for (let i of Array(12).keys()) {
  let bit: string =
    nums.map((num) => Number(num[i])).reduce((sum, n) => sum + n, 0) > 499
      ? "1"
      : "0";

  mostCommon += bit;
}

let leastCommon = flip(mostCommon);

console.log(parseInt(mostCommon, 2) * parseInt(leastCommon, 2));
