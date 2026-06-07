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

export default function ModelPage({ onBack }) {
  const camRef = useRef()

  function handleView(key) {
    camRef.current?.goToView(key)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#050a0f',
        zIndex: 1000,
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        borderBottom: '1px solid rgba(0,212,255,0.15)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        background: 'rgba(5,10,15,0.8)',
        backdropFilter: 'blur(10px)',
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            border: '1px solid rgba(0,212,255,0.4)',
            color: 'var(--cyan)',
            padding: '8px 20px',
            fontSize: 11,
            letterSpacing: 2,
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          ← Back
        </button>
        <div style={{ fontSize: 12, letterSpacing: 3, color: 'rgba(0,212,255,0.6)', textTransform: 'uppercase' }}>
          3D House Model
        </div>
        <div style={{ width: 80 }} />
      </div>

      <Canvas
        camera={{ position: [4, 2.5, 7], fov: 45 }}
        shadows
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[8, 12, 8]}  intensity={2.5} castShadow />
        <directionalLight position={[-8, 6, -4]} intensity={1.0} color="#c0d8ff" />
        <pointLight position={[0, 6, 0]} color="#00d4ff" intensity={1.5} />
        <Environment preset="warehouse" />
        <ContactShadows
          position={[0, -0.02, 0]}
          opacity={0.35}
          scale={10}
          blur={1.5}
          frames={1}
          color="#00d4ff"
        />
        <HouseModel />
        <CameraControls ref={camRef} />
      </Canvas>

      <div style={{
        position: 'absolute',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 8,
        zIndex: 10,
      }}>
        {VIEW_BUTTONS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleView(key)}
            style={{
              background: 'rgba(0,212,255,0.1)',
              border: '1px solid rgba(0,212,255,0.35)',
              color: 'var(--cyan)',
              fontSize: 11,
              letterSpacing: 2,
              padding: '8px 20px',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{
        position: 'absolute',
        top: 72,
        right: 24,
        fontSize: 10,
        letterSpacing: 2,
        color: 'rgba(0,212,255,0.4)',
        textTransform: 'uppercase',
        zIndex: 10,
      }}>
        ⟳ Drag to Rotate
      </div>
    </motion.div>
  )
}
