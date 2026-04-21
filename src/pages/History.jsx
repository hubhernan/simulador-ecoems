import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Activity } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { exams } from '../data/mockData';

export default function History() {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchHistory() {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('exam_results')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

      if (error) {
        console.error('Error fetching history:', error);
      } else if (data) {
        const formatted = data.map((row, index, array) => {
          const examInfo = exams.find(e => e.examId === row.exam_id) || { nombre: row.exam_id };
          const dateObj = new Date(row.completed_at);
          
          const h = Math.floor(row.time_spent / 3600);
          const m = Math.floor((row.time_spent % 3600) / 60);
          const s = row.time_spent % 60;
          
          let variation = '--';
          if (index < array.length - 1) {
            const prevScore = array[index + 1].score;
            const diff = row.score - prevScore;
            variation = diff >= 0 ? `+${diff}` : `${diff}`;
          }

          return {
            id: row.id,
            date: dateObj.toLocaleDateString(),
            exam: examInfo.nombre,
            score: `${row.score}/128`,
            time: `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`,
            variation,
            rawScore: row.score,
            answers: row.answers,
            examId: row.exam_id,
            timeSpent: row.time_spent
          };
        });
        setHistoryData(formatted);
      }
      setLoading(false);
    }
    
    fetchHistory();
  }, [user]);

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
            {loading ? (
              <tr>
                <td colSpan="6" style={{padding: '2rem', textAlign: 'center', color: 'var(--text-muted)'}}>
                  <Activity className="spinner" size={24} style={{marginBottom: '1rem', animation: 'spin 2s linear infinite'}}/>
                  <div>Cargando historial...</div>
                </td>
              </tr>
            ) : historyData.length === 0 ? (
              <tr>
                <td colSpan="6" style={{padding: '2rem', textAlign: 'center', color: 'var(--text-muted)'}}>
                  No has realizado ningún examen todavía. Tus resultados aparecerán aquí.
                </td>
              </tr>
            ) : (
              historyData.map((row) => (
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
                    <button 
                      onClick={() => {
                        // Trick to view it: save to localStorage and navigate
                        localStorage.setItem('latest_attempt', JSON.stringify({
                          examId: row.examId,
                          answers: row.answers,
                          timeSpent: row.timeSpent
                        }));
                        window.location.hash = `#/resultados/view-${row.id}`;
                      }}
                      className="btn btn-outline btn-sm"
                    >
                      <Eye size={16}/> Ver
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
