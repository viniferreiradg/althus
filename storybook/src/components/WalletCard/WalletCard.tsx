import React from 'react';
import styles from './WalletCard.module.css';

interface WalletCardProps {
  balance: string;
  onAddFunds?: () => void;
  onMenuClick?: () => void;
}

export const WalletCard: React.FC<WalletCardProps> = ({
  balance,
  onAddFunds,
  onMenuClick,
}) => {
  const [intPart, decPart] = balance.split(',');

  return (
    <div className={styles.walletCard}>
      <div className={styles.walletCard__header}>
        <span className={styles.walletCard__label}>Saldo disponível</span>
        <button
          className={styles.walletCard__menuBtn}
          onClick={onMenuClick}
          aria-label="Mais opções"
        >
          {/* dots icon rendered via Lucide in HTML; placeholder here */}
          <span>···</span>
        </button>
      </div>

      <div className={styles.walletCard__balance}>
        <span className={styles.walletCard__currency}>R$</span>
        <span className={styles.walletCard__amount}>
          {intPart}
          {decPart !== undefined && <span style={{ opacity: 0.7 }}>,{decPart}</span>}
        </span>
      </div>

      <button className={styles.walletCard__cta} onClick={onAddFunds}>
        + Adicionar saldo
      </button>
    </div>
  );
};

export default WalletCard;
