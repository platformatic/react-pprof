// @ts-ignore - React is used in JSX
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { StackDetails } from './StackDetails.js'

const meta = {
  title: 'StackDetails',
  component: StackDetails,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{
        backgroundColor: '#0a0a0a',
        padding: '40px',
        minWidth: '800px',
        minHeight: '600px'
      }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StackDetails>

export default meta
type Story = StoryObj<typeof meta>

// Sample frame data with realistic self-time values
const selectedFrame = {
  id: 'root/main/server/handler',
  name: 'requestHandler',
  value: 1250,
  selfValue: 150, // Self time: 1250 - (450+320+280+200) = 0 -> adjusted for demo
  width: 0.25,
  selfWidth: 0.03, // 3% self time
  depth: 3,
  fileName: '/app/src/handlers/request.js',
  lineNumber: 156
}

const stackTrace = [
  {
    id: 'root',
    name: 'root',
    value: 5000,
    selfValue: 0, // Root has no self time
    width: 1.0,
    selfWidth: 0,
    depth: 0,
  },
  {
    id: 'root/main',
    name: 'main',
    value: 4800,
    selfValue: 800, // 4800 - 4000 (server overhead)
    width: 0.96,
    selfWidth: 0.16, // 16% self time  
    depth: 1,
    fileName: '/app/src/main.js',
    lineNumber: 12
  },
  {
    id: 'root/main/server',
    name: 'startServer',
    value: 3200,
    selfValue: 650, // 3200 - 2550 (handler overhead)
    width: 0.64,
    selfWidth: 0.13, // 13% self time
    depth: 2,
    fileName: '/app/src/server.js',
    lineNumber: 45
  },
  {
    id: 'root/main/server/handler',
    name: 'requestHandler',
    value: 1250,
    selfValue: 150, // 1250 - 1100 (children total)
    width: 0.25,
    selfWidth: 0.03, // 3% self time
    depth: 3,
    fileName: '/app/src/handlers/request.js',
    lineNumber: 156
  }
]

const children = [
  {
    id: 'root/main/server/handler/auth',
    name: 'authenticate',
    value: 450,
    selfValue: 450, // Leaf node - all self time
    width: 0.09,
    selfWidth: 0.09, // 9% self time
    depth: 4,
    fileName: '/app/src/auth/index.js',
    lineNumber: 23
  },
  {
    id: 'root/main/server/handler/validate',
    name: 'validateRequest',
    value: 320,
    selfValue: 320, // Leaf node - all self time
    width: 0.064,
    selfWidth: 0.064, // 6.4% self time
    depth: 4,
    fileName: '/app/src/validators/request.js',
    lineNumber: 89
  },
  {
    id: 'root/main/server/handler/process',
    name: 'processData',
    value: 180, // Reduced to show more self time in parent
    selfValue: 180, // Leaf node - all self time
    width: 0.036,
    selfWidth: 0.036, // 3.6% self time
    depth: 4,
    fileName: '/app/src/processors/data.js',
    lineNumber: 156
  },
  {
    id: 'root/main/server/handler/response',
    name: 'sendResponse',
    value: 150, // Reduced to show more self time in parent
    selfValue: 150, // Leaf node - all self time
    width: 0.03,
    selfWidth: 0.03, // 3% self time
    depth: 4,
    fileName: '/app/src/handlers/response.js',
    lineNumber: 34
  }
]

export const Default: Story = {
  render: (args) => <StackDetails {...args} />,
  args: {
    selectedFrame,
    stackTrace,
    children,
    backgroundColor: '#1e1e1e',
    textColor: '#ffffff',
    primaryColor: '#ff4444',
    secondaryColor: '#ffcc66',
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
}

export const NoSelection: Story = {
  args: {
    selectedFrame: null,
    stackTrace: [],
    children: [],
    backgroundColor: '#1e1e1e',
    textColor: '#ffffff',
    primaryColor: '#ff4444',
    secondaryColor: '#ffcc66',
  },
}

export const LeafNode: Story = {
  args: {
    selectedFrame: {
      id: 'root/main/server/handler/leaf',
      name: 'calculateHash',
      value: 150,
      selfValue: 150, // Leaf node - all self time
      width: 0.03,
      selfWidth: 0.03, // 3% self time
      depth: 5,
      fileName: '/app/src/crypto/hash.js',
      lineNumber: 234
    },
    stackTrace: [
      ...stackTrace,
      {
        id: 'root/main/server/handler/leaf',
        name: 'calculateHash',
        value: 150,
        selfValue: 150, // Leaf node - all self time
        width: 0.03,
        selfWidth: 0.03, // 3% self time
        depth: 5,
        fileName: '/app/src/crypto/hash.js',
        lineNumber: 234
      }
    ],
    children: [],
    backgroundColor: '#1e1e1e',
    textColor: '#ffffff',
    primaryColor: '#ff4444',
    secondaryColor: '#ffcc66',
  },
}

export const ManyChildren: Story = {
  render: (args) => <StackDetails {...args} />,
  args: {
    selectedFrame,
    stackTrace,
    children: [
      ...children,
      {
        id: 'root/main/server/handler/logging',
        name: 'logRequest',
        value: 50,
        selfValue: 50, // Leaf node - all self time
        width: 0.01,
        selfWidth: 0.01, // 1% self time
        depth: 4,
        fileName: '/app/src/logging/request.js',
        lineNumber: 12
      },
      {
        id: 'root/main/server/handler/metrics',
        name: 'recordMetrics',
        value: 45,
        selfValue: 45, // Leaf node - all self time
        width: 0.009,
        selfWidth: 0.009, // 0.9% self time
        depth: 4,
        fileName: '/app/src/metrics/recorder.js',
        lineNumber: 67
      },
      {
        id: 'root/main/server/handler/cache',
        name: 'checkCache',
        value: 40,
        selfValue: 40, // Leaf node - all self time
        width: 0.008,
        selfWidth: 0.008, // 0.8% self time
        depth: 4,
        fileName: '/app/src/cache/manager.js',
        lineNumber: 89
      },
      {
        id: 'root/main/server/handler/rate',
        name: 'rateLimiter',
        value: 35,
        selfValue: 35, // Leaf node - all self time
        width: 0.007,
        selfWidth: 0.007, // 0.7% self time
        depth: 4,
        fileName: '/app/src/middleware/ratelimit.js',
        lineNumber: 45
      }
    ],
    backgroundColor: '#1e1e1e',
    textColor: '#ffffff',
    primaryColor: '#ff4444',
    secondaryColor: '#ffcc66',
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
}

export const CustomColors: Story = {
  render: (args) => <StackDetails {...args} />,
  args: {
    selectedFrame,
    stackTrace,
    children,
    backgroundColor: '#2a2a2a',
    textColor: '#00ff00',
    primaryColor: '#00aaff',
    secondaryColor: '#ff00ff',
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
}

export const DeepStack: Story = {
  args: {
    selectedFrame: {
      id: 'root/a/b/c/d/e/f/g/h',
      name: 'deeplyNestedFunction',
      value: 50,
      width: 0.01,
      depth: 8,
      fileName: '/app/src/deep/nested/module.js',
      lineNumber: 567
    },
    stackTrace: [
      {
        id: 'root',
        name: 'root',
        value: 5000,
        width: 1.0,
        depth: 0,
      },
      {
        id: 'root/a',
        name: 'functionA',
        value: 4000,
        width: 0.8,
        depth: 1,
        fileName: '/app/src/a.js',
        lineNumber: 10
      },
      {
        id: 'root/a/b',
        name: 'functionB',
        value: 3000,
        width: 0.6,
        depth: 2,
        fileName: '/app/src/b.js',
        lineNumber: 20
      },
      {
        id: 'root/a/b/c',
        name: 'functionC',
        value: 2000,
        width: 0.4,
        depth: 3,
        fileName: '/app/src/c.js',
        lineNumber: 30
      },
      {
        id: 'root/a/b/c/d',
        name: 'functionD',
        value: 1000,
        width: 0.2,
        depth: 4,
        fileName: '/app/src/d.js',
        lineNumber: 40
      },
      {
        id: 'root/a/b/c/d/e',
        name: 'functionE',
        value: 500,
        width: 0.1,
        depth: 5,
        fileName: '/app/src/e.js',
        lineNumber: 50
      },
      {
        id: 'root/a/b/c/d/e/f',
        name: 'functionF',
        value: 250,
        width: 0.05,
        depth: 6,
        fileName: '/app/src/f.js',
        lineNumber: 60
      },
      {
        id: 'root/a/b/c/d/e/f/g',
        name: 'functionG',
        value: 100,
        width: 0.02,
        depth: 7,
        fileName: '/app/src/g.js',
        lineNumber: 70
      },
      {
        id: 'root/a/b/c/d/e/f/g/h',
        name: 'deeplyNestedFunction',
        value: 50,
        width: 0.01,
        depth: 8,
        fileName: '/app/src/deep/nested/module.js',
        lineNumber: 567
      }
    ],
    children: [],
    backgroundColor: '#1e1e1e',
    textColor: '#ffffff',
    primaryColor: '#ff4444',
    secondaryColor: '#ffcc66',
  },
}

export const LargeValues: Story = {
  render: (args) => <StackDetails {...args} />,
  args: {
    selectedFrame: {
      id: 'root/main/expensive',
      name: 'expensiveOperation',
      value: 1234567890,
      width: 0.85,
      depth: 2,
      fileName: '/app/src/operations/expensive.js',
      lineNumber: 1234
    },
    stackTrace: [
      {
        id: 'root',
        name: 'root',
        value: 1500000000,
        width: 1.0,
        depth: 0,
      },
      {
        id: 'root/main',
        name: 'main',
        value: 1450000000,
        width: 0.97,
        depth: 1,
        fileName: '/app/src/main.js',
        lineNumber: 1
      },
      {
        id: 'root/main/expensive',
        name: 'expensiveOperation',
        value: 1234567890,
        width: 0.85,
        depth: 2,
        fileName: '/app/src/operations/expensive.js',
        lineNumber: 1234
      }
    ],
    children: [
      {
        id: 'root/main/expensive/compute',
        name: 'intensiveComputation',
        value: 987654321,
        width: 0.68,
        depth: 3,
        fileName: '/app/src/compute/intensive.js',
        lineNumber: 456
      },
      {
        id: 'root/main/expensive/memory',
        name: 'memoryOperation',
        value: 246913569,
        width: 0.17,
        depth: 3,
        fileName: '/app/src/memory/operation.js',
        lineNumber: 789
      }
    ],
    backgroundColor: '#1e1e1e',
    textColor: '#ffffff',
    primaryColor: '#ff4444',
    secondaryColor: '#ffcc66',
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
}
