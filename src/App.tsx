import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WeatherApp from './components/WeatherApp';
import StudentListApp from './components/StudentListApp';
import StudentDetail from './components/StudentDetail';
import NewsApp from './components/NewsApp';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li>
                <Link to="/weather">Bài 1</Link>
              </li>
              <li>
                <Link to="/students">Bài 2</Link>
              </li>
              <li>
                <Link to="/news">Bài 3</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/weather" element={<WeatherApp />} />
            <Route path="/students" element={<StudentListApp />} />
            <Route path="/students/:id" element={<StudentDetail />} />
            <Route path="/news" element={<NewsApp />} />
            <Route path="/" element={<h2>Bài thực hành số 2</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
