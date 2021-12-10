const fs = require('fs');
const path = require('path');
const rawData = fs.readFileSync(path.join(__dirname, `../inputs/${path.basename(path.dirname(__filename))}/input.txt`), 'utf8').split('\n');
const bingoCallsInput = rawData[0].split(',').map((str) => parseInt(str));
const boardInputs = rawData
    .slice(2)
    .map((str) => str.split(' '))
    .flat(1)
    .filter((str) => !!str)
    .map((str) => parseInt(str))
    .reduce((acc, cur) => {
        if (acc[acc.length - 1].length < 25) {
            acc[acc.length - 1].push(cur);
            return acc;
        } else {
            return [...acc, [cur]];
        }
    }, [[]]);

const problemInput = [bingoCallsInput, boardInputs];

const sampleInput = [[7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1], [
[22, 13, 17, 11, 0, 8, 2, 23, 4, 24, 21, 9, 14, 16, 7, 6, 10, 3, 18, 5, 1, 12, 20, 15, 19],
[3, 15, 0, 2, 22, 9, 18, 13, 17, 5, 19, 8, 7, 25, 23, 20, 11, 10, 24, 4, 14, 21, 16, 12, 6],
[14, 21, 17, 24, 4, 10, 16, 15, 9, 19, 18, 8, 23, 26, 20, 22, 11, 13, 6, 5, 2, 0, 12, 3, 7],
]];

class Board {
    constructor(board, i, gridSize = 5) {
        this.grid = [];
        this.gridSize = gridSize;
        this.i = i;

        const objectifyBoard = board.map((num) => ({ val: num, isMarked: false }));
        for (let i = 0; i < objectifyBoard.length; i += gridSize) this.grid.push(objectifyBoard.slice(i, i + gridSize));
    }

    isBingo() {
        let minorDiagCount = 0;
        let majorDiagCount = 0;

        for (let i = 0; i < this.gridSize; i++) {
            let rowCount = 0;
            let colCount = 0;

            for (let j = 0; j <this.gridSize; j++) {
               rowCount += this.grid[i][j].isMarked ? 1 : 0;
               colCount += this.grid[j][i].isMarked ? 1 : 0;
            }
            majorDiagCount += this.grid[i][i];
            minorDiagCount += this.grid[i][this.gridSize - i - 1];

            if (rowCount === this.gridSize || colCount === this.gridSize) {
                this.isComplete = true;
                return true;
            }
        }

        if (majorDiagCount === this.gridSize || minorDiagCount === this.gridSize) {
            this.isComplete = true;
            return true;
        }
        return false;
    }

    calledNum(num) {
        const calledCell = this.grid.flat(1).find((cell) => cell.val === num);
        if (calledCell) calledCell.isMarked = true;
    }

    getUnMarkedNums() {
        return this.grid.flat(1).filter(({ isMarked }) => !isMarked);
    }
}

const problem1Solution = (calls, basicBoard) => {
    const boards = basicBoard.map((board) => new Board(board))

    for (let call of calls) {
        for (let board of boards) {
            board.calledNum(call);
            if (board.isBingo()) {
                return board.getUnMarkedNums().reduce((a, { val }) => a + val, 0) * call;
            }
        }
    }
};

const problem2Solution = (calls, basicBoard) => {
    let boards = basicBoard.map((board, i) => new Board(board, i));

    let lastCompletedBoard = null;
    let lastCallMade = null;

    for (let call of calls) {
        boards.forEach((board) => {
            if (!board.isBingo()) {
                board.calledNum(call);
                if (board.isBingo()) {
                    lastCompletedBoard = board;
                    lastCallMade = call;
                }
            }
        })
    }

    return lastCompletedBoard.getUnMarkedNums().reduce((a, { val }) => a + val, 0) * lastCallMade;
};


if (process.argv.includes('-s')) {
    console.log(`Solution 1: ${problem1Solution(...problemInput)}`);
    console.log(`Solution 2: ${problem2Solution(...problemInput)}`);
} else {
  console.log(`Sample 1, - Expected: 4512 Got: ${problem1Solution(...sampleInput)}`);
  console.log(`Sample 2, - Expected: 1924 Got: ${problem2Solution(...sampleInput)}`);
}
