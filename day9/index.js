const fs = require('fs');
const path = require('path');
const rawData = fs.readFileSync(path.join(__dirname, `../inputs/${path.basename(path.dirname(__filename))}/input.txt`), 'utf8');
const problemInput = rawData.split('\n')
    .map((line) => line.split('').map((str) => parseInt(str)));
const sampleInput = [
'2199943210',
'3987894921',
'9856789892',
'8767896789',
'9899965678',
].map((line) => line.split('').map((str) => parseInt(str)));


const problem1Solution = (grid) => {
    let riskSum = 0;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let curCell = grid[i][j];
            const def = Number.POSITIVE_INFINITY;
            if ((curCell < (grid[i + 1]?.[j] ?? def))
                && (curCell < (grid[i - 1]?.[j] ?? def))
                && (curCell < (grid[i][j + 1] ?? def))
                && (curCell < (grid[i][j - 1] ?? def))
            ) {
                riskSum = riskSum + 1 + curCell;
            }
        }
    }

    return riskSum;
};

const countAreaSize = (grid, x, y) => {
    if (x < 0
        || y < 0
        || x > grid.length - 1
        || y > grid[0].length - 1
        || grid[x][y].val === 9
        || grid[x][y].visited
    ) return 0;
    let size = 1;
    grid[x][y].visited = true;

    size += countAreaSize(grid, x + 1, y);
    size += countAreaSize(grid, x - 1, y);
    size += countAreaSize(grid, x, y + 1);
    size += countAreaSize(grid, x, y - 1);

    return size;
};

const problem2Solution = (grid) => {
    const lowPoints = [];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let curCell = grid[i][j];
            const def = Number.POSITIVE_INFINITY;
            if ((curCell < (grid[i + 1]?.[j] ?? def))
                && (curCell < (grid[i - 1]?.[j] ?? def))
                && (curCell < (grid[i][j + 1] ?? def))
                && (curCell < (grid[i][j - 1] ?? def))
            ) {
                lowPoints.push([i, j]);
            }
        }
    }

    const updatedGrid = grid.map((row) => row.map((val) => ({ visited: false, val })));
    const basinSizes = lowPoints.map(([x, y]) => countAreaSize(updatedGrid, x, y)).sort((a, b) => a < b ? 1 : -1);
    return basinSizes.slice(0, 3).reduce((a, c) => a * c, 1);
};


if (process.argv.includes('-s')) {
    console.log(`Solution '1',: ${problem1Solution(problemInput)}`);
    console.log(`Solution '2',: ${problem2Solution(problemInput)}`);
} else {
  console.log(`Sample '1', - Expected: 15 Got: ${problem1Solution(sampleInput)}`);
  console.log(`Sample '2', - Expected: 1134 Got: ${problem2Solution(sampleInput)}`);
}

/*
'21999xxxxx',
'398789x9xx',
'985678989x',
'8767896789',
'9899965678',
*/