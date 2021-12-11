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
const mostCommon = (nums: string[], half = 499, tieBit = "0") => {
  let mostCommon = "";

  for (let i of Array(12).keys()) {
    let count = nums
      .map((num) => Number(num[i]))
      .reduce((sum, n) => sum + n, 0);

    let bit: string = count > half ? "1" : "0";

    if (count === half) {
      bit = tieBit;
    }

    mostCommon += bit;
  }

  return mostCommon;
};

let leastCommon = flip(mostCommon(nums));

console.log(parseInt(mostCommon(nums), 2) * parseInt(leastCommon, 2));

/**
 * Part 2
 */

function rating(bitList: string[], position = 0, tieBit = "1") {
  let matched = [];

  let common: string = mostCommon(
    bitList,
    Math.round(matched.length - 1 / 2),
    tieBit
  );

  if (tieBit === "0") {
    common = flip(common);
  }

  for (let bit of bitList) {
    if (bit[position] === common[position]) {
      matched.push(bit);
    }
  }

  if (matched.length > 1) {
    rating(matched, position + 1, tieBit);
  }

  console.log(common);

  return matched[0];
}

const oxigen = rating(nums);
const co2 = rating(nums, 0, "0");

// console.log(oxigen);
// console.log(co2);

// 1847952 too low
console.log(parseInt(oxigen, 2) * parseInt(co2, 2));
