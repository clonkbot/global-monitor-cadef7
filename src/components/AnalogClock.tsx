import { useEffect, useRef } from 'react'

interface AnalogClockProps {
  time: Date
}

export default function AnalogClock({ time }: AnalogClockProps) {
  const secondsRef = useRef<HTMLDivElement>(null)

  const hours = time.getHours() % 12
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()
  const milliseconds = time.getMilliseconds()

  // Smooth calculations
  const secondDegrees = (seconds + milliseconds / 1000) * 6
  const minuteDegrees = (minutes + seconds / 60) * 6
  const hourDegrees = (hours + minutes / 60) * 30

  useEffect(() => {
    if (secondsRef.current) {
      secondsRef.current.style.transform = `rotate(${secondDegrees}deg)`
    }
  }, [secondDegrees])

  const hourMarkers = Array.from({ length: 12 }, (_, i) => i)
  const minuteMarkers = Array.from({ length: 60 }, (_, i) => i)

  return (
    <div className="flex justify-center">
      <div className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] lg:w-[450px] lg:h-[450px]">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ff6b35]/20 to-transparent blur-xl" />

        {/* Clock face background */}
        <div className="absolute inset-2 md:inset-4 rounded-full bg-[#0d0d12] border-2 border-[#ff6b35]/30 shadow-[inset_0_0_60px_rgba(0,0,0,0.8)]">
          {/* Inner circle decoration */}
          <div className="absolute inset-4 md:inset-6 rounded-full border border-[#ff6b35]/10" />
          <div className="absolute inset-8 md:inset-12 rounded-full border border-[#ff6b35]/5" />

          {/* Minute markers */}
          {minuteMarkers.map((i) => {
            const isHour = i % 5 === 0
            if (isHour) return null
            return (
              <div
                key={`minute-${i}`}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ transform: `rotate(${i * 6}deg)` }}
              >
                <div
                  className="w-[1px] h-1 md:h-1.5 bg-[#ff6b35]/30"
                  style={{
                    transform: 'translateY(-115px)',
                  }}
                />
              </div>
            )
          })}

          {/* Hour markers */}
          {hourMarkers.map((i) => (
            <div
              key={`hour-${i}`}
              className="absolute top-1/2 left-1/2"
              style={{ transform: `rotate(${i * 30}deg) translateX(-50%) translateY(-50%)` }}
            >
              <div
                className="w-[2px] md:w-[3px] h-3 md:h-4 bg-[#ff6b35] shadow-[0_0_8px_rgba(255,107,53,0.6)]"
                style={{
                  transform: 'translateY(-105px) md:translateY(-155px)',
                  marginTop: '-130px',
                }}
              />
            </div>
          ))}

          {/* Hour numbers */}
          {[12, 3, 6, 9].map((num) => {
            const positions: Record<number, string> = {
              12: 'top-6 md:top-8 left-1/2 -translate-x-1/2',
              3: 'top-1/2 right-5 md:right-7 -translate-y-1/2',
              6: 'bottom-6 md:bottom-8 left-1/2 -translate-x-1/2',
              9: 'top-1/2 left-5 md:left-7 -translate-y-1/2',
            }
            return (
              <span
                key={num}
                className={`absolute font-display text-lg md:text-xl lg:text-2xl text-[#ff6b35] ${positions[num]}`}
              >
                {num}
              </span>
            )
          })}

          {/* Hour hand */}
          <div
            className="absolute top-1/2 left-1/2 w-2 md:w-2.5 origin-bottom transition-transform duration-200"
            style={{
              transform: `translateX(-50%) translateY(-100%) rotate(${hourDegrees}deg)`,
              height: '60px',
            }}
          >
            <div className="w-full h-full bg-gradient-to-t from-[#ff6b35] to-[#ff8c5a] rounded-full shadow-[0_0_10px_rgba(255,107,53,0.8)]" />
          </div>

          {/* Minute hand */}
          <div
            className="absolute top-1/2 left-1/2 w-1.5 md:w-2 origin-bottom transition-transform duration-200"
            style={{
              transform: `translateX(-50%) translateY(-100%) rotate(${minuteDegrees}deg)`,
              height: '85px',
            }}
          >
            <div className="w-full h-full bg-gradient-to-t from-[#e8dcc4] to-[#fff] rounded-full shadow-[0_0_8px_rgba(232,220,196,0.6)]" />
          </div>

          {/* Second hand */}
          <div
            ref={secondsRef}
            className="absolute top-1/2 left-1/2 w-[2px] md:w-1 origin-bottom"
            style={{
              height: '100px',
              transform: `translateX(-50%) translateY(-100%) rotate(${secondDegrees}deg)`,
              transition: 'transform 0.1s linear',
            }}
          >
            <div className="w-full h-full bg-[#00ff88] shadow-[0_0_10px_#00ff88,0_0_20px_#00ff88]" />
            {/* Second hand tail */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] md:w-1 h-6 bg-[#00ff88] shadow-[0_0_10px_#00ff88]"
              style={{ transform: 'translateY(100%)' }}
            />
          </div>

          {/* Center cap */}
          <div className="absolute top-1/2 left-1/2 w-4 md:w-5 h-4 md:h-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff6b35] shadow-[0_0_15px_rgba(255,107,53,0.8)]" />
          <div className="absolute top-1/2 left-1/2 w-2 md:w-3 h-2 md:h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0d0d12]" />
        </div>
      </div>
    </div>
  )
}
