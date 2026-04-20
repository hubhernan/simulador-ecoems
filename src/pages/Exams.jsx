import { Link } from 'react-router-dom';
import { exams } from '../data/mockData';
import { ArrowRight, Clock, Target } from 'lucide-react';
import '../styles/Home.css'; // Reusing some CSS for grid

export default function Exams() {
  return (
    <div className="flex-col gap-4">
      <div className="section-header">
        <h1>Exámenes Disponibles</h1>
        <p className="text-secondary">Selecciona un simulador para comenzar tu práctica.</p>
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
              <span className="flex-row gap-1"><Clock size={16}/> {exam.duracionMaxima / 60} hrs</span>
              <span className="flex-row gap-1"><Target size={16}/> {exam.intentos} intentos previos</span>
            </div>
            <div className="exam-actions flex-row gap-2 mt-4">
              <Link to={`/exams/${exam.examId}`} className="btn btn-secondary" style={{flex: 1}}>Ver detalle</Link>
              <Link to={`/simulador/${exam.examId}`} className="btn btn-primary" style={{flex: 1}}>Iniciar</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
