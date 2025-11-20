import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { FilterControls } from './FilterControls.js'

const meta = {
  title: 'FilterControls',
  component: FilterControls,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onToggle: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1e1e1e', padding: '40px', minWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FilterControls>

export default meta
type Story = StoryObj<typeof meta>

export const Unchecked: Story = {
  args: {
    showAppCodeOnly: false,
    onToggle: (enabled) => console.log('Filter toggled:', enabled),
    textColor: '#ffffff',
  },
}

export const Checked: Story = {
  args: {
    showAppCodeOnly: true,
    onToggle: (enabled) => console.log('Filter toggled:', enabled),
    textColor: '#ffffff',
  },
}

export const CustomColors: Story = {
  args: {
    showAppCodeOnly: false,
    onToggle: (enabled) => console.log('Filter toggled:', enabled),
    textColor: '#00ff00',
    fontSize: '16px',
  },
}

export const Interactive: Story = {
  render: () => {
    const [showAppCodeOnly, setShowAppCodeOnly] = useState(false)

    return (
      <div>
        <FilterControls
          showAppCodeOnly={showAppCodeOnly}
          onToggle={setShowAppCodeOnly}
          textColor="#ffffff"
        />
        <div style={{ marginTop: '20px', color: '#ffffff', textAlign: 'center' }}>
          Current state: {showAppCodeOnly ? 'App Code Only' : 'All Code'}
        </div>
      </div>
    )
  },
}
