/* eslint-disable no-console */

import fs from 'fs'
import path from 'path'
import { Profile } from '../../node_modules/pprof-format/dist/index.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Read the profile file
const profilePath = path.join(__dirname, 'profile.pprof')
const buffer = fs.readFileSync(profilePath)

// Decode the profile
const profile = Profile.decode(buffer)

// Convert BigInt values to strings for JSON serialization
function replacer(key, value) {
  if (typeof value === 'bigint') {
    return value.toString()
  }
  return value
}

// Helper to decode string table indices
function getString(stringTable, index) {
  // StringTable is an object with a strings array property
  const strings = stringTable.strings || []
  if (index >= 0 && index < strings.length) {
    return strings[index]
  }
  return `<invalid index: ${index}>`
}

// Analyze the profile structure
console.log('=== PROFILE STRUCTURE ANALYSIS ===\n')

// Debug: Check what stringTable actually is
console.log('StringTable type:', typeof profile.stringTable)
console.log('StringTable constructor:', profile.stringTable?.constructor?.name)
console.log('StringTable keys:', Object.keys(profile.stringTable || {}))

// Try to access strings properly
const strings = []
if (profile.stringTable) {
  // Check if it has a strings array
  if (profile.stringTable.strings) {
    console.log('Found strings array, length:', profile.stringTable.strings.length)
    for (let i = 0; i < Math.min(10, profile.stringTable.strings.length); i++) {
      strings.push(profile.stringTable.strings[i])
      console.log(`  [${i}]: "${profile.stringTable.strings[i]}"`)
    }
  } else {
    // Try indexed access
    for (let i = 0; i < 200; i++) {
      const str = profile.stringTable[i]
      if (str !== undefined) {
        strings.push(str)
        if (strings.length < 10) {
          console.log(`  [${i}]: "${str}"`)
        }
      }
    }
  }
}

console.log('\nTotal strings found:', strings.length)

console.log('\nSample Types:')
profile.sampleType.forEach((st, i) => {
  console.log(`  [${i}]: ${getString(profile.stringTable, st.type)} (${getString(profile.stringTable, st.unit)})`)
})

console.log('\nNumber of Samples:', profile.sample.length)
console.log('Number of Locations:', profile.location.length)
console.log('Number of Functions:', profile.function.length)
console.log('Number of Mappings:', profile.mapping.length)

console.log('\nFirst 5 Functions:')
profile.function.slice(0, 5).forEach(func => {
  console.log(`  Function ${func.id}:`)
  console.log(`    Name: ${getString(profile.stringTable, func.name)}`)
  console.log(`    System Name: ${getString(profile.stringTable, func.systemName)}`)
  console.log(`    Filename: ${getString(profile.stringTable, func.filename)}`)
  console.log(`    Start Line: ${func.startLine}`)
})

console.log('\nFirst 5 Locations:')
profile.location.slice(0, 5).forEach(loc => {
  console.log(`  Location ${loc.id}:`)
  if (loc.line && loc.line.length > 0) {
    loc.line.forEach(line => {
      const func = profile.function.find(f => f.id === line.functionId)
      if (func) {
        console.log(`    Function: ${getString(profile.stringTable, func.name)} (line ${line.line})`)
      }
    })
  }
})

console.log('\nFirst 3 Samples (stack traces):')
profile.sample.slice(0, 3).forEach((sample, idx) => {
  console.log(`  Sample ${idx}:`)
  console.log(`    Values: ${sample.value.join(', ')}`)
  console.log(`    Stack (bottom to top):`)

  // Reverse to show root first
  const reversedLocationIds = [...sample.locationId].reverse()
  reversedLocationIds.forEach((locId, depth) => {
    const location = profile.location.find(l => l.id === locId)
    if (location && location.line && location.line.length > 0) {
      const line = location.line[0]
      const func = profile.function.find(f => f.id === line.functionId)
      if (func) {
        const indent = '      ' + '  '.repeat(depth)
        console.log(`${indent}${getString(profile.stringTable, func.name)}`)
      }
    }
  })
})

// Check for specific patterns in function names
console.log('\n=== FUNCTION NAME PATTERNS ===')
const functionNames = profile.function.map(f => getString(profile.stringTable, f.name))
console.log('Functions with "func_" prefix:', functionNames.filter(n => n.includes('func_')).length)
console.log('Functions with "main":', functionNames.filter(n => n.includes('main')).length)
console.log('Sample function names:', functionNames.slice(0, 10))

// Write the full profile to JSON for detailed inspection
const outputPath = path.join(__dirname, 'profile-decoded.json')
const profileJson = {
  stringTable: profile.stringTable,
  sampleType: profile.sampleType.map(st => ({
    type: getString(profile.stringTable, st.type),
    typeIndex: st.type,
    unit: getString(profile.stringTable, st.unit),
    unitIndex: st.unit
  })),
  samples: profile.sample.slice(0, 10).map((s, idx) => ({
    index: idx,
    values: s.value.map(v => v.toString()),
    locationIds: s.locationId.map(id => id.toString()),
    labels: s.label
  })),
  locations: profile.location.slice(0, 20).map(loc => ({
    id: loc.id.toString(),
    mappingId: loc.mappingId?.toString() || null,
    address: loc.address?.toString() || null,
    lines: loc.line.map(l => ({
      functionId: l.functionId.toString(),
      line: l.line.toString()
    }))
  })),
  functions: profile.function.slice(0, 20).map(func => ({
    id: func.id.toString(),
    name: getString(profile.stringTable, func.name),
    nameIndex: func.name,
    systemName: getString(profile.stringTable, func.systemName),
    systemNameIndex: func.systemName,
    filename: getString(profile.stringTable, func.filename),
    filenameIndex: func.filename,
    startLine: func.startLine.toString()
  })),
  summary: {
    numSamples: profile.sample.length,
    numLocations: profile.location.length,
    numFunctions: profile.function.length,
    numMappings: profile.mapping.length,
    stringTableLength: profile.stringTable.strings ? profile.stringTable.strings.length : 0
  }
}

fs.writeFileSync(outputPath, JSON.stringify(profileJson, replacer, 2))
console.log(`\nFull profile structure written to: ${outputPath}`)
