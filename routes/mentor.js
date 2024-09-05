const express = require('express');
const Mentor = require('../models/Mentor');
const router = express.Router();


router.post('/mentor', async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).send(mentor);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
