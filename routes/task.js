const express = require("express");
const router = express.Router();

const { isSignIn } = require("../helper/isSignin");

const { addtask, getalltask } = require("../controllers/task");

router.post("/addtask", isSignIn, addtask);

router.get("/getalltask", isSignIn, getalltask);

module.exports = router;
