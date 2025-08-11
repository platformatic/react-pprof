import type { Meta, StoryObj } from '@storybook/react'
import { HottestFramesControls } from './HottestFramesControls'
import { Profile, StringTable, ValueType, Sample, Location, Function, Line } from 'pprof-format'
import type { FrameData } from '../renderer'

// Create a sample profile for testing
const createSampleProfile = (): Profile => {
  const stringTable = new StringTable()

  const functions = [
    { name: 'main', file: '/app/main.js', line: 1 },
    { name: 'processRequest', file: '/app/server.js', line: 45 },
    { name: 'handleAuth', file: '/app/auth.js', line: 23 },
    { name: 'validateToken', file: '/app/auth.js', line: 67 },
    { name: 'queryDatabase', file: '/app/db.js', line: 156 },
  ]

  const profileFunctions: Function[] = []
  functions.forEach((func, i) => {
    const funcId = i + 1
    const nameIdx = stringTable.dedup(func.name)
    const filenameIdx = stringTable.dedup(func.file)

    profileFunctions.push(new Function({
      id: funcId,
      name: nameIdx,
      filename: filenameIdx,
      startLine: func.line
    }))
  })

  const locations: Location[] = []
  profileFunctions.forEach((func, i) => {
    locations.push(new Location({
      id: i + 1,
      line: [new Line({
        functionId: func.id,
        line: functions[i].line
      })]
    }))
  })

  const samples: Sample[] = []
  // Create various stacks with different self-times
  samples.push(new Sample({
    locationId: [5, 2, 1], // queryDatabase -> processRequest -> main
    value: [100]
  }))
  samples.push(new Sample({
    locationId: [4, 3, 2, 1], // validateToken -> handleAuth -> processRequest -> main
    value: [50]
  }))
  samples.push(new Sample({
    locationId: [3, 2, 1], // handleAuth -> processRequest -> main
    value: [30]
  }))

  return new Profile({
    sampleType: [new ValueType({
      type: stringTable.dedup('cpu'),
      unit: stringTable.dedup('nanoseconds')
    })],
    sample: samples,
    location: locations,
    function: profileFunctions,
    stringTable,
    timeNanos: Date.now() * 1000000,
    durationNanos: 10000000000,
    periodType: new ValueType({
      type: stringTable.dedup('cpu'),
      unit: stringTable.dedup('nanoseconds')
    }),
    period: 10000000
  })
}

const sampleProfile = createSampleProfile()

const sampleFrame: FrameData = {
  id: 'root/main/processRequest',
  name: 'processRequest',
  functionName: 'processRequest',
  fileName: '/app/server.js',
  lineNumber: 45,
  value: 50,
  totalValue: 180,
  depth: 2,
  x: 0.2,
  width: 0.3,
}

const meta = {
  title: 'HottestFramesControls',
  component: HottestFramesControls,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Exclude profile from controls as it contains BigInt values that can't be serialized
    profile: { control: false },
    onFrameSelect: { control: false },
    selectedFrame: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1e1e1e', padding: '40px', minWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HottestFramesControls>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    profile: sampleProfile,
    selectedFrame: sampleFrame,
    onFrameSelect: (frame) => console.log('Frame selected:', frame),
    textColor: '#ffffff',
  },
}

export const NoSelection: Story = {
  args: {
    profile: sampleProfile,
    selectedFrame: null,
    onFrameSelect: (frame) => console.log('Frame selected:', frame),
    textColor: '#ffffff',
  },
}

export const EmptyProfile: Story = {
  args: {
    profile: new Profile({
      sampleType: [],
      sample: [],
      location: [],
      function: [],
      stringTable: new StringTable(),
      timeNanos: 0,
      durationNanos: 0,
    }),
    selectedFrame: null,
    onFrameSelect: (frame) => console.log('Frame selected:', frame),
    textColor: '#ffffff',
  },
}

export const CustomColors: Story = {
  args: {
    profile: sampleProfile,
    selectedFrame: sampleFrame,
    onFrameSelect: (frame) => console.log('Frame selected:', frame),
    textColor: '#00ff00',
    fontSize: '16px',
  },
}
