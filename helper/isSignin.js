const jwt = require("jsonwebtoken");

exports.isSignIn = (req, res, next) => {
  const user_id = req.query.id
    ? req.query.id
    : jwt.verify(req.headers.authorization.split(" ")[1], "hello");

  const _id = user_id;

  if (!_id) {
    return res.status(400).json({ msg: "Not Signin" });
  }
  req.user_id = _id;

  next();
};
