import React from 'react';
import { color, font } from './theme';

function Footer() {
  const styles = {
    footer: {
      backgroundColor: color.navy,
      borderTop: `1px solid ${color.navySoft}`,
      padding: '18px 28px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: font.body,
      fontSize: '0.8rem',
      color: '#8792A2',
    },
  };

  return (
    <footer style={styles.footer}>
      <span>© {new Date().getFullYear()} Faster Bike Taxi. All rights reserved.</span>
      <span>Fleet Operations · Driver Compliance · Cloud Ready</span>
    </footer>
  );
}

export default Footer;
