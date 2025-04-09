const { Router } = require("express");
const authRoutes = require("./AuthRoutes");
const userRouter = require("./UserRoutes");
const applicationRouter = require("./ApplicationRoutes");

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRouter);
router.use("/applications", applicationRouter);

module.exports = router;
