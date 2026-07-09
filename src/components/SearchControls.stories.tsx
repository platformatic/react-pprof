import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { SearchControls } from './SearchControls.js'
import { FrameData, FlameNode } from '../renderer/index.js'

const makeNode = (id: string, name: string, value: number, depth: number, fileName?: string): FlameNode => ({
  id,
  name,
  value,
  selfValue: value / 2,
  sampleCount: value,
  selfSampleCount: value / 2,
  children: [],
  depth,
  x: 0,
  width: 0.5,
  selfWidth: 0.25,
  fileName,
})

const sampleFrames: FlameNode[] = [
  makeNode('root', 'root', 1000, 0),
  makeNode('root/main', 'main', 1000, 1, 'main.go'),
  makeNode('root/main/serveHTTP', 'serveHTTP', 600, 2, 'server.go'),
  makeNode('root/main/serveHTTP/handleRequest', 'handleRequest', 450, 3, 'server.go'),
  makeNode('root/main/serveHTTP/handleRequest/parseJSON', 'parseJSON', 200, 4, 'parser.go'),
  makeNode('root/main/runWorker', 'runWorker', 400, 2, 'worker.go'),
  makeNode('root/main/runWorker/processJob', 'processJob', 350, 3, 'worker.go'),
]

const meta = {
  title: 'SearchControls',
  component: SearchControls,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onFrameSelect: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1e1e1e', padding: '40px', minWidth: '500px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchControls>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    frames: sampleFrames,
    onFrameSelect: (frame) => console.log('Frame selected:', frame),
    textColor: '#ffffff',
  },
}

export const CustomColors: Story = {
  args: {
    frames: sampleFrames,
    onFrameSelect: (frame) => console.log('Frame selected:', frame),
    textColor: '#00ff00',
    fontSize: '16px',
  },
}

export const Interactive: Story = {
  render: () => {
    const [selectedFrame, setSelectedFrame] = useState<FrameData | null>(null)

    return (
      <div>
        <SearchControls
          frames={sampleFrames}
          selectedFrame={selectedFrame}
          onFrameSelect={setSelectedFrame}
          textColor="#ffffff"
        />
        <div style={{ marginTop: '20px', color: '#ffffff', textAlign: 'center' }}>
          Selected: {selectedFrame ? selectedFrame.name : 'none'}
        </div>
      </div>
    )
  },
}
