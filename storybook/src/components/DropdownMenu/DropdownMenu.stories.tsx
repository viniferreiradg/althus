import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from './DropdownMenu';

const TriggerBtn = () => (
  <button style={{
    background: 'none', border: 'none', cursor: 'pointer',
    padding: '4px', borderRadius: '8px', color: 'currentColor',
    display: 'flex', alignItems: 'center',
  }}>
    ···
  </button>
);

const meta: Meta<typeof DropdownMenu> = {
  title: 'Mobile/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
  },
  args: {
    trigger: <TriggerBtn />,
    sections: [
      {
        items: [
          { label: 'Ver extrato' },
          { label: 'Meus cupons' },
        ],
      },
      {
        items: [
          { label: 'Excluir', destructive: true },
        ],
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const AlignEnd: Story = {
  args: { align: 'end' },
};

export const AlignStart: Story = {
  args: { align: 'start' },
};

export const AlignCenter: Story = {
  args: { align: 'center' },
};

export const SingleSection: Story = {
  args: {
    align: 'end',
    sections: [
      {
        items: [
          { label: 'Ver extrato' },
          { label: 'Meus cupons' },
          { label: 'Configurações' },
        ],
      },
    ],
  },
};
