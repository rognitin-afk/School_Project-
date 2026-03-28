import { useCallback, useEffect, useId, useState } from 'react'
import {
  MADHESH_BROAD_GROUPS_TOTAL,
  assertMadheshBroadGroupsIntegrity,
  madheshBroadEthnicGroups,
  type CasteRow,
  type MadheshBroadGroupRow,
} from '../data/madheshBroadEthnicGroups'

const nf = new Intl.NumberFormat('en-IN')

function Chevron({ open }: { open: boolean }) {
  return (
    <span className={`madhesh-broad-acc__chevron${open ? ' madhesh-broad-acc__chevron--open' : ''}`} aria-hidden>
      ▼
    </span>
  )
}

function pctOfProvince(pop: number): number {
  return (pop / MADHESH_BROAD_GROUPS_TOTAL) * 100
}

function CasteTable({ rows }: { rows: CasteRow[] }) {
  if (!rows.length) {
    return (
      <p className="madhesh-broad-acc__placeholder">No caste rows for this group.</p>
    )
  }
  return (
    <table className="madhesh-broad-acc__table">
      <thead>
        <tr>
          <th>Caste / ethnicity</th>
          <th>Population</th>
          <th>% of province</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.name}>
            <td>{r.name}</td>
            <td>{nf.format(r.population)}</td>
            <td>{pctOfProvince(r.population).toFixed(2)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function SubgroupPanel({ group }: { group: MadheshBroadGroupRow }) {
  const [openSub, setOpenSub] = useState<string | null>(null)
  const toggle = useCallback((id: string) => {
    setOpenSub((prev) => (prev === id ? null : id))
  }, [])

  if (!group.subgroups?.length) return null

  return (
    <div className="madhesh-broad-acc__nested">
      {group.nestedHint ? <p className="madhesh-broad-acc__nested-hint">{group.nestedHint}</p> : null}
      {group.subgroups.map((sub) => (
        <div key={sub.id} className="madhesh-broad-acc__sub">
          <button
            type="button"
            className="madhesh-broad-acc__sub-trigger"
            aria-expanded={openSub === sub.id}
            onClick={() => toggle(sub.id)}
          >
            <span className="madhesh-broad-acc__sub-label">
              {sub.label}
              {sub.detail ? <span className="madhesh-broad-acc__sub-detail"> ({sub.detail})</span> : null}
            </span>
            <span className="madhesh-broad-acc__sub-nums">
              {nf.format(sub.castes.reduce((s, c) => s + c.population, 0))}
            </span>
            <Chevron open={openSub === sub.id} />
          </button>
          {openSub === sub.id ? (
            <div className="madhesh-broad-acc__sub-body">
              <CasteTable rows={sub.castes} />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}

function ExpandedBody({ row }: { row: MadheshBroadGroupRow }) {
  if (row.flatCastes?.length) {
    return (
      <div className="madhesh-broad-acc__nested madhesh-broad-acc__nested--flat">
        <CasteTable rows={row.flatCastes} />
      </div>
    )
  }
  if (row.subgroups?.length) {
    return <SubgroupPanel group={row} />
  }
  return null
}

function RowNums({ row }: { row: MadheshBroadGroupRow }) {
  return (
    <span className="madhesh-broad-acc__nums">
      {nf.format(row.population)} <span className="madhesh-broad-acc__sep">·</span>{' '}
      <span className="madhesh-broad-acc__pct">{row.percentOfProvince.toFixed(2)}%</span>
    </span>
  )
}

function TopGroupRow({
  row,
  expanded,
  onToggle,
}: {
  row: MadheshBroadGroupRow
  expanded: boolean
  onToggle: () => void
}) {
  const expandable = Boolean(row.subgroups?.length || row.flatCastes?.length)
  const left = (
    <span className="madhesh-broad-acc__trigger-left">
      <span className="madhesh-broad-acc__dot" style={{ background: row.swatch }} aria-hidden />
      <span className="madhesh-broad-acc__label">{row.label}</span>
    </span>
  )
  const right = (
    <span className="madhesh-broad-acc__trigger-right">
      <RowNums row={row} />
      {expandable ? (
        <Chevron open={expanded} />
      ) : (
        <span className="madhesh-broad-acc__chevron-spacer" aria-hidden />
      )}
    </span>
  )

  return (
    <div
      className={`madhesh-broad-acc__block${expanded && expandable ? ' madhesh-broad-acc__block--open' : ''}`}
    >
      {expandable ? (
        <button type="button" className="madhesh-broad-acc__trigger" onClick={onToggle} aria-expanded={expanded}>
          {left}
          {right}
        </button>
      ) : (
        <div className="madhesh-broad-acc__static">
          {left}
          {right}
        </div>
      )}
      {expanded && expandable ? <ExpandedBody row={row} /> : null}
    </div>
  )
}

export function MadheshBroadEthnicAccordion() {
  const baseId = useId()
  const [openId, setOpenId] = useState<string | null>('dalits')

  useEffect(() => {
    if (import.meta.env.DEV) {
      try {
        assertMadheshBroadGroupsIntegrity()
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }, [])

  return (
    <section className="madhesh-broad-acc" aria-labelledby={`${baseId}-title`}>
      <div className="madhesh-broad-acc__inner">
        <h2 id={`${baseId}-title`} className="madhesh-broad-acc__title">
          Madhesh Pradesh · broad groups (2021)
        </h2>
        <p className="madhesh-broad-acc__intro">
          Click on a group for more info. <strong>All Dalits</strong> and <strong>Janajati</strong> use a second
          level; some groups show the full list in one step.
        </p>

        <div className="madhesh-broad-acc__list" role="list">
          {madheshBroadEthnicGroups.map((row) => (
            <div key={row.id} role="listitem">
              <TopGroupRow row={row} expanded={openId === row.id} onToggle={() => toggle(row.id)} />
            </div>
          ))}
        </div>

        <div className="madhesh-broad-acc__total">
          <span className="madhesh-broad-acc__total-label">Total</span>
          <span className="madhesh-broad-acc__total-nums">
            {nf.format(MADHESH_BROAD_GROUPS_TOTAL)} <span className="madhesh-broad-acc__sep">·</span> ~100%
          </span>
        </div>
      </div>
    </section>
  )
}
