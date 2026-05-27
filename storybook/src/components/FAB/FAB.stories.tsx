import type { Meta, StoryObj } from '@storybook/react';
import { Car, QrCode, Zap, Plus, Navigation } from 'lucide-react';
import { FAB } from './FAB';

const meta: Meta<typeof FAB> = {
  title: 'Mobile/FAB',
  component: FAB,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['glass', 'brand'] },
    size:    { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
  parameters: {
    backgrounds: {
      default: 'map',
      values: [
        { name: 'map',  value: '#1a2030' },
        { name: 'dark', value: '#0a0a0b' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ padding: 32 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof FAB>;

export const VehicleSelector: Story = {
  args: {
    icon: <Car size={20} />,
    variant: 'glass',
    size: 'md',
    'aria-label': 'Selecionar veículo',
  },
};

export const QRScanner: Story = {
  args: {
    icon: <QrCode size={20} />,
    variant: 'glass',
    size: 'md',
    'aria-label': 'Escanear QR Code',
  },
};

export const BrandVariant: Story = {
  args: {
    icon: <Zap size={22} />,
    variant: 'brand',
    size: 'md',
    'aria-label': 'Iniciar recarga',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <FAB icon={<Plus size={16} />} size="sm" aria-label="Pequeno" />
      <FAB icon={<Plus size={20} />} size="md" aria-label="Médio" />
      <FAB icon={<Plus size={24} />} size="lg" aria-label="Grande" />
    </div>
  ),
};

export const MapContext: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <FAB icon={<Car size={20} />}    aria-label="Selecionar veículo" />
      <FAB icon={<Navigation size={20} />} aria-label="Minha localização" />
      <FAB icon={<QrCode size={20} />} aria-label="Escanear QR Code" />
      <FAB icon={<Zap size={20} />}    aria-label="Iniciar recarga" variant="brand" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    icon: <QrCode size={20} />,
    disabled: true,
    'aria-label': 'Desabilitado',
  },
};
