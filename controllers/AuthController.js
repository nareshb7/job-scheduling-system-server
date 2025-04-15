const { STATUS_CODES } = require("../constants");
const { UserModel } = require("../models/UserModel");
const { generateNewId } = require("../utils/authHelper");

const userSignUp = async (req, res) => {
  try {
    const { firstName, lastName, location, email, mobile, password, role } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !location ||
      !email ||
      !mobile ||
      !password ||
      !role
    ) {
      res
        .status(STATUS_CODES.VALIDATION_FAIL)
        .json({ message: "fields are missing!", success: false });
      return;
    }
    const userId = generateNewId(firstName);

    const data = await UserModel.create({
      firstName,
      lastName,
      location,
      email,
      mobile,
      password,
      userId,
      role,
    });

    res.json({ success: true, message: "User Created Successfully", data });
  } catch (err) {
    res.status(STATUS_CODES.ERROR).json(err.message);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("User Not found");
    }
    res.status(STATUS_CODES.SUCCESS).json({ success: true, data: user });
  } catch (err) {
    res.status(STATUS_CODES.ERROR).json(err.message);
  }
};

module.exports = {
  userSignUp,
  userLogin,
};
