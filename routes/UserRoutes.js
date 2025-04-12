const { Router } = require("express");
const { getUserById } = require("../controllers/UserController");

const userRouter = Router();

userRouter.get("/:id", getUserById);

module.exports = userRouter;
