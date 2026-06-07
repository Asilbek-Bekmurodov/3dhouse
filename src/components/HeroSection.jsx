import { motion } from 'framer-motion'

export default function HeroSection({ onViewModel }) {
  return (
    <section
      id="3d-model"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 60px',
        background: 'radial-gradient(ellipse at 50% 50%, #0a2a3d 0%, var(--bg) 65%)',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage:
          'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(0,212,255,0.025) 61px),' +
          'repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(0,212,255,0.025) 61px)',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ zIndex: 1, maxWidth: 600 }}
      >
        <div className="section-tag">▶ Smart 3D Visualization</div>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 16 }}>
          Zamonaviy<br />
          <span style={{ color: 'var(--cyan)' }}>Uy Maketi</span><br />
          3D da
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 32, maxWidth: 380, margin: '0 auto 32px' }}>
          Interaktiv 3D model orqali uyni hamma tomondan ko'ring.
          Real-time vizualizatsiya bilan har bir detalini kashf eting.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <button
            style={{
              background: 'var(--cyan)', color: 'var(--bg)',
              border: 'none', padding: '14px 32px',
              fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase',
              cursor: 'pointer',
            }}
            onClick={onViewModel}
          >
            See Model
          </button>
          <button
            style={{
              background: 'transparent', border: '1px solid var(--cyan)',
              color: 'var(--cyan)', padding: '14px 32px',
              fontSize: 12, letterSpacing: 2, textTransform: 'uppercase',
              cursor: 'pointer',
            }}
            onClick={() => document.getElementById('xususiyatlar')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Batafsil →
          </button>
        </div>
      </motion.div>
    </section>
  )
}
