'use strict';

const { buildError } = require('../../utils/tools');

const missingArgInFind = buildError(
  'MissingArgumentInFind',
  'The find function can\'t be called without arguments'
);

const missingArgInContain = buildError(
  'MissingArgumentInFind',
  'The contain function can\'t be called without arguments'
);

module.exports = {
  missingArgInFind,
  missingArgInContain
};
