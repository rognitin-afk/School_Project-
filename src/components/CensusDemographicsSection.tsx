import type { ReactNode } from 'react'
import { DemographicPieChart, recordToDemographicPieData } from './DemographicPieChart'
import type { ProvinceCensusBundle } from '../data/provinceCensusBundles'

function DataTableWithPct({
  rows,
  colors,
  fallbackColor,
}: {
  rows: Record<string, number>
  colors: Record<string, string>
  fallbackColor: string
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
                  style={{ background: colors[label] ?? fallbackColor }}
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

function AgePyramid({ rows }: { rows: readonly { label: string; value: number }[] }) {
  const list = [...rows]
  const max = Math.max(...list.map((r) => r.value))
  const totalPop = list.reduce((a, r) => a + r.value, 0)
  return (
    <div className="rautahat-pyramid">
      {list.map((row) => {
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

export type CensusDemographicsSectionProps = {
  bundle: ProvinceCensusBundle
  titleId: string
  crumbFinal: string
  pageTitle: string
  pageSubtitle: string
  keystatTitle: string
  keystatLines: readonly { dt: string; dd: string }[]
  heroNote?: string
  sectionHeading?: string
}

export function CensusDemographicsSection({
  bundle,
  titleId,
  crumbFinal,
  pageTitle,
  pageSubtitle,
  keystatTitle,
  keystatLines,
  heroNote,
  sectionHeading = 'Further information about the population structure',
}: CensusDemographicsSectionProps) {
  const c = bundle.chartColors
  const meta = bundle.provinceMeta

  const genderColors: Record<string, string> = {
    Males: c.blue,
    Females: c.orange,
  }
  const ageGroupColors: Record<string, string> = {
    '0–14 years': c.blue,
    '15–64 years': c.green,
    '65+ years': c.orange,
  }
  const citizenshipColors: Record<string, string> = {
    Nepal: c.blue,
    India: c.orange,
    'Other Citizenship': c.slate,
  }
  const birthColors: Record<string, string> = {
    'Same local unit': c.blue,
    'Other local unit in same district': c.green,
    'Other district': c.orange,
    'Other country': c.red,
  }
  const literacyColors: Record<string, string> = {
    Yes: c.green,
    'Only reading': c.cyan,
    No: c.orange,
  }

  const genderPieData = recordToDemographicPieData({ ...bundle.gender2021 }, genderColors, c.slate)
  const agePieData = recordToDemographicPieData({ ...bundle.broadAge2021 }, ageGroupColors, c.slate)
  const citPieData = recordToDemographicPieData({ ...bundle.citizenship2021 }, citizenshipColors, c.slate)
  const birthPieData = recordToDemographicPieData({ ...bundle.placeOfBirth2021 }, birthColors, c.slate)
  const litPieData = recordToDemographicPieData(
    { ...bundle.literacyAge5Plus2021 },
    literacyColors,
    c.slate,
  )

  const popRows = bundle.populationByCensus

  return (
    <section className="rautahat-cp" aria-labelledby={titleId}>
      <div className="rautahat-cp__inner">
        <nav className="rautahat-cp__crumb" aria-label="Breadcrumb">
          <span>Asia</span>
          <span aria-hidden> → </span>
          <span>Nepal</span>
          <span aria-hidden> → </span>
          <strong>{crumbFinal}</strong>
        </nav>

        <h2 id={titleId} className="rautahat-cp__h1">
          {pageTitle}
        </h2>
        <p className="rautahat-cp__subtitle">{pageSubtitle}</p>

        <div className="rautahat-cp__hero">
          <div className="rautahat-cp__keystat">
            <h4 className="rautahat-cp__keystat-title">{keystatTitle}</h4>
            <dl className="rautahat-cp__keystat-list">
              {keystatLines.map((line) => (
                <div key={line.dt}>
                  <dt>{line.dt}</dt>
                  <dd>{line.dd}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rautahat-cp__summary-wrap">
            <table className="rautahat-cp__summary-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Native</th>
                  {popRows.map((row) => (
                    <th key={row.year}>Pop. {row.year}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>{meta.name}</strong>
                  </td>
                  <td>{meta.status}</td>
                  <td>{meta.nameNative}</td>
                  {popRows.map((row) => (
                    <td key={row.year}>{row.population.toLocaleString()}</td>
                  ))}
                </tr>
              </tbody>
            </table>
            <p className="rautahat-cp__source-inline">
              <strong>Source:</strong> Central Bureau of Statistics Nepal (web).
            </p>
            {heroNote ? <p className="rautahat-cp__source-inline rautahat-cp__hero-note">{heroNote}</p> : null}
          </div>
        </div>

        <h3 className="rautahat-cp__section-title">{sectionHeading}</h3>

        <div className="rautahat-cp__cards">
          <DemographicCard title="Gender (C 2021)" pie={<DemographicPieChart data={genderPieData} />}>
            <DataTableWithPct rows={{ ...bundle.gender2021 }} colors={genderColors} fallbackColor={c.slate} />
          </DemographicCard>

          <DemographicCard title="Age Groups (C 2021)" pie={<DemographicPieChart data={agePieData} />}>
            <DataTableWithPct
              rows={{ ...bundle.broadAge2021 }}
              colors={ageGroupColors}
              fallbackColor={c.slate}
            />
          </DemographicCard>

          <article className="rautahat-cp-card rautahat-cp-card--wide">
            <h3 className="rautahat-cp-card__title">Age Distribution (C 2021)</h3>
            <div className="rautahat-cp-card__body rautahat-cp-card__body--stack">
              <AgePyramid rows={bundle.ageDistribution2021} />
            </div>
          </article>

          <DemographicCard title="Citizenship (C 2021)" pie={<DemographicPieChart data={citPieData} />}>
            <DataTableWithPct
              rows={{ ...bundle.citizenship2021 }}
              colors={citizenshipColors}
              fallbackColor={c.slate}
            />
          </DemographicCard>

          <DemographicCard title="Place of Birth (C 2021)" pie={<DemographicPieChart data={birthPieData} />}>
            <DataTableWithPct
              rows={{ ...bundle.placeOfBirth2021 }}
              colors={birthColors}
              fallbackColor={c.slate}
            />
          </DemographicCard>

          <DemographicCard title="Literacy (A5+) (C 2021)" pie={<DemographicPieChart data={litPieData} />}>
            <DataTableWithPct
              rows={{ ...bundle.literacyAge5Plus2021 }}
              colors={literacyColors}
              fallbackColor={c.slate}
            />
          </DemographicCard>
        </div>

        <p className="rautahat-cp__footer-source">
          <strong>Reference:</strong> {bundle.dataSourceLabel}{' '}
          <a href={bundle.dataSourceUrl} target="_blank" rel="noopener noreferrer">
            citypopulation.de →
          </a>
        </p>
      </div>
    </section>
  )
}
