import React from 'react';
import { Link } from 'react-router-dom';
import { color, font, radius, fontImports } from './theme';

function Home() {
  const styles = {
    container: {
      fontFamily: font.body,
      backgroundColor: color.navy,
      color: '#fff',
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '40px 20px',
    },
    eyebrow: {
      color: color.amber,
      fontSize: '0.85rem',
      fontWeight: 600,
      margin: '0 0 14px 0',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    title: {
      fontFamily: font.display,
      fontSize: '3rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      margin: '0 0 16px 0',
    },
    subtitle: {
      fontSize: '1.15rem',
      fontWeight: 400,
      color: '#CBD5E1',
      maxWidth: '540px',
      margin: '0 0 36px 0',
      lineHeight: 1.6,
    },
    buttonContainer: {
      display: 'flex',
      gap: '14px',
    },
    primaryButton: {
      backgroundColor: '#fff',
      color: color.navy,
      padding: '12px 24px',
      borderRadius: radius.md,
      textDecoration: 'none',
      fontSize: '0.9rem',
      fontWeight: 600,
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      color: '#fff',
      padding: '12px 24px',
      borderRadius: radius.md,
      textDecoration: 'none',
      fontSize: '0.9rem',
      fontWeight: 600,
      border: `1px solid rgba(255,255,255,0.25)`,
    }
  };

  return (
    <div style={styles.container}>
      <style>{fontImports}</style>
      <p style={styles.eyebrow}>Urban Mobility Fleet</p>
      <h1 style={styles.title}>Welcome to Faster Bike Taxi</h1>
      <h2 style={styles.subtitle}>
        Apply now to become a bike taxi driver and start earning!
      </h2>
      <div style={styles.buttonContainer}>
        <Link to="/apply" style={styles.primaryButton}>Apply Now</Link>
        <Link to="/bikedetails" style={styles.secondaryButton}>Bike Details</Link>
      </div>
    </div>
  );
}

export default Home;
