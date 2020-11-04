const router = require("express").Router();
const Exercise = require("../models/exercise.model");

router.get("/", async (_, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/add", async (req, res) => {
  const { username, description, duration } = req.body;

  const newExercise = new Exercise({
    username,
    description,
    duration,
  });

  try {
    await newExercise.save();
    res.status(201).json("Exercise created.");
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const exercise = await Exercise.findOne({
      _id: req.params.id,
    });
    res.status(201).json(exercise);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Exercise.deleteOne({ _id: req.params.id });
    res.status(201).json("Exercise deleted.");
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/update/:id", async (req, res) => {
  const { username, description, duration } = req.body;

  try {
    await Exercise.updateOne(
      {
        _id: req.params.id,
      },
      {
        username,
        description,
        duration,
      }
    );
    res.status(201).json("Exercise updated.");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
