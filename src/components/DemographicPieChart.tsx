import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const nf = new Intl.NumberFormat('en-IN')

export type DemographicPieDatum = {
  name: string
  value: number
  fill: string
}

export function recordToDemographicPieData(
  rows: Record<string, number>,
  colorByLabel: Record<string, string>,
  fallbackFill: string,
): DemographicPieDatum[] {
  return Object.entries(rows).map(([name, value]) => ({
    name,
    value,
    fill: colorByLabel[name] ?? fallbackFill,
  }))
}

type TooltipProps = {
  active?: boolean
  payload?: ReadonlyArray<{ payload?: unknown }>
  chartTotal: number
}

function DemographicPieTooltip({ active, payload, chartTotal }: TooltipProps) {
  if (!active || !payload?.length) return null
  const p = payload[0]?.payload as DemographicPieDatum | undefined
  if (!p) return null
  const pct = chartTotal > 0 ? (p.value / chartTotal) * 100 : 0
  return (
    <div className="demographic-pie__tooltip">
      <div className="demographic-pie__tooltip-title">{p.name}</div>
      <div className="demographic-pie__tooltip-line">
        <strong>{nf.format(p.value)}</strong> ({pct.toFixed(1)}%)
      </div>
    </div>
  )
}

export function DemographicPieChart({
  data,
  size = 160,
  'aria-label': ariaLabel = 'Demographic breakdown',
}: {
  data: DemographicPieDatum[]
  size?: number
  'aria-label'?: string
}) {
  const chartTotal = data.reduce((s, d) => s + d.value, 0)
  if (chartTotal <= 0) return null

  const chartData = data.filter((d) => d.value > 0)
  if (!chartData.length) return null

  return (
    <div
      className="demographic-pie__wrap"
      style={{ width: size, height: size }}
      aria-label={ariaLabel}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius="42%"
            paddingAngle={0.6}
            stroke="#fff"
            strokeWidth={0.75}
            isAnimationActive={true}
          >
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} stroke="#fff" />
            ))}
          </Pie>
          <Tooltip
            content={(props) => (
              <DemographicPieTooltip
                active={props.active}
                payload={props.payload}
                chartTotal={chartTotal}
              />
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
