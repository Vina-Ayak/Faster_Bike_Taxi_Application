import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../api/api';
import { statusStyles, fontImports, color, radius } from './theme';

function DisplayBikes() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const fetchBikes = () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };

    fetch(`${BASE_URL}/getAllBiketaxi`, {
      method: 'GET',
      headers,
    })
      .then(res => res.json())
      .then(data => {
        setBikes(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setBikes([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBikes();
  }, []);

  const filteredBikes = bikes.filter(bike => {
    const matchesSearch = 
      (bike.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (bike.bikeNumber || '').toLowerCase().includes(search.toLowerCase()) ||
      (bike.phoneNumber || '').includes(search);
    const matchesFilter = filterStatus === 'ALL' || bike.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <style>{fontImports}</style>

      {/* ── Page Hero ── */}
      <div className="fbt-page-hero">
        <h2>Submitted Applications</h2>
        <p>All driver applications submitted to the Faster Bike Taxi fleet platform.</p>
      </div>

      {/* ── Content ── */}
      <div className="fbt-page">
        {/* Search & Filter Toolbar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flex: 1, maxWidth: '460px' }}>
            <input
              type="text"
              placeholder="Search by driver name, bike number, phone…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 14px',
                borderRadius: radius.md,
                border: `1px solid ${color.border}`,
                fontSize: '0.88rem',
                outline: 'none',
                background: '#fff'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                padding: '9px 12px',
                borderRadius: radius.md,
                border: `1px solid ${color.border}`,
                fontSize: '0.85rem',
                background: '#fff',
                cursor: 'pointer'
              }}
            >
              <option value="ALL">All Statuses</option>
              <option value="DRAFT">Draft</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="DOCUMENT_VERIFICATION">Document Verification</option>
              <option value="BACKGROUND_CHECK">Background Check</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>

            <button
              onClick={fetchBikes}
              style={{
                padding: '9px 16px',
                borderRadius: radius.md,
                border: `1px solid ${color.border}`,
                background: '#fff',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: color.ink
              }}
            >
              Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <div className="fbt-empty"><p>Loading applications…</p></div>
        ) : filteredBikes.length === 0 ? (
          <div className="fbt-empty">
            <svg style={{ marginBottom: '12px', opacity: 0.35 }} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/>
              <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
            <p>{bikes.length === 0 ? 'No applications found.' : 'No applications match your filter.'}</p>
          </div>
        ) : (
          <>
            {/* Count chip */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '0.82rem', color: color.inkMuted, fontWeight: 500 }}>
                Showing {filteredBikes.length} of {bikes.length} application{bikes.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="fbt-card" style={{ overflowX: 'auto' }}>
              <table className="fbt-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Bike number</th>
                    <th>Age</th>
                    <th>Phone</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBikes.map((bike, index) => (
                    <tr key={bike.id || index}>
                      <td style={{ fontWeight: 600, color: color.ink }}>{bike.name}</td>
                      <td style={{ fontFamily: 'monospace', fontSize: '0.85rem', fontWeight: 600 }}>{bike.bikeNumber}</td>
                      <td>{bike.age}</td>
                      <td>{bike.phoneNumber}</td>
                      <td>
                        <span style={statusStyles(bike.status)}>
                          {bike.status || 'DRAFT'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DisplayBikes;
