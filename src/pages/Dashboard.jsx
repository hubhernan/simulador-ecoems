import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Target, TrendingUp, Clock, Activity } from 'lucide-react';

export default function Dashboard() {
  const lineData = [
    { name: 'Intento 1', puntaje: 65 },
    { name: 'Intento 2', puntaje: 68 },
    { name: 'Intento 3', puntaje: 75 },
    { name: 'Intento 4', puntaje: 82 },
  ];

  const radarData = [
    { subject: 'Matemáticas', A: 50, fullMark: 100 },
    { subject: 'Español', A: 85, fullMark: 100 },
    { subject: 'Ciencias', A: 65, fullMark: 100 },
    { subject: 'Historia', A: 80, fullMark: 100 },
  ];

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
            <span className="stat-value">4</span>
          </div>
        </div>
        <div className="stat-card card glass-panel">
          <div className="stat-icon-wrapper"><TrendingUp className="text-success"/></div>
          <div className="stat-info">
            <span className="stat-label">Promedio Global</span>
            <span className="stat-value">72.5%</span>
          </div>
        </div>
        <div className="stat-card card glass-panel">
          <div className="stat-icon-wrapper"><Target className="text-warning"/></div>
          <div className="stat-info">
            <span className="stat-label">Mejor Puntaje</span>
            <span className="stat-value">82/128</span>
          </div>
        </div>
        <div className="stat-card card glass-panel">
          <div className="stat-icon-wrapper"><Clock className="text-accent"/></div>
          <div className="stat-info">
            <span className="stat-label">Tiempo Promedio</span>
            <span className="stat-value">2:45:00</span>
          </div>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem'}}>
        <div className="card glass-panel flex-col">
          <h3 style={{marginBottom: '1.5rem'}}>Evolución de Puntaje</h3>
          <div style={{height: '300px', width: '100%'}}>
            <ResponsiveContainer>
              <LineChart data={lineData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="puntaje" stroke="var(--primary)" strokeWidth={3} dot={{r: 6}} activeDot={{r: 8}} />
                <CartesianGrid stroke="var(--border-light)" strokeDasharray="5 5" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <RechartsTooltip 
                  contentStyle={{background: 'var(--bg-elevated)', border: '1px solid var(--border-light)', borderRadius: '8px'}} 
                  itemStyle={{color: 'var(--primary)'}}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card glass-panel flex-col">
          <h3 style={{marginBottom: '1.5rem'}}>Desempeño por Área (Último Examen)</h3>
          <div style={{height: '300px', width: '100%'}}>
            <ResponsiveContainer>
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="var(--border-light)" />
                <PolarAngleAxis dataKey="subject" tick={{fill: 'var(--text-primary)', fontSize: 12}} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{fill: 'var(--text-secondary)'}} />
                <Radar name="Porcentaje" dataKey="A" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.5} />
                <RechartsTooltip contentStyle={{background: 'var(--bg-elevated)', border: '1px solid var(--border-light)', borderRadius: '8px'}} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card glass-panel mt-4" style={{marginTop: '1.5rem'}}>
        <h3 style={{marginBottom: '1rem'}}>Insights Automáticos</h3>
        <ul style={{display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '1rem'}}>
          <li style={{color: 'var(--text-secondary)'}}><strong className="text-success">Mejora sostenida:</strong> Has incrementado tu puntaje en los últimos 3 intentos consecutivos.</li>
          <li style={{color: 'var(--text-secondary)'}}><strong className="text-primary">Fortaleza principal:</strong> Tu mejor desempeño se concentra consistentemente en <b>Español</b>.</li>
          <li style={{color: 'var(--text-secondary)'}}><strong className="text-warning">Área crítica:</strong> El área con menor estabilidad es <b>Matemáticas</b>, te sugerimos repasar álgebra básica.</li>
          <li style={{color: 'var(--text-secondary)'}}><strong className="text-accent">Gestión de tiempo:</strong> Tu tiempo de resolución ha mejorado en 18 minutos respecto al primer intento.</li>
        </ul>
      </div>
    </div>
  );
}
