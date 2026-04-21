import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { exams } from '../data/mockData';
import { Clock, Menu, X, Save } from 'lucide-react';
import '../styles/Simulator.css';

export default function Simulator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const exam = exams.find(e => e.examId === id);
  const examNumber = id ? id.split('-')[1] : '1';
  
  const [timeLeft, setTimeLeft] = useState(exam?.duracionMaxima || 180 * 60);
  const [answers, setAnswers] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(true);

  useEffect(() => {
    if (!exam) navigate('/exams');
  }, [exam, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (qNumber, val) => {
    setAnswers({ ...answers, [qNumber]: val });
  };

  const handleFinish = () => {
    // Pass answers to local storage so results page can read it
    localStorage.setItem(`latest_attempt`, JSON.stringify({
      examId: id,
      answers,
      timeSpent: (exam?.duracionMaxima || 180 * 60) - timeLeft
    }));
    navigate(`/resultados/new-${id}`);
  };

  if (!exam) return null;

  const totalAnswered = Object.keys(answers).length;
  const progressPercent = (totalAnswered / exam.totalPreguntas) * 100;

  return (
    <div className="simulator-layout">
      {/* Header */}
      <header className="sim-header">
        <div className="sim-header-left">
          <button className="icon-btn d-lg-none" onClick={() => setSheetOpen(!sheetOpen)}>
            <Menu size={24} />
          </button>
          <h2 className="sim-exam-title">{exam.nombre}</h2>
        </div>
        
        <div className="sim-progress-container d-none-mobile">
          <div className="sim-progress-text">Progreso {totalAnswered}/{exam.totalPreguntas}</div>
          <div className="sim-progress-bar-bg">
            <div className="sim-progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        <div className="sim-header-right">
          <div className={`sim-timer ${timeLeft < 300 ? 'text-danger' : ''}`}>
            <Clock size={20} />
            <span className="timer-text">{formatTime(timeLeft)}</span>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setShowSummary(true)}>
            <Save size={16} style={{marginRight: '6px'}}/>
            Entregar
          </button>
        </div>
      </header>

      <div className="sim-body">
        {/* PDF Viewer Area */}
        <main className="sim-main-pdf">
          <iframe 
            src={`/examenes/Examen No${examNumber}.pdf#view=FitH`} 
            className="pdf-viewer"
            title="Examen Original"
          />
        </main>

        {/* Bubble Sheet Area */}
        <aside className={`sim-answers-sheet ${sheetOpen ? 'open' : ''}`}>
          <div className="sim-sidebar-header">
            <h3>Hoja de Respuestas</h3>
            <button className="icon-btn d-lg-none" onClick={() => setSheetOpen(false)}>
              <X size={20} />
            </button>
          </div>
          
          <div className="bubble-sheet-container">
            {Array.from({ length: exam.totalPreguntas }).map((_, i) => {
              const qNum = i + 1;
              return (
                <div key={qNum} className="bubble-row">
                  <div className="bubble-num">{qNum}</div>
                  <div className="bubble-options">
                    {['A', 'B', 'C', 'D'].map(opt => (
                      <button
                        key={opt}
                        className={`bubble-btn ${answers[qNum] === opt ? 'selected' : ''}`}
                        onClick={() => handleAnswer(qNum, opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
      </div>

      {/* Summary Modal */}
      {showSummary && (
        <div className="modal-overlay">
          <div className="modal-content card glass-panel">
            <h2>Resumen del examen</h2>
            <div className="summary-stats">
              <div className="sum-stat">
                <span className="sum-label">Contestadas</span>
                <span className="sum-val text-success">{totalAnswered}</span>
              </div>
              <div className="sum-stat">
                <span className="sum-label">Sin contestar</span>
                <span className="sum-val text-danger">{exam.totalPreguntas - totalAnswered}</span>
              </div>
            </div>
            
            {exam.totalPreguntas - totalAnswered > 0 && (
              <div className="warning-box">
                Aún tienes preguntas en blanco. Te recomendamos revisar la hoja de respuestas antes de entregar.
              </div>
            )}
            
            <div className="modal-actions flex-row justify-between mt-4">
              <button className="btn btn-secondary" onClick={() => setShowSummary(false)}>Volver al examen</button>
              <button className="btn btn-primary" onClick={handleFinish}>Entregar definitivamente</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

