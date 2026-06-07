# 3D Uy Maketi Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** React + react-three-fiber bilan ko'k-neon tech uslubida interaktiv 3D uy maketi ko'rsatuvchi bir sahifali web ilovani yaratish.

**Architecture:** Vite + React 18 loyihasi. Three.js sahna react-three-fiber `<Canvas>` ichida deklarativ komponentlar orqali boshqariladi. HUD loader `useProgress` (drei) bilan haqiqiy yuklash foizini kuzatadi. Kamera transitioni `useFrame` loop ichida lerp orqali amalga oshiriladi.

**Tech Stack:** React 18, Vite 5, three, @react-three/fiber, @react-three/drei, framer-motion

---

## File Structure

```
/Users/asilbekbekmurodov/Desktop/3d project/
├── public/
│   └── house.glb                        ← GLB fayl ko'chiriladi (spaces olib tashlanadi)
├── src/
│   ├── components/
│   │   ├── HudLoader.jsx                ← useProgress + terminal animatsiya
│   │   ├── Navbar.jsx                   ← sticky nav, blur backdrop
│   │   ├── HeroSection.jsx              ← chap matn + o'ng Canvas
│   │   ├── HouseModel.jsx               ← useGLTF + primitive
│   │   ├── CameraControls.jsx           ← OrbitControls ref + 4 view tugmalar
│   │   ├── StatsSection.jsx             ← 4 stat karta, useInView animatsiya
│   │   ├── FeaturesSection.jsx          ← 3 feature karta
│   │   ├── ContactSection.jsx           ← forma + kontakt info
│   │   └── Footer.jsx                   ← logo + copyright
│   ├── App.jsx                          ← Suspense + komponentlar ketma-ketligi
│   ├── main.jsx                         ← ReactDOM render
│   └── index.css                        ← CSS o'zgaruvchilar, global reset
├── index.html
├── vite.config.js
└── package.json
```

---

## Task 1: Loyiha scaffold va dependencylarni o'rnatish

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`
- Copy: `public/house.glb`

- [ ] **Step 1: Vite + React loyiha yaratish**

```bash
cd "/Users/asilbekbekmurodov/Desktop/3d project"
npm create vite@latest . -- --template react
```

Savollarga javob: `y` (mavjud fayllarni o'chirish), framework: `React`, variant: `JavaScript`

- [ ] **Step 2: Dependencylarni o'rnatish**

```bash
npm install three @react-three/fiber @react-three/drei framer-motion
npm install -D vite
```

- [ ] **Step 3: GLB faylni public papkaga ko'chirish**

```bash
cp "/Users/asilbekbekmurodov/Desktop/3d project/04 Residential Buildings Set Cycles Version.glb" \
   "/Users/asilbekbekmurodov/Desktop/3d project/public/house.glb"
```

- [ ] **Step 4: `vite.config.js` ni tekshirish** — default config yetarli:

```js
import { defineConfig } from 'vite'
import { react } from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

- [ ] **Step 5: Dev server ishga tushirish va brauzerda tekshirish**

```bash
npm run dev
```

`http://localhost:5173` da Vite default sahifa ochilishi kerak.

- [ ] **Step 6: Commit**

```bash
git init
git add package.json vite.config.js index.html src/main.jsx
git commit -m "feat: scaffold vite react project with r3f deps"
```

---

## Task 2: Global stillar va CSS o'zgaruvchilar

**Files:**
- Modify: `src/index.css`
- Modify: `src/main.jsx`

- [ ] **Step 1: `src/index.css` ni to'liq quyidagi kontent bilan almashtirish**

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --bg: #050a0f;
  --bg-2: #0a1520;
  --cyan: #00d4ff;
  --cyan-dim: rgba(0, 212, 255, 0.15);
  --cyan-mid: rgba(0, 212, 255, 0.3);
  --text: #e0e8ff;
  --text-muted: #8899aa;
  --border: rgba(0, 212, 255, 0.12);
}

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Segoe UI', system-ui, sans-serif;
  overflow-x: hidden;
}

button { font-family: inherit; cursor: pointer; }
a { text-decoration: none; color: inherit; }

.section-tag {
  font-size: 11px;
  letter-spacing: 4px;
  color: var(--cyan);
  text-transform: uppercase;
  margin-bottom: 12px;
}

