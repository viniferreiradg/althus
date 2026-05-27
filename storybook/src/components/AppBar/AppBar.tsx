import { ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';
import styles from './AppBar.module.css';

export interface AppBarProps {
  /** Title displayed in the center */
  title?: string;
  /** Callback for the back button. When provided, renders the back arrow. */
  onBack?: () => void;
  /** Optional action element on the right side */
  action?: ReactNode;
  className?: string;
}

export function AppBar({ title, onBack, action, className }: AppBarProps) {
  return (
    <header className={[styles.appBar, className ?? ''].filter(Boolean).join(' ')}>
      <div className={`${styles.appBarSide} ${styles.appBarSideLeft}`}>
        {onBack && (
          <button
            className={styles.appBarIconBtn}
            onClick={onBack}
            aria-label="Voltar"
          >
            <ChevronLeft size={24} />
          </button>
        )}
      </div>

      {title && <span className={styles.appBarTitle}>{title}</span>}

      <div className={`${styles.appBarSide} ${styles.appBarSideRight}`}>
        {action}
      </div>
    </header>
  );
}
