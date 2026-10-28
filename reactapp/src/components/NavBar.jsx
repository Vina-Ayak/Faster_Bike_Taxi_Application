import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { color, font, radius } from './theme';

function NavBar() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role') || 'Driver';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/';
  };

  const styles = {
    nav: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: color.navy,
      padding: '0 32px',
      height: '64px',
      fontFamily: font.body,
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      borderBottom: '1px solid rgba(255,255,255,0.08)'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      color: '#fff',
      textDecoration: 'none',
      fontSize: '1.05rem',
      fontWeight: 700,
      fontFamily: font.display,
      letterSpacing: '-0.01em',
    },
    mark: {
      width: '10px',
      height: '10px',
      borderRadius: '3px',
      backgroundColor: color.amber,
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center',
      listStyle: 'none',
      gap: '28px',
      margin: 0,
      padding: 0,
    },
    link: {
      color: '#CBD5E1',
      textDecoration: 'none',
      fontSize: '0.88rem',
      fontWeight: 500,
      transition: 'color 0.15s ease',
    },
    activeLink: {
      color: '#FFFFFF',
      fontWeight: 600,
    },
    actions: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    applyButton: {
      backgroundColor: '#fff',
      color: color.navy,
      padding: '8px 18px',
      borderRadius: radius.md,
      textDecoration: 'none',
      fontSize: '0.84rem',
      fontWeight: 600,
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      transition: 'all 0.15s ease'
    },
    logoutBtn: {
      backgroundColor: 'transparent',
      color: '#F87171',
      border: '1px solid rgba(239,68,68,0.3)',
      padding: '7px 14px',
      borderRadius: radius.md,
      fontSize: '0.82rem',
      fontWeight: 600,
      cursor: 'pointer'
    },
    userBadge: {
      fontSize: '0.78rem',
      color: '#94A3B8',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        <span style={styles.mark} />
        Faster Bike Taxi
      </Link>

      <ul style={styles.navLinks}>
        <li>
          <NavLink to="/" style={({ isActive }) => ({ ...styles.link, ...(isActive ? styles.activeLink : {}) })} end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/bikedetails" style={({ isActive }) => ({ ...styles.link, ...(isActive ? styles.activeLink : {}) })}>
            Bike Details
          </NavLink>
        </li>
        <li>
          <NavLink to="/operations" style={({ isActive }) => ({ ...styles.link, ...(isActive ? styles.activeLink : {}) })}>
            Operations
          </NavLink>
        </li>
      </ul>

      <div style={styles.actions}>
        {token ? (
          <>
            <span style={styles.userBadge}>
              <span style={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                background: role === 'ADMIN' ? '#A855F7' : '#10B981', 
                display: 'inline-block' 
              }} />
              {role}
            </span>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/auth" style={styles.link}>
              Sign in
            </Link>
            <Link to="/apply" style={styles.applyButton}>
              Apply as Driver
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
