import { useState } from 'react'

interface NewsItem {
  id: number
  category: string
  headline: string
  summary: string
  timestamp: string
  priority: 'high' | 'medium' | 'low'
}

const mockNews: NewsItem[] = [
  {
    id: 1,
    category: 'TECH',
    headline: 'AI Systems Reach New Milestone in Scientific Discovery',
    summary: 'Researchers announce breakthrough in protein folding prediction, accelerating drug development timelines significantly.',
    timestamp: '2 MIN AGO',
    priority: 'high',
  },
  {
    id: 2,
    category: 'CLIMATE',
    headline: 'Global Renewable Energy Production Hits Record High',
    summary: 'Solar and wind power now account for 30% of global electricity generation, marking historic shift from fossil fuels.',
    timestamp: '15 MIN AGO',
    priority: 'high',
  },
  {
    id: 3,
    category: 'ECONOMY',
    headline: 'Central Banks Signal Policy Shift Amid Growth Data',
    summary: 'Federal Reserve and ECB hint at coordinated approach to managing inflation while supporting economic expansion.',
    timestamp: '32 MIN AGO',
    priority: 'medium',
  },
  {
    id: 4,
    category: 'SCIENCE',
    headline: 'Deep Ocean Expedition Discovers New Species',
    summary: 'Marine biologists document previously unknown life forms in Mariana Trench exploration mission.',
    timestamp: '1 HR AGO',
    priority: 'low',
  },
  {
    id: 5,
    category: 'HEALTH',
    headline: 'mRNA Technology Advances Cancer Treatment Options',
    summary: 'Clinical trials show promising results for personalized cancer vaccines using messenger RNA platforms.',
    timestamp: '2 HR AGO',
    priority: 'medium',
  },
]

export default function WorldNews() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-[#ff3d3d]'
      case 'medium':
        return 'bg-[#ffd700]'
      default:
        return 'bg-[#00ff88]'
    }
  }

  return (
    <div className="monitor-card rounded-lg p-4 md:p-6 h-full">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#ff3d3d] rounded-full animate-pulse" />
          <h2 className="font-display text-sm md:text-base tracking-[0.15em] uppercase text-[#ff6b35]">
            World Feed
          </h2>
        </div>
        <span className="font-mono text-[9px] md:text-[10px] text-[#e8dcc4]/40 tracking-wider">
          LIVE UPDATES
        </span>
      </div>

      <div className="space-y-3 max-h-[400px] md:max-h-[500px] overflow-y-auto pr-2">
        {mockNews.map((item, index) => (
          <article
            key={item.id}
            className="bg-[#0a0a0f]/50 border border-[#ff6b35]/10 rounded p-3 md:p-4 cursor-pointer hover:border-[#ff6b35]/30 transition-all duration-300 animate-fadeInUp"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
          >
            <div className="flex items-start gap-2 md:gap-3">
              <div className={`w-1.5 h-1.5 mt-2 rounded-full ${getPriorityColor(item.priority)} flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-[9px] md:text-[10px] text-[#ff6b35] tracking-wider">
                    {item.category}
                  </span>
                  <span className="font-mono text-[9px] md:text-[10px] text-[#e8dcc4]/30">
                    {item.timestamp}
                  </span>
                </div>
                <h3 className="font-mono text-xs md:text-sm text-[#e8dcc4] leading-relaxed mb-2">
                  {item.headline}
                </h3>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedId === item.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="font-mono text-[10px] md:text-xs text-[#e8dcc4]/60 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-[#ff6b35]/10">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] md:text-[10px] text-[#e8dcc4]/30">
            {mockNews.length} ACTIVE FEEDS
          </span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-pulse" />
            <span className="font-mono text-[9px] md:text-[10px] text-[#00ff88]/70">
              SYNC OK
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
