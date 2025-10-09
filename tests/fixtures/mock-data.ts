// Mock data generation for tests - moved from src to keep src/ clean
import { Profile, StringTable, ValueType, Sample, Location, Function, Line } from 'pprof-format'

export function generateMockProfile(): Profile {
  // Create string table
  const stringTable = new StringTable()

  // Function definitions
  const functions = [
    { name: 'main', file: 'main.go', lineRange: [10, 50] },
    { name: 'app.Run', file: 'app/server.go', lineRange: [25, 100] },
    { name: 'http.ListenAndServe', file: 'net/http/server.go', lineRange: [2500, 2600] },
    { name: 'server.handleRequest', file: 'internal/server.go', lineRange: [45, 200] },
    { name: 'handler.Process', file: 'handlers/process.go', lineRange: [15, 80] },
    { name: 'db.Query', file: 'database/query.go', lineRange: [120, 180] },
    { name: 'json.Marshal', file: 'encoding/json/encode.go', lineRange: [160, 220] },
    { name: 'crypto.Hash', file: 'crypto/hash.go', lineRange: [35, 90] },
    { name: 'sort.Sort', file: 'sort/sort.go', lineRange: [230, 280] },
    { name: 'strings.Join', file: 'strings/strings.go', lineRange: [400, 450] },
    { name: 'fmt.Sprintf', file: 'fmt/print.go', lineRange: [180, 240] },
    { name: 'runtime.GC', file: 'runtime/mgc.go', lineRange: [1200, 1300] },
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
      startLine: func.lineRange[0],
    }))
  })

  // Create Location objects
  const locations: Location[] = []
  profileFunctions.forEach((func, i) => {
    const locationId = i + 1
    const lineNumber = functions[i].lineRange[0] + Math.floor(Math.random() * (functions[i].lineRange[1] - functions[i].lineRange[0]))

    locations.push(new Location({
      id: locationId,
      line: [new Line({
        functionId: func.id,
        line: lineNumber,
      })]
    }))
  })

  // Generate sample call stacks
  const samples: Sample[] = []

  // Generate realistic call stacks with some self-time for parent frames
  for (let i = 0; i < 80; i++) {
    let locationIds: number[] = []
    let value = Math.floor(Math.random() * 50) + 1

    if (i < 40) {
      // First 40 samples: deep stacks for realistic nested calls
      const stackDepth = Math.floor(Math.random() * 4) + 2
      locationIds.push(1) // main function
      
      for (let j = 1; j < stackDepth; j++) {
        const randomFuncIdx = Math.floor(Math.random() * (functions.length - 1)) + 1
        locationIds.push(randomFuncIdx + 1)
      }
    } else if (i < 65) {
      // Next 25 samples: shorter stacks to give parent frames self-time
      const stackDepth = Math.floor(Math.random() * 2) + 1 // 1-2 depth
      locationIds.push(1) // main function
      
      for (let j = 1; j < stackDepth; j++) {
        const randomFuncIdx = Math.floor(Math.random() * 3) + 1 // Use first few functions more often
        locationIds.push(randomFuncIdx + 1)
      }
      // Give these samples higher values to represent self-time
      value = Math.floor(Math.random() * 60) + 20
    } else {
      // Last 15 samples: single-frame samples (pure self-time)
      const randomFuncIdx = Math.floor(Math.random() * 6) + 1
      locationIds.push(randomFuncIdx)
      value = Math.floor(Math.random() * 40) + 15
    }

    samples.push(new Sample({
      locationId: locationIds,
      value: [1, value], // [sample count, cpu nanoseconds]
    }))
  }

  // Create value types for CPU profiling (samples count + CPU time)
  const sampleType = [
    new ValueType({
      type: stringTable.dedup('samples'),
      unit: stringTable.dedup('count'),
    }),
    new ValueType({
      type: stringTable.dedup('cpu'),
      unit: stringTable.dedup('nanoseconds'),
    })
  ]

  // Create the profile
  return new Profile({
    sampleType,
    sample: samples,
    location: locations,
    function: profileFunctions,
    stringTable,
    timeNanos: BigInt(Date.now() * 1000000), // Current time in nanoseconds
    durationNanos: 1000000000, // 1 second
    periodType: new ValueType({
      type: stringTable.dedup('cpu'),
      unit: stringTable.dedup('nanoseconds'),
    }),
    period: 10000000, // 10ms
  })
}

