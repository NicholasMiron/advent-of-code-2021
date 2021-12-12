const fs = require('fs');
const path = require('path');
const rawData = fs.readFileSync(path.join(__dirname, `../inputs/${path.basename(path.dirname(__filename))}/input.txt`), 'utf8');
const problemInput = rawData.split('\n');
const sampleInput = [
'[({(<(())[]>[[{[]{<()<>>',
'[(()[<>])]({[<{<<[]>>(',
'{([(<{}[<>[]}>{[]{[(<()>',
'(((({<>}<{<{<>}{[]{[]{}',
'[[<[([]))<([[{}[[()]]]',
'[{[{({}]{}}([{[{{{}}([]',
'{<[[]]>}<{[{[{[]{()[[[]',
'[<(<(<(<{}))><([]([]()',
'<{([([[(<>()){}]>(<<{{',
'<{([{{}}[<[[[<>{}]]]>[]]',
].map((line) => line.split(''));


const problem1Solution = (lines) => {
    const openings = {
        '}': '{', ']': '[', ')': '(', '>': '<'
    };
    const values = {
        ')': 3, ']': 57, '}': 1197, '>': 25137
    };

    return lines.map((line) => {
        const stack = [];
        for (let bracket of line) {
            if (openings[bracket]) {
                if (stack.pop() !== openings[bracket]) return bracket;
                else continue;
            } else {
                stack.push(bracket);
            }
        }
    })
        .filter((bracket) => !!bracket)
        .reduce((total, bracket) => total + values[bracket], 0);
};


const calculateBracketsScore = (brackets) => {
    let score = 0;
    const scores = {
        ')': 1, ']': 2, '}': 3, '>': 4,
    };

    brackets.forEach((bracket) => {
        score *= 5;
        score += scores[bracket];
    });

    return score;
};

const problem2Solution = (lines) => {
    const openings = {
        '}': '{', ']': '[', ')': '(', '>': '<'
    };
    const closings = {
        '{': '}', '[': ']', '(': ')', '<': '>'
    };

    const lineScores = lines.map((line) => {
        const stack = [];
        for (let bracket of line) {
            if (openings[bracket]) {
                if (stack.pop() !== openings[bracket]) return null;
            } else {
                stack.push(bracket);
            }
        }
        return stack.map((opening) => closings[opening]).reverse();
    })
        .filter((brackets) => !!brackets)
        .map((brackets) => calculateBracketsScore(brackets))
        .sort((a,b) => a < b ? 1 : -1);

    return lineScores[Math.floor(lineScores.length / 2)];
};


if (process.argv.includes('-s')) {
    console.log(`Solution 1: ${problem1Solution(problemInput)}`);
    console.log(`Solution 2: ${problem2Solution(problemInput)}`);
} else {
  console.log(`Sample 1 - Expected: 26397 Got: ${problem1Solution(sampleInput)}`);
  console.log(`Sample 2 - Expected: 288957 Got: ${problem2Solution(sampleInput)}`);
}
