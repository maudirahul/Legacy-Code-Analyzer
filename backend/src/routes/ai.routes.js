const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const { explainFile, chat } = require("../controllers/ai.controller");

router.post("/explain", auth, explainFile);
router.post("/chat", auth, chat);

module.exports = router;
