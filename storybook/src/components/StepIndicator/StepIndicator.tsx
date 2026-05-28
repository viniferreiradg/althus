import styles from './StepIndicator.module.css';

export interface StepIndicatorProps {
  /** Current step (1-indexed) */
  current: number;
  /** Total number of steps */
  total: number;
  /** Optional accessible label for the progress region */
  'aria-label'?: string;
}

export function StepIndicator({
  current,
  total,
  'aria-label': ariaLabel,
}: StepIndicatorProps) {
  return (
    <div
      className={styles.stepRoot}
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={ariaLabel ?? `Passo ${current} de ${total}`}
    >
      <div className={styles.stepBars}>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={[styles.stepBar, i < current ? styles.done : styles.pending].join(' ')}
          />
        ))}
      </div>
      <span className={styles.stepLabel} aria-hidden="true">
        Passo {current} de {total}
      </span>
    </div>
  );
}
