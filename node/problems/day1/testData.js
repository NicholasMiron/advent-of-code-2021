const sample1 = {
  expected: 7,
  inputs: [[
    199, 200, 208, 210, 200, 207, 240, 269, 260, 263,
  ]],
};

const sample2 = {
  ...sample1,
  expected: 5,
};

const allIncrement1 = {
  expected: 10,
  inputs: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]],
};

const allIncrement2 = {
  ...allIncrement1,
  expected: 8,
};

const allDecrement1 = {
  expected: 0,
  inputs: [[5, 4, 3, 2, 1]],
};

const allDecrement2 = {
  ...allDecrement1,
};


module.exports = {
  sample1,
  sample2,
  allIncrement1,
  allIncrement2,
  allDecrement1,
  allDecrement2,
};