import type { Meta, StoryObj } from '@storybook/react'
import { HottestFramesBar } from './HottestFramesBar'
import { Profile, StringTable, ValueType, Sample, Location, Function, Line } from 'pprof-format'

// Import the same profile creation function used in FlameGraph stories
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

  // Create realistic call stacks with varying frequencies
  const samples: Sample[] = []

  // Helper function to create branching stacks with realistic frequency distributions
  const createBranchingSamples = (baseStack: number[], branches: Array<{stack: number[], weight: number}>) => {
    const totalWeight = branches.reduce((sum, branch) => sum + branch.weight, 0)

    branches.forEach(branch => {
      // Calculate sample count based on weight (creates narrowing effect)
      const sampleCount = Math.floor((branch.weight / totalWeight) * 100)

      for (let i = 0; i < sampleCount; i++) {
        samples.push(new Sample({
          // Don't reverse - the stack is already in root-to-leaf order (1=main, 2=fastify, etc.)
          // In pprof format, we need leaf-to-root, so we actually need to reverse
          locationId: [...baseStack, ...branch.stack].reverse(),
          value: [Math.floor(Math.random() * 5) + 1]
        }))
      }
    })
  }

  // Root: main (all requests go through this)
  const baseServerStack = [1, 2] // main -> fastify

  // Branch 1: HTTP Server setup (low frequency - 5%)
  createBranchingSamples(baseServerStack, [
    { stack: [3, 4, 5], weight: 5 } // app.listen -> Server.listen -> setupListenHandle
  ])

  // Branch 2: Main request handling path (high frequency - 95%)
  const requestStack = [...baseServerStack, 6, 7, 8, 9] // -> connectionListener -> parserOnIncoming -> routing -> handler

  // Sub-branch 2.1: Authentication (70% of requests)
  createBranchingSamples(requestStack, [
    { stack: [10, 11, 12], weight: 70 } // preHandler -> authHook -> jwt.verify
  ])

  // Sub-branch 2.2: User profile endpoint (30% of requests)
  const userEndpointStack = [...requestStack, 13, 14] // -> userController -> User.findById

  // Database queries (most expensive)
  createBranchingSamples(userEndpointStack, [
    { stack: [15, 16, 17, 18], weight: 40 }, // pool.query -> Client.query -> Connection.query -> Socket.write
    { stack: [24, 25, 26], weight: 10 }       // redis.get -> sendCommand -> net.Socket.write
  ])

  // Response handling
  createBranchingSamples([...requestStack, 19], [
    { stack: [20, 21], weight: 30 },  // reply.send -> JSON.stringify -> Object.toJSON
    { stack: [30, 31], weight: 20 }   // template.render -> compile
  ])

  // Crypto operations (scattered)
  createBranchingSamples(requestStack, [
    { stack: [22, 23], weight: 15 }   // bcrypt.compare -> crypto.randomBytes
  ])

  // File operations
  createBranchingSamples(requestStack, [
    { stack: [27, 28], weight: 10 }   // fs.readFile -> fs.open
  ])

  // Compression
  createBranchingSamples([...requestStack, 19], [
    { stack: [31], weight: 5 }        // zlib.gzip
  ])

  // Add some isolated hot spots (simulating CPU-intensive operations)
  for (let i = 0; i < 50; i++) {
    samples.push(new Sample({
      // This represents the stack: main -> fastify -> ... -> reply.send -> JSON.stringify
      // In pprof format (leaf to root): [20, 19, 9, 8, 7, 6, 2, 1]
      locationId: [20, 19, 9, 8, 7, 6, 2, 1], // JSON.stringify is the leaf
      value: [10]
    }))
  }

  for (let i = 0; i < 30; i++) {
    samples.push(new Sample({
      // This represents: main -> fastify -> ... -> authHook -> ... -> bcrypt.compare
      // In pprof format (leaf to root): [22, 11, 10, 9, 8, 7, 6, 2, 1]
      locationId: [22, 11, 10, 9, 8, 7, 6, 2, 1], // bcrypt.compare is the leaf
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
    durationNanos: 10000000000, // 10 second profile
    periodType: new ValueType({
      type: stringTable.dedup('cpu'),
      unit: stringTable.dedup('nanoseconds')
    }),
    period: 10000000 // 10ms sampling period
  })
}

// Create the realistic profile
const profile = createNodeJSServerProfile()

const meta = {
  title: 'HottestFramesBar',
  component: HottestFramesBar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    // Exclude profile from controls as it contains BigInt values that can't be serialized
    profile: { control: false },
    onFrameSelect: { control: false },
    onNavigationChange: { control: false },
  },
} satisfies Meta<typeof HottestFramesBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    profile,
    primaryColor: '#ff4444',
    secondaryColor: '#ffcc66',
    backgroundColor: '#1e1e1e',
    textColor: '#ffffff',
  },
}

export const CustomColors: Story = {
  args: {
    profile,
    primaryColor: '#00ff00',
    secondaryColor: '#0000ff',
    backgroundColor: '#2a2a2a',
    textColor: '#ffff00',
  },
}
