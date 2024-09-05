const express = require('express');
const Mentor = require('../models/Mentor');
const Student = require('../models/Student');
const router = express.Router();


router.post('/assign-students', async (req, res) => {
  const { mentorId, studentIds } = req.body;

  try {
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) return res.status(404).send('Mentor not found');

    for (const studentId of studentIds) {
      const student = await Student.findById(studentId);
      if (student && !student.mentor) {
        student.mentor = mentor._id;
        student.previousMentors.push(mentor._id);
        await student.save();
        mentor.students.push(student._id);
      }
    }

    await mentor.save();
    res.status(200).send(mentor);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
