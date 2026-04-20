import { useParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, Target, ArrowRight, BarChart2, TrendingUp } from 'lucide-react';

export default function Results() {
  const { attemptId } = useParams();
  
  // Fake data for the result
  const result = {
    examName: 'Examen Tipo A',
    score: 82,
    total: 128,
    percent: Math.round((82/128)*100),
    timeUsed: '02:31:44',
    areas: [
      { name: 'Matemáticas', score: 15, total: 32, percent: Math.round((15/32)*100), status: 'Reforzar' },
      { name: 'Español', score: 25, total: 32, percent: Math.round((25/32)*100), status: 'Fuerte' },
      { name: 'Ciencias', score: 18, total: 32, percent: Math.round((18/32)*100), status: 'Reforzar' },
      { name: 'Historia', score: 24, total: 32, percent: Math.round((24/32)*100), status: 'Fuerte' }
    ]
  };

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
            <span className="stat-label">Porcentaje</span>
            <span className="stat-value" style={{fontSize: '2rem', color: 'var(--success)'}}>{result.percent}%</span>
          </div>
          <div className="stat-card" style={{flexDirection: 'column', textAlign: 'center', padding: '1.5rem'}}>
            <span className="stat-label">Tiempo usado</span>
            <span className="stat-value" style={{fontSize: '2rem', color: 'var(--accent)'}}>{result.timeUsed}</span>
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', textAlign: 'left', marginBottom: '3rem'}}>
          <div className="card" style={{background: 'var(--bg-main)'}}>
            <h3 className="flex-row gap-1 text-success mb-2"><TrendingUp size={20}/> Tus mejores áreas</h3>
            {result.areas.filter(a => a.status === 'Fuerte').map(a => (
              <div key={a.name} className="flex-row justify-between" style={{padding: '0.5rem 0', borderBottom: '1px solid var(--border-light)'}}>
                <span>{a.name}</span>
                <span className="badge" style={{background: 'var(--success-light)', color: 'var(--success)'}}>{a.percent}%</span>
              </div>
            ))}
          </div>
          <div className="card" style={{background: 'var(--bg-main)'}}>
            <h3 className="flex-row gap-1 text-warning mb-2"><Target size={20}/> Áreas a reforzar</h3>
            {result.areas.filter(a => a.status === 'Reforzar').map(a => (
              <div key={a.name} className="flex-row justify-between" style={{padding: '0.5rem 0', borderBottom: '1px solid var(--border-light)'}}>
                <span>{a.name}</span>
                <span className="badge" style={{background: 'var(--warning-light)', color: 'var(--warning)'}}>{a.percent}%</span>
              </div>
            ))}
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
