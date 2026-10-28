import React, { useState } from 'react';
import * as api from '../api/api';
import { color, font, radius, statusStyles, fontImports } from './theme';

function Operations() {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [applications, setApplications] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loadingSection, setLoadingSection] = useState(null);
  const [selectedAppId, setSelectedAppId] = useState('');

  const fetchLogs = async () => {
    if (logs.length > 0) {
      setLogs([]);
      return;
    }
    setLoadingSection('logs');
    try {
      const res = await api.getAuditLogs();
      const data = await res.json();
      setLogs(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      alert('Failed to load audit logs. Are you logged in as Admin?');
    }
    setLoadingSection(null);
  };

  const fetchStats = async () => {
    if (stats) {
      setStats(null);
      return;
    }
    setLoadingSection('stats');
    try {
      const res = await api.getMyPerformance();
      const data = await res.json();
      setStats(data);
    } catch (e) {
      console.error(e);
      alert('Failed to load driver performance stats. Please login first.');
    }
    setLoadingSection(null);
  };

  const fetchApplications = async () => {
    if (applications.length > 0) {
      setApplications([]);
      return;
    }
    setLoadingSection('apps');
    try {
      const res = await api.getAllBiketaxi();
      if (res.ok) {
        const data = await res.json();
        setApplications(Array.isArray(data) ? data : []);
      } else {
        alert('Failed to load applications. Are you logged in?');
      }
    } catch (e) {
      console.error(e);
      alert('Error fetching applications: ' + e.message);
    }
    setLoadingSection(null);
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await api.updateApplicationStatus(id, newStatus);
      if (res.ok) {
        alert('Status updated successfully!');
        const updatedRes = await api.getAllBiketaxi();
        if (updatedRes.ok) {
          const data = await updatedRes.json();
          setApplications(Array.isArray(data) ? data : []);
        }
      } else {
        alert('Failed to update status. Status code: ' + res.status);
      }
    } catch (e) {
      console.error(e);
      alert('Error updating status: ' + e.message);
    }
  };

  const handleDeleteApplication = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) {
      return;
    }
    try {
      const res = await api.deleteBiketaxi(id);
      if (res.ok || res.status === 204) {
        alert('Application deleted successfully!');
        setApplications(prev => prev.filter(app => app.id !== id));
      } else {
        alert('Failed to delete application. Status: ' + res.status);
      }
    } catch (e) {
      console.error(e);
      alert('Error deleting application: ' + e.message);
    }
  };

  const handleLoadDocuments = async (appId) => {
    if (!appId) return;
    try {
      const res = await api.getDocuments(appId);
      if (res.ok) {
        const data = await res.json();
        setDocuments(Array.isArray(data) ? data : []);
      } else {
        setDocuments([]);
      }
    } catch (e) {
      console.error(e);
      setDocuments([]);
    }
  };

  const handleVerifyDoc = async (docId) => {
    try {
      const res = await api.verifyDocument(docId);
      if (res.ok) {
        alert('Document verified successfully!');
        if (selectedAppId) handleLoadDocuments(selectedAppId);
      } else {
        alert('Failed to verify document.');
      }
    } catch (e) {
      console.error(e);
      alert('Error: ' + e.message);
    }
  };

  const btnStyle = {
    padding: '9px 16px',
    fontSize: '0.85rem',
    fontWeight: 600,
    fontFamily: font.body,
    background: 'var(--surface)',
    color: 'var(--ink)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    transition: 'border-color 0.15s, background 0.15s',
  };

  const selectStyle = {
    padding: '6px 10px',
    fontSize: '0.8rem',
    fontFamily: font.body,
    border: `1px solid ${color.border}`,
    borderRadius: radius.sm,
    color: color.ink,
    background: color.surface,
    cursor: 'pointer',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <style>{fontImports}</style>

      {/* ── Page Hero ── */}
      <div className="fbt-page-hero">
        <h2>Operations Dashboard</h2>
        <p>Review driver performance, audit activity, compliance verification, and manage application statuses.</p>
      </div>

      {/* ── Content ── */}
      <div className="fbt-page">

        {/* Action cards row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '28px' }}>
          {/* Performance card */}
          <div className="fbt-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </span>
              <span style={{ fontWeight: 600, fontSize: '0.9rem', color: color.ink }}>Driver Performance</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: color.inkMuted, marginBottom: '14px', lineHeight: 1.5 }}>
              Load live ride stats, customer ratings, and driver earnings.
            </p>
            <button onClick={fetchStats} style={btnStyle} disabled={loadingSection === 'stats'}>
              {loadingSection === 'stats' ? 'Loading…' : stats ? 'Hide stats' : 'Load stats'}
            </button>
          </div>

          {/* Audit logs card */}
          <div className="fbt-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                </svg>
              </span>
              <span style={{ fontWeight: 600, fontSize: '0.9rem', color: color.ink }}>Audit Logs</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: color.inkMuted, marginBottom: '14px', lineHeight: 1.5 }}>
              View platform-wide security actions and status change trails.
            </p>
            <button onClick={fetchLogs} style={btnStyle} disabled={loadingSection === 'logs'}>
              {loadingSection === 'logs' ? 'Loading…' : logs.length > 0 ? 'Hide logs' : 'Load logs'}
            </button>
          </div>

          {/* Applications card */}
          <div className="fbt-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
                </svg>
              </span>
              <span style={{ fontWeight: 600, fontSize: '0.9rem', color: color.ink }}>Applications Management</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: color.inkMuted, marginBottom: '14px', lineHeight: 1.5 }}>
              Admin: update application status, review and approve drivers.
            </p>
            <button onClick={fetchApplications} style={btnStyle} disabled={loadingSection === 'apps'}>
              {loadingSection === 'apps' ? 'Loading…' : applications.length > 0 ? 'Hide apps' : 'Load applications'}
            </button>
          </div>
        </div>

        {/* Stats panel */}
        {stats && (
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: color.inkMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Driver Performance Overview
              </h3>
              <span style={{ fontSize: '0.75rem', color: color.inkFaint }}>Live metrics</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
              <div className="fbt-card" style={{ padding: '16px 18px' }}>
                <div style={{ fontSize: '0.75rem', color: color.inkMuted, fontWeight: 600, textTransform: 'uppercase' }}>Total Rides</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 700, color: color.ink, marginTop: '4px' }}>{stats.totalRides ?? 0}</div>
                <div style={{ fontSize: '0.72rem', color: '#16A34A', marginTop: '4px' }}>{stats.completedRides ?? 0} completed · {stats.cancelledRides ?? 0} cancelled</div>
              </div>

              <div className="fbt-card" style={{ padding: '16px 18px' }}>
                <div style={{ fontSize: '0.75rem', color: color.inkMuted, fontWeight: 600, textTransform: 'uppercase' }}>Driver Rating</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#D97706', marginTop: '4px' }}>★ {Number(stats.averageRating || 5).toFixed(1)}</div>
                <div style={{ fontSize: '0.72rem', color: color.inkMuted, marginTop: '4px' }}>Customer satisfaction score</div>
              </div>

              <div className="fbt-card" style={{ padding: '16px 18px' }}>
                <div style={{ fontSize: '0.75rem', color: color.inkMuted, fontWeight: 600, textTransform: 'uppercase' }}>Total Earnings</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#2563EB', marginTop: '4px' }}>₹{stats.totalEarnings ?? '0.00'}</div>
                <div style={{ fontSize: '0.72rem', color: color.inkMuted, marginTop: '4px' }}>Net revenue earned</div>
              </div>

              <div className="fbt-card" style={{ padding: '16px 18px' }}>
                <div style={{ fontSize: '0.75rem', color: color.inkMuted, fontWeight: 600, textTransform: 'uppercase' }}>Performance Score</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 700, color: stats.performanceScore >= 80 ? '#16A34A' : '#DC2626', marginTop: '4px' }}>
                  {stats.performanceScore ?? 100}%
                </div>
                <div style={{ fontSize: '0.72rem', color: color.inkMuted, marginTop: '4px' }}>Status: <strong>{stats.status || 'ACTIVE'}</strong></div>
              </div>
            </div>
          </div>
        )}

        {/* Logs panel */}
        {logs.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: color.inkMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Security & Audit Trail
              </h3>
              <span style={{ fontSize: '0.8rem', color: color.inkFaint }}>{logs.length} logged events</span>
            </div>
            <div className="fbt-card" style={{ overflowX: 'auto' }}>
              <table className="fbt-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Action</th>
                    <th>Entity Type</th>
                    <th>Entity ID</th>
                    <th>Admin / Operator</th>
                    <th>Details</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, idx) => (
                    <tr key={log.id || idx}>
                      <td style={{ color: color.inkMuted, fontSize: '0.8rem' }}>#{log.id || idx + 1}</td>
                      <td>
                        <span style={{
                          display: 'inline-block',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          background: log.action?.includes('UPDATE') ? '#EFF6FF' : log.action?.includes('DELETE') ? '#FEE2E2' : '#F3F4F6',
                          color: log.action?.includes('UPDATE') ? '#2563EB' : log.action?.includes('DELETE') ? '#DC2626' : color.ink,
                          letterSpacing: '0.02em',
                        }}>
                          {log.action}
                        </span>
                      </td>
                      <td style={{ fontWeight: 500 }}>{log.entityType}</td>
                      <td style={{ fontFamily: 'monospace', fontSize: '0.82rem' }}>{log.entityId}</td>
                      <td style={{ fontWeight: 500, color: color.ink }}>{log.adminUsername || 'Admin'}</td>
                      <td style={{ fontSize: '0.78rem', color: color.inkMuted, fontFamily: "'IBM Plex Mono', monospace" }}>
                        {log.newValues || log.oldValues ? `${log.oldValues ? log.oldValues + ' → ' : ''}${log.newValues || ''}` : '—'}
                      </td>
                      <td style={{ fontSize: '0.78rem', color: color.inkMuted }}>
                        {log.timestamp ? new Date(log.timestamp).toLocaleString() : 'Just now'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Applications table */}
        {applications.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: color.inkMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Driver Applications Management
              </h3>
              <span style={{ fontSize: '0.8rem', color: color.inkFaint }}>{applications.length} total</span>
            </div>
            <div className="fbt-card" style={{ overflowX: 'auto' }}>
              <table className="fbt-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Bike number</th>
                    <th>Status</th>
                    <th>Update status</th>
                    <th>Documents</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map(app => (
                    <tr key={app.id}>
                      <td style={{ color: color.inkMuted, fontSize: '0.8rem' }}>#{app.id}</td>
                      <td style={{ fontWeight: 600 }}>{app.name}</td>
                      <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{app.bikeNumber}</td>
                      <td><span style={statusStyles(app.status)}>{app.status}</span></td>
                      <td>
                        <select
                          style={selectStyle}
                          value={app.status}
                          onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                        >
                          <option value="DRAFT">DRAFT</option>
                          <option value="SUBMITTED">SUBMITTED</option>
                          <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                          <option value="DOCUMENT_VERIFICATION">DOCUMENT_VERIFICATION</option>
                          <option value="BACKGROUND_CHECK">BACKGROUND_CHECK</option>
                          <option value="APPROVED">APPROVED</option>
                          <option value="REJECTED">REJECTED</option>
                          <option value="ON_HOLD">ON_HOLD</option>
                        </select>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setSelectedAppId(app.id);
                            handleLoadDocuments(app.id);
                          }}
                          style={{
                            background: '#F1F5F9',
                            color: color.ink,
                            border: `1px solid ${color.border}`,
                            padding: '5px 10px',
                            borderRadius: radius.sm,
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          Docs
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteApplication(app.id)}
                          style={{
                            background: '#FEE2E2',
                            color: '#DC2626',
                            border: '1px solid #FECACA',
                            padding: '6px 12px',
                            borderRadius: radius.sm,
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            transition: 'all 0.15s',
                          }}
                          title="Delete application"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                          </svg>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Document Verification Drawer if documents loaded */}
            {documents.length > 0 && (
              <div style={{ marginTop: '20px', padding: '16px', background: '#F8FAFC', borderRadius: radius.md, border: `1px solid ${color.border}` }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem' }}>Attached Documents for Application #{selectedAppId}</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                  {documents.map(doc => (
                    <div key={doc.id} style={{ background: '#fff', padding: '12px', borderRadius: radius.sm, border: `1px solid ${color.border}` }}>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{doc.documentType}</div>
                      <div style={{ fontSize: '0.78rem', color: color.inkMuted }}>{doc.fileName}</div>
                      <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>
                        Status: <strong>{doc.verificationStatus}</strong>
                      </div>
                      {doc.verificationStatus !== 'VERIFIED' && (
                        <button
                          onClick={() => handleVerifyDoc(doc.id)}
                          style={{
                            marginTop: '8px',
                            padding: '4px 10px',
                            background: '#16A34A',
                            color: '#fff',
                            border: 'none',
                            borderRadius: radius.sm,
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          Verify Document
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default Operations;
