const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const taskSchema = mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      ref: "User",
      require: true,
    },
    todos: {
      type: Array,
      default: [],
    },
    date: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
