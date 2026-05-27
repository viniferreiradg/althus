import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Mail, Bell, Zap, Plug } from 'lucide-react';
import { Chip, ChipGroup } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Chip>;

/* ── Single chip ─────────────────────────────────────────────── */
export const Default: Story = {
  args: { label: 'CCS2', value: 'ccs2', checked: false },
};

export const Checked: Story = {
  args: { label: 'CCS2', value: 'ccs2', checked: true },
};

export const WithIcon: Story = {
  args: { label: 'E-mail', value: 'email', checked: true, icon: <Mail size={14} /> },
};

/* ── ChipGroup — conectores ──────────────────────────────────── */
export const ConectorGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['ccs2']);
    const toggle = (value: string, checked: boolean) =>
      setSelected(prev => checked ? [...prev, value] : prev.filter(v => v !== value));
    const options = ['CCS2', 'CCS1', 'Tipo 2', 'CHAdeMO', 'GB/T'];
    return (
      <div style={{ padding: 24 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}>
          Tipos de conectores
        </span>
        <ChipGroup>
          {options.map(o => (
            <Chip
              key={o}
              label={o}
              value={o.toLowerCase().replace(/\//g, '')}
              checked={selected.includes(o.toLowerCase().replace(/\//g, ''))}
              onChange={toggle}
            />
          ))}
        </ChipGroup>
      </div>
    );
  },
};

/* ── ChipGroup — notificações com ícone ──────────────────────── */
export const NotifGroup: Story = {
  render: () => {
    const [email, setEmail] = useState(true);
    const [sistema, setSistema] = useState(true);
    return (
      <div style={{ padding: 24 }}>
        <ChipGroup>
          <Chip label="E-mail"  value="email"   checked={email}   icon={<Mail size={14} />}  onChange={(_, v) => setEmail(v)} />
          <Chip label="Sistema" value="sistema" checked={sistema} icon={<Bell size={14} />}  onChange={(_, v) => setSistema(v)} />
        </ChipGroup>
      </div>
    );
  },
};
