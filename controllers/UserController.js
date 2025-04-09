const { isValidObjectId } = require("mongoose");
const { STATUS_CODES } = require("../constants");
const { UserModel } = require("../models/UserModel");

const getUserById = async (req, res) => {
  try {
    const { id } = req.query;
    if (!isValidObjectId(id)) {
      throw new Error("Id is not valid");
    }
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error("User id not found.");
    }
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(STATUS_CODES.VALIDATION_FAIL).send(err.message);
  }
};

module.exports = {
  getUserById,
};
