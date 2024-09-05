const express = require('express');
const Mentor = require('../models/Mentor');
const Student = require('../models/Student');
const router = express.Router();


router.post('/change-mentor', async (req, res) => {
  const { studentId, mentorId } = req.body;

  try {
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).send('Student not found');

    const mentor = await Mentor.findById(mentorId);
    if (!mentor) return res.status(404).send('Mentor not found');

    student.previousMentors.push(student.mentor); 
    student.mentor = mentor._id;

    await student.save();
    res.status(200).send(student);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
