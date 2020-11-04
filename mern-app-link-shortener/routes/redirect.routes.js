const { Router } = require("express");
const Link = require("../models/link");
const router = Router();

router.get("/:code", async (req, res) => {
  try {
    const link = await Link.findOne({ code: req.params.code });

    if (link) {
        link.clicks++
        await link.save()
        res.redirect(link.from)
    }

    res.status(404).json('link not found')
  } catch (e) {
    return res.status(500).json({ message: "error" });
  }
});

module.exports = router