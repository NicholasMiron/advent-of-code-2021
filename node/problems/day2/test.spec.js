const { describe, it, expect, getSolution } = require('../../utils');
const { inputs } = require('./problemInputs');
const { sample1, sample2 } = require('./testData');
const { problem1Solution, problem2Solution } = require('./index');


describe('Day 2 -- Problem 1', () => {
  it('Should have the correct result', () => {
    expect(sample1.expected).toEqual(problem1Solution(...sample1.inputs));
  });

  getSolution(problem1Solution, ...inputs);
});

describe('Day 2 -- Problem 2', () => {
  it('Should have the correct result', () =>  {
    expect(sample2.expected).toEqual(problem2Solution(...sample2.inputs));
  });

  getSolution(problem2Solution, ...inputs);
});
