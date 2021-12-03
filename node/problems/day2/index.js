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

module.exports = {
  problem1Solution,
  problem2Solution,
};
