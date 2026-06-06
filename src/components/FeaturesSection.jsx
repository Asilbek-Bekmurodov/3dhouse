import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FEATURES = [
  {
    icon: '🏠',
    title: 'Zamonaviy Arxitektura',
    desc: "Minimalist va funksional dizayn, har bir detalda mukammallik. Premium materiallar va innovatsion echimlar.",
  },
  {
    icon: '⚡',
    title: 'Smart Home Tizimi',
    desc: "Aqlli yoritish, harorat boshqaruvi va xavfsizlik tizimlari. Telefoningizdan nazorat qiling.",
  },
  {
    icon: '🔮',
    title: '360° 3D Vizualizatsiya',
    desc: "Har burchakdan interaktiv ko'rish, zoom, rotate, kamera nuqtalari. Real hayotdek tajriba.",
  },
]

function FeatureCard({ icon, title, desc, delay }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      style={{
        padding: 28,
        border: '1px solid var(--border)',
        background: 'rgba(0,212,255,0.02)',
        transition: 'border-color 0.3s',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      <div style={{ fontSize: 30, marginBottom: 16 }}>{icon}</div>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{title}</h3>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>{desc}</p>
      <a
        href="#"
        style={{ display: 'inline-block', marginTop: 16, fontSize: 11, letterSpacing: 2, color: 'var(--cyan)', textTransform: 'uppercase' }}
      >
        → Batafsil
      </a>
    </motion.div>
  )
}

export default function FeaturesSection() {
  return (
    <section id="xususiyatlar" style={{ padding: '80px 60px' }}>
      <div className="section-tag">▶ Xususiyatlar</div>
      <h2 className="section-heading">Uyning asosiy<br />imkoniyatlari</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.title} {...f} delay={i * 0.12} />
        ))}
      </div>
    </section>
  )
}
