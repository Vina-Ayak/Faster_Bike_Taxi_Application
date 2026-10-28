// Shared design tokens — Fleet Ops visual system
export const color = {
  ink: '#101828',
  inkMuted: '#475467',
  inkFaint: '#98A2B3',
  surface: '#FFFFFF',
  surfaceSunken: '#F7F8FA',
  surfaceRaised: '#0B1220',
  border: '#E4E7EC',
  borderStrong: '#D0D5DD',
  navy: '#0B1220',
  navySoft: '#1D2939',
  amber: '#B65C00',
  amberSoft: '#FFF2E4',
  success: '#0F6E3D',
  successSoft: '#E5F5EC',
  danger: '#B3261E',
  dangerSoft: '#FBEAE9',
  pending: '#8A5B00',
  pendingSoft: '#FFF4DC',
};

export const font = {
  display: '"IBM Plex Sans", "Segoe UI", sans-serif',
  body: '"Inter", "Segoe UI", sans-serif',
  mono: '"IBM Plex Mono", monospace',
};

export const shadow = {
  card: '0 1px 2px rgba(16,24,40,0.06), 0 1px 3px rgba(16,24,40,0.08)',
};

export const radius = { sm: '4px', md: '6px', lg: '10px' };

export const fontImports = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
`;

export const inputStyle = {
  padding: '10px 12px',
  fontSize: '0.9rem',
  fontFamily: font.body,
  border: `1px solid ${color.border}`,
  borderRadius: radius.sm,
  color: color.ink,
  outline: 'none',
  background: color.surface,
};

export const labelStyle = {
  fontSize: '0.8rem',
  fontWeight: 600,
  color: color.inkMuted,
  marginBottom: '6px',
};

export const primaryButton = {
  padding: '10px 18px',
  fontSize: '0.875rem',
  fontWeight: 600,
  fontFamily: font.body,
  backgroundColor: color.navy,
  color: '#fff',
  border: 'none',
  borderRadius: radius.sm,
  cursor: 'pointer',
};

export const secondaryButton = {
  padding: '10px 18px',
  fontSize: '0.875rem',
  fontWeight: 600,
  fontFamily: font.body,
  backgroundColor: 'transparent',
  color: color.ink,
  border: `1px solid ${color.borderStrong}`,
  borderRadius: radius.sm,
  cursor: 'pointer',
};

export const pageShell = {
  fontFamily: font.body,
  color: color.ink,
  backgroundColor: color.surfaceSunken,
  minHeight: '100vh',
};

export const statusStyles = (status) => {
  const map = {
    APPROVED: { bg: color.successSoft, fg: color.success },
    REJECTED: { bg: color.dangerSoft, fg: color.danger },
  };
  const s = map[status] || { bg: color.pendingSoft, fg: color.pending };
  return {
    padding: '3px 10px',
    borderRadius: '100px',
    backgroundColor: s.bg,
    color: s.fg,
    fontWeight: 600,
    fontSize: '0.75rem',
    fontFamily: font.body,
    letterSpacing: '0.01em',
  };
};
