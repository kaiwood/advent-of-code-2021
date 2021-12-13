import * as fs from "fs";

const data: string[][] = fs
  .readFileSync(`${__dirname}/input.txt`, "utf-8")
  .trim()
  .split("\n")
  .map((e) => e.split(" | "));

/**
 * Part 1
 */
function countSimpleValues(data: string[][]): number {
  let count = 0;
  let targetLengths = [2, 4, 3, 7];

  for (let entry of data) {
    let output = entry[1];

    output.split(" ").forEach((e: string) => {
      if (targetLengths.includes(e.length)) {
        count++;
      }
    });
  }

  return count;
}

console.log(countSimpleValues(data));

/**
 * Part 2
 */
function decode(data: string[]) {
  let [input, output] = data;

  function reject(nums: string[], ...not: string[][]) {
    let result = nums;
    for (let n of not) {
      result = result.filter((e) => !n.includes(e));
    }

    return result;
  }

  function select(nums: string[], ...has: string[][]) {
    let result = nums;
    for (let h of has) {
      result = result.filter((e) => h.includes(e));
    }

    return result;
  }

  const wiring: any = {
    a: [],
    b: [],
    c: [],
    d: [],
    e: [],
    f: [],
    g: [],
  };

  const n1 = input
    .split(" ")
    .filter((e) => e.length === 2)[0]
    .split("")
    .sort();

  const n4 = input
    .split(" ")
    .filter((e) => e.length === 4)[0]
    .split("")
    .sort();

  const n7 = input
    .split(" ")
    .filter((e) => e.length === 3)[0]
    .split("")
    .sort();

  const n8 = input
    .split(" ")
    .filter((e) => e.length === 7)[0]
    .split("")
    .sort();

  const digit5 = input
    .split(" ")
    .filter((e) => e.length === 5)
    .map((e) => e.split(""))
    .sort();

  const digit6 = input
    .split(" ")
    .filter((e) => e.length === 6)
    .map((e) => e.split(""))
    .sort();

  wiring.a = select(reject(n8, n1, n4), n7);
  wiring.d = select(reject(n8, n1, n7), n4, ...digit5);
  wiring.b = select(reject(n8, n1, n7, wiring.d), n4);
  wiring.f = select(reject(n8), n1, n4, n7, ...digit6);
  wiring.c = select(reject(n8, wiring.f), n1, n4, n7);
  wiring.g = select(reject(n8, n1, n4, n7), ...digit5);
  wiring.e = select(reject(n8, n1, n4, n7, wiring.g));

  class SevenSegment {
    _w: any;
    constructor(wiring: any) {
      this._w = wiring;
    }

    show(s: string): number | undefined {
      let chars = s
        .split("")
        .map((e) => {
          for (let key of Object.keys(this._w)) {
            let v = this._w[key][0];
            if (v === e) return key;
          }
        })
        .sort()
        .join("");

      switch (chars) {
        case "abcefg":
          return 0;
        case "cf":
          return 1;
        case "acdeg":
          return 2;
        case "acdfg":
          return 3;
        case "bcdf":
          return 4;
        case "abdfg":
          return 5;
        case "abdefg":
          return 6;
        case "acf":
          return 7;
        case "abcdefg":
          return 8;
        case "abcdfg":
          return 9;
        default:
          new Error("Invalid");
      }
    }
  }

  const display = new SevenSegment(wiring);

  let number = Number(
    output
      .split(" ")
      .map((e) => display.show(e))
      .join("")
  );

  return number;
}

let result = data.map((e) => decode(e)).reduce((sum, cur) => sum + cur, 0);
console.log(result);
