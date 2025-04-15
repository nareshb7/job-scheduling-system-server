const { Router } = require("express");
const authRoutes = require("./AuthRoutes");
const userRouter = require("./UserRoutes");
const applicationRouter = require("./ApplicationRoutes");
const resumeRouter = require("./ResumeRoutes");
const iqRouter = require("./InterviewQuestionsRoutes");

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRouter);
router.use("/applications", applicationRouter);
router.use("/resume", resumeRouter);
router.use("/interview-questions", iqRouter);
// interview-questions
module.exports = router;
