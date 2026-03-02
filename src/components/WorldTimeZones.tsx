interface WorldTimeZonesProps {
  currentTime: Date
}

interface TimeZone {
  city: string
  timezone: string
  label: string
}

const timeZones: TimeZone[] = [
  { city: 'New York', timezone: 'America/New_York', label: 'NYC' },
  { city: 'London', timezone: 'Europe/London', label: 'LON' },
  { city: 'Tokyo', timezone: 'Asia/Tokyo', label: 'TYO' },
  { city: 'Sydney', timezone: 'Australia/Sydney', label: 'SYD' },
  { city: 'Dubai', timezone: 'Asia/Dubai', label: 'DXB' },
  { city: 'Los Angeles', timezone: 'America/Los_Angeles', label: 'LAX' },
]

export default function WorldTimeZones({ currentTime }: WorldTimeZonesProps) {
  const getTimeInZone = (timezone: string) => {
    return currentTime.toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }

  const isDayTime = (timezone: string) => {
    const hour = parseInt(
      currentTime.toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        hour12: false,
      })
    )
    return hour >= 6 && hour < 18
  }

  return (
    <div className="monitor-card rounded-lg p-4 md:p-6">
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse" />
        <h2 className="font-display text-sm md:text-base tracking-[0.15em] uppercase text-[#ff6b35]">
          Global Time Index
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {timeZones.map((tz, index) => (
          <div
            key={tz.city}
            className="bg-[#0a0a0f]/50 border border-[#ff6b35]/10 rounded p-3 md:p-4 text-center animate-fadeInUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  isDayTime(tz.timezone)
                    ? 'bg-[#ffd700] shadow-[0_0_6px_#ffd700]'
                    : 'bg-[#4a5568]'
                }`}
              />
              <span className="font-mono text-[10px] md:text-xs text-[#e8dcc4]/50 tracking-wider">
                {tz.label}
              </span>
            </div>
            <div className="font-display text-lg md:text-xl lg:text-2xl text-[#e8dcc4] tracking-wider flicker">
              {getTimeInZone(tz.timezone)}
            </div>
            <div className="font-mono text-[9px] md:text-[10px] text-[#ff6b35]/60 mt-1 truncate">
              {tz.city}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
