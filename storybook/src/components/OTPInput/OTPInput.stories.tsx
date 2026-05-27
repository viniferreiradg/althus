import type { Meta, StoryObj } from '@storybook/react';
import { OTPInput } from './OTPInput';

const meta: Meta<typeof OTPInput> = {
  title: 'Mobile/OTPInput',
  component: OTPInput,
  tags: ['autodocs'],
  argTypes: {
    length:   { control: { type: 'number', min: 4, max: 8 } },
    error:    { control: 'boolean' },
    success:  { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#0a0a0b' }],
    },
  },
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ maxWidth: 393, margin: '0 auto', padding: '24px 16px' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof OTPInput>;

export const Default: Story = {
  args: { length: 6 },
};

export const WithError: Story = {
  args: { length: 6, error: true },
};

export const WithSuccess: Story = {
  args: { length: 6, success: true },
};

export const Disabled: Story = {
  args: { length: 6, disabled: true },
};

export const FourDigits: Story = {
  args: { length: 4 },
};
