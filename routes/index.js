const { Router } = require("express");
const authRoutes = require("./AuthRoutes");
const userRouter = require("./UserRoutes");

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRouter);

module.exports = router;
