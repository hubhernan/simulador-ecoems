import { useState, useEffect } from 'react';
import { Activity, Clock, Target, TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { exams } from '../data/mockData';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalExams: 0,
    averageScore: '--',
    bestScore: '--',
    averageTime: '--:--:--'
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchStats() {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('exam_results')
        .select('score, time_spent, exam_id')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching dashboard stats:', error);
      } else if (data && data.length > 0) {
        const total = data.length;
        const sumScores = data.reduce((acc, curr) => acc + curr.score, 0);
        const best = Math.max(...data.map(d => d.score));
        const sumTime = data.reduce((acc, curr) => acc + curr.time_spent, 0);
        
        const avgScore = Math.round((sumScores / total / 128) * 100);
        const avgTimeSeconds = Math.round(sumTime / total);
        
        const h = Math.floor(avgTimeSeconds / 3600);
        const m = Math.floor((avgTimeSeconds % 3600) / 60);
        const s = avgTimeSeconds % 60;
        
        setStats({
          totalExams: total,
          averageScore: `${avgScore}%`,
          bestScore: `${best}/128`,
          averageTime: `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
        });
      }
      setLoading(false);
    }
    
    fetchStats();
  }, [user]);

  return (
    <div className="flex-col gap-4">
      <div className="section-header">
        <h1>Dashboard Analítico</h1>
        <p className="text-secondary">Monitorea tu evolución y descubre tus áreas de oportunidad.</p>
      </div>

      <div className="stats-grid mb-4">
        <div className="stat-card card glass-panel">
          <div className="stat-icon-wrapper"><Activity className="text-primary"/></div>
          <div className="stat-info">
            <span className="stat-label">Exámenes Realizados</span>
            <span className="stat-value">{stats.totalExams}</span>
          </div>
        </div>
        <div className="stat-card card glass-panel">
          <div className="stat-icon-wrapper"><TrendingUp className="text-success"/></div>
          <div className="stat-info">
            <span className="stat-label">Promedio Global</span>
            <span className="stat-value">{stats.averageScore}</span>
          </div>
        </div>
        <div className="stat-card card glass-panel">
          <div className="stat-icon-wrapper"><Target className="text-warning"/></div>
          <div className="stat-info">
            <span className="stat-label">Mejor Puntaje</span>
            <span className="stat-value">{stats.bestScore}</span>
          </div>
        </div>
        <div className="stat-card card glass-panel">
          <div className="stat-icon-wrapper"><Clock className="text-accent"/></div>
          <div className="stat-info">
            <span className="stat-label">Tiempo Promedio</span>
            <span className="stat-value">{stats.averageTime}</span>
          </div>
        </div>
      </div>

      {stats.totalExams === 0 && !loading && (
        <div className="card glass-panel flex-col" style={{alignItems: 'center', textAlign: 'center', padding: '4rem 2rem'}}>
          <Activity size={48} className="text-muted mb-2" />
          <h3 style={{marginBottom: '0.5rem', color: 'var(--text-primary)'}}>Aún no hay suficientes datos</h3>
          <p style={{color: 'var(--text-secondary)', maxWidth: '500px'}}>
            Necesitas completar al menos un examen en el Simulador para que el sistema pueda generar tus gráficas de desempeño y tus reportes de áreas de oportunidad.
          </p>
        </div>
      )}
    </div>
  );
}
