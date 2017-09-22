'use strict';

function flatReducer(flatArray, arg) {
  return Array.isArray(arg) ? flatArray.concat(flat(arg)) : flatArray.concat(arg);
}

function flat(args) {
  return args.reduce(flatReducer, []);
}

/* function to build another error functions */
function buildError(errorName, errorMessage) {
  const errorFunction = function errorFunction() {
    this.name = errorName;
    this.message = errorMessage;
    this.stack = new Error().stack;
  };

  errorFunction.prototype = Object.create(Error.prototype);
  errorFunction.prototype.constructor = errorFunction;

  return errorFunction;
}

const launch = ErrorFunction => {
  throw new ErrorFunction();
};

module.exports = {
  flat,
  buildError,
  launch
};
