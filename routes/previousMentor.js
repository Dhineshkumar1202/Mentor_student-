const express = require('express');
const Student = require('../models/Student');
const router = express.Router();


router.get('/previous-mentor/:studentId', async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).populate('previousMentors');
    if (!student) return res.status(404).send('Student not found');

    res.status(200).send(student.previousMentors);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
