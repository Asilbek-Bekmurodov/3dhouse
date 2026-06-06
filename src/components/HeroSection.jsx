import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { motion } from 'framer-motion'
import HouseModel from './HouseModel'
import CameraControls from './CameraControls'

const VIEW_BUTTONS = [
  { key: 'front', label: 'Front' },
  { key: 'side',  label: 'Side'  },
  { key: 'top',   label: 'Top'   },
  { key: 'close', label: 'Close' },
]

export default function HeroSection() {
  const camRef = useRef()

  function handleView(key) {
    camRef.current?.goToView(key)
  }

  return (
    <section
      id="3d-model"
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        padding: '0 60px',
        gap: 40,
        background: 'radial-gradient(ellipse at 65% 50%, #0a2a3d 0%, var(--bg) 65%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage:
          'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(0,212,255,0.025) 61px),' +
          'repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(0,212,255,0.025) 61px)',
      }} />

      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ zIndex: 1 }}
      >
        <div className="section-tag">▶ Smart 3D Visualization</div>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 16 }}>
          Zamonaviy<br />
          <span style={{ color: 'var(--cyan)' }}>Uy Maketi</span><br />
          3D da
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 32, maxWidth: 380 }}>
          Interaktiv 3D model orqali uyni hamma tomondan ko'ring.
          Real-time vizualizatsiya bilan har bir detalini kashf eting.
        </p>
        <div style={{ display: 'flex', gap: 16 }}>
          <button
            style={{
              background: 'var(--cyan)', color: 'var(--bg)',
              border: 'none', padding: '14px 32px',
              fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase',
            }}
            onClick={() => document.getElementById('aloqa')?.scrollIntoView({ behavior: 'smooth' })}
          >
            3D da Ko'rish
          </button>
          <button
            style={{
              background: 'transparent', border: '1px solid var(--cyan)',
              color: 'var(--cyan)', padding: '14px 32px',
              fontSize: 12, letterSpacing: 2, textTransform: 'uppercase',
            }}
            onClick={() => document.getElementById('xususiyatlar')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Batafsil →
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{
          height: 520, position: 'relative', zIndex: 1,
          border: '1px solid rgba(0,212,255,0.12)',
        }}
      >
        <div style={{
          position: 'absolute', top: 10, right: 12, zIndex: 10,
          fontSize: 10, letterSpacing: 2, color: 'rgba(0,212,255,0.4)', textTransform: 'uppercase',
        }}>
          ⟳ Drag to Rotate
        </div>

        <Canvas camera={{ position: [0, 2, 8], fov: 45 }} shadows>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
          <pointLight position={[-5, 3, -5]} color="#00d4ff" intensity={0.5} />
          <Environment preset="night" />
          <ContactShadows
            position={[0, -1.05, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            color="#00d4ff"
          />
          <HouseModel />
          <CameraControls ref={camRef} />
        </Canvas>

        <div style={{
          position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 8, zIndex: 10,
        }}>
          {VIEW_BUTTONS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleView(key)}
              style={{
                background: 'rgba(0,212,255,0.1)',
                border: '1px solid rgba(0,212,255,0.35)',
                color: 'var(--cyan)',
                fontSize: 10, letterSpacing: 1.5,
                padding: '5px 14px', textTransform: 'uppercase',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
