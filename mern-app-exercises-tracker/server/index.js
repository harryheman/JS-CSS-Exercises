const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const exerciseRouter = require("./routes/exersice.router");
const userRouter = require("./routes/user.router");

require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors());

app.use(express.static(__dirname));

mongoose.connect(
  process.env.MONGO,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to database.")
);

app.use("/exercises", exerciseRouter);
app.use("/users", userRouter);

const port = process.env.PORT || 1234;
app.listen(port, () => console.log(`Server ready. Port: ${port}.`));
