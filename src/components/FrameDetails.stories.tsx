import type { Meta, StoryObj } from '@storybook/react'
import { FrameDetails } from './FrameDetails.js'
import type { FrameData } from '../renderer/index.js'

const meta = {
  title: 'FrameDetails',
  component: FrameDetails,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1e1e1e', padding: '40px', minWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FrameDetails>

export default meta
type Story = StoryObj<typeof meta>

const sampleFrame: FrameData = {
  id: 'root/main/fastify/routing/handler',
  name: 'handler',
  functionName: 'Context.handler',
  fileName: '/app/node_modules/fastify/lib/context.js',
  lineNumber: 156,
  value: 45.5,
  totalValue: 250.75,
  depth: 4,
  x: 0.2,
  width: 0.3,
}

export const Default: Story = {
  args: {
    frame: sampleFrame,
    selfTime: 45.5,
    textColor: '#ffffff',
    fontSize: '12px',
  },
}

export const NoSelection: Story = {
  args: {
    frame: null,
    textColor: '#ffffff',
    fontSize: '12px',
  },
}

export const WithoutFileName: Story = {
  args: {
    frame: {
      ...sampleFrame,
      fileName: undefined,
      lineNumber: undefined,
    },
    selfTime: 45.5,
    textColor: '#ffffff',
    fontSize: '12px',
  },
}

export const WithoutSelfTime: Story = {
  args: {
    frame: sampleFrame,
    textColor: '#ffffff',
    fontSize: '12px',
  },
}

export const LongFunctionName: Story = {
  args: {
    frame: {
      ...sampleFrame,
      functionName: 'VeryLongFunctionNameThatMightCauseLayoutIssues.prototype.someMethod',
      fileName: '/very/long/path/to/some/deeply/nested/file/in/node_modules/package/lib/index.js',
    },
    selfTime: 123.45,
    textColor: '#ffffff',
    fontSize: '12px',
  },
}

export const CustomColors: Story = {
  args: {
    frame: sampleFrame,
    selfTime: 45.5,
    textColor: '#00ff00',
    fontSize: '14px',
  },
}

export const HighPrecisionValues: Story = {
  args: {
    frame: {
      ...sampleFrame,
      value: 0.12345678,
      totalValue: 1234.56789,
    },
    selfTime: 0.12345678,
    textColor: '#ffffff',
    fontSize: '12px',
  },
}

export const ZeroValues: Story = {
  args: {
    frame: {
      ...sampleFrame,
      value: 0,
      totalValue: 100,
    },
    selfTime: 0,
    textColor: '#ffffff',
    fontSize: '12px',
  },
}
