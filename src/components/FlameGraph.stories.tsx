import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { FlameGraph } from './FlameGraph.js'
import { StackDetails } from './StackDetails.js'
import { Profile, StringTable, ValueType, Sample, Location, Function, Line } from 'pprof-format'

// Create a realistic Node.js server profile
const createNodeJSServerProfile = (): Profile => {
  const stringTable = new StringTable()

  // Realistic Node.js server function stack with Fastify and Postgres (JS frames only)
  const functions = [
    { name: 'main', file: '/app/server.js', line: 1 },
    { name: 'fastify', file: '/app/node_modules/fastify/lib/fastify.js', line: 56 },
    { name: 'app.listen', file: '/app/node_modules/fastify/lib/server.js', line: 234 },
    { name: 'Server.listen', file: 'http.js', line: 135 },
    { name: 'setupListenHandle', file: '_http_server.js', line: 372 },
    { name: 'Server.connectionListener', file: '_http_server.js', line: 442 },
    { name: 'parserOnIncoming', file: '_http_server.js', line: 928 },
    { name: 'fastify.routing', file: '/app/node_modules/fastify/lib/route.js', line: 89 },
    { name: 'Context.handler', file: '/app/node_modules/fastify/lib/context.js', line: 156 },
    { name: 'preHandler.run', file: '/app/node_modules/fastify/lib/hooks.js', line: 67 },
    { name: 'authHook', file: '/app/hooks/auth.js', line: 23 },
    { name: 'jwt.verify', file: '/app/node_modules/@fastify/jwt/jwt.js', line: 142 },
    { name: 'userController.getProfile', file: '/app/controllers/user.js', line: 42 },
    { name: 'User.findById', file: '/app/models/User.js', line: 67 },
    { name: 'pool.query', file: '/app/node_modules/pg/lib/pool.js', line: 567 },
    { name: 'Client.query', file: '/app/node_modules/pg/lib/client.js', line: 512 },
    { name: 'Connection.query', file: '/app/node_modules/pg/lib/connection.js', line: 156 },
    { name: 'Socket.write', file: '/app/node_modules/pg/lib/connection.js', line: 98 },
    { name: 'reply.send', file: '/app/node_modules/fastify/lib/reply.js', line: 345 },
    { name: 'JSON.stringify', file: 'json.js', line: 87 },
    { name: 'Object.toJSON', file: '/app/models/User.js', line: 89 },
    { name: 'bcrypt.compare', file: '/app/node_modules/bcrypt/bcrypt.js', line: 191 },
    { name: 'crypto.randomBytes', file: 'crypto.js', line: 238 },
    { name: 'redis.get', file: '/app/node_modules/redis/lib/client.js', line: 876 },
    { name: 'RedisClient.sendCommand', file: '/app/node_modules/redis/lib/client.js', line: 432 },
    { name: 'net.Socket.write', file: 'net.js', line: 1015 },
    { name: 'fs.readFile', file: 'fs.js', line: 342 },
    { name: 'fs.open', file: 'fs.js', line: 468 },
    { name: 'template.render', file: '/app/node_modules/@fastify/view/index.js', line: 178 },
    { name: 'compile', file: '/app/node_modules/handlebars/lib/handlebars.js', line: 234 },
    { name: 'zlib.gzip', file: 'zlib.js', line: 567 }
  ]

  // Create Function objects with realistic Node.js paths
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
    const lineNumber = functions[i].line + Math.floor(Math.random() * 20) // Realistic line variation

    locations.push(new Location({
      id: locationId,
      line: [new Line({
        functionId: func.id,
        line: lineNumber
      })]
    }))
  })

  // Create realistic call stacks with varying frequencies to create narrowing flame graph
  const samples: Sample[] = []

  // Helper function to create branching stacks with realistic frequency distributions
  const createBranchingSamples = (baseStack: number[], branches: Array<{stack: number[], weight: number}>) => {
    const totalWeight = branches.reduce((sum, branch) => sum + branch.weight, 0)

    branches.forEach(branch => {
      // Calculate sample count based on weight (creates narrowing effect)
      const sampleCount = Math.floor((branch.weight / totalWeight) * 100)

      for (let i = 0; i < sampleCount; i++) {
        samples.push(new Sample({
          locationId: [...baseStack, ...branch.stack].reverse(), // Reverse for correct pprof order (leaf to root)
          value: [Math.floor(Math.random() * 5) + 1]
        }))
      }
    })
  }

  // Root: main (all requests go through this)
  const baseServerStack = [1, 2] // main -> fastify

  // Branch 1: HTTP Server setup (low frequency - 5%)
  createBranchingSamples(baseServerStack, [
    { stack: [3, 4, 5], weight: 5 }  // app.listen -> Server.listen -> setupListenHandle
  ])

  // Branch 2: Main HTTP request handling (95% of traffic)
  const httpBaseStack = [...baseServerStack, 6, 7, 8, 9, 10] // HTTP request pipeline (fastify routing)

  // Create multiple sub-branches for different request types
  createBranchingSamples(httpBaseStack, [
    // Auth hook branch (60% of requests)
    { stack: [11, 12], weight: 60 },

    // Skip auth for public routes (40% of requests)
    { stack: [13], weight: 40 }
  ])

  // Branch 2a: Authenticated requests subdivision
  const authStack = [...httpBaseStack, 11, 12] // auth hook + jwt.verify
  createBranchingSamples(authStack, [
    // User profile requests (30%)
    { stack: [13, 14], weight: 30 },

    // Admin requests (5%)
    { stack: [13, 22], weight: 5 },

    // Regular API requests (25%)
    { stack: [13], weight: 25 }
  ])

  // Branch 2b: Database operations (from user requests)
  const userControllerStack = [...authStack, 13, 14] // userController.getProfile -> User.findById
  createBranchingSamples(userControllerStack, [
    // Successful Postgres queries (70%)
    { stack: [15, 16, 17, 18], weight: 70 },

    // Cache hits (30% - shorter stack)
    { stack: [24, 25], weight: 30 }
  ])

  // Branch 2c: Response generation (from successful requests)
  const responseStack = [...userControllerStack, 15, 16, 17, 18]
  createBranchingSamples(responseStack, [
    // JSON serialization (80%)
    { stack: [19, 20, 21], weight: 80 },

    // Template rendering (15%)
    { stack: [29, 30], weight: 15 },

    // Plain text (5%)
    { stack: [19], weight: 5 }
  ])

  // Branch 2d: Security operations (subset of auth requests)
  const securityStack = [...authStack, 13, 22] // bcrypt operations
  createBranchingSamples(securityStack, [
    // Password hashing (60%)
    { stack: [23], weight: 60 },

    // Token generation (40%)
    { stack: [23], weight: 40 }
  ])

  // Branch 2e: File operations (small subset)
  const fileStack = [...httpBaseStack, 13]
  createBranchingSamples(fileStack, [
    // Static file serving (10%)
    { stack: [27, 28], weight: 10 },

    // Config file reads (2%)
    { stack: [27], weight: 2 }
  ])

  // Branch 2f: Compression (subset of responses)
  const compressionBaseStack = [...responseStack, 19, 20, 21] // After JSON
  createBranchingSamples(compressionBaseStack, [
    // Gzip compression (20% of responses)
    { stack: [31], weight: 20 }
  ])

  // Branch 2g: Redis cache operations (subset)
  createBranchingSamples(authStack, [
    // Session lookup (40%)
    { stack: [24, 25, 26], weight: 40 },

    // Cache invalidation (5%)
    { stack: [24, 25], weight: 5 }
  ])

  // Add some standalone samples for the most common paths to ensure good root coverage
  for (let i = 0; i < 200; i++) {
    samples.push(new Sample({
      locationId: [1], // main (reversed for pprof format)
      value: [1]
    }))
  }

  for (let i = 0; i < 150; i++) {
    samples.push(new Sample({
      locationId: [2, 1], // fastify -> main (reversed for pprof format)
      value: [1]
    }))
  }

  // Create value types for CPU profiling
  const sampleType = [new ValueType({
    type: stringTable.dedup('cpu'),
    unit: stringTable.dedup('nanoseconds')
  })]

  // Create the profile
  return new Profile({
    sampleType,
    sample: samples,
    location: locations,
    function: profileFunctions,
    stringTable,
    timeNanos: Date.now() * 1000000,
    durationNanos: 10000000000, // 10 second profile
    periodType: new ValueType({
      type: stringTable.dedup('cpu'),
      unit: stringTable.dedup('nanoseconds')
    }),
    period: 10000000 // 10ms sampling period
  })
}

