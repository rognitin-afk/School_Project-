import { CensusDemographicsSection } from './CensusDemographicsSection'
import { getProvinceCensusBundle } from '../data/provinceCensusBundles'

type Props = { provinceCode: string }

export function ProvinceContextDemographicsPanel({ provinceCode }: Props) {
  const bundle = getProvinceCensusBundle(provinceCode)
  if (!bundle) return null

  const meta = bundle.provinceMeta
  const popRows = bundle.populationByCensus
  const pop2021 = popRows[popRows.length - 1]!.population
  const transcription = meta.transcription ?? '—'

  return (
    <CensusDemographicsSection
      bundle={bundle}
      titleId={`province-census-context-${provinceCode}`}
      crumbFinal={meta.name}
      pageTitle={`${meta.name.toUpperCase()} — PROVINCE CENSUS`}
      pageSubtitle="Province-level census indicators · Caste / ethnicity for the selected district is below."
      keystatTitle="Contents: Subdivision"
      keystatLines={[
        { dt: 'Population (2021)', dd: pop2021.toLocaleString() },
        { dt: 'Transcription', dd: transcription },
      ]}
      sectionHeading="Province population structure (NPHC 2021)"
    />
  )
}
