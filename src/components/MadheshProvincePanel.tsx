import type { ReactNode } from 'react'
import { DemographicPieChart, recordToDemographicPieData } from './DemographicPieChart'
import {
  MADHESH_CHART_COLORS,
  MADHESH_DATA_SOURCE_LABEL,
  MADHESH_DATA_SOURCE_URL,
  madheshAgeDistribution2021,
  madheshBroadAge2021,
  madheshCitizenship2021,
  madheshGender2021,
  madheshKeyStats,
  madheshLiteracyAge5Plus2021,
  madheshPlaceOfBirth2021,
  madheshPopulationByCensus,
  madheshProvinceMeta,
} from '../data/madheshProvinceData'

function DataTableWithPct({
  rows,
  colors,
}: {
  rows: Record<string, number>
  colors: Record<string, string>
}) {
  const entries = Object.entries(rows)
  const total = entries.reduce((a, [, v]) => a + v, 0)
  return (
    <table className="rautahat-cp-table">
      <tbody>
        {entries.map(([label, value]) => {
          const pct = total > 0 ? (value / total) * 100 : 0
          return (
            <tr key={label}>
              <td className="rautahat-cp-table__label">
                <span
                  className="rautahat-cp-swatch"
                  style={{ background: colors[label] ?? MADHESH_CHART_COLORS.slate }}
                />
                {label}
              </td>
              <td className="rautahat-cp-table__num">{value.toLocaleString()}</td>
              <td className="rautahat-cp-table__pct">{pct.toFixed(1)}%</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function DemographicCard({
  title,
  pie,
  children,
}: {
  title: string
  pie: ReactNode
  children: ReactNode
}) {
  return (
    <article className="rautahat-cp-card">
      <h3 className="rautahat-cp-card__title">{title}</h3>
      <div className="rautahat-cp-card__body">
        <div className="rautahat-cp-card__chart">{pie}</div>
        <div className="rautahat-cp-card__side">{children}</div>
      </div>
    </article>
  )
}

function AgePyramid() {
  const rows = [...madheshAgeDistribution2021]
  const max = Math.max(...rows.map((r) => r.value))
  const totalPop = rows.reduce((a, r) => a + r.value, 0)
  return (
    <div className="rautahat-pyramid">
      {rows.map((row) => {
        const w = max > 0 ? (row.value / max) * 100 : 0
        const pct = totalPop > 0 ? (row.value / totalPop) * 100 : 0
        return (
          <div key={row.label} className="rautahat-pyramid__row">
            <span className="rautahat-pyramid__label">{row.label}</span>
            <div className="rautahat-pyramid__bar-wrap">
              <div className="rautahat-pyramid__bar" style={{ width: `${w}%` }} />
            </div>
            <span className="rautahat-pyramid__count">{row.value.toLocaleString()}</span>
            <span className="rautahat-pyramid__pct">{pct.toFixed(1)}%</span>
          </div>
        )
      })}
    </div>
  )
}

export function MadheshProvincePanel() {
  const genderColors: Record<string, string> = {
    Males: MADHESH_CHART_COLORS.blue,
    Females: MADHESH_CHART_COLORS.orange,
  }
  const ageGroupColors: Record<string, string> = {
    '0–14 years': MADHESH_CHART_COLORS.blue,
    '15–64 years': MADHESH_CHART_COLORS.green,
    '65+ years': MADHESH_CHART_COLORS.orange,
  }
  const citizenshipColors: Record<string, string> = {
    Nepal: MADHESH_CHART_COLORS.blue,
    India: MADHESH_CHART_COLORS.orange,
    'Other Citizenship': MADHESH_CHART_COLORS.slate,
  }
  const birthColors: Record<string, string> = {
    'Same local unit': MADHESH_CHART_COLORS.blue,
    'Other local unit in same district': MADHESH_CHART_COLORS.green,
    'Other district': MADHESH_CHART_COLORS.orange,
    'Other country': MADHESH_CHART_COLORS.red,
  }
  const literacyColors: Record<string, string> = {
    Yes: MADHESH_CHART_COLORS.green,
    'Only reading': MADHESH_CHART_COLORS.cyan,
    No: MADHESH_CHART_COLORS.orange,
  }

  const genderPieData = recordToDemographicPieData(
    { ...madheshGender2021 },
    genderColors,
    MADHESH_CHART_COLORS.slate,
  )
  const agePieData = recordToDemographicPieData(
    { ...madheshBroadAge2021 },
    ageGroupColors,
    MADHESH_CHART_COLORS.slate,
  )
  const citPieData = recordToDemographicPieData(
    { ...madheshCitizenship2021 },
    citizenshipColors,
    MADHESH_CHART_COLORS.slate,
  )
  const birthPieData = recordToDemographicPieData(
    { ...madheshPlaceOfBirth2021 },
    birthColors,
    MADHESH_CHART_COLORS.slate,
  )
  const litPieData = recordToDemographicPieData(
    { ...madheshLiteracyAge5Plus2021 },
    literacyColors,
    MADHESH_CHART_COLORS.slate,
  )

  return (
    <section className="rautahat-cp" aria-labelledby="madhesh-cp-title">
      <div className="rautahat-cp__inner">
        <nav className="rautahat-cp__crumb" aria-label="Breadcrumb">
          <span>Asia</span>
          <span aria-hidden> → </span>
          <span>Nepal</span>
          <span aria-hidden> → </span>
          <strong>{madheshProvinceMeta.name}</strong>
        </nav>

        <h2 id="madhesh-cp-title" className="rautahat-cp__h1">
          {madheshProvinceMeta.name.toUpperCase()}
        </h2>
        <p className="rautahat-cp__subtitle">
          {madheshProvinceMeta.status} · {madheshProvinceMeta.nameNative}
        </p>

        <div className="rautahat-cp__hero">
          <div className="rautahat-cp__keystat">
            <h4 className="rautahat-cp__keystat-title">Contents: Subdivision</h4>
            <dl className="rautahat-cp__keystat-list">
              <div>
                <dt>Population (2021)</dt>
                <dd>{madheshKeyStats.population2021.toLocaleString()}</dd>
              </div>
              <div>
                <dt>Area</dt>
                <dd>{madheshKeyStats.areaKm2.toLocaleString()} km²</dd>
              </div>
              <div>
                <dt>Population density (2021)</dt>
                <dd>{madheshKeyStats.densityPerKm2} / km²</dd>
              </div>
              <div>
                <dt>Transcription</dt>
                <dd>{madheshProvinceMeta.transcription}</dd>
              </div>
            </dl>
          </div>

          <div className="rautahat-cp__summary-wrap">
            <table className="rautahat-cp__summary-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Native</th>
                  {madheshPopulationByCensus.map((c) => (
                    <th key={c.year}>Pop. {c.year}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>{madheshProvinceMeta.name}</strong>
                  </td>
                  <td>{madheshProvinceMeta.status}</td>
                  <td>{madheshProvinceMeta.nameNative}</td>
                  {madheshPopulationByCensus.map((c) => (
                    <td key={c.year}>{c.population.toLocaleString()}</td>
                  ))}
                </tr>
              </tbody>
            </table>
            <p className="rautahat-cp__source-inline">
              <strong>Source:</strong> Central Bureau of Statistics Nepal (web).
            </p>
          </div>
        </div>

        <h3 className="rautahat-cp__section-title">Further information about the population structure</h3>

        <div className="rautahat-cp__cards">
          <DemographicCard title="Gender (C 2021)" pie={<DemographicPieChart data={genderPieData} />}>
            <DataTableWithPct rows={{ ...madheshGender2021 }} colors={genderColors} />
          </DemographicCard>

          <DemographicCard title="Age Groups (C 2021)" pie={<DemographicPieChart data={agePieData} />}>
            <DataTableWithPct rows={{ ...madheshBroadAge2021 }} colors={ageGroupColors} />
          </DemographicCard>

          <article className="rautahat-cp-card rautahat-cp-card--wide">
            <h3 className="rautahat-cp-card__title">Age Distribution (C 2021)</h3>
            <div className="rautahat-cp-card__body rautahat-cp-card__body--stack">
              <AgePyramid />
            </div>
          </article>

          <DemographicCard title="Citizenship (C 2021)" pie={<DemographicPieChart data={citPieData} />}>
            <DataTableWithPct rows={{ ...madheshCitizenship2021 }} colors={citizenshipColors} />
          </DemographicCard>

          <DemographicCard title="Place of Birth (C 2021)" pie={<DemographicPieChart data={birthPieData} />}>
            <DataTableWithPct rows={{ ...madheshPlaceOfBirth2021 }} colors={birthColors} />
          </DemographicCard>

          <DemographicCard title="Literacy (A5+) (C 2021)" pie={<DemographicPieChart data={litPieData} />}>
            <DataTableWithPct rows={{ ...madheshLiteracyAge5Plus2021 }} colors={literacyColors} />
          </DemographicCard>
        </div>

        <p className="rautahat-cp__footer-source">
          <strong>Reference:</strong> {MADHESH_DATA_SOURCE_LABEL}{' '}
          <a href={MADHESH_DATA_SOURCE_URL} target="_blank" rel="noopener noreferrer">
            citypopulation.de →
          </a>
        </p>
      </div>
    </section>
  )
}

