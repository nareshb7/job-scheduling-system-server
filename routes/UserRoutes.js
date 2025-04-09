const { Router } = require("express");
const { getUserById } = require("../controllers/UserController");

const userRouter = Router();

userRouter.get("/", getUserById);

module.exports = userRouter;
