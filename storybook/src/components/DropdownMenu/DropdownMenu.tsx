import React, { useState, useRef, useEffect } from 'react';
import styles from './DropdownMenu.module.css';

export interface DropdownMenuItem {
  label: string;
  icon?: React.ReactNode;
  destructive?: boolean;
  onClick?: () => void;
}

export interface DropdownMenuSection {
  items: DropdownMenuItem[];
}

interface DropdownMenuProps {
  trigger: React.ReactNode;
  sections: DropdownMenuSection[];
  align?: 'start' | 'center' | 'end';
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  sections,
  align = 'end',
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className={styles.dropdownMenu} ref={ref}>
      <div onClick={() => setOpen(o => !o)}>{trigger}</div>

      <div className={[
        styles.dropdownMenu__panel,
        styles[align],
        open ? styles.open : '',
      ].join(' ')}>
        {sections.map((section, si) => (
          <React.Fragment key={si}>
            {si > 0 && <div className={styles.dropdownMenu__divider} />}
            {section.items.map((item, ii) => (
              <button
                key={ii}
                className={[
                  styles.dropdownMenu__item,
                  item.destructive ? styles['dropdownMenu__item--destructive'] : '',
                ].join(' ')}
                onClick={() => { item.onClick?.(); setOpen(false); }}
              >
                {item.icon && (
                  <span className={styles.dropdownMenu__item__icon}>{item.icon}</span>
                )}
                {item.label}
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
