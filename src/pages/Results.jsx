import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Target, ArrowRight, BarChart2, TrendingUp } from 'lucide-react';
import { exams } from '../data/mockData';
import { answerKeys } from '../data/answers';

export default function Results() {
  const { attemptId } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    try {
      const attemptData = JSON.parse(localStorage.getItem('latest_attempt'));
      if (!attemptData) return;

      const exam = exams.find(e => e.examId === attemptData.examId);
      const examKey = answerKeys[attemptData.examId];
      if (!exam || !examKey) return;

      let score = 0;
      const subjectStats = {};

      for (let i = 1; i <= exam.totalPreguntas; i++) {
        const keyInfo = examKey[i];
        if (!keyInfo) continue;
        
        if (!subjectStats[keyInfo.subject]) {
          subjectStats[keyInfo.subject] = { name: keyInfo.subject, score: 0, total: 0 };
        }
        
        subjectStats[keyInfo.subject].total += 1;
        
        if (attemptData.answers[i] === keyInfo.correct) {
          score += 1;
          subjectStats[keyInfo.subject].score += 1;
        }
      }

      const areas = Object.values(subjectStats).map(area => {
        const percent = Math.round((area.score / area.total) * 100);
        let status = 'Rojo';
        let bgClass = 'var(--danger-light)'; // Actually we need to define danger in global.css if not there, but we can use #fef2f2 / #ef4444
        let colorVar = '#ef4444'; 

        if (percent >= 90) {
          status = 'Verde';
          bgClass = 'var(--success-light)';
          colorVar = 'var(--success)';
        } else if (percent >= 75) {
          status = 'Amarillo';
          bgClass = 'var(--warning-light)';
          colorVar = 'var(--warning)';
        }

        return {
          ...area,
          percent,
          status,
          bgClass,
          colorVar
        };
      });

      // Sort descending
      areas.sort((a, b) => b.percent - a.percent);

      const h = Math.floor(attemptData.timeSpent / 3600);
      const m = Math.floor((attemptData.timeSpent % 3600) / 60);
      const s = attemptData.timeSpent % 60;
      const timeUsed = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

      setResult({
        examName: exam.nombre,
        score,
        total: exam.totalPreguntas,
        percent: Math.round((score / exam.totalPreguntas) * 100),
        timeUsed,
        areas
      });
    } catch (e) {
      console.error(e);
    }
  }, [attemptId]);

  if (!result) return <div style={{padding: '4rem', textAlign: 'center'}}>Cargando resultados o intento no encontrado...</div>;

  const fuertes = result.areas.filter(a => a.percent >= 90);
  const mejorar = result.areas.filter(a => a.percent < 90);

  return (
    <div className="flex-col gap-4" style={{maxWidth: '900px', margin: '0 auto'}}>
      <div className="card glass-panel" style={{textAlign: 'center', padding: '3rem 2rem'}}>
        <div style={{display: 'inline-block', padding: '1rem', background: 'var(--success-light)', borderRadius: '50%', marginBottom: '1rem'}}>
          <CheckCircle size={48} className="text-success" />
        </div>
        <h1 style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}>Resultado del examen</h1>
        <p className="text-secondary" style={{fontSize: '1.2rem', marginBottom: '2rem'}}>{result.examName}</p>
        
        <div className="stats-grid" style={{marginBottom: '3rem'}}>
          <div className="stat-card" style={{flexDirection: 'column', textAlign: 'center', padding: '1.5rem'}}>
            <span className="stat-label">Calificación</span>
            <span className="stat-value" style={{fontSize: '2rem', color: 'var(--primary)'}}>{result.score}/{result.total}</span>
          </div>
          <div className="stat-card" style={{flexDirection: 'column', textAlign: 'center', padding: '1.5rem'}}>
            <span className="stat-label">Porcentaje global</span>
            <span className="stat-value" style={{fontSize: '2rem', color: result.percent >= 75 ? 'var(--success)' : '#ef4444'}}>{result.percent}%</span>
          </div>
          <div className="stat-card" style={{flexDirection: 'column', textAlign: 'center', padding: '1.5rem'}}>
            <span className="stat-label">Tiempo usado</span>
            <span className="stat-value" style={{fontSize: '2rem', color: 'var(--accent)'}}>{result.timeUsed}</span>
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', textAlign: 'left', marginBottom: '3rem'}}>
          <div className="card" style={{background: 'var(--bg-main)'}}>
            <h3 className="flex-row gap-1 text-success mb-2"><TrendingUp size={20}/> Áreas Dominadas (90-100%)</h3>
            {fuertes.map(a => (
              <div key={a.name} className="flex-row justify-between" style={{padding: '0.5rem 0', borderBottom: '1px solid var(--border-light)'}}>
                <span>{a.name}</span>
                <span className="badge" style={{background: a.bgClass, color: a.colorVar}}>{a.percent}% ({a.score}/{a.total})</span>
              </div>
            ))}
            {fuertes.length === 0 && (
              <div className="text-secondary text-center" style={{padding: '1rem'}}>Aún no hay áreas dominadas. ¡Sigue practicando!</div>
            )}
          </div>
          <div className="card" style={{background: 'var(--bg-main)'}}>
            <h3 className="flex-row gap-1 text-warning mb-2"><Target size={20}/> Áreas de Oportunidad</h3>
            {mejorar.map(a => (
              <div key={a.name} className="flex-row justify-between" style={{padding: '0.5rem 0', borderBottom: '1px solid var(--border-light)'}}>
                <span>{a.name}</span>
                <span className="badge" style={{background: a.bgClass, color: a.colorVar}}>{a.percent}% ({a.score}/{a.total})</span>
              </div>
            ))}
            {mejorar.length === 0 && (
              <div className="text-success text-center" style={{padding: '1rem'}}>¡Excelente! Tienes dominio total en todas las áreas.</div>
            )}
          </div>
        </div>

        <div className="flex-row gap-2 justify-center">
          <Link to="/dashboard" className="btn btn-secondary"><BarChart2 size={18}/> Ver análisis completo</Link>
          <Link to="/exams" className="btn btn-primary">Volver a intentar <ArrowRight size={18}/></Link>
        </div>
      </div>
    </div>
  );
}
