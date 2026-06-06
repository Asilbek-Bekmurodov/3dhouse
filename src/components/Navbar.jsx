import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 60px',
      background: 'rgba(5,10,15,0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: scrolled
        ? '1px solid rgba(0,212,255,0.25)'
        : '1px solid rgba(0,212,255,0.08)',
      transition: 'border-color 0.3s',
    }}>
      <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: 3, color: 'var(--cyan)', textTransform: 'uppercase' }}>
        NEXUS <span style={{ color: 'var(--text)' }}>HOMES</span>
      </div>

      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        {['3D Model', 'Xususiyatlar', 'Aloqa'].map(link => (
          <a
            key={link}
            href={`#${link.toLowerCase().replaceAll(' ', '-')}`}
            style={{ fontSize: 12, letterSpacing: 1.5, color: 'var(--text-muted)', textTransform: 'uppercase' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--cyan)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            {link}
          </a>
        ))}
        <button
          style={{
            background: 'transparent',
            border: '1px solid var(--cyan)',
            color: 'var(--cyan)',
            padding: '8px 20px',
            fontSize: 11,
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
          onClick={() => document.getElementById('aloqa')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Ko'rib Chiqish
        </button>
      </div>
    </nav>
  )
}
