// src/App.js
import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateQuiz from './pages/CreateQuiz';
import QuizList from './pages/QuizList';
import QuizDetail from './pages/QuizDetail';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/create-quiz" element={<CreateQuiz></CreateQuiz>} />
          <Route path="/quizzes/:id" element={<QuizDetail></QuizDetail>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/register" element={<Register></Register>} />
          <Route path="/" exact element={<QuizList></QuizList>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
