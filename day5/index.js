const fs = require('fs');
const path = require('path');
const rawData = fs.readFileSync(path.join(__dirname, `../inputs/${path.basename(path.dirname(__filename))}/input.txt`), 'utf8');
const problemInput = rawData
    .split('\n')
    .map((line) => {
        return line
            .split(' -> ')
            .map((point) => point.split(',').map((num) => parseInt(num)))

    })

const sampleInput = [
    [[0,9], [5,9]],
    [[8,0], [0,8]],
    [[9,4], [3,4]],
    [[2,2], [2,1]],
    [[7,0], [7,4]],
    [[6,4], [2,0]],
    [[0,9], [2,9]],
    [[3,4], [1,4]],
    [[0,0], [8,8]],
    [[5,5], [8,2]],
];


class Grid {
    constructor(size) {
        this.grid = [];
        for (let i = 0; i < size + 1; i++) {
            this.grid.push((new Array(size + 1)).fill(0));
        }
    }

    drawLine([x1, y1], [x2, y2], considerDiagonalLines = false) {
        const isHorizontalLine = y1 === y2;
        const isVerticalLine = x1 === x2;
        const isDiagonalLine = y1 !== y2 && x1 !== x2;

        if (isHorizontalLine) {
            for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
                this.grid[y1][x]++
            }
        }

        if (isVerticalLine) {
            for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
                this.grid[y][x1]++;
            }
        }

        if (isDiagonalLine && considerDiagonalLines) {
            // Left most point
            let startX = Math.min(x1, x2);
            let curY = startX === x1 ? y1 : y2;

            // Line always progress at 45deg angle
            // To draw line just need to increment or decrement current Y coordinate by either 1 or -1 depending on slope
            let yCordProgression = (startX === x1 && y1 > y2) || (startX === x2 && y2 > y1) ? -1 : 1;

            for (let x = startX; x <= Math.max(x1, x2); x++) {
                this.grid[curY][x]++;
                curY+= yCordProgression;
            }
        }
    }
}


const problem1Solution = (lineCords) => {
    const grid = new Grid(Math.max(...lineCords.flat(2)));

    for (let [point1, point2] of lineCords) {
        grid.drawLine(point1, point2);
    }

    return grid.grid.flat(1).reduce((a, c) => c >= 2 ? a + 1: a, 0);
};

const problem2Solution = (lineCords) => {
    const grid = new Grid(Math.max(...lineCords.flat(2)));
    const considerDiagonalLines = true;

    for (let [point1, point2] of lineCords) {
        grid.drawLine(point1, point2, considerDiagonalLines);
    }

    return grid.grid.flat(1).reduce((a, c) => c >= 2 ? a + 1: a, 0);
};


if (process.argv.includes('-s')) {
    console.log(`Solution 1: ${problem1Solution(problemInput)}`);
    console.log(`Solution 2: ${problem2Solution(problemInput)}`);
} else {
  console.log(`Sample 1 - Expected: 5 Got: ${problem1Solution(sampleInput)}`);
  console.log(`Sample 2 - Expected: 12 Got: ${problem2Solution(sampleInput)}`);
}
