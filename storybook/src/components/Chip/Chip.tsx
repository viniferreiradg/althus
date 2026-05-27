import React from 'react';
import styles from './Chip.module.css';

/* ── Chip ────────────────────────────────────────────────────── */
export interface ChipProps {
  /** Texto exibido dentro do chip */
  label: string;
  /** Valor do checkbox */
  value?: string;
  /** Estado marcado */
  checked?: boolean;
  /** Ícone opcional à esquerda do label (ReactNode Lucide) */
  icon?: React.ReactNode;
  /** Callback ao mudar estado */
  onChange?: (value: string, checked: boolean) => void;
}

export function Chip({ label, value = '', checked = false, icon, onChange }: ChipProps) {
  return (
    <label className={styles.chip}>
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={(e) => onChange?.(value, e.target.checked)}
      />
      {icon && <span className={styles.chipIcon}>{icon}</span>}
      {label}
    </label>
  );
}

/* ── ChipGroup ───────────────────────────────────────────────── */
export interface ChipGroupProps {
  children: React.ReactNode;
}

export function ChipGroup({ children }: ChipGroupProps) {
  return <div className={styles.chipGroup}>{children}</div>;
}
