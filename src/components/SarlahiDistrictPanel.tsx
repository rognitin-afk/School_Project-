import type { ReactNode } from 'react'
import { DemographicPieChart, recordToDemographicPieData } from './DemographicPieChart'
import {
  SARLAHI_CHART_COLORS,
  SARLAHI_DATA_SOURCE_LABEL,
  SARLAHI_DATA_SOURCE_URL,
  sarlahiAgeDistribution2021,
  sarlahiBroadAge2021,
  sarlahiCitizenship2021,
  sarlahiDistrictMeta,
  sarlahiGender2021,
  sarlahiLiteracyAge5Plus2021,
  sarlahiPlaceOfBirth2021,
  sarlahiPopulationByCensus,
} from '../data/sarlahiDistrictData'

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
                  style={{ background: colors[label] ?? SARLAHI_CHART_COLORS.slate }}
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
  const rows = [...sarlahiAgeDistribution2021]
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

export function SarlahiDistrictPanel() {
  const genderColors: Record<string, string> = {
    Males: SARLAHI_CHART_COLORS.blue,
    Females: SARLAHI_CHART_COLORS.orange,
  }
  const ageGroupColors: Record<string, string> = {
    '0–14 years': SARLAHI_CHART_COLORS.blue,
    '15–64 years': SARLAHI_CHART_COLORS.green,
    '65+ years': SARLAHI_CHART_COLORS.orange,
  }
  const citizenshipColors: Record<string, string> = {
    Nepal: SARLAHI_CHART_COLORS.blue,
    India: SARLAHI_CHART_COLORS.orange,
    'Other Citizenship': SARLAHI_CHART_COLORS.slate,
  }
  const birthColors: Record<string, string> = {
    'Same local unit': SARLAHI_CHART_COLORS.blue,
    'Other local unit in same district': SARLAHI_CHART_COLORS.green,
    'Other district': SARLAHI_CHART_COLORS.orange,
    'Other country': SARLAHI_CHART_COLORS.red,
  }
  const literacyColors: Record<string, string> = {
    Yes: SARLAHI_CHART_COLORS.green,
    'Only reading': SARLAHI_CHART_COLORS.cyan,
    No: SARLAHI_CHART_COLORS.orange,
  }

  const genderPieData = recordToDemographicPieData(
    { ...sarlahiGender2021 },
    genderColors,
    SARLAHI_CHART_COLORS.slate,
  )
  const agePieData = recordToDemographicPieData(
    { ...sarlahiBroadAge2021 },
    ageGroupColors,
    SARLAHI_CHART_COLORS.slate,
  )
  const citPieData = recordToDemographicPieData(
    { ...sarlahiCitizenship2021 },
    citizenshipColors,
    SARLAHI_CHART_COLORS.slate,
  )
  const birthPieData = recordToDemographicPieData(
    { ...sarlahiPlaceOfBirth2021 },
    birthColors,
    SARLAHI_CHART_COLORS.slate,
  )
  const litPieData = recordToDemographicPieData(
    { ...sarlahiLiteracyAge5Plus2021 },
    literacyColors,
    SARLAHI_CHART_COLORS.slate,
  )

  return (
    <section className="rautahat-cp" aria-labelledby="sarlahi-cp-title">
      <div className="rautahat-cp__inner">
        <nav className="rautahat-cp__crumb" aria-label="Breadcrumb">
          <span>Asia</span>
          <span aria-hidden> → </span>
          <span>Nepal</span>
          <span aria-hidden> → </span>
          <span>{sarlahiDistrictMeta.province}</span>
          <span aria-hidden> → </span>
          <strong>{sarlahiDistrictMeta.name}</strong>
        </nav>

        <h2 id="sarlahi-cp-title" className="rautahat-cp__h1">
          {sarlahiDistrictMeta.name.toUpperCase()}
        </h2>
        <p className="rautahat-cp__subtitle">
          {sarlahiDistrictMeta.status} · {sarlahiDistrictMeta.nameNative}
        </p>

        <div className="rautahat-cp__hero">
          <div className="rautahat-cp__keystat">
            <h4 className="rautahat-cp__keystat-title">Contents: Population</h4>
            <dl className="rautahat-cp__keystat-list">
              <div>
                <dt>Population (2021)</dt>
                <dd>{sarlahiPopulationByCensus[sarlahiPopulationByCensus.length - 1].population.toLocaleString()}</dd>
              </div>
              <div>
                <dt>Transcription</dt>
                <dd>{sarlahiDistrictMeta.transcription}</dd>
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
                  {sarlahiPopulationByCensus.map((c) => (
                    <th key={c.year}>Pop. {c.year}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>{sarlahiDistrictMeta.name}</strong>
                  </td>
                  <td>{sarlahiDistrictMeta.status}</td>
                  <td>{sarlahiDistrictMeta.nameNative}</td>
                  {sarlahiPopulationByCensus.map((c) => (
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
            <DataTableWithPct rows={{ ...sarlahiGender2021 }} colors={genderColors} />
          </DemographicCard>

          <DemographicCard title="Age Groups (C 2021)" pie={<DemographicPieChart data={agePieData} />}>
            <DataTableWithPct rows={{ ...sarlahiBroadAge2021 }} colors={ageGroupColors} />
          </DemographicCard>

          <article className="rautahat-cp-card rautahat-cp-card--wide">
            <h3 className="rautahat-cp-card__title">Age Distribution (C 2021)</h3>
            <div className="rautahat-cp-card__body rautahat-cp-card__body--stack">
              <AgePyramid />
            </div>
          </article>

          <DemographicCard title="Citizenship (C 2021)" pie={<DemographicPieChart data={citPieData} />}>
            <DataTableWithPct rows={{ ...sarlahiCitizenship2021 }} colors={citizenshipColors} />
          </DemographicCard>

          <DemographicCard title="Place of Birth (C 2021)" pie={<DemographicPieChart data={birthPieData} />}>
            <DataTableWithPct rows={{ ...sarlahiPlaceOfBirth2021 }} colors={birthColors} />
          </DemographicCard>

          <DemographicCard title="Literacy (A5+) (C 2021)" pie={<DemographicPieChart data={litPieData} />}>
            <DataTableWithPct rows={{ ...sarlahiLiteracyAge5Plus2021 }} colors={literacyColors} />
          </DemographicCard>
        </div>

        <p className="rautahat-cp__footer-source">
          <strong>Reference:</strong> {SARLAHI_DATA_SOURCE_LABEL}{' '}
          <a href={SARLAHI_DATA_SOURCE_URL} target="_blank" rel="noopener noreferrer">
            citypopulation.de →
          </a>
        </p>
      </div>
    </section>
  )
}

