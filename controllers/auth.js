const User = require("../model/user");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

//////////////signin controller /////////////////
exports.signin = (req, res) => {
  const error = validationResult(req); ////////validation /////////
  if (!error.isEmpty()) {
    console.log(error);
    return res.status(400).json({ error: error.array() });
  }
  const { username, password } = req.body;

  User.findOne({ username }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "No user Found" });
    }
    if (user.password !== password) {
      return res.status(400).json({ error: "Username and passwod not match" });
    }
    const { username, email, _id } = user;
    let token = jwt.sign({ _id }, "hello");

    return res.json({ token, username, email, _id });
  });
};
////////////////sign up controler/////////////////
exports.signup = (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const user = new User(req.body);
  user.save((err, result) => {
    if (err) {
      console.log(err.code);
      return res.status(400).json({ error: "username or email already exits" });
    }
    res.json({
      username: result.username,
      email: result.email,
      _id: result._id,
    });
  });
};
