const fs = require('fs');
const path = require('path');
const rawData = fs.readFileSync(path.join(__dirname, `../inputs/${path.basename(path.dirname(__filename))}/input.txt`), 'utf8');
const problemInput = rawData.split('\n')[0].split(',').map((str) => parseInt(str));
const sampleInput = [3,4,3,1,2];


const problem1Solution = (initialCounters, numDays) => {
    const counters = [...initialCounters];
    const newCounterStartVal = 8;
    const resetCounterStartVal = 6;

    while (numDays > 0) {
        counters.forEach((counter, i) => {
            if (counter === 0) {
                counters.push(newCounterStartVal);
                counters[i] = resetCounterStartVal;
            } else {
                counters[i]--;
            }
        })

        numDays--;
    }

    return counters.length;
};

const problem2Solution = (initialCounters, numDays) => {
    let numFishOnADay = {
        0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0
    };

    initialCounters.forEach((day) => {
        numFishOnADay[day]++;
    });


    while (numDays > 0) {
        const newNumFishOnADay = {};

        newNumFishOnADay[0] = numFishOnADay[1];
        newNumFishOnADay[1] = numFishOnADay[2];
        newNumFishOnADay[2] = numFishOnADay[3];
        newNumFishOnADay[3] = numFishOnADay[4];
        newNumFishOnADay[4] = numFishOnADay[5];
        newNumFishOnADay[5] = numFishOnADay[6];
        newNumFishOnADay[6] = numFishOnADay[7] + numFishOnADay[0];
        newNumFishOnADay[7] = numFishOnADay[8];
        newNumFishOnADay[8] = numFishOnADay[0];

        numDays--;
        numFishOnADay = newNumFishOnADay;
    }

    return Object.values(numFishOnADay).reduce((a, c) => a + c, 0);
};


if (process.argv.includes('-s')) {
    console.log(`Solution 1: ${problem1Solution(problemInput, 80)}`);
    console.log(`Solution 2: ${problem2Solution(problemInput, 256)}`);
} else {
  console.log(`Sample 1 - Expected: 26 Got: ${problem1Solution(sampleInput, 18)}`);
  console.log(`Sample 1 - Expected: 5934 Got: ${problem1Solution(sampleInput, 80)}`);
  console.log(`Sample 2 - Expected: 26 Got: ${problem2Solution(sampleInput, 18)}`);
  console.log(`Sample 2 - Expected: 5934 Got: ${problem2Solution(sampleInput, 80)}`);
  console.log(`Sample 2 - Expected: 26984457539 Got: ${problem2Solution(sampleInput, 256)}`);
}
