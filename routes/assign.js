const express = require('express');
const Mentor = require('../models/Mentor');
const Student = require('../models/Student');
const router = express.Router();


router.put('/assign-student/:mentorId/:studentId', async (req, res) => {
  const { mentorId, studentId } = req.params;
  try {
      const mentor = await Mentor.findById(mentorId);
      const student = await Student.findById(studentId);

      if (!mentor || !student) {
          return res.status(404).json({ error: 'Mentor or student not found' });
      }

      student.mentor = mentor._id;
      await student.save();

      mentor.students.push(student._id);
      await mentor.save();

      res.status(200).json({ mentor, student });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});