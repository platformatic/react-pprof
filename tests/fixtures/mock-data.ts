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
      value: [value],
    }))
  }

  // Create value types
  const sampleType = [new ValueType({
    type: stringTable.dedup('samples'),
    unit: stringTable.dedup('count'),
  })]

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
