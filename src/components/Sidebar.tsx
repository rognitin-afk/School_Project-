import { Link } from 'react-router-dom'
import type { SidebarProps as Props, Candidate, CandidatesMap } from '../types'
import { PROVINCE_NAMES } from '../constants'

interface SidebarComponentProps {
  props: Props | null
  candidates: CandidatesMap
}

export function Sidebar({ props: featureProps, candidates }: SidebarComponentProps) {
  if (!featureProps) {
    return (
      <aside className="sidebar">
        <h2>Constituency details</h2>
        <p className="meta">Click any constituency on the map to see candidate information here.</p>
      </aside>
    )
  }

  const { DISTRICT, FIRST_STAT, HOR_CODE } = featureProps
  const province = PROVINCE_NAMES[FIRST_STAT] ?? String(FIRST_STAT)
  const candidate: Candidate | undefined = HOR_CODE ? candidates[HOR_CODE] : undefined
  const allCandidates = candidate
    ? Object.values(candidates).filter(
        (c) => c.constituency && c.constituency === candidate.constituency && c.name !== candidate.name
      )
    : []

  if (candidate) {
    return (
      <aside className="sidebar">
        <h2>{candidate.name}</h2>
        {(candidate.party || candidate.role) && (
          <p className="meta sidebar-party">
            <strong>{candidate.party ?? 'Nepali Congress'}</strong>
            {candidate.role && <> &nbsp;·&nbsp; {candidate.role}</>}
          </p>
        )}
        <p className="meta">
          <strong>Constituency:</strong> {candidate.constituency ?? HOR_CODE ?? ''}
        </p>
        <p className="meta">
          <strong>District:</strong> {DISTRICT ?? ''} &nbsp; | &nbsp; <strong>Province:</strong> {province ?? ''}
        </p>
        <Link to={`/study/constituency/${HOR_CODE}`} className="sidebar-study-btn">
          Study deeply
        </Link>
        {candidate.image && (
          <img src={candidate.image} alt={candidate.name} />
        )}
        {candidate.bio && <p>{candidate.bio}</p>}
        {allCandidates.length > 0 && (
          <section>
            <h3>Other candidates in this constituency</h3>
            <ul>
              {allCandidates.map((c) => (
                <li key={`${HOR_CODE}-${c.name}`}>
                  <strong>{c.name}</strong>
                  {c.party && <> &nbsp;({c.party})</>}
                </li>
              ))}
            </ul>
          </section>
        )}
      </aside>
    )
  }

  return (
    <aside className="sidebar">
      <h2>{HOR_CODE || 'Constituency'}</h2>
      <p className="meta"><strong>District:</strong> {DISTRICT ?? ''}</p>
      <p className="meta"><strong>Province:</strong> {province ?? ''}</p>
      <Link to={`/study/constituency/${HOR_CODE}`} className="sidebar-study-btn">
        Study deeply
      </Link>
      <p>No candidate details added yet for this constituency.</p>
    </aside>
  )
}
