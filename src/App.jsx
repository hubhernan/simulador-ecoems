import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Exams from './pages/Exams';
import ExamDetail from './pages/ExamDetail';
import Simulator from './pages/Simulator';
import Results from './pages/Results';
import History from './pages/History';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/exams/:id" element={<ExamDetail />} />
            <Route path="/simulador/:id" element={<Simulator />} />
            <Route path="/resultados/:attemptId" element={<Results />} />
            <Route path="/historial" element={<History />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
