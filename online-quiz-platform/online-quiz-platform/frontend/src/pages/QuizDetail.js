import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuizDetail = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      const response = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
      setQuiz(response.data);
    };

    fetchQuiz();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response = await axios.post(`http://localhost:5000/api/quizzes/${id}/submit`, { answers }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setScore(response.data);
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <div className=" mx-auto mt-8 px-4">
      {quiz && (
        <div className="border border-gray-300 rounded-lg shadow-lg p-6 bg-white">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{quiz.title}</h1>
          <p className="text-lg mb-8 text-gray-700">{quiz.description}</p>
          <form onSubmit={handleSubmit}>
            {quiz.questions.map((question, index) => (
              <div key={index} className="mb-6">
                <p className="text-lg mb-2 text-gray-800">{question.questionText}</p>
                {question.options.map((option, optIndex) => (
                  <label key={optIndex} className="block mb-2 text-gray-700">
                    <input type="radio" name={`question-${index}`} value={option} onChange={(e) => handleAnswerChange(index, e.target.value)} className="mr-2" />
                    <span className="text-base">{option}</span>
                  </label>
                ))}
              </div>
            ))}
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">Submit</button>
          </form>
          {score && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold">Score: {score.score}/{score.total}</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizDetail;
