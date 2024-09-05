const express = require('express');
const Student = require('../models/Student');
const router = express.Router();


router.post('/student', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
