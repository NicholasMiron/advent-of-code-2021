const fs = require('fs');
const path = require('path');
const rawData = fs.readFileSync(path.join(__dirname, `../inputs/${path.basename(path.dirname(__filename))}/input.txt`), 'utf8');
const problemInput = rawData.split('\n');
const sampleInput = [
    '00100',
    '11110',
    '10110',
    '10111',
    '10101',
    '01111',
    '00111',
    '11100',
    '10000',
    '11001',
    '00010',
    '01010',
];


const problem1Solution = (binaryNums) => {
    const indexCounts = (new Array(binaryNums[0].length)).fill(0);
    for (let binaryNum of binaryNums) {
        for (let i = 0; i < binaryNum.length; i++) {
            indexCounts[i] += parseInt(binaryNum[i]);
        }
    }

    let mostFrequent = '';
    let leastFrequent = '';
    for (let numOnesAtIndex of indexCounts) {
        if (parseInt(numOnesAtIndex) > Math.floor(binaryNums.length / 2)) {
            mostFrequent += '1';
            leastFrequent += '0';
        } else {
            mostFrequent += '0';
            leastFrequent += '1';
        }
    }

    return parseInt(mostFrequent, 2) * parseInt(leastFrequent, 2);
};

const splitByValueAtIndex = (nums, i) => {
    const dict = {};

    nums.forEach((num) => {
        if (!dict[num[i]]) dict[num[i]] = [num];
        else dict[num[i]].push(num);
    });

    return dict;
};

const keepMostFrequentDigitAtIndex = (nums, i) => {
    const dict = splitByValueAtIndex(nums, i);
    return dict[1].length >= dict[0].length ? dict[1] : dict[0];
};

const keepLeastFrequentDigitAtIndex = (nums, i) => {
    const dict = splitByValueAtIndex(nums, i);
    return dict[0].length <= dict[1].length ? dict[0] : dict[1];
};

const problem2Solution = (binaryNums) => {
    let prefZeros = [...binaryNums];
    let prefOnes = [...binaryNums];

    let curIndex = 0;
    while (prefZeros.length > 1) {
        prefZeros = keepLeastFrequentDigitAtIndex(prefZeros, curIndex);
        curIndex++;
    }

    curIndex = 0;
    while (prefOnes.length > 1) {
        prefOnes = keepMostFrequentDigitAtIndex(prefOnes, curIndex);
        curIndex++;
    }

    return parseInt(prefOnes[0], 2) * parseInt(prefZeros[0], 2);
};


if (process.argv.includes('-s')) {
    console.log(`Solution 1: ${problem1Solution(problemInput)}`);
    console.log(`Solution 2: ${problem2Solution(problemInput)}`);
} else {
  console.log(`Sample 1 - Expected: 198 Got: ${problem1Solution(sampleInput)}`);
  console.log(`Sample 2 - Expected: 230 Got: ${problem2Solution(sampleInput)}`);
}
