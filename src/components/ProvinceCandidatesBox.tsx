import { useState, useMemo } from 'react'
import type { CandidatesMap, Candidate, Hierarchy } from '../types'
import { PROVINCE_NAMES } from '../constants'

interface ProvinceCandidatesBoxProps {
  provinceCode: number
  candidates: CandidatesMap
  hierarchy: Hierarchy | null
  selectedConstituencyCode: string | null
  onSelectCandidate: (horCode: string, district: string, firstStat: number) => void
}

export function ProvinceCandidatesBox({
  provinceCode,
  candidates,
  hierarchy,
  selectedConstituencyCode,
  onSelectCandidate,
}: ProvinceCandidatesBoxProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const provinceCandidates = useMemo(() => {
    const list: { horCode: string; candidate: Candidate }[] = []
    Object.entries(candidates).forEach(([horCode, c]) => {
      if (c.provinceCode === provinceCode) list.push({ horCode, candidate: c })
    })
    return list.sort((a, b) => a.candidate.name.localeCompare(b.candidate.name))
  }, [candidates, provinceCode])

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return provinceCandidates
    const q = searchQuery.toLowerCase().trim()
    return provinceCandidates.filter(({ candidate }) =>
      candidate.name.toLowerCase().includes(q)
    )
  }, [provinceCandidates, searchQuery])

  const provinceName = PROVINCE_NAMES[provinceCode] ?? String(provinceCode)

  const handleClick = (horCode: string) => {
    if (!hierarchy) return
    const prov = hierarchy[String(provinceCode)]
    if (!prov) return
    for (const [district, data] of Object.entries(prov.districts)) {
      if (data.constituencies.includes(horCode)) {
        onSelectCandidate(horCode, district, provinceCode)
        return
      }
    }
  }

  return (
    <div className="province-candidates-box">
      <h3 className="province-candidates-box__title">{provinceName} – Candidates</h3>
      <input
        type="search"
        className="province-candidates-box__search"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Search candidates by name"
      />
      <ul className="province-candidates-box__list">
        {filtered.length === 0 ? (
          <li className="province-candidates-box__empty">No candidates match.</li>
        ) : (
          filtered.map(({ horCode, candidate }) => (
            <li key={horCode}>
              <button
                type="button"
                className={`province-candidates-box__name ${selectedConstituencyCode === horCode ? 'is-selected' : ''}`}
                onClick={() => handleClick(horCode)}
              >
                {candidate.name}
              </button>
              <span className="province-candidates-box__constituency">
                {candidate.constituency ?? horCode}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
