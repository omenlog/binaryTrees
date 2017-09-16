const {buildError} = require('../../utils/tools');

const unableToMakeLeftRotation = buildError(
  'UnableToMakeLeftRotation',
  "Over this node can't be exectuted a left rotation because it hasn't right child and this child is mandatory for this procedure"

);
module.exports = {
  unableToMakeLeftRotation
};
