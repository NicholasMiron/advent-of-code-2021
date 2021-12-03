const fs = require('fs');
const path = require('path');
const rawData = fs.readFileSync(path.join(__dirname, `../inputs/${path.basename(path.dirname(__filename))}/input.txt`), 'utf8');
const problemInput = rawData.split('\n').map((str) => str.split(' '));
const sampleInput = [['forward', 5], ['down', 5], ['forward', 8], ['up', 3], ['down', 8], ['forward', 2]];


const problem1Solution = (directions) => {
  let forward = 0;
  let depth = 0;

  directions.forEach(([direction, distance]) => {
    if (direction === 'forward') forward += distance;
    if (direction === 'down') depth += distance;
    if (direction === 'up') depth -= distance;
  });

  return forward * depth;
};

const problem2Solution = (directions) => {
  let forward = 0;
  let depth = 0;
  let aim = 0;

  directions.forEach(([direction, amount]) => {
    if (direction === 'forward') {
      forward += amount;
      depth += (amount * aim);
    }
    if (direction === 'down') aim += amount;
    if (direction === 'up') aim -= amount;
  })

  return forward * depth;
};


if (process.argv.includes('-s')) {
    console.log(`Solution 1: ${problem1Solution(problemInput)}`);
    console.log(`Solution 2: ${problem2Solution(problemInput)}`);
} else {
  console.log(`Sample 1 - Expected: 150 Got: ${problem1Solution(sampleInput)}`);
  console.log(`Sample 2 - Expected: 900 Got: ${problem2Solution(sampleInput)}`);
}
