import type { Meta, StoryObj } from '@storybook/react'
import { FullFlameGraph } from './FullFlameGraph'
import { Profile, StringTable, ValueType, Sample, Location, Function, Line } from 'pprof-format'

// Use the same profile creation function as other stories
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
    const lineNumber = functions[i].line + Math.floor(Math.random() * 20)

    locations.push(new Location({
      id: locationId,
      line: [new Line({
        functionId: func.id,
        line: lineNumber
      })]
    }))
  })

  // Create realistic call stacks with varying frequencies
  const samples: Sample[] = []

  // Helper function to create branching stacks
  const createBranchingSamples = (baseStack: number[], branches: Array<{stack: number[], weight: number}>) => {
    const totalWeight = branches.reduce((sum, branch) => sum + branch.weight, 0)

    branches.forEach(branch => {
      const sampleCount = Math.floor((branch.weight / totalWeight) * 100)

      for (let i = 0; i < sampleCount; i++) {
        samples.push(new Sample({
          locationId: [...baseStack, ...branch.stack].reverse(),
          value: [Math.floor(Math.random() * 5) + 1]
        }))
      }
    })
  }

  // Root: main (all requests go through this)
  const baseServerStack = [1, 2]

  // Branch 1: HTTP Server setup
  createBranchingSamples(baseServerStack, [
    { stack: [3, 4, 5], weight: 5 }
  ])

  // Branch 2: Main request handling path
  const requestStack = [...baseServerStack, 6, 7, 8, 9]

  // Sub-branch 2.1: Authentication
  createBranchingSamples(requestStack, [
    { stack: [10, 11, 12], weight: 70 }
  ])

  // Sub-branch 2.2: User profile endpoint
  const userEndpointStack = [...requestStack, 13, 14]

  // Database queries
  createBranchingSamples(userEndpointStack, [
    { stack: [15, 16, 17, 18], weight: 40 },
    { stack: [24, 25, 26], weight: 10 }
  ])

  // Response handling
  createBranchingSamples([...requestStack, 19], [
    { stack: [20, 21], weight: 30 },
    { stack: [30, 31], weight: 20 }
  ])

  // Crypto operations
  createBranchingSamples(requestStack, [
    { stack: [22, 23], weight: 15 }
  ])

  // File operations
  createBranchingSamples(requestStack, [
    { stack: [27, 28], weight: 10 }
  ])

  // Compression
  createBranchingSamples([...requestStack, 19], [
    { stack: [31], weight: 5 }
  ])

  // Add hot spots
  for (let i = 0; i < 50; i++) {
    samples.push(new Sample({
      locationId: [20, 19, 9, 8, 7, 6, 2, 1],
      value: [10]
    }))
  }

  for (let i = 0; i < 30; i++) {
    samples.push(new Sample({
      locationId: [22, 11, 10, 9, 8, 7, 6, 2, 1],
      value: [15]
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
    durationNanos: 10000000000,
    periodType: new ValueType({
      type: stringTable.dedup('cpu'),
      unit: stringTable.dedup('nanoseconds')
    }),
    period: 10000000
  })
}

// Create the realistic profile
const profile = createNodeJSServerProfile()

const meta = {
  title: 'FullFlameGraph',
  component: FullFlameGraph,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    // Exclude profile from controls as it contains BigInt values that can't be serialized
    profile: { control: false },
  },
} satisfies Meta<typeof FullFlameGraph>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    profile,
    height: 500,
    primaryColor: '#ff4444',
    secondaryColor: '#ffcc66',
    backgroundColor: '#1e1e1e',
    textColor: '#ffffff',
  },
}

export const CustomColors: Story = {
  args: {
    profile,
    height: 500,
    primaryColor: '#00ff00',
    secondaryColor: '#0099ff',
    backgroundColor: '#2a2a2a',
    textColor: '#ffff00',
  },
}

export const LargerFlameGraph: Story = {
  args: {
    profile,
    height: 700,
    primaryColor: '#ff4444',
    secondaryColor: '#ffcc66',
    backgroundColor: '#1e1e1e',
    textColor: '#ffffff',
  },
}

export const WithoutHottestFrames: Story = {
  args: {
    profile,
    height: 500,
    showHottestFrames: false,
    primaryColor: '#ff4444',
    secondaryColor: '#ffcc66',
    backgroundColor: '#1e1e1e',
    textColor: '#ffffff',
  },
}

export const WithoutControls: Story = {
  args: {
    profile,
    height: 500,
    showControls: false,
    primaryColor: '#ff4444',
    secondaryColor: '#ffcc66',
    backgroundColor: '#1e1e1e',
    textColor: '#ffffff',
  },
}

export const WithoutDetails: Story = {
  args: {
    profile,
    height: 500,
    showFrameDetails: false,
    primaryColor: '#ff4444',
    secondaryColor: '#ffcc66',
    backgroundColor: '#1e1e1e',
    textColor: '#ffffff',
  },
}

export const MinimalView: Story = {
  args: {
    profile,
    height: 500,
    showHottestFrames: false,
    showControls: false,
    showFrameDetails: false,
    primaryColor: '#ff4444',
    secondaryColor: '#ffcc66',
    backgroundColor: '#1e1e1e',
    textColor: '#ffffff',
  },
}

export const TallHottestFramesBar: Story = {
  args: {
    profile,
    height: 500,
    hottestFramesHeight: 60,
    primaryColor: '#ff4444',
    secondaryColor: '#ffcc66',
    backgroundColor: '#1e1e1e',
    textColor: '#ffffff',
  },
}

export const CompactView: Story = {
  args: {
    profile,
    height: 300,
    hottestFramesHeight: 20,
    primaryColor: '#ff4444',
    secondaryColor: '#ffcc66',
    backgroundColor: '#1e1e1e',
    textColor: '#ffffff',
  },
}

export const WithStackDetailsOverlay: Story = {
  args: {
    profile,
    height: 500,
    showStackDetails: true,
    primaryColor: '#ff4444',
    secondaryColor: '#ffcc66',
    backgroundColor: '#1e1e1e',
    textColor: '#ffffff',
  },
  parameters: {
    docs: {
      description: {
        story: 'Click on any frame in the flame graph to see the StackDetails overlay appear on the right side.',
      },
    },
  },
}

export const WithoutStackDetailsOverlay: Story = {
  args: {
    profile,
    height: 500,
    showStackDetails: false,
    primaryColor: '#ff4444',
    secondaryColor: '#ffcc66',
    backgroundColor: '#1e1e1e',
    textColor: '#ffffff',
  },
  parameters: {
    docs: {
      description: {
        story: 'StackDetails overlay is disabled in this view.',
      },
    },
  },
}

export const WithFrameDetails: Story = {
  args: {
    profile,
    height: 500,
    showFrameDetails: true,
    showStackDetails: true,
    primaryColor: '#ff4444',
    secondaryColor: '#ffcc66',
    backgroundColor: '#1e1e1e',
    textColor: '#ffffff',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the inline FrameDetails below the controls when a frame is selected.',
      },
    },
  },
}
