import { Link } from 'react-router-dom';
import { exams, userProgress } from '../data/mockData';
import { ArrowRight, Trophy, Clock, Target, Activity } from 'lucide-react';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home-container flex-col gap-4">
      {/* Welcome Section */}
      <section className="welcome-section card glass-panel">
        <div className="welcome-content">
          <h1 className="welcome-title">Hola, Ricardo</h1>
          <p className="welcome-subtitle">Tu progreso reciente</p>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon-wrapper"><Target className="stat-icon text-primary" /></div>
              <div className="stat-info">
                <span className="stat-label">Último puntaje</span>
                <span className="stat-value">{userProgress.lastScore}/128</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper"><Trophy className="stat-icon text-warning" /></div>
              <div className="stat-info">
                <span className="stat-label">Mejor examen</span>
                <span className="stat-value">{userProgress.bestExam}</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper"><Activity className="stat-icon text-success" /></div>
              <div className="stat-info">
                <span className="stat-label">Promedio</span>
                <span className="stat-value">{userProgress.averageScore}%</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper"><Clock className="stat-icon text-accent" /></div>
              <div className="stat-info">
                <span className="stat-label">Último tiempo</span>
                <span className="stat-value">{userProgress.lastTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Exams Section */}
      <section className="exams-section">
        <div className="section-header flex-row justify-between">
          <h2>Tus exámenes disponibles</h2>
          <Link to="/exams" className="btn btn-outline btn-sm">Ver todos <ArrowRight size={16}/></Link>
        </div>
        
        <div className="exams-grid">
          {exams.map(exam => (
            <div key={exam.examId} className="exam-card card glass-panel">
              <div className="exam-card-header">
                <h3>{exam.nombre}</h3>
                <span className="badge">{exam.totalPreguntas} preguntas</span>
              </div>
              <p className="exam-desc">{exam.descripcion}</p>
              <div className="exam-meta">
                <span>⏱ {exam.duracionMaxima / 60} hrs</span>
                <span>🔄 {exam.intentos} intentos previos</span>
              </div>
              <div className="exam-actions">
                <Link to={`/simulador/${exam.examId}`} className="btn btn-primary w-full">Comenzar <ArrowRight size={18}/></Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="quick-access-section">
        <h2>Accesos rápidos</h2>
        <div className="quick-grid">
          <Link to="/historial" className="quick-card card glass-panel">
            <h3>Historial</h3>
            <p>Revisa tus intentos anteriores</p>
          </Link>
          <Link to="/comparativos" className="quick-card card glass-panel">
            <h3>Comparativos</h3>
            <p>Compara tus resultados entre exámenes</p>
          </Link>
          <Link to="/dashboard" className="quick-card card glass-panel">
            <h3>Dashboard</h3>
            <p>Analítica avanzada de tu desempeño</p>
          </Link>
          <Link to="/recomendaciones" className="quick-card card glass-panel">
            <h3>Recomendaciones</h3>
            <p>Áreas a reforzar para tu siguiente intento</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
