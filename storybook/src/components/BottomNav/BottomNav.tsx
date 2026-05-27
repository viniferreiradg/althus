import { ReactNode } from 'react';
import styles from './BottomNav.module.css';

export interface NavItemDef {
  id: string;
  label: string;
  icon: ReactNode;
}

export interface BottomNavProps {
  items: NavItemDef[];
  activeId?: string;
  onSelect?: (id: string) => void;
  /** When true, hides text labels — icons only (default: true for Althus) */
  iconOnly?: boolean;
  className?: string;
}

export function BottomNav({
  items,
  activeId,
  onSelect,
  iconOnly = true,
  className,
}: BottomNavProps) {
  return (
    <nav
      className={[styles.bottomNav, className ?? ''].filter(Boolean).join(' ')}
      aria-label="Navegação principal"
    >
      {items.map(item => (
        <button
          key={item.id}
          className={[
            styles.navItem,
            item.id === activeId ? styles.navActive : '',
          ].filter(Boolean).join(' ')}
          onClick={() => onSelect?.(item.id)}
          aria-label={item.label}
          aria-current={item.id === activeId ? 'page' : undefined}
          data-tab={item.id}
        >
          <span className={styles.navIcon}>{item.icon}</span>
          {!iconOnly && <span className={styles.navLabel}>{item.label}</span>}
        </button>
      ))}
    </nav>
  );
}
