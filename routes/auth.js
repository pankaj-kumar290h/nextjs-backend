const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { signin, signup } = require("../controllers/auth");

router.post(
  "/signin",
  body("username").isLength({ min: 2 }),
  body("password").isLength({ min: 3 }),
  signin
);

router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 3 }),
  body("username").isLength({ min: 2 }),
  signup
);

module.exports = router;
