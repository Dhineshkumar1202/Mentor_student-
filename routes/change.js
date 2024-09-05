const express = require('express');
const Mentor = require('../models/Mentor');
const Student = require('../models/Student');
const router = express.Router();


router.put('/change-mentor/:studentId/:newMentorId', async (req, res) => {
  const { studentId, newMentorId } = req.params;
  try {
      const student = await Student.findById(studentId);
      const newMentor = await Mentor.findById(newMentorId);

      if (!student || !newMentor) {
          return res.status(404).json({ error: 'Student or mentor not found' });
      }

      
      if (student.mentor) {
          const previousMentor = await Mentor.findById(student.mentor);
          previousMentor.students = previousMentor.students.filter(s => s.toString() !== student._id.toString());
          await previousMentor.save();
      }

     
      student.mentor = newMentor._id;
      await student.save();

      newMentor.students.push(student._id);
      await newMentor.save();

      res.status(200).json({ student, newMentor });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

module.exports = router;