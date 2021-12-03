const fs = require('fs');
const path = require('path');
const rawData = fs.readFileSync(path.join(__dirname, `../inputs/${path.basename(path.dirname(__filename))}/input.txt`), 'utf8');
const problemInput = rawData.split('\n');
const sampleInput = null;


const problem1Solution = () => {

};

const problem2Solution = () => {

};


if (process.argv.includes('-s')) {
    console.log(`Solution 1: ${problem1Solution(problemInput)}`);
    console.log(`Solution 2: ${problem2Solution(problemInput)}`);
} else {
  console.log(`Sample 1 - Expected: <x> Got: ${problem1Solution(sampleInput)}`);
  console.log(`Sample 2 - Expected: <x> Got: ${problem2Solution(sampleInput)}`);
}
