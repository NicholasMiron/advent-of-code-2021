const fs = require('fs');
const path = require('path');
const rawData = fs.readFileSync(path.join(__dirname, `../inputs/${path.basename(path.dirname(__filename))}/input.txt`), 'utf8');
const problemInput = rawData.split('\n')[0].split(',').map((str) => parseInt(str));
const sampleInput = [16,1,2,0,4,2,7,1,2,14];


const problem1Solution = (currentPositions) => {
    const minHorizontalPosition = Math.min(...currentPositions);
    const maxHorizontalPosition = Math.max(...currentPositions);
    let minFuelRequired = Number.POSITIVE_INFINITY;

    for (let hPos = minHorizontalPosition; hPos <= maxHorizontalPosition; hPos++) {
        const fuelRequired = currentPositions.reduce((total, curPos) => total + Math.abs(hPos - curPos), 0)
        if (fuelRequired < minFuelRequired) minFuelRequired = fuelRequired;
    }

    return minFuelRequired;
};

const problem2Solution = (currentPositions) => {
const minHorizontalPosition = Math.min(...currentPositions);
    const maxHorizontalPosition = Math.max(...currentPositions);
    let minFuelRequired = Number.POSITIVE_INFINITY;

    for (let hPos = minHorizontalPosition; hPos <= maxHorizontalPosition; hPos++) {
        const fuelRequired = currentPositions.reduce((total, curPos) => {
            const numSteps = Math.abs(hPos - curPos);
            return total + ((numSteps * (numSteps + 1)) / 2);
        }, 0);
        if (fuelRequired < minFuelRequired) minFuelRequired = fuelRequired;
    }

    return minFuelRequired;
};


if (process.argv.includes('-s')) {
    console.log(`Solution 1: ${problem1Solution(problemInput)}`);
    console.log(`Solution 2: ${problem2Solution(problemInput)}`);
} else {
  console.log(`Sample 1 - Expected: 37 Got: ${problem1Solution(sampleInput)}`);
  console.log(`Sample 2 - Expected: 168 Got: ${problem2Solution(sampleInput)}`);
}
