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

module.exports = {
  problem1Solution,
  problem2Solution,
};