.section-heading {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  line-height: 1.15;
  margin-bottom: 48px;
}
```

- [ ] **Step 2: `src/main.jsx` ni tekshirish** — `index.css` import qilinganini tasdiqlang:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 3: Commit**

```bash
git add src/index.css src/main.jsx
git commit -m "feat: add global css variables and reset"
```

---

## Task 3: HudLoader komponenti

**Files:**
- Create: `src/components/HudLoader.jsx`

- [ ] **Step 1: `src/components/` papkasini yaratish**

```bash
mkdir -p "/Users/asilbekbekmurodov/Desktop/3d project/src/components"
```

- [ ] **Step 2: `src/components/HudLoader.jsx` yaratish**

```jsx
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
          {/* Spinner */}
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

          {/* Terminal lines */}
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

          {/* Progress bar */}
          <div style={{ width: 240, height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 1 }}>
            <motion.div
              style={{
                height: '100%', borderRadius: 1,
                background: 'linear-gradient(90deg, #0088cc, var(--cyan))',
                boxShadow: '0 0 8px var(--cyan)',
              }}
              animate={{ width: `${pct}%` }}
              transition={{ ease: 'linear' }}
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
```

- [ ] **Step 3: Commit**

```bash
git add src/components/HudLoader.jsx
git commit -m "feat: add hud loader with useProgress and framer-motion"
```

---

## Task 4: Navbar komponenti

**Files:**
- Create: `src/components/Navbar.jsx`

- [ ] **Step 1: `src/components/Navbar.jsx` yaratish**

```jsx
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
            href={`#${link.toLowerCase().replace(' ', '-')}`}
            style={{ fontSize: 12, letterSpacing: 1.5, color: 'var(--text-muted)', textTransform: 'uppercase' }}
            onMouseEnter={e => (e.target.style.color = 'var(--cyan)')}
            onMouseLeave={e => (e.target.style.color = 'var(--text-muted)')}
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: add sticky navbar with scroll border effect"
```

---

## Task 5: HouseModel va CameraControls

**Files:**
- Create: `src/components/HouseModel.jsx`
- Create: `src/components/CameraControls.jsx`

- [ ] **Step 1: `src/components/HouseModel.jsx` yaratish**

```jsx
import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'

export default function HouseModel() {
  const { scene } = useGLTF('/house.glb')

  useEffect(() => {
    scene.traverse(obj => {
      if (obj.isMesh) {
        obj.castShadow = true
        obj.receiveShadow = true
        // Materialga emissive qo'shish (neon ko'rinish uchun)
        if (obj.material) {
          obj.material.envMapIntensity = 1.5
        }
      }
    })
  }, [scene])

  return <primitive object={scene} scale={0.008} position={[0, -1, 0]} />
}

useGLTF.preload('/house.glb')
```

- [ ] **Step 2: `src/components/CameraControls.jsx` yaratish**

```jsx
import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const VIEWS = {
  front:  { position: new THREE.Vector3(0, 2, 8),   target: new THREE.Vector3(0, 0, 0) },
  side:   { position: new THREE.Vector3(8, 2, 0),   target: new THREE.Vector3(0, 0, 0) },
  top:    { position: new THREE.Vector3(0, 12, 0),  target: new THREE.Vector3(0, 0, 0) },
  close:  { position: new THREE.Vector3(3, 1.5, 4), target: new THREE.Vector3(0, 1, 0) },
}

// controlsRef tashqaridan lerpView chaqirish uchun export qilinadi
const CameraControls = forwardRef(function CameraControls(_, ref) {
  const controlsRef = useRef()
  const { camera } = useThree()
  const lerpTarget = useRef(null)

  useImperativeHandle(ref, () => ({
    goToView(name) {
      lerpTarget.current = VIEWS[name]
      if (controlsRef.current) controlsRef.current.autoRotate = false
    },
  }))

  useFrame(() => {
    if (!lerpTarget.current || !controlsRef.current) return
    camera.position.lerp(lerpTarget.current.position, 0.06)
    controlsRef.current.target.lerp(lerpTarget.current.target, 0.06)
    controlsRef.current.update()

    const dist = camera.position.distanceTo(lerpTarget.current.position)
    if (dist < 0.05) lerpTarget.current = null
  })

  return (
    <OrbitControls
      ref={controlsRef}
      autoRotate
      autoRotateSpeed={0.6}
      enableDamping
      dampingFactor={0.05}
      minDistance={3}
      maxDistance={20}
      onStart={() => {
        if (controlsRef.current) controlsRef.current.autoRotate = false
      }}
    />
  )
})

