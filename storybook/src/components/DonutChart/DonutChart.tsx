import styles from './DonutChart.module.css';

export interface DonutChartProps {
  title?: string;
  series: number[];
  labels: string[];
  colors?: string[];
  height?: number;
  totalLabel?: string;
}

const CX = 50;
const CY = 50;
const R = 38;
const SW = 8;
const GAP = 12; // arc-length gap between segments (SW/2 is eaten by each rounded cap)

export function DonutChart({
  title,
  series,
  labels,
  colors,
  height = 280,
  totalLabel = 'Total',
}: DonutChartProps) {
  const resolvedColors = colors ?? [
    'var(--color-status-success-fg)',
    'var(--color-status-disabled-fg)',
    'var(--color-status-warning-fg)',
    'var(--color-status-info-fg)',
  ];

  const total = series.reduce((a, b) => a + b, 0);
  const circ = 2 * Math.PI * R;

  const segments: { da: string; rot: number; color: string }[] = [];
  if (total > 0) {
    let cum = 0;
    series.forEach((v, i) => {
      const arc = (v / total) * circ;
      const len = Math.max(0, arc - GAP);
      const rot = (cum / circ) * 360 - 90;
      cum += arc;
      segments.push({ da: `${len} ${circ}`, rot, color: resolvedColors[i % resolvedColors.length] });
    });
  }

  const svgSize = Math.max(80, height - 90);

  return (
    <div className={styles.root}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.svgWrap}>
        <svg viewBox="0 0 100 100" width={svgSize} height={svgSize} aria-hidden="true">
          {segments.map((s, i) => (
            <circle
              key={i}
              cx={CX}
              cy={CY}
              r={R}
              fill="none"
              stroke={s.color}
              strokeWidth={SW}
              strokeLinecap="round"
              strokeDasharray={s.da}
              transform={`rotate(${s.rot}, ${CX}, ${CY})`}
            />
          ))}
          <text
            x={CX}
            y={44}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="16"
            fontWeight="600"
            fontFamily="Inter, system-ui, sans-serif"
            fill="var(--color-text-primary)"
          >
            {total}
          </text>
          <text
            x={CX}
            y={59}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="8"
            fontFamily="Inter, system-ui, sans-serif"
            fill="var(--color-text-tertiary)"
          >
            {totalLabel}
          </text>
        </svg>
      </div>
      <div className={styles.legend}>
        {labels.map((lbl, i) => (
          <div key={i} className={styles.legendItem}>
            <span
              className={styles.legendDot}
              style={{ background: resolvedColors[i % resolvedColors.length] }}
            />
            <span className={styles.legendLabel}>{lbl}</span>
            <span className={styles.legendValue}>{series[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
