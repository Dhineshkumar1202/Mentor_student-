const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const mentorRoutes = require('./routes/mentor');
const studentRoutes = require('./routes/student');
const assignRoutes = require('./routes/assign');
const changeRoutes = require('./routes/change');
const mentorStudentsRoutes = require('./routes/mentorStudents');
const previousMentorRoutes = require('./routes/previousMentor');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mentor_student', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});



app.use(mentorRoutes);
app.use(studentRoutes);
app.use(assignRoutes);
app.use(changeRoutes);
app.use(mentorStudentsRoutes);
app.use(previousMentorRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
