import { useParams, Link, useNavigate } from 'react-router-dom';
import { exams } from '../data/mockData';
import { ArrowLeft, Play, Clock, BookOpen, Layers } from 'lucide-react';

export default function ExamDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const exam = exams.find(e => e.examId === id);

  if (!exam) {
    return (
      <div className="card glass-panel text-center p-4">
        <h2>Examen no encontrado</h2>
        <button className="btn btn-primary mt-4" onClick={() => navigate('/exams')}>Volver a exámenes</button>
      </div>
    );
  }

  return (
    <div className="flex-col gap-4" style={{maxWidth: '800px', margin: '0 auto'}}>
      <button className="btn btn-outline btn-sm" style={{alignSelf: 'flex-start'}} onClick={() => navigate(-1)}>
        <ArrowLeft size={16} /> Volver
      </button>

      <div className="card glass-panel p-4">
        <h1 style={{fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary)'}}>{exam.nombre}</h1>
        <p className="text-secondary" style={{fontSize: '1.1rem', marginBottom: '2rem'}}>{exam.descripcion}</p>
        
        <div className="stats-grid" style={{marginBottom: '2rem'}}>
          <div className="stat-card">
            <Clock className="text-accent" size={24} />
            <div className="stat-info">
              <span className="stat-label">Duración Máxima</span>
              <span className="stat-value">{exam.duracionMaxima / 3600} horas</span>
            </div>
          </div>
          <div className="stat-card">
            <BookOpen className="text-primary" size={24} />
            <div className="stat-info">
              <span className="stat-label">Preguntas</span>
              <span className="stat-value">{exam.totalPreguntas}</span>
            </div>
          </div>
          <div className="stat-card">
            <Layers className="text-warning" size={24} />
            <div className="stat-info">
              <span className="stat-label">Secciones</span>
              <span className="stat-value">{exam.totalSecciones}</span>
            </div>
          </div>
        </div>

        <div style={{background: 'var(--bg-main)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', border: '1px solid var(--border-light)'}}>
          <h3 style={{marginBottom: '1rem'}}>Indicaciones:</h3>
          <ul style={{paddingLeft: '1.5rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            <li>Lee cuidadosamente cada pregunta antes de responder.</li>
            <li>Puedes navegar libremente entre preguntas y secciones usando el panel lateral.</li>
            <li>Si tienes dudas, puedes marcar la pregunta para revisarla después.</li>
            <li>El examen se entregará automáticamente al agotarse el tiempo.</li>
            <li>Al terminar recibirás calificación inmediata y un análisis por área.</li>
          </ul>
        </div>

        <Link to={`/simulador/${exam.examId}`} className="btn btn-primary w-full" style={{padding: '1rem', fontSize: '1.1rem'}}>
          <Play size={20} fill="currentColor" /> Iniciar simulador
        </Link>
      </div>
    </div>
  );
}
