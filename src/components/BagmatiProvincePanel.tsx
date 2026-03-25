import type { ReactNode } from 'react'
import {
  BAGMATI_CHART_COLORS,
  BAGMATI_DATA_SOURCE_LABEL,
  BAGMATI_DATA_SOURCE_URL,
  bagmatiAgeDistribution2021,
  bagmatiBroadAge2021,
  bagmatiCitizenship2021,
  bagmatiGender2021,
  bagmatiLiteracyAge5Plus2021,
  bagmatiPlaceOfBirth2021,
  bagmatiPopulationByCensus,
  bagmatiProvinceMeta,
} from '../data/bagmatiProvinceData'

type Slice = { value: number; color: string }

function PieChart({ slices, size = 160 }: { slices: Slice[]; size?: number }) {
  const total = slices.reduce((a, s) => a + s.value, 0)
  if (total <= 0) return null

  const cx = 50
  const cy = 50
  const r = 42
  let angle = -Math.PI / 2
  const paths = slices.map((slice, i) => {
    const arc = (slice.value / total) * 2 * Math.PI
    const start = angle
    angle += arc
    const x1 = cx + r * Math.cos(start)
    const y1 = cy + r * Math.sin(start)
    const x2 = cx + r * Math.cos(angle)
    const y2 = cy + r * Math.sin(angle)
    const largeArc = arc > Math.PI ? 1 : 0
    const d = `M ${cx},${cy} L ${x1},${y1} A ${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`
    return <path key={i} d={d} fill={slice.color} stroke="#fff" strokeWidth="0.5" />
  })

  return (
    <svg className="rautahat-pie" width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      {paths}
    </svg>
  )
}

function rowsToSlices(rows: Record<string, number>, colors: string[]): Slice[] {
  const entries = Object.entries(rows)
  return entries.map(([, value], i) => ({
    value,
    color: colors[i % colors.length],
  }))
}

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
                  style={{ background: colors[label] ?? BAGMATI_CHART_COLORS.slate }}
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
  const rows = [...bagmatiAgeDistribution2021]
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

