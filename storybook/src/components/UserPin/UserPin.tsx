import React from 'react';
import { User } from 'lucide-react';
import styles from './UserPin.module.css';

export interface UserPinProps {
  pulse?: boolean;
  className?: string;
  'aria-label'?: string;
}

export function UserPin({
  pulse = false,
  className,
  'aria-label': ariaLabel = 'Sua localização',
}: UserPinProps) {
  return (
    <div
      className={[styles.userPin, pulse && styles.pulse, className].filter(Boolean).join(' ')}
      role="img"
      aria-label={ariaLabel}
    >
      {pulse && <span className={styles.pingRing} aria-hidden="true" />}
      <User size={18} />
    </div>
  );
}
