import type { Meta, StoryObj } from '@storybook/react';
import { StepIndicator } from './StepIndicator';

const meta: Meta<typeof StepIndicator> = {
  title: 'Mobile/StepIndicator',
  component: StepIndicator,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    current: { control: { type: 'number', min: 1, max: 10 } },
    total:   { control: { type: 'number', min: 1, max: 10 } },
  },
};

export default meta;
type Story = StoryObj<typeof StepIndicator>;

export const Step1: Story = { args: { current: 1, total: 5 } };
export const Step2: Story = { args: { current: 2, total: 5 } };
export const Step3: Story = { args: { current: 3, total: 5 } };
export const Step4: Story = { args: { current: 4, total: 5 } };
export const Step5Complete: Story = { args: { current: 5, total: 5 } };
export const ThreeSteps: Story = { args: { current: 2, total: 3 } };
