import styles from './Skeleton.module.css';

export interface SkeletonProps {
  /** Largura do bloco. Ex: '100%', 200, '12rem' */
  width?: string | number;
  /** Altura do bloco. Ex: 20, '1.5rem'. Padrão: 16px via CSS */
  height?: string | number;
  /** Override do border-radius. Ex: '50%' para círculo, 'var(--radius-full)' para pílula */
  borderRadius?: string;
  className?: string;
}

export function Skeleton({ width, height, borderRadius, className }: SkeletonProps) {
  return (
    <span
      className={`${styles.skeleton}${className ? ` ${className}` : ''}`}
      style={{
        width:  typeof width  === 'number' ? `${width}px`  : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius,
      }}
      aria-hidden="true"
      role="presentation"
    />
  );
}
