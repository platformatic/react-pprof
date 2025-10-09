import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { FlameGraph } from './FlameGraph'
import { StackDetails } from './StackDetails'
import { FullFlameGraph } from './FullFlameGraph'
import { Profile, StringTable, ValueType, Sample, Location, Function, Line } from 'pprof-format'

// Create a realistic heap allocation profile
const createHeapProfile = (): Profile => {
  const stringTable = new StringTable()

  // Realistic heap allocation functions (memory-intensive operations)
  const functions = [
    { name: 'main', file: '/app/server.js', line: 1 },
    { name: 'Express.createServer', file: '/app/node_modules/express/lib/application.js', line: 42 },
    { name: 'app.use', file: '/app/node_modules/express/lib/application.js', line: 178 },
    { name: 'middleware.bodyParser', file: '/app/node_modules/body-parser/index.js', line: 56 },
    { name: 'Buffer.allocUnsafe', file: 'buffer.js', line: 345 },
    { name: 'json.parse', file: '/app/node_modules/body-parser/lib/types/json.js', line: 89 },
    { name: 'imageController.upload', file: '/app/controllers/image.js', line: 124 },
    { name: 'multer.storage', file: '/app/node_modules/multer/storage/disk.js', line: 234 },
    { name: 'fs.readFile', file: 'fs.js', line: 456 },
    { name: 'Buffer.alloc', file: 'buffer.js', line: 289 },
    { name: 'sharp.resize', file: '/app/node_modules/sharp/lib/resize.js', line: 567 },
    { name: 'imageProcessing.pipeline', file: '/app/services/image-processing.js', line: 89 },
    { name: 'cache.set', file: '/app/services/cache.js', line: 145 },
    { name: 'Redis.set', file: '/app/node_modules/redis/lib/client.js', line: 678 },
    { name: 'Object.create', file: '/app/models/User.js', line: 23 },
    { name: 'Array.map', file: '/app/controllers/user.js', line: 156 },
    { name: 'JSON.stringify', file: 'json.js', line: 234 },
    { name: 'String.concat', file: '/app/utils/strings.js', line: 78 },
    { name: 'database.query', file: '/app/services/database.js', line: 345 },
    { name: 'pg.Pool.query', file: '/app/node_modules/pg/lib/pool.js', line: 456 },
    { name: 'ResultSet.parse', file: '/app/node_modules/pg/lib/result.js', line: 123 },
    { name: 'template.render', file: '/app/node_modules/handlebars/lib/handlebars.js', line: 567 },
    { name: 'Handlebars.compile', file: '/app/node_modules/handlebars/dist/handlebars.js', line: 1234 },
    { name: 'String.replace', file: '/app/utils/template.js', line: 45 },
    { name: 'crypto.createHash', file: 'crypto.js', line: 789 },
    { name: 'zlib.gzip', file: 'zlib.js', line: 234 },
    { name: 'stream.Transform', file: 'stream.js', line: 890 },
    { name: 'EventEmitter.emit', file: 'events.js', line: 123 },
    { name: 'Array.push', file: '/app/services/aggregator.js', line: 67 },
    { name: 'Map.set', file: '/app/services/session.js', line: 234 },
  ]

  // Create Function objects
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

  // Create Location objects
  const locations: Location[] = []
  profileFunctions.forEach((func, i) => {
    const locationId = i + 1
    const lineNumber = functions[i].line + Math.floor(Math.random() * 30)

    locations.push(new Location({
      id: locationId,
      line: [new Line({
        functionId: func.id,
        line: lineNumber
      })]
    }))
  })

  // Create heap allocation samples with varying sizes
  const samples: Sample[] = []

  // Helper function to create allocation samples with realistic sizes
  const createAllocationSamples = (baseStack: number[], branches: Array<{stack: number[], weight: number, sizeMultiplier: number}>) => {
    const totalWeight = branches.reduce((sum, branch) => sum + branch.weight, 0)

    branches.forEach(branch => {
      const sampleCount = Math.floor((branch.weight / totalWeight) * 80)

      for (let i = 0; i < sampleCount; i++) {
        // Generate realistic allocation sizes (bytes)
        // Different operations have different typical allocation sizes
        const baseSize = Math.pow(2, Math.floor(Math.random() * 16) + 6) // 64B to 4MB
        const size = Math.floor(baseSize * branch.sizeMultiplier * (0.8 + Math.random() * 0.4))

        samples.push(new Sample({
          locationId: [...baseStack, ...branch.stack].reverse(),
          value: [size]
        }))
      }
    })
  }

  // Base server stack
  const baseServerStack = [1, 2, 3] // main -> Express.createServer -> app.use

  // Branch 1: Request body parsing (high frequency, medium allocations - 40%)
  createAllocationSamples(baseServerStack, [
    { stack: [4, 5], weight: 40, sizeMultiplier: 0.5 }, // bodyParser -> Buffer.allocUnsafe
    { stack: [4, 6], weight: 30, sizeMultiplier: 0.3 }, // bodyParser -> json.parse
  ])

  // Branch 2: Image upload and processing (low frequency, LARGE allocations - 20%)
  const imageStack = [...baseServerStack, 7] // imageController.upload
  createAllocationSamples(imageStack, [
    { stack: [8, 9, 10], weight: 15, sizeMultiplier: 10.0 }, // multer -> fs.readFile -> Buffer.alloc (large images)
    { stack: [11, 12], weight: 10, sizeMultiplier: 8.0 }, // sharp.resize -> imageProcessing.pipeline (large buffers)
    { stack: [13, 14], weight: 5, sizeMultiplier: 5.0 }, // cache.set -> Redis.set (large cache entries)
  ])

  // Branch 3: Database operations (medium frequency, medium allocations - 25%)
  const dbStack = [...baseServerStack, 19] // database.query
  createAllocationSamples(dbStack, [
    { stack: [20, 21], weight: 25, sizeMultiplier: 1.5 }, // pg.Pool.query -> ResultSet.parse
    { stack: [15, 16], weight: 15, sizeMultiplier: 0.8 }, // Object.create -> Array.map
  ])

  // Branch 4: Template rendering (medium frequency, medium allocations - 15%)
  const templateStack = [...baseServerStack, 22] // template.render
  createAllocationSamples(templateStack, [
    { stack: [23, 24], weight: 15, sizeMultiplier: 1.2 }, // Handlebars.compile -> String.replace
    { stack: [17], weight: 10, sizeMultiplier: 0.6 }, // JSON.stringify
  ])

  // Branch 5: Crypto operations (low frequency, small allocations - 8%)
  createAllocationSamples(baseServerStack, [
    { stack: [25], weight: 8, sizeMultiplier: 0.2 }, // crypto.createHash
  ])

  // Branch 6: Compression (low frequency, large allocations - 10%)
  createAllocationSamples([...baseServerStack, 17], [ // After JSON.stringify
    { stack: [26, 27], weight: 10, sizeMultiplier: 3.0 }, // zlib.gzip -> stream.Transform
  ])

  // Branch 7: Event handling and aggregation (high frequency, small allocations - 12%)
  createAllocationSamples(baseServerStack, [
    { stack: [28, 29], weight: 12, sizeMultiplier: 0.15 }, // EventEmitter -> Array.push
    { stack: [30], weight: 8, sizeMultiplier: 0.1 }, // Map.set (session storage)
  ])

  // Add some base samples for root coverage
  for (let i = 0; i < 100; i++) {
    samples.push(new Sample({
      locationId: [1],
      value: [Math.floor(Math.random() * 512) + 64] // 64B to 576B
    }))
  }

  for (let i = 0; i < 80; i++) {
    samples.push(new Sample({
      locationId: [2, 1],
      value: [Math.floor(Math.random() * 1024) + 128] // 128B to 1152B
    }))
  }

  // Create value types for heap profile
  const sampleType = [new ValueType({
    type: stringTable.dedup('space'),
    unit: stringTable.dedup('bytes')
  })]

  // Create the profile
  return new Profile({
    sampleType,
    sample: samples,
    location: locations,
    function: profileFunctions,
    stringTable,
    timeNanos: Date.now() * 1000000,
    durationNanos: 0, // Heap profiles don't have duration
    periodType: new ValueType({
      type: stringTable.dedup('space'),
      unit: stringTable.dedup('bytes')
    }),
    period: 524288 // 512KB sampling rate
  })
}

