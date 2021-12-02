const sample1 = {
  inputs: [
      [
        ['forward', 5],
        ['down', 5],
        ['forward', 8],
        ['up', 3],
        ['down', 8],
        ['forward', 2],
      ]
  ],
  expected: 150,
};

const sample2 = {
  ...sample1,
  expected: 900,
};

module.exports = {
  sample1,
  sample2,
};