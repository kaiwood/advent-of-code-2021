import * as fs from "fs";

const file = fs
  .readFileSync(`${__dirname}/input.txt`, "utf-8")
  .trim()
  .split("\n");

const draws = file[0].split(",").map(Number);

class Bingo {
  private _board: number[][] = [];
  private _drawn: number[] = [];
  public won = false;

  constructor(n: number[]) {
    this._board.push(
      n.slice(0, 5),
      n.slice(5, 10),
      n.slice(10, 15),
      n.slice(15, 20),
      n.slice(20, 25)
    );
  }

  show() {
    return this._board;
  }

  draw(n: number) {
    this._drawn.push(n);
  }

  bingo() {
    let winCondition = false;

    // check horizontal
    for (let row of this._board) {
      if (this._compare(row)) {
        winCondition = true;
        break;
      }
    }

    // check vertical
    for (let i = 0; i < 5; i++) {
      let col = [];
      for (let j = 0; j < 5; j++) {
        col.push(this._board[j][i]);
      }

      if (this._compare(col)) {
        winCondition = true;
        break;
      }
    }

    return winCondition;
  }

  sumOfUnmarked(): number {
    return this._board
      .flatMap((e) => e)
      .filter((e) => !this._drawn.includes(e))
      .reduce((sum, cur) => sum + cur, 0);
  }

  private _compare(nums: any[]) {
    return nums.filter((e) => this._drawn.includes(e)).length === 5;
  }
}

function generateBoards() {
  let boards = [];
  let boardNums: number[] = [];

  for (let line of file.slice(2)) {
    if (line === "") {
      let board = new Bingo(boardNums.flatMap((e) => e));
      boards.push(board);
      boardNums = [];
      continue;
    }

    boardNums.push(...line.trim().split(/\s+/).map(Number));
  }
  return boards;
}

/**
 * Part 1
 */

let boards = generateBoards();

loop: for (let draw of draws) {
  for (let board of boards) {
    board.draw(draw);
    if (board.bingo()) {
      console.log(board.sumOfUnmarked() * draw);
      break loop;
    }
  }
}

/**
 * Part 2
 */
boards = generateBoards();
let lastSum;

for (let draw of draws) {
  for (let board of boards) {
    board.draw(draw);
    if (!board.won && board.bingo()) {
      board.won = true;
      lastSum = board.sumOfUnmarked() * draw;
    }
  }
}

console.log(lastSum);
