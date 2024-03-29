import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Imports Page Components 
import HomePage from './pages/HomePage/HomePage.js'
import Nebula from './pages/Nebula/Nebula.js'

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="nebula" element={<Nebula/>} />
    </Routes>
  </Router>
  );
}

export default App;