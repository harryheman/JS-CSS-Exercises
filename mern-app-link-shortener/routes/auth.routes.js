const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const router = Router();

// api/auth
router.post(
  "/register",
  [
    check("email", "wrong email").isEmail(),
    check("password", "min length = 6").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "wrong data",
        });
      }

      const { email, password } = req.body;

      const exist = await User.findOne({ email });

      if (exist) {
        return res.status(400).json({ message: "user exist" });
      }

      const hash = await bcrypt.hash(password, 10);

      const user = new User({
        email,
        password: hash,
      });

      await user.save();

      res.status(201).json({ message: "user created" });
    } catch (e) {
      return res.status(500).json({ message: "error" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "wrong email").normalizeEmail().isEmail(),
    check("password", "enter password").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "wrong data",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "user not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "wrong password" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.json({ token, useId: user.id });
    } catch (e) {
      return res.status(500).json({ message: "error" });
    }
  }
);

module.exports = router;
