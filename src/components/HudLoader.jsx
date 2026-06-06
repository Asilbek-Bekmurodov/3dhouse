import { useProgress } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'

const LINES = [
  { label: 'Initializing render engine', key: 'engine' },
  { label: 'Loading 3D model assets',    key: 'assets' },
  { label: 'Building scene graph',       key: 'scene'  },
  { label: 'Calibrating lighting',       key: 'light'  },
]

export default function HudLoader() {
  const { progress, active } = useProgress()
  const pct = Math.round(progress)

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'var(--bg)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 24,
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            style={{
              width: 64, height: 64,
              border: '2px solid rgba(0,212,255,0.15)',
              borderTop: '2px solid var(--cyan)',
              borderRadius: '50%',
            }}
          />

          <div style={{ fontFamily: 'monospace', fontSize: 12, color: 'rgba(0,212,255,0.7)', lineHeight: 2 }}>
            {LINES.map((line, i) => {
              const threshold = (i / LINES.length) * 100
              const done = pct >= threshold + 25
              const loading = pct >= threshold && !done
              return (
                <div key={line.key}>
                  {'▶ '}{line.label}{'... '}
                  {done    && <span style={{ color: '#00ff88' }}>DONE</span>}
                  {loading && <span style={{ color: '#ffcc00' }}>{pct}%</span>}
                  {!done && !loading && <span style={{ color: 'rgba(255,255,255,0.2)' }}>pending</span>}
                </div>
              )
            })}
          </div>

          <div style={{ width: 240, height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 1 }}>
            <motion.div
              style={{
                height: '100%', borderRadius: 1,
                background: 'linear-gradient(90deg, #0088cc, var(--cyan))',
                boxShadow: '0 0 8px var(--cyan)',
              }}
              animate={{ width: `${Math.min(100, pct)}%` }}
              transition={{ ease: 'linear', duration: 0.2 }}
            />
          </div>

          <div style={{ fontSize: 11, letterSpacing: 3, color: 'rgba(0,212,255,0.4)', textTransform: 'uppercase' }}>
            {pct}% loaded
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