export { VIEWS }
export default CameraControls
```

- [ ] **Step 3: Commit**

```bash
git add src/components/HouseModel.jsx src/components/CameraControls.jsx
git commit -m "feat: add house model loader and camera controls with lerp"
```

---

## Task 6: HeroSection

**Files:**
- Create: `src/components/HeroSection.jsx`

- [ ] **Step 1: `src/components/HeroSection.jsx` yaratish**

```jsx
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
  const activeView = useRef('front')

  function handleView(key) {
    activeView.current = key
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
      {/* Grid fon effekti */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage:
          'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(0,212,255,0.025) 61px),' +
          'repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(0,212,255,0.025) 61px)',
      }} />

      {/* Chap: Matn */}
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

      {/* O'ng: 3D Canvas */}
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

        {/* Kamera tugmalari */}
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HeroSection.jsx
git commit -m "feat: add hero section with canvas and camera view buttons"
```

---

## Task 7: StatsSection

**Files:**
- Create: `src/components/StatsSection.jsx`

- [ ] **Step 1: `src/components/StatsSection.jsx` yaratish**

```jsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { number: 4,   unit: ' xona', label: 'Yotoq xonalar' },
  { number: 250, unit: ' m²',   label: 'Umumiy maydon' },
  { number: 2,   unit: ' qavat',label: 'Qavatlar soni' },
  { number: 360, unit: '°',     label: '3D Ko\'rinish'  },
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/StatsSection.jsx
git commit -m "feat: add stats section with framer-motion scroll reveal"
```

---

## Task 8: FeaturesSection

**Files:**
- Create: `src/components/FeaturesSection.jsx`

- [ ] **Step 1: `src/components/FeaturesSection.jsx` yaratish**

```jsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FEATURES = [
  {
    icon: '🏠',
    title: 'Zamonaviy Arxitektura',
    desc: 'Minimalist va funksional dizayn, har bir detalda mukammallik. Premium materiallar va innovatsion echimlar.',
  },
  {
    icon: '⚡',
    title: 'Smart Home Tizimi',
    desc: 'Aqlli yoritish, harorat boshqaruvi va xavfsizlik tizimlari. Telefoningizdan nazorat qiling.',
  },
  {
    icon: '🔮',
    title: '360° 3D Vizualizatsiya',
    desc: 'Har burchakdan interaktiv ko\'rish, zoom, rotate, kamera nuqtalari. Real hayotdek tajriba.',
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FeaturesSection.jsx
git commit -m "feat: add features section with hover effects"
```

---

## Task 9: ContactSection va Footer

**Files:**
- Create: `src/components/ContactSection.jsx`
- Create: `src/components/Footer.jsx`

- [ ] **Step 1: `src/components/ContactSection.jsx` yaratish**

```jsx
import { useState } from 'react'

const inputStyle = {
  width: '100%',
  background: 'rgba(0,212,255,0.05)',
  border: '1px solid rgba(0,212,255,0.2)',
  color: 'var(--text)',
  padding: '12px 16px',
  fontSize: 14,
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s',
}

const labelStyle = {
  display: 'block',
  fontSize: 10,
  letterSpacing: 2,
  color: 'var(--cyan)',
  textTransform: 'uppercase',
  marginBottom: 8,
}

export default function ContactSection() {
  const [form, setForm] = useState({ ism: '', telefon: '', xabar: '' })
  const [sent, setSent] = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log('Form yuborildi:', form)
    setSent(true)
    setForm({ ism: '', telefon: '', xabar: '' })
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section
      id="aloqa"
      style={{
        padding: '80px 60px',
        background: 'rgba(0,212,255,0.015)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="section-tag">▶ Aloqa</div>
      <h2 className="section-heading">Biz bilan<br />bog'laning</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
        {/* Forma */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Ismingiz</label>
            <input
              name="ism" value={form.ism} onChange={handleChange}
              required placeholder="To'liq ismingiz"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'var(--cyan)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(0,212,255,0.2)')}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Telefon</label>
            <input
              name="telefon" value={form.telefon} onChange={handleChange}
              required placeholder="+998 90 000 00 00"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'var(--cyan)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(0,212,255,0.2)')}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Xabar</label>
            <textarea
              name="xabar" value={form.xabar} onChange={handleChange}
              required placeholder="Qiziqishingiz haqida yozing..."
              rows={5}
              style={{ ...inputStyle, resize: 'none' }}
              onFocus={e => (e.target.style.borderColor = 'var(--cyan)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(0,212,255,0.2)')}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%', background: 'var(--cyan)', color: 'var(--bg)',
              border: 'none', padding: '14px 0',
              fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase',
            }}
          >
            {sent ? '✓ Yuborildi' : 'Yuborish →'}
          </button>
        </form>

        {/* Kontakt info */}
        <div>
          {[
            { label: 'Manzil',  value: "Toshkent, O'zbekiston" },
            { label: 'Telefon', value: '+998 90 000 00 00' },
            { label: 'Email',   value: 'info@nexushomes.uz' },
          ].map(item => (
            <div key={item.label} style={{ marginBottom: 28 }}>
              <div style={labelStyle}>{item.label}</div>
              <div style={{ fontSize: 15 }}>{item.value}</div>
            </div>
          ))}

          <div style={{
            marginTop: 8, padding: 24,
            border: '1px solid var(--border)',
            background: 'rgba(0,212,255,0.03)',
          }}>
            <div style={labelStyle}>Ish vaqti</div>
            <div style={{ fontSize: 14 }}>Dush – Juma: 09:00 – 18:00</div>
            <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 4 }}>Shanba: 10:00 – 15:00</div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: `src/components/Footer.jsx` yaratish**

