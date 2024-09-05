const express = require('express');
const Mentor = require('../models/Mentor');
const router = express.Router();

router.post('/mentors', async (req, res) => {
  const { name, email } = req.body;
  try {
      const mentor = new Mentor({ name, email });
      await mentor.save();
      res.status(201).json(mentor);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});