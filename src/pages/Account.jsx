import { useState, useEffect } from 'react';
import { User, Save, Mail, Calendar, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import '../styles/Dashboard.css';

export default function Account() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    created_at: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, created_at')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      if (data) {
        setProfile({
          full_name: data.full_name || '',
          created_at: data.created_at
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error.message);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const updates = {
        id: user.id,
        full_name: profile.full_name,
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) throw error;
      
      // Update auth metadata too
      await supabase.auth.updateUser({
        data: { full_name: profile.full_name }
      });

      setMessage({ type: 'success', text: 'Perfil actualizado correctamente.' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al actualizar el perfil: ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container fade-in">
      <div className="dashboard-header card glass-panel">
        <div className="flex-row gap-2">
          <div className="stat-icon" style={{background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', padding: '1rem', borderRadius: '1rem'}}>
            <User size={32} />
          </div>
          <div>
            <h1 className="text-xl">Mi Cuenta</h1>
            <p className="text-muted">Gestiona tu información personal y preferencias.</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
        
        <div className="card glass-panel">
          <h2 className="text-lg mb-4 flex-row gap-1"><Shield size={20}/> Información del Perfil</h2>
          
          {message.text && (
            <div className={`alert ${message.type === 'error' ? 'alert-danger' : 'alert-success'} mb-4`} style={{ padding: '1rem', borderRadius: '8px', backgroundColor: message.type === 'error' ? 'rgba(2ef, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)', color: message.type === 'error' ? '#ef4444' : '#22c55e' }}>
              {message.text}
            </div>
          )}

          <form onSubmit={updateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label className="text-muted flex-row gap-1"><Mail size={16}/> Correo Electrónico</label>
              <input 
                type="email" 
                value={user?.email || ''} 
                disabled 
                style={{ padding: '0.8rem', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', width: '100%' }}
              />
              <small className="text-muted">El correo electrónico no se puede cambiar.</small>
            </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label className="text-muted flex-row gap-1"><User size={16}/> Nombre Completo</label>
              <input 
                type="text" 
                value={profile.full_name} 
                onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                placeholder="Tu nombre real"
                style={{ padding: '0.8rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: '100%' }}
              />
            </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label className="text-muted flex-row gap-1"><Calendar size={16}/> Miembro desde</label>
              <div style={{ padding: '0.8rem', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', width: '100%' }}>
                {profile.created_at ? new Date(profile.created_at).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Cargando...'}
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary flex-row gap-1" 
              disabled={loading}
              style={{ alignSelf: 'flex-start', marginTop: '1rem' }}
            >
              <Save size={18} />
              <span>{loading ? 'Guardando...' : 'Guardar Cambios'}</span>
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}
