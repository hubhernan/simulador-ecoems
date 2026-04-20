import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { exams } from '../data/mockData';
import { Clock, Flag, ChevronLeft, ChevronRight, Menu, X, CheckCircle } from 'lucide-react';
import '../styles/Simulator.css';

export default function Simulator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const exam = exams.find(e => e.examId === id);
  
  const [timeLeft, setTimeLeft] = useState(exam?.duracionMaxima || 180 * 60);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showSummary, setShowSummary] = useState(false);

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

  const handleAnswer = (val) => {
    setAnswers({ ...answers, [currentQuestion]: val });
  };

  const toggleMark = () => {
    setMarked({ ...marked, [currentQuestion]: !marked[currentQuestion] });
  };

  const handleFinish = () => {
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
          <button className="icon-btn d-lg-none" onClick={() => setSidebarOpen(!sidebarOpen)}>
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
          <button className="btn btn-primary btn-sm" onClick={() => setShowSummary(true)}>Finalizar</button>
        </div>
      </header>

      <div className="sim-body">
        {/* Sidebar */}
        <aside className={`sim-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sim-sidebar-header">
            <h3>Navegación</h3>
            <button className="icon-btn d-lg-none" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <div className="sim-sections">
            {exam.secciones.map((sec, idx) => (
              <div key={sec.sectionId} className="sim-section">
                <div className="sim-section-title">{sec.nombre}</div>
                <div className="sim-questions-grid">
                  {Array.from({ length: sec.numPreguntas }).map((_, i) => {
                    // Quick math to get global question index. In a real app we'd map this properly.
                    const qIdx = idx * 32 + i + 1; 
                    const isAnswered = !!answers[qIdx];
                    const isMarked = !!marked[qIdx];
                    const isCurrent = currentQuestion === qIdx;
                    
                    return (
                      <button
                        key={qIdx}
                        className={`sim-q-btn ${isCurrent ? 'current' : ''} ${isAnswered ? 'answered' : ''} ${isMarked ? 'marked' : ''}`}
                        onClick={() => setCurrentQuestion(qIdx)}
                      >
                        {qIdx}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="sim-main">
          <div className="question-card card glass-panel">
            <div className="question-meta">
              <span className="q-number">Pregunta {currentQuestion} de {exam.totalPreguntas}</span>
              <button 
                className={`btn btn-outline btn-sm flag-btn ${marked[currentQuestion] ? 'active' : ''}`}
                onClick={toggleMark}
              >
                <Flag size={16} /> {marked[currentQuestion] ? 'Desmarcar' : 'Marcar para revisión'}
              </button>
            </div>
            
            <div className="question-content">
              <p className="question-text">
                Lee el siguiente fragmento y responde la pregunta: ¿Cuál es la idea principal del texto que se muestra a continuación acerca de la evolución histórica de la región? (Ejemplo de pregunta {currentQuestion})
              </p>
              
              <div className="options-list">
                {['A', 'B', 'C', 'D'].map((opt) => (
                  <label 
                    key={opt} 
                    className={`option-item ${answers[currentQuestion] === opt ? 'selected' : ''}`}
                  >
                    <input 
                      type="radio" 
                      name="q-option" 
                      value={opt} 
                      checked={answers[currentQuestion] === opt}
                      onChange={() => handleAnswer(opt)}
                    />
                    <div className="option-bubble">{opt}</div>
                    <div className="option-text">Esta es una opción de respuesta genérica para simular el contenido del examen real.</div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer Navigation */}
      <footer className="sim-footer">
        <button 
          className="btn btn-secondary" 
          disabled={currentQuestion === 1}
          onClick={() => setCurrentQuestion(c => Math.max(1, c - 1))}
        >
          <ChevronLeft size={20} /> Anterior
        </button>
        <button 
          className="btn btn-secondary"
          onClick={() => setShowSummary(true)}
        >
          Resumen
        </button>
        <button 
          className="btn btn-primary"
          disabled={currentQuestion === exam.totalPreguntas}
          onClick={() => setCurrentQuestion(c => Math.min(exam.totalPreguntas, c + 1))}
        >
          Siguiente <ChevronRight size={20} />
        </button>
      </footer>

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
              <div className="sum-stat">
                <span className="sum-label">Marcadas</span>
                <span className="sum-val text-warning">{Object.values(marked).filter(Boolean).length}</span>
              </div>
            </div>
            
            {exam.totalPreguntas - totalAnswered > 0 && (
              <div className="warning-box">
                Aún tienes preguntas sin responder. Te recomendamos revisar antes de entregar.
              </div>
            )}
            
            <div className="modal-actions flex-row justify-between mt-4">
              <button className="btn btn-secondary" onClick={() => setShowSummary(false)}>Seguir resolviendo</button>
              <button className="btn btn-primary" onClick={handleFinish}>Entregar examen</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
