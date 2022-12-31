const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      maxlength: 40,
      unique: true,
      trime: true,
    },
    email: {
      type: String,
      trime: true,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      trime: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
