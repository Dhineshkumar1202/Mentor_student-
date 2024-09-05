const express = require('express');
const Mentor = require('../models/Mentor');
const router = express.Router();

router.get('/mentor-students/:mentorId', async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.mentorId).populate('students');
    if (!mentor) return res.status(404).send('Mentor not found');

    res.status(200).send(mentor.students);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
