'use strict';

const {buildError} = require('../../utils/tools');

/* Errors available for node structure */
const missingNodeValue = buildError(
  'MissingNodeValue',
  'The node value is required for node creation'
);

module.exports = {
  missingNodeValue
};
