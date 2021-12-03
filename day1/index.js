const fs = require('fs');
const path = require('path');
const rawData = fs.readFileSync(path.join(__dirname, `../inputs/${path.basename(path.dirname(__filename))}/input.txt`), 'utf8');
const problemInput = rawData.split('\n').map((num) => parseInt(num));
const sampleInput = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];


const problem1Solution = (depths) => {
  let lastDepth = null;
  let countIncreasingDepth = 0;

  depths.forEach((depth) => {
    if (lastDepth && depth > lastDepth) countIncreasingDepth++;
    lastDepth = depth;
  })

  return countIncreasingDepth;
};

const problem2Solution = (depths, windowLength = 3) => {
  let countIncreasingDepth = 0;
  let lastWindowSum = null;

  for (let i = 0; i < depths.length - windowLength + 1; i++) {
    const currentWindowSum = depths.slice(i, i + windowLength).reduce((a, c) => a + c, 0);
    if (lastWindowSum && currentWindowSum > lastWindowSum) {
      countIncreasingDepth++;
    }

    lastWindowSum = currentWindowSum;
  }

  return countIncreasingDepth;
};


if (process.argv.includes('-s')) {
    console.log(`Solution 1: ${problem1Solution(problemInput)}`);
    console.log(`Solution 2: ${problem2Solution(problemInput)}`);
} else {
  console.log(`Sample 1 - Expected: 7 Got: ${problem1Solution(sampleInput)}`);
  console.log(`Sample 2 - Expected: 5 Got: ${problem2Solution(sampleInput)}`);
}
