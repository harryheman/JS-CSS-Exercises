const router = require("express").Router();
const User = require("../models/user.model");

router.get("/", async (_, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/add", async (req, res) => {
  const { username } = req.body;
  const newUser = new User({ username });

  try {
    await newUser.save();
    res.status(201).json("User created.");
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(201).json("User deleted.");
  } catch (error) {
    res.status(400).json(error);
  }
})

module.exports = router
