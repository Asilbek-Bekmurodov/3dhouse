import { Suspense } from 'react'
import HudLoader from './components/HudLoader'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StatsSection from './components/StatsSection'
import FeaturesSection from './components/FeaturesSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

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
