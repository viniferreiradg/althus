import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

/* ── Estilo de card reutilizado nos exemplos compostos ── */
const card: React.CSSProperties = {
  padding: 'var(--spacing-lg)',
  background: 'var(--color-glass-surface)',
  border: '1px solid var(--color-glass-border)',
  borderRadius: 'var(--radius-sm)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-sm)',
};

/* ────────────────────────────────── */

export const Default: Story = {
  args: { width: 240, height: 20 },
};

export const LinhasDeTexto: Story = {
  name: 'Linhas de texto',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', width: 320 }}>
      <Skeleton height={14} width="80%" />
      <Skeleton height={14} width="100%" />
      <Skeleton height={14} width="60%" />
    </div>
  ),
};

export const AvatarComTexto: Story = {
  name: 'Avatar com texto',
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center' }}>
      <Skeleton width={40} height={40} borderRadius="50%" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
        <Skeleton width={120} height={14} />
        <Skeleton width={80}  height={12} />
      </div>
    </div>
  ),
};

export const CartaoMetrica: Story = {
  name: 'Cartão de métrica',
  render: () => (
    <div style={{ ...card, width: 220 }}>
      <Skeleton width={36} height={36} borderRadius="var(--radius-sm)" />
      <Skeleton height={13} width="65%" />
      <Skeleton height={28} width="50%" />
      <Skeleton height={12} width="55%" />
    </div>
  ),
};

export const DashboardCompleto: Story = {
  name: 'Dashboard completo',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>

      {/* ── 5 cartões de KPI ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--spacing-md)' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={card}>
            <Skeleton width={36} height={36} borderRadius="var(--radius-sm)" />
            <Skeleton height={12} width="70%" />
            <Skeleton height={28} width="55%" />
            <Skeleton height={12} width="60%" />
          </div>
        ))}
      </div>

      {/* ── Gráficos ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-md)' }}>

        {/* Line chart */}
        <div style={card}>
          <Skeleton height={16} width="45%" />
          <Skeleton height={220} width="100%" />
        </div>

        {/* Donut chart */}
        <div style={{ ...card, alignItems: 'center' }}>
          <Skeleton height={16} width="60%" />
          <Skeleton width={180} height={180} borderRadius="50%" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)', width: '100%' }}>
            <Skeleton height={12} width="80%" />
            <Skeleton height={12} width="65%" />
            <Skeleton height={12} width="70%" />
            <Skeleton height={12} width="55%" />
          </div>
        </div>

      </div>
    </div>
  ),
};
