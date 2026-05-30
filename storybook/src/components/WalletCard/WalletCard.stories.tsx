import type { Meta, StoryObj } from '@storybook/react';
import { WalletCard } from './WalletCard';

const meta: Meta<typeof WalletCard> = {
  title: 'Mobile/WalletCard',
  component: WalletCard,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'dark' },
  },
};

export default meta;
type Story = StoryObj<typeof WalletCard>;

export const Default: Story = {
  args: { balance: '247,50' },
};

export const ZeroBalance: Story = {
  args: { balance: '0,00' },
};

export const LargeBalance: Story = {
  args: { balance: '1.320,00' },
};
