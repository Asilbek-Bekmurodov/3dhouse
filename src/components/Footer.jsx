export default function Footer() {
  return (
    <footer style={{
      padding: '24px 60px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: 3, color: 'var(--cyan)', textTransform: 'uppercase' }}>
        NEXUS HOMES
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
        © 2025 · 3D Visualization Platform
      </div>
    </footer>
  )
}
