const express = require("express");

const router = express.Router();
const { check, validationResult } = require("express-validator");

const Click = require("../../Models/Click");

// @route   POST api/clicks
// @desc    Create clicks
// @access  public
router.post(
  "/",
  [[check("domain", "Domain is requires").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newClick = new Click({
        domain: req.body.domain,
      });
      const click = await newClick.save();
      res.json(click);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/clicks
// @desc    Get all clicks
// @access  public
router.get("/", async (req, res) => {
  try {
    const clicks = await Click.find().sort({ date: -1 });
    res.json(clicks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
