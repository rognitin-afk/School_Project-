import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchCandidates } from '../api/candidates'
import type { CandidatesMap, Candidate } from '../types'

export function StudyConstituencyPage() {
  const { horCode } = useParams<{ horCode: string }>()
  const [candidates, setCandidates] = useState<CandidatesMap>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCandidates()
      .then(setCandidates)
      .catch(() => setError('Failed to load data'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="study-page"><p>Loading…</p></div>
  if (error) return <div className="study-page"><p>{error}</p></div>

  const candidate: Candidate | undefined = horCode ? candidates[horCode] : undefined

  return (
    <div className="study-page">
      <div className="study-page__header">
        <Link to="/" className="study-page__back">← Back to map</Link>
      </div>
      <div className="study-page__content">
        <h1 className="study-page__title">
          {candidate?.constituency ?? horCode ?? 'Constituency'}
        </h1>
        <p className="study-page__meta">
          {candidate?.district && <span>{candidate.district}</span>}
          {candidate?.district && candidate?.provinceName && <span> · </span>}
          {candidate?.provinceName && <span>{candidate.provinceName}</span>}
        </p>

        {candidate ? (
          <section className="study-page__card study-page__candidates">
            <h2>Candidates</h2>
            <div className="study-page__candidate">
              {candidate.image && (
                <img src={candidate.image} alt={candidate.name} className="study-page__candidate-img" />
              )}
              <div className="study-page__candidate-info">
                <h3>{candidate.name}</h3>
                {(candidate.party || candidate.role) && (
                  <p className="study-page__party">
                    <strong>{candidate.party ?? 'Nepali Congress'}</strong>
                    {candidate.role && <> · {candidate.role}</>}
                  </p>
                )}
                {candidate.constituency && (
                  <p><strong>Constituency:</strong> {candidate.constituency}</p>
                )}
                {candidate.bio && <p className="study-page__bio">{candidate.bio}</p>}
              </div>
            </div>
          </section>
        ) : (
          <p>No candidate data for this constituency.</p>
        )}
      </div>
    </div>
  )
}
