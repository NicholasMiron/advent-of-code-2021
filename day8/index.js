const fs = require('fs');
const path = require('path');
const rawData = fs.readFileSync(path.join(__dirname, `../inputs/${path.basename(path.dirname(__filename))}/input.txt`), 'utf8');
const problemInput = rawData
    .split('\n')
    .map((line) => {
        return line.split(' | ')
            .map((val) => val.split(' ').map((str) => str.split('').sort().join('')));
    });

const sampleInput = [
[['be', 'cfbegad', 'cbdgef', 'fgaecd', 'cgeb', 'fdcge', 'agebfd', 'fecdb', 'fabcd', 'edb'], ['fdgacbe', 'cefdb', 'cefbgd', 'gcbe']],
[['edbfga', 'begcd', 'cbg', 'gc', 'gcadebf', 'fbgde', 'acbgfd', 'abcde', 'gfcbed', 'gfec'], ['fcgedb', 'cgb', 'dgebacf', 'gc']],
[['fgaebd', 'cg', 'bdaec', 'gdafb', 'agbcfd', 'gdcbef', 'bgcad', 'gfac', 'gcb', 'cdgabef'], ['cg', 'cg', 'fdcagb', 'cbg']],
[['fbegcd', 'cbd', 'adcefb', 'dageb', 'afcb', 'bc', 'aefdc', 'ecdab', 'fgdeca', 'fcdbega'], ['efabcd', 'cedba', 'gadfec', 'cb']],
[['aecbfdg', 'fbg', 'gf', 'bafeg', 'dbefa', 'fcge', 'gcbea', 'fcaegb', 'dgceab', 'fcbdga'], ['gecf', 'egdcabf', 'bgf', 'bfgea']],
[['fgeab', 'ca', 'afcebg', 'bdacfeg', 'cfaedg', 'gcfdb', 'baec', 'bfadeg', 'bafgc', 'acf'], ['gebdcfa', 'ecba', 'ca', 'fadegcb']],
[['dbcfg', 'fgd', 'bdegcaf', 'fgec', 'aegbdf', 'ecdfab', 'fbedc', 'dacgb', 'gdcebf', 'gf'], ['cefg', 'dcbef', 'fcge', 'gbcadfe']],
[['bdfegc', 'cbegaf', 'gecbf', 'dfcage', 'bdacg', 'ed', 'bedf', 'ced', 'adcbefg', 'gebcd'], ['ed', 'bcgafe', 'cdgba', 'cbgef']],
[['egadfb', 'cdbfeg', 'cegd', 'fecab', 'cgb', 'gbdefca', 'cg', 'fgcdab', 'egfdb', 'bfceg'], ['gbdfcae', 'bgc', 'cg', 'cgb']],
[['gcafb', 'gcf', 'dcaebfg', 'ecagb', 'gf', 'abcdeg', 'gaef', 'cafbge', 'fdbac', 'fegbdc'], ['fgae', 'cfgab', 'fg', 'bagce']],
].map((line) => {
    return line.map((values) => values.map((str) => str.split('').sort().join('')));
});


const problem1Solution = (signals) => {
    const outputs = signals.map((signal) => signal[1]).flat(1);
    let countNums = 0;

    for (let output of outputs) {
        if (output.length === 2) countNums++; // 1
        if (output.length === 3) countNums++; // 7
        if (output.length === 4) countNums++; // 4
        if (output.length === 7) countNums++; // 8
    }

    return countNums;
};

const getNumberMappings = (inputs) => {
     const nums = {
        0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '',
    };

    // 1 = len 2
    nums[1] = inputs[inputs.findIndex((signal) => signal.length === 2)];
    // 4 = len 4
    nums[4] = inputs[inputs.findIndex((signal) => signal.length === 4)];
    // 7 = len 3
    nums[7] = inputs[inputs.findIndex((signal) => signal.length === 3)];
    // 8 = len 7
    nums[8] = inputs[inputs.findIndex((signal) => signal.length === 7)];
    // 3 = len 5 with all values from 1
    nums[3] = inputs[inputs.findIndex((signal) => {
        return signal.length === 5 && signal.includes(nums[1][0]) && signal.includes(nums[1][1]);
    })];
    // 9 = len 6 with all values from 4
    nums[9] = inputs[inputs.findIndex((signal) => {
        if (signal.length === 6) {
            if (signal.includes(nums[4][0])
                && signal.includes(nums[4][1])
                && signal.includes(nums[4][2])
                && signal.includes(nums[4][3])) return  true;
        }

        return false;
    })];
    // 0 = len 6 with all values from 1 which isn't 9
    nums[0] = inputs[inputs.findIndex((signal) => {
        if (signal.length === 6 && signal !== nums[9]) {
            if (signal.includes(nums[1][0]) && signal.includes(nums[1][1])) return true;
        }

        return false;
    })];
    // 6 = last len 6 (not 0 or 9)
    nums[6] = inputs[inputs.findIndex((signal) => {
        return signal.length === 6 && signal !== nums[0] && signal !== nums[9];
    })];
    // 5 = len 5 which is only missing one value from 6
    nums[5] = inputs[inputs.findIndex((signal) => {
        if (signal.length === 5) {
            const numMatchingValuesIn6 = signal.split('').reduce((acc, c) => {
                return nums[6].includes(c) ? acc + 1 : acc;
            }, 0);
            if (numMatchingValuesIn6 === 5) return true;
        }
        return false;
    })];
    // 2 = last len 5
    nums[2] = inputs[inputs.findIndex((signal) => {
        return signal.length === 5 && signal !== nums[5] && signal !== nums[3]
    })];

    return nums;
}

const problem2Solution = (entries) => {
    let total = 0;

    for (let [signals, output] of entries) {
        const nums = getNumberMappings(signals);

        const reversedNums = {};
        for (let [key, val] of Object.entries(nums)) {
            reversedNums[val] = key;
        }

        total += parseInt(output.reduce((a, c) => a + reversedNums[c], ''));
    }

    return total;
};


if (process.argv.includes('-s')) {
    console.log(`Solution 1: ${problem1Solution(problemInput)}`);
    console.log(`Solution 2: ${problem2Solution(problemInput)}`);
} else {
  console.log(`Sample 1 - Expected: 26 Got: ${problem1Solution(sampleInput)}`);
  console.log(`Sample 2 - Expected: 61229 Got: ${problem2Solution(sampleInput)}`);
}
