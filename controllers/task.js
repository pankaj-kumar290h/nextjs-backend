const Task = require("../model/task");

////get todo list of user//////
exports.getalltask = (req, res) => {
  let todayDate = new Date();
  todayDate.setHours(00, 00, 00);

  Task.findOne(
    {
      user_id: req.user_id,
      date: { $gt: todayDate },
    },
    (err, result) => {
      if (err) {
        return res.json({ err: err });
      }

      return res.json({ result });
    }
  );
};

//////add task to todo list

exports.addtask = (req, res) => {
  let arr = req.body.todos;
  if (arr.length === 0) {
    return;
  }
  req.body.date = new Date();

  ////if arr length is 1 that means this is first task so we create new task and store in db
  if (arr.length === 1) {
    let task = new Task(req.body);
    task.save((err, result) => {
      if (err) {
        return res.json({ error: err });
      }
      return res.json({ result });
    });
  } else {
    /////if arr length is greater the one the list already exits so we update the todo list
    let todaydate = new Date();
    todaydate.setHours(00, 00, 00);
    console.log(arr);
    Task.findOneAndUpdate(
      {
        user_id: req.user_id,
        date: { $gt: todaydate },
      },
      {
        todos: [...arr],
      },
      (err, result) => {
        if (err) {
          return res.status(400).json({ error: err });
        }
        return res.json({ result });
      }
    );
  }
};
