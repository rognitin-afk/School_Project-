import { useEffect, useState } from 'react'
import { ELECTION_TIME } from '../constants'

function formatCountdown(diffMs: number): string {
  const totalSeconds = Math.floor(diffMs / 1000)
  const days = Math.floor(totalSeconds / (60 * 60 * 24))
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
  const seconds = totalSeconds % 60
  return `Election will start after ${days}d ${hours}h ${minutes}m ${seconds}s`
}

export function Topbar() {
  const [text, setText] = useState('Election will start after …')

  useEffect(() => {
    function tick() {
      const now = Date.now()
      const diff = ELECTION_TIME - now
      if (diff <= 0) {
        setText('Election has started.')
        return
      }
      setText(formatCountdown(diff))
    }
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <span className="topbar-dot" />
        <span className="topbar-countdown">{text}</span>
      </div>
    </header>
  )
}
