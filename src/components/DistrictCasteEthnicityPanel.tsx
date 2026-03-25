import { useEffect, useMemo, useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { Hierarchy } from '../types'
import {
  resolveCasteDataForMapDistrict,
  resolveNationalCasteData,
  resolveProvinceCasteData,
  type CasteEthnicityRow,
  type ResolvedDistrictCaste,
} from '../utils/districtCasteLookup'

const SOURCE = 'NPHC 2021'
const TOP_PIE_SLICES = 12

const nf = new Intl.NumberFormat('en-IN')

const PIE_COLORS = [
  '#0d9488',
  '#7c3aed',
  '#ea580c',
  '#0891b2',
  '#db2777',
  '#65a30d',
  '#4f46e5',
  '#ca8a04',
  '#0e7490',
  '#9333ea',
  '#c2410c',
  '#0284c7',
  '#6b7280',
]

type PieDatum = {
  name: string
  value: number
  male: number
  female: number
  fill: string
}

function buildPieChartData(rows: CasteEthnicityRow[]) {
  const detail = rows
    .filter((r) => r.caste !== 'All Castes')
    .sort((a, b) => b.total - a.total)

  const top = detail.slice(0, TOP_PIE_SLICES)
  const rest = detail.slice(TOP_PIE_SLICES)
  const restTotal = rest.reduce((s, r) => s + r.total, 0)

  const combined: CasteEthnicityRow[] =
    restTotal > 0
      ? [
          ...top,
          {
            caste: 'Other groups (combined)',
            total: restTotal,
            male: rest.reduce((s, r) => s + r.male, 0),
            female: rest.reduce((s, r) => s + r.female, 0),
          },
        ]
      : top

  const pieData: PieDatum[] = combined.map((r, i) => ({
    name: r.caste,
    value: r.total,
    male: r.male,
    female: r.female,
    fill: PIE_COLORS[i % PIE_COLORS.length],
  }))

  return { pieData, detail }
}

function provenancePill(
  scope: 'national' | 'province' | 'district',
  provenance: ResolvedDistrictCaste['provenance'],
): string {
  if (scope === 'district') return 'Map label → census district'
  if (scope === 'national') {
    if (provenance === 'national-excerpt-json') return 'National excerpt (partial list in JSON)'
    return 'NPHC national table'
  }
  if (provenance === 'summed-districts') return 'Summed from districts in this province'
  return 'NPHC province-level table'
}

type TooltipRenderProps = {
  active?: boolean
  payload?: ReadonlyArray<{ payload?: unknown }>
}

function DistrictCasteTooltip({ active, payload, totalPop }: TooltipRenderProps & { totalPop: number }) {
  if (!active || !payload?.length) return null
  const item = payload[0]
  const p = item?.payload as PieDatum | undefined
  if (!p) return null
  const pct = totalPop > 0 ? (p.value / totalPop) * 100 : 0
  return (
    <div className="district-caste__recharts-tooltip">
      <div className="district-caste__recharts-tooltip-title">{p.name}</div>
      <div className="district-caste__recharts-tooltip-line">
        <strong>{nf.format(p.value)}</strong> people ({pct.toFixed(2)}% of total)
      </div>
      <div className="district-caste__recharts-tooltip-meta">
        Male {nf.format(p.male)} · Female {nf.format(p.female)}
      </div>
    </div>
  )
}

export type DistrictCasteEthnicityPanelProps =
  | { scope: 'national' }
  | { scope: 'province'; provinceCode: string; hierarchy: Hierarchy | null }
  | { scope: 'district'; mapDistrictLabel: string }

export function DistrictCasteEthnicityPanel(props: DistrictCasteEthnicityPanelProps) {
  const resolved = useMemo((): ResolvedDistrictCaste | null => {
    if (props.scope === 'national') return resolveNationalCasteData()
    if (props.scope === 'province') {
      return resolveProvinceCasteData(props.provinceCode, props.hierarchy)
    }
    return resolveCasteDataForMapDistrict(props.mapDistrictLabel)
  }, [
    props.scope,
    props.scope === 'province' ? props.provinceCode : null,
    props.scope === 'province' ? props.hierarchy : null,
    props.scope === 'district' ? props.mapDistrictLabel : null,
  ])

  const scope = props.scope

  const { title, totalPop, pieData, detail, pill, popLabel, legendHint } = useMemo(() => {
    if (!resolved) {
      return {
        title: '',
        totalPop: 0,
        pieData: [] as PieDatum[],
        detail: [] as CasteEthnicityRow[],
        pill: '',
        popLabel: '',
        legendHint: '',
      }
    }
    const allRow = resolved.data.find((r) => r.caste === 'All Castes')
    const totalPop = allRow?.total ?? 0
    const { pieData, detail } = buildPieChartData(resolved.data)

    let title = `Caste / ethnicity — ${resolved.displayName} (2021)`
    if (scope === 'national') title = `Caste / ethnicity — Nepal (2021)`

    const pill = provenancePill(scope, resolved.provenance)
    const popLabel =
      scope === 'national'
        ? 'Total population'
        : scope === 'province'
          ? 'Population (province)'
          : 'District population'
    const legendHint =
      scope === 'national'
        ? 'Share of national population (excluding “All Castes” row)'
        : scope === 'province'
          ? 'Share of province population (excluding “All Castes” row)'
          : 'Share of district population (excluding “All Castes” row)'

    return { title, totalPop, pieData, detail, pill, popLabel, legendHint }
  }, [resolved, scope])

  const [listQuery, setListQuery] = useState('')

  useEffect(() => {
    setListQuery('')
  }, [
    props.scope,
    props.scope === 'district' ? props.mapDistrictLabel : '',
    props.scope === 'province' ? props.provinceCode : '',
  ])

  const filteredRows = useMemo(() => {
    const q = listQuery.trim().toLowerCase()
    if (!detail.length) return [] as { row: CasteEthnicityRow; origIdx: number }[]
    if (!q) return detail.map((row, origIdx) => ({ row, origIdx }))
    const out: { row: CasteEthnicityRow; origIdx: number }[] = []
    detail.forEach((row, origIdx) => {
      if (row.caste.toLowerCase().includes(q)) out.push({ row, origIdx })
    })
    return out
  }, [detail, listQuery])

  if (!resolved) {
    const hint =
      scope === 'province'
        ? 'Could not load province caste data (try again when map hierarchy is ready).'
        : 'No caste/ethnicity table found for this selection.'
    return (
      <section className="district-caste" aria-labelledby="district-caste-heading">
        <div className="district-caste__inner">
          <p className="district-caste__empty">{hint}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="district-caste" aria-labelledby="district-caste-heading">
      <div className="district-caste__inner">
        <header className="district-caste__header">
          <h2 id="district-caste-heading">{title}</h2>
          <p className="district-caste__meta">
            Source: {SOURCE}. {popLabel}: <strong>{nf.format(totalPop)}</strong>
            <span className="district-caste__pill">{pill}</span>
          </p>
        </header>

        <div className="district-caste__body">
          <div className="district-caste__chart-wrap">
            <div className="district-caste__recharts" aria-label="Interactive pie chart of caste shares">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={108}
                    paddingAngle={0.6}
                    stroke="#fff"
                    strokeWidth={1.25}
                    isAnimationActive={true}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`${entry.name}-${index}`} fill={entry.fill} stroke="#fff" />
                    ))}
                  </Pie>
                  <Tooltip
                    content={(tooltipProps) => (
                      <DistrictCasteTooltip
                        active={tooltipProps.active}
                        payload={tooltipProps.payload}
                        totalPop={totalPop}
                      />
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="district-caste__chart-caption">
              Hover segments for details. Top {TOP_PIE_SLICES}
              {detail.length > TOP_PIE_SLICES ? ' groups + other combined' : ' groups'}.
            </p>
          </div>

          <div className="district-caste__legend-wrap">
            <div className="district-caste__legend-head">
              <h3 className="district-caste__legend-title">
                All groups — {detail.length} total
                {listQuery.trim() ? ` · ${filteredRows.length} shown` : ''}
              </h3>
              <label className="district-caste__search-label" htmlFor="district-caste-search">
                <span className="visually-hidden">Search groups</span>
                <input
                  id="district-caste-search"
                  type="search"
                  className="district-caste__search"
                  placeholder="Search caste / ethnicity…"
                  value={listQuery}
                  onChange={(e) => setListQuery(e.target.value)}
                  autoComplete="off"
                  spellCheck={false}
                />
              </label>
            </div>
            <p className="district-caste__legend-hint">{legendHint}</p>
            <ul className="district-caste__legend" role="list">
              {filteredRows.length === 0 ? (
                <li className="district-caste__legend-empty">No groups match “{listQuery.trim()}”.</li>
              ) : (
                filteredRows.map(({ row, origIdx }) => {
                  const pct = totalPop > 0 ? (row.total / totalPop) * 100 : 0
                  const color =
                    origIdx < TOP_PIE_SLICES ? PIE_COLORS[origIdx % PIE_COLORS.length] : '#94a3b8'
                  return (
                    <li key={`${row.caste}-${origIdx}`} className="district-caste__row">
                      <span
                        className="district-caste__swatch"
                        style={{ background: color }}
                        aria-hidden
                      />
                      <span className="district-caste__name">{row.caste}</span>
                      <span className="district-caste__nums">
                        <span className="district-caste__pct">{pct.toFixed(2)}%</span>
                        <span className="district-caste__count">{nf.format(row.total)}</span>
                      </span>
                    </li>
                  )
                })
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
