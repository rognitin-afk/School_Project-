import { useState } from 'react'
import type { Candidate, CandidatesMap } from '../types'

interface CompareCandidatesProps {
  candidates: CandidatesMap
  isOpen: boolean
  onClose: () => void
}

const FIELDS: { key: keyof Candidate; label: string; format: (c: Candidate) => string }[] = [
  { key: 'name', label: 'Name', format: (c) => c.name ?? '—' },
  { key: 'constituency', label: 'Constituency', format: (c) => c.constituency ?? '—' },
  { key: 'age', label: 'Age', format: (c) => (c.age != null ? String(c.age) : '—') },
  { key: 'education', label: 'Education', format: (c) => c.education ?? '—' },
  { key: 'party', label: 'Party', format: (c) => c.party ?? '—' },
  { key: 'role', label: 'Role', format: (c) => c.role ?? '—' },
  {
    key: 'pastWins',
    label: 'Past wins',
    format: (c) => (c.pastWins?.length ? c.pastWins.join('; ') : '—'),
  },
  {
    key: 'keyPromises',
    label: 'Key promises',
    format: (c) => (c.keyPromises?.length ? c.keyPromises.join('; ') : '—'),
  },
]

export function CompareCandidates({ candidates, isOpen, onClose }: CompareCandidatesProps) {
  if (!isOpen) return null

  const entries = Object.entries(candidates).map(([horCode, c]) => ({
    horCode,
    label: `${c.name} (${c.constituency ?? horCode})`,
    candidate: c,
  }))

  const [selectedA, setSelectedA] = useState(entries[0]?.horCode ?? '')
  const [selectedB, setSelectedB] = useState(entries[1]?.horCode ?? '')

  const candA = selectedA ? candidates[selectedA] : null
  const candB = selectedB ? candidates[selectedB] : null

  return (
    <div className="compare-overlay" role="dialog" aria-modal="true" aria-labelledby="compare-title">
      <div className="compare-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="compare-modal">
        <div className="compare-header">
          <h2 id="compare-title">Compare candidates</h2>
          <button type="button" className="compare-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="compare-selects">
          <div className="filter-group">
            <label htmlFor="compare-a">Candidate A</label>
            <select
              id="compare-a"
              value={selectedA}
              onChange={(e) => setSelectedA(e.target.value)}
            >
              {entries.map(({ horCode, label }) => (
                <option key={horCode} value={horCode}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="compare-b">Candidate B</label>
            <select
              id="compare-b"
              value={selectedB}
              onChange={(e) => setSelectedB(e.target.value)}
            >
              {entries.map(({ horCode, label }) => (
                <option key={horCode} value={horCode}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th className="compare-th-label">Field</th>
                <th>Candidate A</th>
                <th>Candidate B</th>
              </tr>
            </thead>
            <tbody>
              {FIELDS.map(({ label, format }) => (
                <tr key={label}>
                  <td className="compare-th-label">{label}</td>
                  <td>{candA ? format(candA) : '—'}</td>
                  <td>{candB ? format(candB) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
