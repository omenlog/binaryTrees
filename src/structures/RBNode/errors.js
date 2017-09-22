'use strict';

const {buildError} = require('../../utils/tools');

const unableToMakeLeftRotation = buildError(
  'UnableToMakeLeftRotation',
  "Over this node can't be exectuted a left rotation because it hasn't right child and this child is mandatory for this procedure"

);

const unableToMakeRightRotation = buildError(
  'UnableToMakeLeftRotation',
  "Over this node can't be exectuted a right rotation because it hasn't left child and this child is mandatory for this procedure"

);

module.exports = {
  unableToMakeRightRotation,
  unableToMakeLeftRotation
};
