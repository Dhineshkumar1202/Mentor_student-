const express = require('express');
const Mentor = require('../models/Mentor');
const router = express.Router();

router.get('/mentor-students/:mentorId', async (req, res) => {
  try {
      const mentor = await Mentor.findById(req.params.mentorId).populate('students');
      if (!mentor) {
          return res.status(404).json({ error: 'Mentor not found' });
      }
      res.status(200).json(mentor.students);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});