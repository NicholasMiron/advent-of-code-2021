const { sample1, sample2, allIncrement1, allIncrement2, allDecrement1, allDecrement2 } = require("./testData");
const { inputs } = require("./problemInputs");
const { it, expect, describe, getSolution } = require("../../utils");
const { problem1Solution , problem2Solution } = require("./index");

describe('Day 1 -- Problem 1', () => {
  it('Should work for alternating increasing and decreasing depths', () => {
    expect(sample1.expected).toEqual(problem1Solution(...sample1.inputs));
  });

  it('Should work for all incrementing depths', () => {
    expect(allIncrement1.expected).toEqual(problem1Solution(...allIncrement1.inputs));
  });

  it('Should work for all decrementing depths', () => {
    expect(allDecrement1.expected).toEqual(problem1Solution(...allDecrement1.inputs));
  });

  getSolution(problem1Solution, ...inputs);
});

describe('Day 1 -- Problem 2', () => {
  it('Should work for alternating increasing and decreasing depths', () => {
    expect(sample2.expected).toEqual(problem2Solution(...sample2.inputs));
  });

  it('Should work for all incrementing depths', () => {
    expect(allIncrement2.expected).toEqual(problem2Solution(...allIncrement2.inputs));
  });

  it('Should work for all decrementing depths', () => {
    expect(allDecrement2.expected).toEqual(problem2Solution(...allDecrement2.inputs));
  });

  getSolution(problem2Solution, ...inputs);
});