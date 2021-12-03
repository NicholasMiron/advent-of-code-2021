const expect = (actual) => {
  const toEqual = (expected) => {
    if (expected !== actual) {
      throw new Error(`Expected (${expected}) but got (${actual})`);
    }
  };

  const toHaveLength = (expectedLength) => {
    if (actual.length !== expectedLength) {
      throw new Error(`Expected (${actual}) to have length (${expectedLength}) but got (${actual})`);
    }
  };

  return {
    toEqual,
    toHaveLength,
  }
};

const it = (name, cb) => {
  try {
    cb();
    console.log(`\x1b[32m✔ \x1b[0m${name}`);
  } catch (err) {
    console.log(`\x1b[31m✘ \x1b[0m${name}: ${err.message}`)
  }
};

const describe = (name, cb) => {
  console.log(name);
  cb();
};

const getSolution = (solutionFunc, ...inputs) => {
  if (process.argv.includes('-s')) {
    console.log(`Solution: ${solutionFunc(...inputs)}`);
  }
}

module.exports = {
  getSolution,
  describe,
  expect,
  it,
};