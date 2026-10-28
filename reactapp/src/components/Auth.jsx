import React, { useState } from 'react';
import { register, login, getProfile } from '../api/api';
import { color, font, radius, shadow, inputStyle, labelStyle, primaryButton, secondaryButton, pageShell, fontImports } from './theme';

function Auth() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('DRIVER');
  const [profile, setProfile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearFields = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setPhoneNumber('');
    setRole('DRIVER');
    setProfile(null);
  };

  const handleFillDemoDriver = () => {
    setUsername('driver1');
    setEmail('driver1@biketaxi.com');
    setPassword('driver123');
    setPhoneNumber('9876543210');
    setRole('DRIVER');
  };

  const handleFillDemoAdmin = () => {
    setUsername('admin');
    setEmail('admin@biketaxi.com');
    setPassword('admin123');
    setPhoneNumber('9876543211');
    setRole('ADMIN');
  };

  const handleRegister = async () => {
    if (!username || !username.trim()) {
      alert('Username is required!');
      return;
    }
    if (!email || !email.trim()) {
      alert('Email is required!');
      return;
    }
    if (!email.includes('@') || !email.includes('.com')) {
      alert('Invalid email address! Email must contain @ and .com');
      return;
    }
    if (!password || !password.trim()) {
      alert('Password is required!');
      return;
    }
    if (!phoneNumber || !phoneNumber.trim()) {
      alert('Phone number is required for registration!');
      return;
    }
    const cleanPhone = phoneNumber.trim();
    if (!/^\d{10}$/.test(cleanPhone)) {
      alert('Phone number must be exactly 10 digits!');
      return;
    }

    setIsSubmitting(true);
    const regUsername = username.trim();
    const regPassword = password;
    try {
      const res = await register({ 
        username: regUsername, 
        email: email.trim(), 
        password: regPassword, 
        phoneNumber: cleanPhone, 
        role 
      });

      if (res.ok) {
        const data = await res.json();
        const userToken = data.token;
        if (userToken) {
          localStorage.setItem('token', userToken);
        }
        if (data.role) {
          localStorage.setItem('role', data.role);
        }

        if (!userToken) {
          const loginRes = await login({ username: regUsername, password: regPassword });
          if (loginRes.ok) {
            const loginData = await loginRes.json();
            localStorage.setItem('token', loginData.token);
            if (loginData.role) localStorage.setItem('role', loginData.role);
          }
        }

        clearFields();
        window.location.href = '/';
      } else {
        const errText = await res.text();
        alert('Failed to register: ' + errText);
      }
    } catch (e) {
      console.error(e);
      alert('Error during registration: ' + e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async () => {
    if (!username || !username.trim()) {
      alert('Username is required!');
      return;
    }
    if (!password || !password.trim()) {
      alert('Password is required!');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await login({ username: username.trim(), password });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        if (data.role) {
          localStorage.setItem('role', data.role);
        }
        clearFields();
        window.location.href = '/';
      } else {
        const errText = await res.text();
        if (
          res.status === 401 ||
          res.status === 404 ||
          res.status === 403 ||
          errText.toLowerCase().includes('not found') ||
          errText.toLowerCase().includes('bad credentials') ||
          errText.toLowerCase().includes('unauthorized')
        ) {
          alert('failed to login user not found');
        } else {
          alert('failed to login user not found');
        }
      }
    } catch (e) {
      console.error(e);
      alert('failed to login user not found');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const res = await getProfile();
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      } else {
        alert('Failed to get profile: ' + await res.text());
      }
    } catch (e) {
      console.error(e);
    }
  };

  const styles = {
    page: { ...pageShell, padding: '48px 20px', display: 'flex', justifyContent: 'center' },
    card: {
      width: '100%',
      maxWidth: '440px',
      backgroundColor: color.surface,
      border: `1px solid ${color.border}`,
      borderRadius: radius.lg,
      boxShadow: shadow.card,
      padding: '32px',
    },
    heading: {
      fontFamily: font.display,
      fontSize: '1.45rem',
      fontWeight: 600,
      margin: '0 0 4px 0',
      color: color.ink,
    },
    sub: {
      fontSize: '0.85rem',
      color: color.inkMuted,
      margin: '0 0 20px 0',
    },
    demoBar: {
      display: 'flex',
      gap: '8px',
      marginBottom: '20px',
      padding: '10px',
      background: '#F8FAFC',
      borderRadius: radius.sm,
      border: '1px dashed #CBD5E1'
    },
    demoBtn: {
      flex: 1,
      padding: '6px 10px',
      fontSize: '0.75rem',
      fontWeight: 600,
      background: '#fff',
      border: `1px solid ${color.border}`,
      borderRadius: radius.sm,
      cursor: 'pointer',
      color: color.ink
    },
    field: { display: 'flex', flexDirection: 'column', marginBottom: '14px' },
    select: { ...inputStyle },
    row: { display: 'flex', gap: '10px', marginTop: '10px' },
    divider: { borderTop: `1px solid ${color.border}`, margin: '24px 0 18px 0' },
    profileBox: {
      fontFamily: font.mono,
      fontSize: '0.8rem',
      backgroundColor: color.surfaceSunken,
      border: `1px solid ${color.border}`,
      borderRadius: radius.sm,
      padding: '12px',
      marginTop: '14px',
      whiteSpace: 'pre-wrap',
      color: color.inkMuted,
    },
  };

  return (
    <div style={styles.page}>
      <style>{fontImports}</style>
      <div style={styles.card}>
        <h2 style={styles.heading}>Sign in to Fleet Ops</h2>
        <p style={styles.sub}>Access your driver or admin account.</p>

        {/* Demo Fast Fill Buttons */}
        <div style={styles.demoBar}>
          <button type="button" onClick={handleFillDemoDriver} style={styles.demoBtn}>
            👤 Demo Driver
          </button>
          <button type="button" onClick={handleFillDemoAdmin} style={styles.demoBtn}>
            🛡️ Demo Admin
          </button>
        </div>

        <div style={styles.field}>
          <label style={labelStyle}>Username</label>
          <input 
            style={inputStyle} 
            type="text" 
            placeholder="Username"
            value={username} 
            onChange={e => setUsername(e.target.value)} 
          />
        </div>
        <div style={styles.field}>
          <label style={labelStyle}>Email <span style={{ fontWeight: 400 }}>(registration only)</span></label>
          <input 
            style={inputStyle} 
            type="text" 
            placeholder="driver@example.com"
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />
        </div>
        <div style={styles.field}>
          <label style={labelStyle}>Password</label>
          <input 
            style={inputStyle} 
            type="password" 
            placeholder="••••••••"
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />
        </div>
        <div style={styles.field}>
          <label style={labelStyle}>Phone number <span style={{ fontWeight: 400 }}>(registration only)</span></label>
          <input 
            style={inputStyle} 
            type="text" 
            placeholder="10 digit phone number"
            value={phoneNumber} 
            onChange={e => setPhoneNumber(e.target.value)} 
          />
        </div>
        <div style={styles.field}>
          <label style={labelStyle}>Role</label>
          <select style={styles.select} value={role} onChange={e => setRole(e.target.value)}>
            <option value="DRIVER">Driver</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <div style={styles.row}>
          <button onClick={handleRegister} style={{ ...secondaryButton, flex: 1 }} disabled={isSubmitting}>
            Register
          </button>
          <button onClick={handleLogin} style={{ ...primaryButton, flex: 1 }} disabled={isSubmitting}>
            Login
          </button>
        </div>

        <div style={styles.divider} />

        <button onClick={fetchUserProfile} style={{ ...secondaryButton, width: '100%' }}>
          View profile
        </button>
        {profile && <pre style={styles.profileBox}>{JSON.stringify(profile, null, 2)}</pre>}
      </div>
    </div>
  );
}

export default Auth;
