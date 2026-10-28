import React from 'react';
import { Link } from 'react-router-dom';
import { color, font, radius, fontImports } from './theme';

function LandingPage() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <style>{fontImports}</style>

      {/* ── Hero ── */}
      <div style={{
        background: 'linear-gradient(135deg, #0B1220 0%, #0f2044 60%, #0B1220 100%)',
        padding: '80px 60px',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
      }}>
        <div style={{
          maxWidth: '720px',
          width: '100%',
        }}>
          {/* Copy */}
          <div>
            <p style={{ color: color.amber, fontSize: '0.8rem', fontWeight: 600, marginBottom: '14px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Urban mobility operations
            </p>
            <h1 style={{
              fontFamily: font.display,
              fontSize: '2.8rem',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#fff',
              marginBottom: '18px',
              maxWidth: '620px',
            }}>
              Welcome to Faster Bike Taxi
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#CBD5E1', maxWidth: '540px', marginBottom: '14px', lineHeight: 1.6 }}>
              Apply now to become a bike taxi driver and start earning!
            </p>
            <p style={{ fontSize: '0.95rem', color: '#94A3B8', maxWidth: '520px', marginBottom: '32px', lineHeight: 1.6 }}>
              Onboard drivers, verify vehicle documentation, track rides, and manage fleet compliance from a single cloud-ready operations console.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link to="/apply" style={{
                backgroundColor: '#fff',
                color: color.navy,
                padding: '12px 24px',
                borderRadius: radius.md,
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                display: 'inline-block',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}>
                Apply Now
              </Link>
              <Link to="/bikedetails" style={{
                backgroundColor: 'transparent',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: radius.md,
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'inline-block',
              }}>
                View Fleet
              </Link>
              <Link to="/auth" style={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: radius.md,
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.12)',
                display: 'inline-block',
              }}>
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Feature strip ── */}
      <div style={{ background: '#fff', borderTop: '1px solid #E4E7EC', padding: '36px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', maxWidth: '1000px' }}>
          {[
            { icon: '⚡', title: 'Fast onboarding', desc: 'Submit a driver application in under 3 minutes with real-time status updates.' },
            { icon: '🛡️', title: 'Compliance built-in', desc: 'Background verification, license checks, and vehicle inspection workflows.' },
            { icon: '📊', title: 'Real-time ops', desc: 'Track live fleet health, audit logs, and performance metrics in one dashboard.' },
          ].map(f => (
            <div key={f.title}>
              <div style={{ fontSize: '1.4rem', marginBottom: '10px' }}>{f.icon}</div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', color: color.ink, marginBottom: '6px' }}>{f.title}</div>
              <div style={{ fontSize: '0.85rem', color: color.inkMuted, lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