// Create the realistic profile
const nodeJSProfile = createNodeJSServerProfile()

const meta: Meta<typeof FlameGraph> = {
  title: 'FlameGraph',
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
    // Exclude profile from controls as it contains BigInt values that can't be serialized
    profile: { 
      control: false,
      table: { disable: true }, // Hide profile from controls since it's complex
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
    fontFamily: {
      control: { type: 'text' },
      description: 'Font family for text labels',
    },
    shadowOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Opacity for text drop shadow',
    },
    unselectedOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Opacity for unselected frames',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    profile: nodeJSProfile,
    width: 800,
    primaryColor: '#ff4444',
    secondaryColor: '#ffcc66',
    backgroundColor: '#1e1e1e',
    textColor: '#ffffff',
  },
}

export const BlueTheme: Story = {
  args: {
    profile: nodeJSProfile,
    width: 800,
    primaryColor: '#2563eb',
    secondaryColor: '#7dd3fc',
    backgroundColor: '#2c3e50',
    textColor: '#ffffff',
  },
}

export const GreenTheme: Story = {
  args: {
    profile: nodeJSProfile,
    width: 800,
    primaryColor: '#2ecc71',
    secondaryColor: '#1e8449',
    backgroundColor: '#1e1e1e',
    textColor: '#ffffff',
    unselectedOpacity: 0.5,
  },
}

export const LightTheme: Story = {
  args: {
    profile: nodeJSProfile,
    width: 800,
    primaryColor: '#e74c3c',
    secondaryColor: '#c0392b',
    backgroundColor: '#ecf0f1',
    textColor: '#2c3e50',
  },
}

export const SmallSize: Story = {
  args: {
    profile: nodeJSProfile,
    width: 400,
    height: 300,
    primaryColor: '#ff4444',
    secondaryColor: '#ffcc66',
    backgroundColor: '#1e1e1e',
    textColor: '#ffffff',
  },
}

export const WithInteractionLogging: Story = {
  args: {
    profile: nodeJSProfile,
    width: 800,
    primaryColor: '#ff4444',
    secondaryColor: '#ffcc66',
    backgroundColor: '#1e1e1e',
    textColor: '#ffffff',
    onFrameClick: (frame, stack, children) => {
      console.log('Frame clicked:', frame)
      console.log('Stack trace:', stack)
      console.log('Children:', children)
    },
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
    profile: nodeJSProfile,
    primaryColor: '#ff4444',
    secondaryColor: '#ffcc66',
    backgroundColor: '#1e1e1e',
    textColor: '#ffffff',
  },
  parameters: {
    layout: 'fullscreen',
  },
}
