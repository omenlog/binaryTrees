function flatReducer(flatArray, arg) {
  return Array.isArray(arg) ? flatArray.concat(flat(arg)) : flatArray.concat(arg);
}

function flat(args) {
  return args.reduce(flatReducer, []);
}

module.exports = {
  flat
};
