import { Link } from 'react-router-dom';
import { ArrowRight, Eye } from 'lucide-react';

export default function History() {
  const historyData = [
    { id: '1', date: '12/04/2026', exam: 'Tipo A', score: '82/128', time: '2:31:44', variation: '+7' },
    { id: '2', date: '08/04/2026', exam: 'Tipo A', score: '75/128', time: '2:46:18', variation: '+3' },
    { id: '3', date: '05/04/2026', exam: 'Tipo B', score: '72/128', time: '2:50:10', variation: '+4' },
    { id: '4', date: '01/04/2026', exam: 'Tipo C', score: '68/128', time: '2:58:04', variation: '--' },
  ];

  return (
    <div className="flex-col gap-4">
      <div className="section-header">
        <h1>Historial de Intentos</h1>
        <p className="text-secondary">Consulta todos tus resultados anteriores.</p>
      </div>

      <div className="card glass-panel" style={{overflowX: 'auto'}}>
        <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
          <thead>
            <tr style={{borderBottom: '1px solid var(--border-strong)', color: 'var(--text-muted)'}}>
              <th style={{padding: '1rem'}}>Fecha</th>
              <th style={{padding: '1rem'}}>Examen</th>
              <th style={{padding: '1rem'}}>Puntaje</th>
              <th style={{padding: '1rem'}}>Tiempo</th>
              <th style={{padding: '1rem'}}>Variación</th>
              <th style={{padding: '1rem', textAlign: 'right'}}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((row) => (
              <tr key={row.id} style={{borderBottom: '1px solid var(--border-light)'}}>
                <td style={{padding: '1rem'}}>{row.date}</td>
                <td style={{padding: '1rem', fontWeight: '500'}}>{row.exam}</td>
                <td style={{padding: '1rem', color: 'var(--primary)', fontWeight: '600'}}>{row.score}</td>
                <td style={{padding: '1rem'}}>{row.time}</td>
                <td style={{padding: '1rem'}}>
                  <span className={`badge ${row.variation.startsWith('+') ? 'text-success' : 'text-muted'}`} style={{background: row.variation.startsWith('+') ? 'var(--success-light)' : 'var(--bg-elevated)'}}>
                    {row.variation}
                  </span>
                </td>
                <td style={{padding: '1rem', textAlign: 'right'}}>
                  <Link to={`/resultados/${row.id}`} className="btn btn-outline btn-sm"><Eye size={16}/> Ver</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
