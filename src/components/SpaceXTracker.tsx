import { useState } from 'react'

interface Mission {
  id: number
  name: string
  vehicle: string
  status: 'upcoming' | 'in-progress' | 'completed'
  launchDate: string
  details: string
  destination: string
}

interface Satellite {
  name: string
  count: number
  orbitalStatus: string
}

const missions: Mission[] = [
  {
    id: 1,
    name: 'Starlink Group 12-5',
    vehicle: 'Falcon 9',
    status: 'upcoming',
    launchDate: 'T-3d 14h 22m',
    details: 'Deployment of 23 Starlink V2 Mini satellites to low Earth orbit for global internet coverage expansion.',
    destination: 'LEO - 550km',
  },
  {
    id: 2,
    name: 'CRS-32 ISS Resupply',
    vehicle: 'Dragon 2',
    status: 'in-progress',
    launchDate: 'IN TRANSIT',
    details: 'Cargo resupply mission carrying scientific experiments, crew supplies, and station hardware to the ISS.',
    destination: 'ISS - 420km',
  },
  {
    id: 3,
    name: 'Starship Test Flight 7',
    vehicle: 'Starship',
    status: 'upcoming',
    launchDate: 'T-12d 08h',
    details: 'Full stack orbital test including booster catch attempt and Starship ocean landing demonstration.',
    destination: 'Sub-orbital',
  },
  {
    id: 4,
    name: 'USSF-44 National Security',
    vehicle: 'Falcon Heavy',
    status: 'completed',
    launchDate: 'MISSION SUCCESS',
    details: 'Classified payload delivery for U.S. Space Force to geosynchronous transfer orbit.',
    destination: 'GTO - 35,786km',
  },
]

const starlinkData: Satellite[] = [
  { name: 'Starlink V1', count: 1892, orbitalStatus: 'Operational' },
  { name: 'Starlink V1.5', count: 2341, orbitalStatus: 'Operational' },
  { name: 'Starlink V2 Mini', count: 847, orbitalStatus: 'Deploying' },
]

export default function SpaceXTracker() {
  const [selectedMission, setSelectedMission] = useState<number | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'text-[#00ff88] bg-[#00ff88]/10 border-[#00ff88]/30'
      case 'upcoming':
        return 'text-[#ffd700] bg-[#ffd700]/10 border-[#ffd700]/30'
      case 'completed':
        return 'text-[#4a9eff] bg-[#4a9eff]/10 border-[#4a9eff]/30'
      default:
        return 'text-[#e8dcc4]/60'
    }
  }

  const totalSatellites = starlinkData.reduce((sum, s) => sum + s.count, 0)

  return (
    <div className="monitor-card rounded-lg p-4 md:p-6 h-full">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#4a9eff] rounded-full animate-pulse" />
          <h2 className="font-display text-sm md:text-base tracking-[0.15em] uppercase text-[#ff6b35]">
            SpaceX Tracker
          </h2>
        </div>
        <span className="font-mono text-[9px] md:text-[10px] text-[#e8dcc4]/40 tracking-wider">
          MISSION CONTROL
        </span>
      </div>

      {/* Starlink Stats */}
      <div className="bg-[#0a0a0f]/50 border border-[#ff6b35]/10 rounded p-3 md:p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[9px] md:text-[10px] text-[#ff6b35] tracking-wider">
            STARLINK CONSTELLATION
          </span>
          <span className="font-display text-lg md:text-xl text-[#00ff88]">
            {totalSatellites.toLocaleString()}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {starlinkData.map((sat) => (
            <div key={sat.name} className="text-center">
              <div className="font-display text-sm md:text-base text-[#e8dcc4]">
                {sat.count.toLocaleString()}
              </div>
              <div className="font-mono text-[8px] md:text-[9px] text-[#e8dcc4]/40 truncate">
                {sat.name}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 h-1 bg-[#ff6b35]/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#ff6b35] to-[#00ff88] rounded-full"
            style={{ width: '73%' }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="font-mono text-[8px] text-[#e8dcc4]/30">DEPLOYMENT PROGRESS</span>
          <span className="font-mono text-[8px] text-[#00ff88]/70">73%</span>
        </div>
      </div>

      {/* Mission List */}
      <div className="space-y-3 max-h-[280px] md:max-h-[350px] overflow-y-auto pr-2">
        {missions.map((mission, index) => (
          <article
            key={mission.id}
            className="bg-[#0a0a0f]/50 border border-[#ff6b35]/10 rounded p-3 md:p-4 cursor-pointer hover:border-[#ff6b35]/30 transition-all duration-300 animate-fadeInUp"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => setSelectedMission(selectedMission === mission.id ? null : mission.id)}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-mono text-xs md:text-sm text-[#e8dcc4] truncate">
                  {mission.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-[9px] md:text-[10px] text-[#ff6b35]/70">
                    {mission.vehicle}
                  </span>
                  <span className="font-mono text-[9px] md:text-[10px] text-[#e8dcc4]/30">
                    → {mission.destination}
                  </span>
                </div>
              </div>
              <span className={`flex-shrink-0 font-mono text-[8px] md:text-[9px] px-2 py-1 rounded border ${getStatusColor(mission.status)}`}>
                {mission.status.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${mission.status === 'in-progress' ? 'bg-[#00ff88] animate-pulse' : 'bg-[#ffd700]/50'}`} />
              <span className="font-display text-xs md:text-sm text-[#e8dcc4]/80">
                {mission.launchDate}
              </span>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                selectedMission === mission.id ? 'max-h-32 opacity-100 mt-3' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="font-mono text-[10px] md:text-xs text-[#e8dcc4]/50 leading-relaxed">
                {mission.details}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-[#ff6b35]/10">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] md:text-[10px] text-[#e8dcc4]/30">
            BOCA CHICA, TX
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] md:text-[10px] text-[#e8dcc4]/30">
              26.0°N 97.2°W
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
