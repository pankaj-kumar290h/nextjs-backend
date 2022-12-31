const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const cookeiParser = require("cookie-parser");

const app = express();

require("dotenv").config();

//////////not that much work experince with node but i try my best//////////

/////////////////////routes import///////////
const authRouters = require("./routes/auth");
const taskRoutes = require("./routes/task");

///////////middleware//////////
app.use(cors());
app.use(express.json());
app.use(cookeiParser());

///////////////routes///////////////

app.use("/api", authRouters);
app.use("/api", taskRoutes);

/////////////////////momgodb connection//////////
mongoose.set("strictQuery", true);
///////////these url goes to env file for simplicty used directly/////////
mongoose
  .connect(process.env.MongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected");
  });

let PORT = process.env.PORT || 5000;
/////////////////////////listening///////////////////
app.listen(PORT, () => {
  console.log("running on port 5000");
});
