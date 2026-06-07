import { Suspense, useState } from 'react'
import HudLoader from './components/HudLoader'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StatsSection from './components/StatsSection'
import FeaturesSection from './components/FeaturesSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import ModelPage from './components/ModelPage'

export default function App() {
  const [showModel, setShowModel] = useState(false)

  if (showModel) {
    return (
      <Suspense fallback={null}>
        <ModelPage onBack={() => setShowModel(false)} />
      </Suspense>
    )
  }

  return (
    <>
      <HudLoader />
      <Navbar />
      <main>
        <HeroSection onViewModel={() => setShowModel(true)} />
        <StatsSection />
        <FeaturesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