export function generateMockHeapProfile(): Profile {
  // Create string table
  const stringTable = new StringTable()

  // Function definitions for heap allocation scenarios
  const functions = [
    { name: 'main', file: 'main.go', lineRange: [10, 50] },
    { name: 'app.Run', file: 'app/server.go', lineRange: [25, 100] },
    { name: 'http.ListenAndServe', file: 'net/http/server.go', lineRange: [2500, 2600] },
    { name: 'handler.ProcessRequest', file: 'handlers/request.go', lineRange: [45, 200] },
    { name: 'buffer.Allocate', file: 'internal/buffer.go', lineRange: [15, 80] },
    { name: 'json.Unmarshal', file: 'encoding/json/decode.go', lineRange: [120, 180] },
    { name: 'bytes.Buffer.Grow', file: 'bytes/buffer.go', lineRange: [160, 220] },
    { name: 'string.Builder.Grow', file: 'strings/builder.go', lineRange: [35, 90] },
    { name: 'cache.Store', file: 'cache/memory.go', lineRange: [230, 280] },
    { name: 'slice.Append', file: 'internal/slice.go', lineRange: [400, 450] },
    { name: 'map.Allocate', file: 'runtime/map.go', lineRange: [180, 240] },
    { name: 'runtime.mallocgc', file: 'runtime/malloc.go', lineRange: [900, 1100] },
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
      startLine: func.lineRange[0],
    }))
  })

  // Create Location objects
  const locations: Location[] = []
  profileFunctions.forEach((func, i) => {
    const locationId = i + 1
    const lineNumber = functions[i].lineRange[0] + Math.floor(Math.random() * (functions[i].lineRange[1] - functions[i].lineRange[0]))

    locations.push(new Location({
      id: locationId,
      line: [new Line({
        functionId: func.id,
        line: lineNumber,
      })]
    }))
  })

  // Generate heap allocation samples
  const samples: Sample[] = []

  // Generate realistic allocation patterns
  for (let i = 0; i < 100; i++) {
    let locationIds: number[] = []
    // Heap profiles typically have bytes allocated
    // Generate varying allocation sizes (from 64 bytes to 10MB)
    const size = Math.pow(2, Math.floor(Math.random() * 14) + 6) // 64B to 16MB
    const value = Math.floor(size + Math.random() * size * 0.5)

    if (i < 50) {
      // First 50 samples: deep allocation stacks
      const stackDepth = Math.floor(Math.random() * 5) + 2
      locationIds.push(1) // main function

      for (let j = 1; j < stackDepth; j++) {
        const randomFuncIdx = Math.floor(Math.random() * (functions.length - 1)) + 1
        locationIds.push(randomFuncIdx + 1)
      }
    } else if (i < 80) {
      // Next 30 samples: medium depth allocations
      const stackDepth = Math.floor(Math.random() * 3) + 2
      locationIds.push(1) // main function

      for (let j = 1; j < stackDepth; j++) {
        const randomFuncIdx = Math.floor(Math.random() * 4) + 1
        locationIds.push(randomFuncIdx + 1)
      }
    } else {
      // Last 20 samples: shallow allocations (more self-space)
      const stackDepth = Math.floor(Math.random() * 2) + 1
      const randomFuncIdx = Math.floor(Math.random() * 6) + 1
      locationIds.push(randomFuncIdx)
      if (stackDepth > 1) {
        locationIds.push(Math.floor(Math.random() * 3) + 2)
      }
    }

    samples.push(new Sample({
      locationId: locationIds,
      value: [1, value], // [allocation count, space in bytes]
    }))
  }

  // Create value types for heap profile (allocations count + space in bytes)
  const sampleType = [
    new ValueType({
      type: stringTable.dedup('objects'),
      unit: stringTable.dedup('count'),
    }),
    new ValueType({
      type: stringTable.dedup('space'),
      unit: stringTable.dedup('bytes'),
    })
  ]

  // Create the profile
  return new Profile({
    sampleType,
    sample: samples,
    location: locations,
    function: profileFunctions,
    stringTable,
    timeNanos: BigInt(Date.now() * 1000000),
    durationNanos: 0, // Heap profiles don't have duration
    periodType: new ValueType({
      type: stringTable.dedup('space'),
      unit: stringTable.dedup('bytes'),
    }),
    period: 524288, // 512KB sampling rate
  })
}
