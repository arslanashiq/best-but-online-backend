const express = require("express");
const router = express.Router();

const authRoutes = require("./v1/authRoutes");
const userRutes = require("./v1/userRutes");
const transactionRoutes = require("./v1/transactionRoutes");

router.use("/auth", authRoutes);
router.use("/user", userRutes);
router.use("/transaction", transactionRoutes);

module.exports = router;
