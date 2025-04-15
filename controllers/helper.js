const checkValidation = (obj) => {
  return Object.values(obj).every((val) => val.length > 0);
};

module.exports = {
  checkValidation,
};
