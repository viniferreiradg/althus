import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Map, Clock, Wallet, User } from 'lucide-react';
import { BottomNav } from './BottomNav';

const ITEMS = [
  { id: 'mapa',      label: 'Mapa',      icon: <Map size={22} /> },
  { id: 'historico', label: 'Histórico', icon: <Clock size={22} /> },
  { id: 'carteira',  label: 'Carteira',  icon: <Wallet size={22} /> },
  { id: 'perfil',    label: 'Perfil',    icon: <User size={22} /> },
];

const meta: Meta<typeof BottomNav> = {
  title: 'Mobile/BottomNav',
  component: BottomNav,
  tags: ['autodocs'],
  argTypes: {
    iconOnly: { control: 'boolean' },
    activeId: { control: 'select', options: ITEMS.map(i => i.id) },
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'map',
      values: [
        { name: 'map',  value: '#1a1c20' },
        { name: 'dark', value: '#0a0a0b' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div
        data-theme="dark"
        style={{
          maxWidth: 393,
          margin: '0 auto',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          background: 'linear-gradient(160deg, #1a2030 0%, #0d1018 100%)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof BottomNav>;

export const Default: Story = {
  args: { items: ITEMS, activeId: 'mapa', iconOnly: true },
};

export const MapaActive: Story = {
  args: { items: ITEMS, activeId: 'mapa' },
};

export const HistoricoActive: Story = {
  args: { items: ITEMS, activeId: 'historico' },
};

export const CarteiraActive: Story = {
  args: { items: ITEMS, activeId: 'carteira' },
};

export const PerfilActive: Story = {
  args: { items: ITEMS, activeId: 'perfil' },
};

export const WithLabels: Story = {
  args: { items: ITEMS, activeId: 'mapa', iconOnly: false },
};

export const Interactive: Story = {
  render: () => {
    const [active, setActive] = useState('mapa');
    return <BottomNav items={ITEMS} activeId={active} onSelect={setActive} />;
  },
};
