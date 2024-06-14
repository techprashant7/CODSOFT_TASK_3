// src/pages/QuizList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await axios.get('http://localhost:5000/api/quizzes');
      setQuizzes(response.data);
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Quizzes</h1>
      <ul className="space-y-4">
        {quizzes.map((quiz) => (
          <li key={quiz._id} className="bg-white p-4 rounded shadow hover:bg-gray-100 transition duration-300">
            <Link to={`/quizzes/${quiz._id}`} className="text-blue-500 hover:underline">
              {quiz.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
