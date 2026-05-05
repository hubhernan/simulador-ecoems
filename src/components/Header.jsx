import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, User, Settings, LogOut, Target, Award, Monitor, Type, Bell, Shield, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

export default function Header() {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [openDropdown, setOpenDropdown] = useState(null); // 'profile' or 'settings'
  const headerRef = useRef(null);

  const isSimulator = location.pathname.includes('/simulador');

  // Cierra los dropdowns si se hace clic afuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isSimulator) return null; // Header is hidden or different during exam

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <header className="main-header glass-panel" ref={headerRef}>
      <div className="header-container">
        <Link to="/" className="brand flex-row gap-1">
          <BookOpen className="brand-icon" size={28} />
          <h2>Simulador <span className="brand-highlight">ECOEMS</span></h2>
        </Link>
        
        <nav className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Inicio</Link>
          <Link to="/exams" className={`nav-link ${location.pathname.includes('/exams') ? 'active' : ''}`}>Exámenes</Link>
          <Link to="/historial" className={`nav-link ${location.pathname === '/historial' ? 'active' : ''}`}>Historial</Link>
          <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>Dashboard</Link>
        </nav>

        <div className="user-actions flex-row gap-2">
          {/* Settings Menu */}
          <div className="dropdown-container">
            <button className={`icon-btn ${openDropdown === 'settings' ? 'active' : ''}`} onClick={() => toggleDropdown('settings')}>
              <Settings size={20} />
            </button>
            {openDropdown === 'settings' && (
              <div className="dropdown-menu card glass-panel">
                <div className="dropdown-header">Preferencias del Simulador</div>
                <button className="dropdown-item" onClick={() => alert('¡Próximamente! Esta función se activará en la siguiente actualización.')}><Monitor size={16}/> <span>Tema Oscuro / Claro</span></button>
                <button className="dropdown-item" onClick={() => alert('¡Próximamente! Esta función se activará en la siguiente actualización.')}><Type size={16}/> <span>Tamaño de Texto (Lectura)</span></button>
                <button className="dropdown-item" onClick={() => alert('¡Próximamente! Esta función se activará en la siguiente actualización.')}><Bell size={16}/> <span>Alertas de Tiempo</span></button>
                <button className="dropdown-item" onClick={() => alert('¡Próximamente! Esta función se activará en la siguiente actualización.')}><Shield size={16}/> <span>Confirmación de Entrega Segura</span></button>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="dropdown-container">
            {user ? (
              <>
                <button className={`profile-btn flex-row gap-1 ${openDropdown === 'profile' ? 'active' : ''}`} onClick={() => toggleDropdown('profile')}>
                  <User size={18} />
                  <span>{user.user_metadata?.full_name || 'Perfil'}</span>
                  <ChevronDown size={14} className="dropdown-chevron" />
                </button>
                {openDropdown === 'profile' && (
                  <div className="dropdown-menu card glass-panel profile-menu">
                    <div className="dropdown-header flex-col">
                      <strong>{user.user_metadata?.full_name || user.email}</strong>
                      <span className="text-muted" style={{fontSize: '0.8rem'}}>Cuenta Premium ECOEMS</span>
                    </div>
                    <div className="dropdown-divider"></div>
                    <Link to="/cuenta" className="dropdown-item" onClick={() => setOpenDropdown(null)}><User size={16}/> <span>Mi Cuenta</span></Link>
                    <button className="dropdown-item" onClick={() => alert('¡Próximamente! Esta función se activará en la siguiente actualización.')}><Target size={16}/> <span>Mis Metas de Estudio</span></button>
                    <button className="dropdown-item" onClick={() => alert('¡Próximamente! Esta función se activará en la siguiente actualización.')}><Award size={16}/> <span>Insignias y Logros</span></button>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item text-danger" onClick={signOut}><LogOut size={16}/> <span>Cerrar Sesión</span></button>
                  </div>
                )}
              </>
            ) : (
              <Link to="/auth" className="btn btn-primary btn-sm flex-row gap-1">
                <User size={16} />
                <span>Entrar</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
