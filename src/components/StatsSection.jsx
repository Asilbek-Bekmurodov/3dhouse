import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { number: 4,   unit: ' xona',  label: 'Yotoq xonalar' },
  { number: 250, unit: ' m²',    label: 'Umumiy maydon' },
  { number: 2,   unit: ' qavat', label: 'Qavatlar soni' },
  { number: 360, unit: '°',      label: "3D Ko'rinish"  },
]

function StatCard({ number, unit, label, delay }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      style={{
        padding: '32px 24px', textAlign: 'center',
        borderRight: '1px solid var(--border)',
        background: 'rgba(0,212,255,0.03)',
      }}
    >
      <div style={{ fontSize: 44, fontWeight: 700, color: 'var(--cyan)', lineHeight: 1 }}>
        {inView ? number : 0}
        <span style={{ fontSize: 22, color: 'rgba(0,212,255,0.6)' }}>{unit}</span>
      </div>
      <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: 8 }}>
        {label}
      </div>
    </motion.div>
  )
}

export default function StatsSection() {
  return (
    <section style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
    }}>
      {STATS.map((s, i) => (
        <StatCard key={s.label} {...s} delay={i * 0.1} />
      ))}
    </section>
  )
}