// Create the heap profile
const heapProfile = createHeapProfile()

const meta: Meta<typeof FlameGraph> = {
  title: 'HeapProfile',
  component: FlameGraph,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'responsive',
    },
  },
  decorators: [
    (Story) => (
      <div style={{
        padding: '20px',
        backgroundColor: '#1e1e1e',
        width: '100%',
        height: '100vh',
        boxSizing: 'border-box'
      }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    profile: {
      control: false,
      table: { disable: true },
    },
    onFrameClick: { control: false },
    onZoomChange: { control: false },
    onAnimationComplete: { control: false },
    width: {
      control: { type: 'number' },
      description: 'Width of the flamegraph',
    },
    height: {
      control: { type: 'number' },
      description: 'Height of the flamegraph',
    },
    primaryColor: {
      control: { type: 'color' },
      description: 'Primary color for the frames',
    },
    secondaryColor: {
      control: { type: 'color' },
      description: 'Secondary color for the frames',
    },
    backgroundColor: {
      control: { type: 'color' },
      description: 'Background color',
    },
    textColor: {
      control: { type: 'color' },
      description: 'Text color',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    profile: heapProfile,
    width: 800,
    primaryColor: '#9b59b6',
    secondaryColor: '#e74c3c',
    backgroundColor: '#1e1e1e',
    textColor: '#ffffff',
  },
}

export const GreenTheme: Story = {
  args: {
    profile: heapProfile,
    width: 800,
    primaryColor: '#27ae60',
    secondaryColor: '#16a085',
    backgroundColor: '#1e1e1e',
    textColor: '#ffffff',
  },
}

export const OrangeTheme: Story = {
  args: {
    profile: heapProfile,
    width: 800,
    primaryColor: '#e67e22',
    secondaryColor: '#d35400',
    backgroundColor: '#2c3e50',
    textColor: '#ecf0f1',
  },
}

export const LightTheme: Story = {
  args: {
    profile: heapProfile,
    width: 800,
    primaryColor: '#8e44ad',
    secondaryColor: '#c0392b',
    backgroundColor: '#ecf0f1',
    textColor: '#2c3e50',
  },
}

// Interactive story with FlameGraph and StackDetails side by side
export const WithStackDetails: Story = {
  render: (args) => {
    const [selectedFrame, setSelectedFrame] = useState<any | null>(null)
    const [stackTrace, setStackTrace] = useState<any[]>([])
    const [children, setChildren] = useState<any[]>([])

    const handleFrameClick = (frame: any, stack: any[], frameChildren: any[]) => {
      setSelectedFrame(frame)
      setStackTrace(stack)
      setChildren(frameChildren)
    }

    return (
      <div style={{
        display: 'flex',
        gap: '20px',
        height: '100vh',
        padding: '20px',
        boxSizing: 'border-box',
        backgroundColor: args.backgroundColor
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <FlameGraph
            {...args}
            width="100%"
            onFrameClick={handleFrameClick}
          />
        </div>
        <div style={{ width: '400px', minWidth: '400px' }}>
          <StackDetails
            selectedFrame={selectedFrame}
            stackTrace={stackTrace}
            children={children}
            backgroundColor={args.backgroundColor}
            textColor={args.textColor}
            primaryColor={args.primaryColor}
            secondaryColor={args.secondaryColor}
          />
        </div>
      </div>
    )
  },
  args: {
    profile: heapProfile,
    primaryColor: '#9b59b6',
    secondaryColor: '#e74c3c',
    backgroundColor: '#1e1e1e',
    textColor: '#ffffff',
  },
  parameters: {
    layout: 'fullscreen',
  },
}

// Full FlameGraph with all features
export const FullFlameGraphWithHeap: Story = {
  render: (args) => (
    <FullFlameGraph
      profile={args.profile}
      height={600}
      primaryColor={args.primaryColor}
      secondaryColor={args.secondaryColor}
      backgroundColor={args.backgroundColor}
      textColor={args.textColor}
      showHottestFrames={true}
      showControls={true}
      showFrameDetails={true}
      showStackDetails={true}
    />
  ),
  args: {
    profile: heapProfile,
    primaryColor: '#9b59b6',
    secondaryColor: '#e74c3c',
    backgroundColor: '#1e1e1e',
    textColor: '#ffffff',
  },
  parameters: {
    layout: 'fullscreen',
  },
}
