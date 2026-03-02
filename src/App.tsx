import { useState, useEffect } from 'react'
import AnalogClock from './components/AnalogClock'
import WorldNews from './components/WorldNews'
import SpaceXTracker from './components/SpaceXTracker'
import WorldTimeZones from './components/WorldTimeZones'
import './styles.css'

function App() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e8dcc4] relative overflow-x-hidden">
      {/* Scan lines overlay */}
      <div className="scanlines pointer-events-none fixed inset-0 z-50" />

      {/* Noise texture overlay */}
      <div className="noise pointer-events-none fixed inset-0 z-40 opacity-[0.03]" />

      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#ff6b35] opacity-[0.03] blur-[150px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-[#ff6b35]/20 bg-[#0a0a0f]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-[#00ff88] rounded-full animate-pulse shadow-[0_0_10px_#00ff88]" />
              <h1 className="font-display text-xl md:text-2xl lg:text-3xl tracking-[0.2em] uppercase text-[#ff6b35]">
                Global Monitor
              </h1>
            </div>
            <div className="font-mono text-xs md:text-sm text-[#e8dcc4]/60 tracking-wider">
              SYSTEM STATUS: <span className="text-[#00ff88]">OPERATIONAL</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-6 md:py-8 lg:py-12">
        {/* Clock Section - Centerpiece */}
        <section className="mb-8 md:mb-12 lg:mb-16">
          <div className="text-center mb-4 md:mb-6">
            <p className="font-mono text-[10px] md:text-xs text-[#ff6b35]/60 tracking-[0.3em] uppercase mb-2">Universal Time Index</p>
            <div className="font-display text-3xl md:text-5xl lg:text-6xl tracking-wider text-[#e8dcc4]">
              {currentTime.toLocaleTimeString('en-US', { hour12: false })}
            </div>
            <p className="font-mono text-xs md:text-sm text-[#e8dcc4]/40 mt-2">
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <AnalogClock time={currentTime} />
        </section>

        {/* World Time Zones */}
        <section className="mb-8 md:mb-12 lg:mb-16">
          <WorldTimeZones currentTime={currentTime} />
        </section>

        {/* Two Column Layout for News and SpaceX */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <WorldNews />
          <SpaceXTracker />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#ff6b35]/10 py-4 md:py-6 mt-8 md:mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-mono text-[10px] md:text-xs text-[#e8dcc4]/30 tracking-wider">
            Requested by @web-user · Built by @clonkbot
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
