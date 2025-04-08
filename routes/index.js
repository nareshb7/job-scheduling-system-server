const { Router } = require("express");
const authRoutes = require("./AuthRoutes");

const router = Router();

router.use("/auth", authRoutes);

module.exports = router;
