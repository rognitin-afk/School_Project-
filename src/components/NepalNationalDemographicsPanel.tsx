import { CensusDemographicsSection } from './CensusDemographicsSection'
import {
  NEPAL_AGGREGATED_DATA_SOURCE_NOTE,
  nepalAggregateCensusBundle,
  nepalDemographicsMeta,
  nepalPopulationByCensus,
  nepalAggregateKeyStatTitle,
} from '../data/nepalAggregatedDemographics2021'

export function NepalNationalDemographicsPanel() {
  const pop2021 = nepalPopulationByCensus[nepalPopulationByCensus.length - 1]!.population

  return (
    <CensusDemographicsSection
      bundle={nepalAggregateCensusBundle}
      titleId="nepal-census-demographics-title"
      crumbFinal={nepalDemographicsMeta.name}
      pageTitle={nepalDemographicsMeta.name.toUpperCase()}
      pageSubtitle={`${nepalDemographicsMeta.status} · ${nepalDemographicsMeta.nameNative}`}
      keystatTitle={nepalAggregateKeyStatTitle}
      keystatLines={[
        { dt: 'Population (2021)', dd: pop2021.toLocaleString() },
        { dt: 'Composition', dd: 'Totals sum all seven provinces (NPHC 2021).' },
      ]}
      heroNote={NEPAL_AGGREGATED_DATA_SOURCE_NOTE}
      sectionHeading="National population structure (NPHC 2021)"
    />
  )
}