```jsx
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
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ContactSection.jsx src/components/Footer.jsx
git commit -m "feat: add contact form and footer"
```

---

## Task 10: App.jsx ni yig'ish va ishga tushirish

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: `src/App.jsx` ni quyidagi kontent bilan almashtirish**

```jsx
import { Suspense } from 'react'
import { useProgress } from '@react-three/drei'
import Navbar from './components/Navbar'
import HudLoader from './components/HudLoader'
import HeroSection from './components/HeroSection'
import StatsSection from './components/StatsSection'
import FeaturesSection from './components/FeaturesSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

// HudLoader useProgress ishlatgani uchun Canvas ichida bo'lishi shart emas —
// useProgress global Suspense holatini kuzatadi
export default function App() {
  return (
    <>
      <HudLoader />
      <Navbar />
      <main>
        <Suspense fallback={null}>
          <HeroSection />
        </Suspense>
        <StatsSection />
        <FeaturesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Dev server ishga tushirish**

```bash
npm run dev
```

- [ ] **Step 3: Brauzerda tekshirish checklist**

  - [ ] HUD loader ko'rinadi va progress foiz o'sadi
  - [ ] 3D model yuklanadi va auto-rotate qiladi
  - [ ] Sichqoncha bilan drag qilganda auto-rotate to'xtaydi
  - [ ] Front / Side / Top / Close tugmalari kamera holatini smooth o'zgartiradi
  - [ ] Scroll qilganda Stats va Features animatsiyalari ishlaydi
  - [ ] Contact forma validatsiya va "Yuborildi" xabari ishlaydi
  - [ ] Navbar scroll qilganda border intensivligi oshadi

- [ ] **Step 4: Final commit**

```bash
git add src/App.jsx
git commit -m "feat: wire all components in App, complete 3d house website"
```

---

## Spec Coverage Tekshiruvi

| Spec talabi | Task |
|---|---|
| Ko'k-neon tech uslubi | Task 2 (CSS vars), barcha komponentlar |
| Hero + 3D Canvas (100vh) | Task 6 |
| Auto-rotate + OrbitControls | Task 5 (CameraControls) |
| 4 kamera nuqtasi tugmalari | Task 5 (CameraControls + HeroSection) |
| HUD loader (useProgress) | Task 3 |
| Stats strip (4 karta) | Task 7 |
| Features (3 karta, hover) | Task 8 |
| Contact forma + info | Task 9 |
| Footer | Task 9 |
| Navbar sticky + scroll effect | Task 4 |
| Lerp kamera transition | Task 5 |
| Framer Motion animatsiyalar | Task 3, 6, 7, 8 |
