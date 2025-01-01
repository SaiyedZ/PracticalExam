const express = require("express");
const router = express.Router();

const authRoutes = require("./authRouters");
const taskRoutes = require("./taskRouters");
const categoryRoutes = require("./categoryRouters");

router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);
router.use("/categories", categoryRoutes);

module.exports = router;
