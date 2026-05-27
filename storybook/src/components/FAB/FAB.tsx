import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './FAB.module.css';

export interface FABProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon to display — use Lucide React */
  icon: ReactNode;
  /** Visual variant */
  variant?: 'glass' | 'brand';
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Accessible label (required) */
  'aria-label': string;
}

export function FAB({
  icon,
  variant = 'glass',
  size = 'md',
  className,
  ...props
}: FABProps) {
  const classes = [
    styles.fab,
    variant === 'brand' ? styles.brand : '',
    size === 'sm' ? styles.sm : '',
    size === 'lg' ? styles.lg : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} {...props}>
      {icon}
    </button>
  );
}
