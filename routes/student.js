const express = require('express');
const Student = require('../models/Student');
const router = express.Router();


router.post('/students', async (req, res) => {
  const { name, email } = req.body;
  try {
      const student = new Student({ name, email });
      await student.save();
      res.status(201).json(student);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});