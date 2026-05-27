import type { Meta, StoryObj } from '@storybook/react';
import { X, Share2 } from 'lucide-react';
import { AppBar } from './AppBar';

const meta: Meta<typeof AppBar> = {
  title: 'Mobile/AppBar',
  component: AppBar,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    onBack: { action: 'back clicked' },
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#0a0a0b' }],
    },
  },
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ maxWidth: 393, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof AppBar>;

export const Default: Story = {
  args: {
    title: 'Título da tela',
    onBack: undefined,
    action: undefined,
  },
};

export const WithBack: Story = {
  args: {
    title: 'Esqueci minha senha',
    onBack: () => {},
  },
};

export const WithAction: Story = {
  args: {
    title: 'Detalhes',
    onBack: () => {},
    action: (
      <button
        style={{
          width: 40, height: 40,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: 9999, border: 'none', background: 'transparent',
          color: 'var(--color-text-primary)', cursor: 'pointer',
        }}
        aria-label="Compartilhar"
      >
        <Share2 size={20} />
      </button>
    ),
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'Perfil',
  },
};

export const CloseAction: Story = {
  args: {
    title: 'Verificação',
    onBack: () => {},
    action: (
      <button
        style={{
          width: 40, height: 40,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: 9999, border: 'none', background: 'transparent',
          color: 'var(--color-text-primary)', cursor: 'pointer',
        }}
        aria-label="Fechar"
      >
        <X size={20} />
      </button>
    ),
  },
};