export function BagmatiProvincePanel() {
  const genderColors: Record<string, string> = {
    Males: BAGMATI_CHART_COLORS.blue,
    Females: BAGMATI_CHART_COLORS.orange,
  }
  const ageGroupColors: Record<string, string> = {
    '0–14 years': BAGMATI_CHART_COLORS.blue,
    '15–64 years': BAGMATI_CHART_COLORS.green,
    '65+ years': BAGMATI_CHART_COLORS.orange,
  }
  const citizenshipColors: Record<string, string> = {
    Nepal: BAGMATI_CHART_COLORS.blue,
    India: BAGMATI_CHART_COLORS.orange,
    'Other Citizenship': BAGMATI_CHART_COLORS.slate,
  }
  const birthColors: Record<string, string> = {
    'Same local unit': BAGMATI_CHART_COLORS.blue,
    'Other local unit in same district': BAGMATI_CHART_COLORS.green,
    'Other district': BAGMATI_CHART_COLORS.orange,
    'Other country': BAGMATI_CHART_COLORS.red,
  }
  const literacyColors: Record<string, string> = {
    Yes: BAGMATI_CHART_COLORS.green,
    'Only reading': BAGMATI_CHART_COLORS.cyan,
    No: BAGMATI_CHART_COLORS.orange,
  }

  const genderSlices = rowsToSlices(bagmatiGender2021 as unknown as Record<string, number>, [
    BAGMATI_CHART_COLORS.blue,
    BAGMATI_CHART_COLORS.orange,
  ])
  const ageSlices = rowsToSlices(bagmatiBroadAge2021 as unknown as Record<string, number>, [
    BAGMATI_CHART_COLORS.blue,
    BAGMATI_CHART_COLORS.green,
    BAGMATI_CHART_COLORS.orange,
  ])
  const citSlices = rowsToSlices(bagmatiCitizenship2021 as unknown as Record<string, number>, [
    BAGMATI_CHART_COLORS.blue,
    BAGMATI_CHART_COLORS.orange,
    BAGMATI_CHART_COLORS.slate,
  ])
  const birthSlices = rowsToSlices(bagmatiPlaceOfBirth2021 as unknown as Record<string, number>, [
    BAGMATI_CHART_COLORS.blue,
    BAGMATI_CHART_COLORS.green,
    BAGMATI_CHART_COLORS.orange,
    BAGMATI_CHART_COLORS.red,
  ])
  const litSlices = rowsToSlices(bagmatiLiteracyAge5Plus2021 as unknown as Record<string, number>, [
    BAGMATI_CHART_COLORS.green,
    BAGMATI_CHART_COLORS.cyan,
    BAGMATI_CHART_COLORS.orange,
  ])

  return (
    <section className="rautahat-cp" aria-labelledby="bagmati-cp-title">
      <div className="rautahat-cp__inner">
        <nav className="rautahat-cp__crumb" aria-label="Breadcrumb">
          <span>Asia</span>
          <span aria-hidden> → </span>
          <span>Nepal</span>
          <span aria-hidden> → </span>
          <strong>{bagmatiProvinceMeta.name}</strong>
        </nav>

        <h2 id="bagmati-cp-title" className="rautahat-cp__h1">
          {bagmatiProvinceMeta.name.toUpperCase()}
        </h2>
        <p className="rautahat-cp__subtitle">
          {bagmatiProvinceMeta.status} · {bagmatiProvinceMeta.nameNative}
        </p>

        <div className="rautahat-cp__hero">
          <div className="rautahat-cp__keystat">
            <h4 className="rautahat-cp__keystat-title">Contents: Subdivision</h4>
            <dl className="rautahat-cp__keystat-list">
              <div>
                <dt>Population (2021)</dt>
                <dd>{bagmatiPopulationByCensus[bagmatiPopulationByCensus.length - 1].population.toLocaleString()}</dd>
              </div>
              <div>
                <dt>Transcription</dt>
                <dd>{bagmatiProvinceMeta.transcription}</dd>
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
                  {bagmatiPopulationByCensus.map((c) => (
                    <th key={c.year}>Pop. {c.year}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>{bagmatiProvinceMeta.name}</strong>
                  </td>
                  <td>{bagmatiProvinceMeta.status}</td>
                  <td>{bagmatiProvinceMeta.nameNative}</td>
                  {bagmatiPopulationByCensus.map((c) => (
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
          <DemographicCard title="Gender (C 2021)" pie={<PieChart slices={genderSlices} />}>
            <DataTableWithPct rows={{ ...bagmatiGender2021 }} colors={genderColors} />
          </DemographicCard>

          <DemographicCard title="Age Groups (C 2021)" pie={<PieChart slices={ageSlices} />}>
            <DataTableWithPct rows={{ ...bagmatiBroadAge2021 }} colors={ageGroupColors} />
          </DemographicCard>

          <article className="rautahat-cp-card rautahat-cp-card--wide">
            <h3 className="rautahat-cp-card__title">Age Distribution (C 2021)</h3>
            <div className="rautahat-cp-card__body rautahat-cp-card__body--stack">
              <AgePyramid />
            </div>
          </article>

          <DemographicCard title="Citizenship (C 2021)" pie={<PieChart slices={citSlices} />}>
            <DataTableWithPct rows={{ ...bagmatiCitizenship2021 }} colors={citizenshipColors} />
          </DemographicCard>

          <DemographicCard title="Place of Birth (C 2021)" pie={<PieChart slices={birthSlices} />}>
            <DataTableWithPct rows={{ ...bagmatiPlaceOfBirth2021 }} colors={birthColors} />
          </DemographicCard>

          <DemographicCard title="Literacy (A5+) (C 2021)" pie={<PieChart slices={litSlices} />}>
            <DataTableWithPct rows={{ ...bagmatiLiteracyAge5Plus2021 }} colors={literacyColors} />
          </DemographicCard>
        </div>

        <p className="rautahat-cp__footer-source">
          <strong>Reference:</strong> {BAGMATI_DATA_SOURCE_LABEL}{' '}
          <a href={BAGMATI_DATA_SOURCE_URL} target="_blank" rel="noopener noreferrer">
            citypopulation.de →
          </a>
        </p>
      </div>
    </section>
  )
}

