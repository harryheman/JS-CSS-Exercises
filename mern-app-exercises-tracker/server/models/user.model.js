const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
