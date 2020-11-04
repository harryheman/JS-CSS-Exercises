const { Schema, model } = require("mongoose");

const exerciseSchema = new Schema(
  {
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Exercises", exerciseSchema);
