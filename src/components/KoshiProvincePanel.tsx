import type { ReactNode } from 'react'
import { DemographicPieChart, recordToDemographicPieData } from './DemographicPieChart'
import {
  KOSHI_CHART_COLORS,
  KOSHI_DATA_SOURCE_LABEL,
  KOSHI_DATA_SOURCE_URL,
  koshiAgeDistribution2021,
  koshiBroadAge2021,
  koshiCitizenship2021,
  koshiGender2021,
  koshiLiteracyAge5Plus2021,
  koshiPlaceOfBirth2021,
  koshiPopulationByCensus,
  koshiProvinceMeta,
} from '../data/koshiProvinceData'

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
                  style={{ background: colors[label] ?? KOSHI_CHART_COLORS.slate }}
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
  const rows = [...koshiAgeDistribution2021]
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

export function KoshiProvincePanel() {
  const genderColors: Record<string, string> = {
    Males: KOSHI_CHART_COLORS.blue,
    Females: KOSHI_CHART_COLORS.orange,
  }
  const ageGroupColors: Record<string, string> = {
    '0–14 years': KOSHI_CHART_COLORS.blue,
    '15–64 years': KOSHI_CHART_COLORS.green,
    '65+ years': KOSHI_CHART_COLORS.orange,
  }
  const citizenshipColors: Record<string, string> = {
    Nepal: KOSHI_CHART_COLORS.blue,
    India: KOSHI_CHART_COLORS.orange,
    'Other Citizenship': KOSHI_CHART_COLORS.slate,
  }
  const birthColors: Record<string, string> = {
    'Same local unit': KOSHI_CHART_COLORS.blue,
    'Other local unit in same district': KOSHI_CHART_COLORS.green,
    'Other district': KOSHI_CHART_COLORS.orange,
    'Other country': KOSHI_CHART_COLORS.red,
  }
  const literacyColors: Record<string, string> = {
    Yes: KOSHI_CHART_COLORS.green,
    'Only reading': KOSHI_CHART_COLORS.cyan,
    No: KOSHI_CHART_COLORS.orange,
  }

  const genderPieData = recordToDemographicPieData(
    { ...koshiGender2021 },
    genderColors,
    KOSHI_CHART_COLORS.slate,
  )
  const agePieData = recordToDemographicPieData(
    { ...koshiBroadAge2021 },
    ageGroupColors,
    KOSHI_CHART_COLORS.slate,
  )
  const citPieData = recordToDemographicPieData(
    { ...koshiCitizenship2021 },
    citizenshipColors,
    KOSHI_CHART_COLORS.slate,
  )
  const birthPieData = recordToDemographicPieData(
    { ...koshiPlaceOfBirth2021 },
    birthColors,
    KOSHI_CHART_COLORS.slate,
  )
  const litPieData = recordToDemographicPieData(
    { ...koshiLiteracyAge5Plus2021 },
    literacyColors,
    KOSHI_CHART_COLORS.slate,
  )

  return (
    <section className="rautahat-cp" aria-labelledby="koshi-cp-title">
      <div className="rautahat-cp__inner">
        <nav className="rautahat-cp__crumb" aria-label="Breadcrumb">
          <span>Asia</span>
          <span aria-hidden> → </span>
          <span>Nepal</span>
          <span aria-hidden> → </span>
          <strong>{koshiProvinceMeta.name}</strong>
        </nav>

        <h2 id="koshi-cp-title" className="rautahat-cp__h1">
          {koshiProvinceMeta.name.toUpperCase()}
        </h2>
        <p className="rautahat-cp__subtitle">
          {koshiProvinceMeta.status} · {koshiProvinceMeta.nameNative}
        </p>

        <div className="rautahat-cp__hero">
          <div className="rautahat-cp__keystat">
            <h4 className="rautahat-cp__keystat-title">Contents: Subdivision</h4>
            <dl className="rautahat-cp__keystat-list">
              <div>
                <dt>Population (2021)</dt>
                <dd>{koshiPopulationByCensus[koshiPopulationByCensus.length - 1].population.toLocaleString()}</dd>
              </div>
              <div>
                <dt>Transcription</dt>
                <dd>{koshiProvinceMeta.transcription}</dd>
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
                  {koshiPopulationByCensus.map((c) => (
                    <th key={c.year}>Pop. {c.year}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>{koshiProvinceMeta.name}</strong>
                  </td>
                  <td>{koshiProvinceMeta.status}</td>
                  <td>{koshiProvinceMeta.nameNative}</td>
                  {koshiPopulationByCensus.map((c) => (
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
            <DataTableWithPct rows={{ ...koshiGender2021 }} colors={genderColors} />
          </DemographicCard>

          <DemographicCard title="Age Groups (C 2021)" pie={<DemographicPieChart data={agePieData} />}>
            <DataTableWithPct rows={{ ...koshiBroadAge2021 }} colors={ageGroupColors} />
          </DemographicCard>

          <article className="rautahat-cp-card rautahat-cp-card--wide">
            <h3 className="rautahat-cp-card__title">Age Distribution (C 2021)</h3>
            <div className="rautahat-cp-card__body rautahat-cp-card__body--stack">
              <AgePyramid />
            </div>
          </article>

          <DemographicCard title="Citizenship (C 2021)" pie={<DemographicPieChart data={citPieData} />}>
            <DataTableWithPct rows={{ ...koshiCitizenship2021 }} colors={citizenshipColors} />
          </DemographicCard>

          <DemographicCard title="Place of Birth (C 2021)" pie={<DemographicPieChart data={birthPieData} />}>
            <DataTableWithPct rows={{ ...koshiPlaceOfBirth2021 }} colors={birthColors} />
          </DemographicCard>

          <DemographicCard title="Literacy (A5+) (C 2021)" pie={<DemographicPieChart data={litPieData} />}>
            <DataTableWithPct rows={{ ...koshiLiteracyAge5Plus2021 }} colors={literacyColors} />
          </DemographicCard>
        </div>

        <p className="rautahat-cp__footer-source">
          <strong>Reference:</strong> {KOSHI_DATA_SOURCE_LABEL}{' '}
          <a href={KOSHI_DATA_SOURCE_URL} target="_blank" rel="noopener noreferrer">
            citypopulation.de →
          </a>
        </p>
      </div>
    </section>
  )
}

