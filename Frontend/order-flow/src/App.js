import React from 'react'; // Capitalize 'React'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login'; // Capitalize 'Login' if it's a component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
      </Routes>
    </Router>
  );
}

export default App;
