import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, User, Settings, LogOut, Target, Award, Monitor, Type, Bell, Shield, ChevronDown } from 'lucide-react';
import '../styles/Header.css';

export default function Header() {
  const location = useLocation();
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
                <button className="dropdown-item"><Monitor size={16}/> <span>Tema Oscuro / Claro</span></button>
                <button className="dropdown-item"><Type size={16}/> <span>Tamaño de Texto (Lectura)</span></button>
                <button className="dropdown-item"><Bell size={16}/> <span>Alertas de Tiempo</span></button>
                <button className="dropdown-item"><Shield size={16}/> <span>Confirmación de Entrega Segura</span></button>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="dropdown-container">
            <button className={`profile-btn flex-row gap-1 ${openDropdown === 'profile' ? 'active' : ''}`} onClick={() => toggleDropdown('profile')}>
              <User size={18} />
              <span>Perfil</span>
              <ChevronDown size={14} className="dropdown-chevron" />
            </button>
            {openDropdown === 'profile' && (
              <div className="dropdown-menu card glass-panel profile-menu">
                <div className="dropdown-header flex-col">
                  <strong>Ricardo Estudiante</strong>
                  <span className="text-muted" style={{fontSize: '0.8rem'}}>Cuenta Premium ECOEMS</span>
                </div>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item"><User size={16}/> <span>Mi Cuenta</span></button>
                <button className="dropdown-item"><Target size={16}/> <span>Mis Metas de Estudio</span></button>
                <button className="dropdown-item"><Award size={16}/> <span>Insignias y Logros</span></button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item text-danger"><LogOut size={16}/> <span>Cerrar Sesión</span></button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
