const express = require("express");
const router = express.Router();
const { signup, login, forgotPassword, resetPassword } = require("../controllers/auth.controller");

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotpassword",forgotPassword);
router.put("/resetpassword/:token", resetPassword);

module.exports = router;
