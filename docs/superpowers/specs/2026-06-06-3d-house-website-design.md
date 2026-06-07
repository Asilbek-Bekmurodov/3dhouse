# 3D Uy Maketi Web Sayt — Design Spec

**Sana:** 2026-06-06  
**Texnologiyalar:** React + react-three-fiber + @react-three/drei + Framer Motion  
**Model fayl:** `04 Residential Buildings Set Cycles Version.glb`

---

## 1. Umumiy Ko'rinish

Ko'k-neon (Tech/Futuristic) uslubidagi bir sahifali web ilovasi. Foydalanuvchi brauzerda interaktiv 3D uy modelini ko'radi, aylantiradi, kamera nuqtalarini o'zgartiradi.

**Fon:** `#050a0f` (qora-ko'k)  
**Asosiy rang:** `#00d4ff` (neon cyan)  
**Matn:** `#e0e8ff` (oq-ko'k)  
**Ikkilamchi matn:** `#8899aa`

---

## 2. Sahifa Strukturasi

### 2.1 HUD Loader
- Sahifa ochilganda to'liq ekran loader
- Animatsion progress bar va terminal-style qatorlar (`▶ Loading 3D assets... 72%`)
- `useProgress` hook (drei) orqali haqiqiy yuklash foizi
- Yuklash tugagach fade-out animatsiya (Framer Motion)

### 2.2 Navbar
- `position: sticky`, `backdrop-filter: blur`
- Logo + navigatsiya linklari (3D Model, Xususiyatlar, Aloqa)
- "Ko'rib chiqish" CTA tugmasi
- Scroll bo'lganda border intensivligi oshadi

### 2.3 Hero Section (100vh)
- **Chap:** Sarlavha matn, tavsif, 2 ta tugma
- **O'ng:** Three.js canvas (`<Canvas>`)
  - GLB model: `useGLTF('/*.glb')`
  - Auto-rotate (OrbitControls `autoRotate`)
  - Foydalanuvchi drag qilganda auto-rotate to'xtaydi
  - 4 ta kamera tugmasi: Front / Side / Top / Close-up (Three.js lerp bilan smooth transition, qo'shimcha kutubxona yo'q)
  - Grid fon (CSS repeating-linear-gradient)
  - `Environment` (drei) — ambient yoritish
  - `"DRAG TO ROTATE"` hint matni

### 2.4 Stats Strip
- 4 ta raqam: 4 xona · 250 m² · 2 qavat · 360° (statik ma'lumotlar, hardcoded)
- Grid layout, har biri `border-right` bilan ajratilgan
- Raqamlar scroll animatsiyasi (Framer Motion `useInView` — alohida kutubxona kerak emas)

### 2.5 Features Section
- 3 ta karta: Arxitektura · Smart Home · 3D Vizualizatsiya
- Har bir kartada icon, sarlavha, tavsif, `→ Batafsil` link (funksional emas, `href="#"` anchor)
- Hover effekti: border `rgba(0,212,255,0.4)` ga o'tadi

### 2.6 Contact Section
- Ikki ustunli: chap — forma, o'ng — kontakt ma'lumotlari
- Forma maydonlari: Ism, Telefon, Xabar, Yuborish tugmasi
- `onSubmit` — hozircha `console.log` (backend yo'q)

### 2.7 Footer
- Logo + copyright, minimal

---

## 3. Texnik Arxitektura

```
src/
  components/
    Navbar.jsx
    HudLoader.jsx
    HeroSection.jsx
    HouseModel.jsx        ← useGLTF + OrbitControls
    CameraControls.jsx    ← 4 view tugmalari
    StatsSection.jsx
    FeaturesSection.jsx
    ContactSection.jsx
    Footer.jsx
  App.jsx                 ← Suspense wrapper + Canvas
  main.jsx
  index.css               ← global styles, CSS vars
```

### Asosiy kutubxonalar
| Kutubxona | Versiya | Maqsad |
|---|---|---|
| `react` | ^18 | UI framework |
| `three` | ^0.165 | 3D engine |
| `@react-three/fiber` | ^8 | React + Three.js |
| `@react-three/drei` | ^9 | OrbitControls, useGLTF, Environment |
| `framer-motion` | ^11 | HUD loader, fade-in animatsiyalar |
| `vite` | ^5 | Build tool |

### GLB Yuklash
```jsx
// HouseModel.jsx
const { scene } = useGLTF('/04 Residential Buildings Set Cycles Version.glb')
return <primitive object={scene} scale={0.01} />
```

### Kamera View Tizimi
- Har bir view uchun `{ position: [x,y,z], target: [x,y,z] }` ob'ekt
- `useRef` orqali `OrbitControls` ga yetish
- `lerp` yoki GSAP bilan smooth transition

---

## 4. Fayllar

- `index.html` — Vite entry
- `public/` — GLB fayl shu yerga ko'chiriladi
- `.gitignore` — `.superpowers/` qo'shiladi

---

## 5. Scope Chegaralari

**Kiradi:** Yuqoridagi barcha bo'limlar, responsive (≥768px), basic accessibility  
**Kirmaydi:** Backend, autentifikatsiya, to'lov tizimi, mobile-first responsive (<768px), i18n
