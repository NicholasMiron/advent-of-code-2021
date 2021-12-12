const fs = require('fs');
const path = require('path');
const rawData = fs.readFileSync(path.join(__dirname, `../inputs/${path.basename(path.dirname(__filename))}/input.txt`), 'utf8');
const problemInput = rawData.split('\n').map((row) => row.split('').map((str) => parseInt(str)));
const sampleInput = [
[5,4,8,3,1,4,3,2,2,3],
[2,7,4,5,8,5,4,7,1,1],
[5,2,6,4,5,5,6,1,7,3],
[6,1,4,1,3,3,6,1,4,6],
[6,3,5,7,3,8,5,4,7,8],
[4,1,6,7,5,2,4,6,4,5],
[2,1,7,6,8,4,1,7,2,1],
[6,8,8,2,8,8,1,1,3,4],
[4,8,4,6,8,4,8,5,5,4],
[5,2,8,3,7,5,1,5,2,6],
];

const incrementAllLevelsByOne = (levels) => {
    return levels.forEach((row) => row.forEach((loc) => loc.val += 1));
};

const incrementInCircle = (lights, x, y) => {
    for (let col = y - 1; col <= y + 1; col++) {
        for (let row = x - 1; row <= x + 1; row++) {
            if (lights[col]?.[row]) {
                lights[col][row].val += 1;
            }
        }
    }
}

const flashLoc = (lights, x, y) => {
    let countFlashes = 0;
    const curLoc = lights[y]?.[x];

    if (!curLoc) return countFlashes;
    if (curLoc.val > 9 && !curLoc.hasFlashed) {
        curLoc.hasFlashed = true;
        countFlashes++;

        incrementInCircle(lights, x, y);

        for (let col = y - 1; col <= y + 1; col++) {
            for (let row = x - 1; row <= x + 1; row++) {
                countFlashes += flashLoc(lights, row, col);
            }
        }
    }

    return countFlashes;
}


const problem1Solution = (lightLevels, numSteps = 100) => {
    const lightValues = lightLevels.map((row) => row.map((val) => ({ val, hasFlashed: false })));
    let totalFlashes = 0;
    while(numSteps > 0) {
        incrementAllLevelsByOne(lightValues);

        // Flash lights at all locations
        for (let y = 0; y < lightValues.length; y++) {
            for (let x = 0; x < lightValues[0].length; x++) {
                totalFlashes += flashLoc(lightValues, x, y);
            }
        }

        // Reset flashes
        // Reset to 0
        for (let y = 0; y < lightValues.length; y++) {
            for (let x = 0; x < lightValues[0].length; x++) {
                if (lightValues[y][x].val > 9) {
                    lightValues[y][x].val = 0;
                    lightValues[y][x].hasFlashed = false;
                }
            }
        }
        numSteps--;
    }

    return totalFlashes;
};

const problem2Solution = (lightLevels) => {
    const lightValues = lightLevels.map((row) => row.map((val) => ({ val, hasFlashed: false })));
    let curStep = 1;
    while(true) {
        incrementAllLevelsByOne(lightValues);

        // Flash lights at all locations
        for (let y = 0; y < lightValues.length; y++) {
            for (let x = 0; x < lightValues[0].length; x++) {
                const numFlashes = flashLoc(lightValues, x, y);
                if (numFlashes === 100) {
                    return curStep;
                }
            }
        }

        // Reset flashes
        // Reset to 0
        for (let y = 0; y < lightValues.length; y++) {
            for (let x = 0; x < lightValues[0].length; x++) {
                if (lightValues[y][x].val > 9) {
                    lightValues[y][x].val = 0;
                    lightValues[y][x].hasFlashed = false;
                }
            }
        }
        curStep++;
    }

    return totalFlashes;
};


if (process.argv.includes('-s')) {
    console.log(`Solution 1: ${problem1Solution(problemInput)}`);
    console.log(`Solution 2: ${problem2Solution(problemInput)}`);
} else {
  console.log(`Sample 1 - Expected: 1656 Got: ${problem1Solution(sampleInput)}`);
  console.log(`Sample 2 - Expected: 195 Got: ${problem2Solution(sampleInput)}`);
}
