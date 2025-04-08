const { Router } = require("express");
const { userSignUp, userLogin } = require("../controllers/AuthController");

const authRouter = Router();

authRouter.post("/signup", userSignUp);
authRouter.post("/login", userLogin);

module.exports = authRouter;
