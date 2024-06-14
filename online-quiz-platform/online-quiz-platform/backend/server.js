// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const cors=require('cors');
const bodyParse = require('body-parser');

dotenv.config();

const app = express();
app.use(bodyParse.json());
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }));

mongoose.connect("mongodb://localhost:27017/quiz-app");

app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
