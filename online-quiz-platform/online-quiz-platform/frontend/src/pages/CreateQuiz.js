// src/pages/CreateQuiz.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (token) {
      await axios.post(
        'http://localhost:5000/api/quizzes',
        { title, description, questions },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
    } else {
      console.error('No token found');
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create a Quiz</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Quiz Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Quiz Title"
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Quiz Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Quiz Description"
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      {questions.map((question, index) => (
        <div key={index} className="mb-6">
          <label className="block text-gray-700">Question {index + 1}</label>
          <input
            type="text"
            value={question.questionText}
            onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
            placeholder="Question"
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {question.options.map((option, optIndex) => (
            <input
              key={optIndex}
              type="text"
              value={option}
              onChange={(e) => {
                const newOptions = [...question.options];
                newOptions[optIndex] = e.target.value;
                handleQuestionChange(index, 'options', newOptions);
              }}
              placeholder={`Option ${optIndex + 1}`}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          ))}
          <input
            type="text"
            value={question.correctAnswer}
            onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
            placeholder="Correct Answer"
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Create Quiz
      </button>
    </form>
  );
};

export default CreateQuiz;
