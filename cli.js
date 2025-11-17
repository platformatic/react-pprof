#!/usr/bin/env node

const { parseArgs } = require('node:util')
const fs = require('node:fs')
const path = require('node:path')
const zlib = require('node:zlib')

// Parse command line arguments
const { values: args, positionals } = parseArgs({
  args: process.argv.slice(2),
  options: {
    output: {
      type: 'string',
      short: 'o'
    },
    title: {
      type: 'string',
      short: 't'
    },
    'primary-color': {
      type: 'string'
    },
    'secondary-color': {
      type: 'string'
    },
    help: {
      type: 'boolean',
      short: 'h'
    }
  },
  allowPositionals: true
})

if (args.help || positionals.length === 0) {
  console.log(`
Usage: node cli.js [options] <pprof-file>

Options:
  -o, --output <file>         Output HTML file (default: <pprof-file>.html)
  -t, --title <title>         Title for the generated flamegraph (default: filename)
  --primary-color <color>     Primary color in hex format (default: #ff4444)
  --secondary-color <color>   Secondary color in hex format (default: #ffcc66)
  -h, --help                  Show this help message

Examples:
  node cli.js profile.pb.gz
  node cli.js -o flamegraph.html profile.pb.gz
  node cli.js -t "My App CPU Profile" profile.pb.gz
  node cli.js --primary-color "#4444ff" --secondary-color "#cc66ff" heap-profile.pb.gz
`)
  process.exit(0)
}

const pprofFile = positionals[0]
const outputFile = args.output || `${path.basename(pprofFile, path.extname(pprofFile))}.html`
const title = args.title || path.basename(pprofFile)
const primaryColor = args['primary-color'] || '#ff4444'
const secondaryColor = args['secondary-color'] || '#ffcc66'

// Validate pprof file exists
if (!fs.existsSync(pprofFile)) {
  console.error(`Error: File '${pprofFile}' not found`)
  process.exit(1)
}

// Check if CLI template and bundle exist
const templatePath = path.join(__dirname, 'cli-build', 'template.html')
const bundlePath = path.join(__dirname, 'cli-build', 'flamegraph.js')

if (!fs.existsSync(templatePath)) {
  console.error(`Error: CLI template not found. Run 'npm run build:cli' first.`)
  process.exit(1)
}

if (!fs.existsSync(bundlePath)) {
  console.error(`Error: CLI bundle not found. Run 'npm run build:cli' first.`)
  process.exit(1)
}

// Read the pprof file
let profileData
try {
  const rawData = fs.readFileSync(pprofFile)
  console.log(`Loaded pprof file: ${pprofFile} (${rawData.length} bytes)`)

  // Check if the file is gzipped (common with @datadog/pprof output)
  const isGzipped = rawData[0] === 0x1f && rawData[1] === 0x8b

  if (isGzipped) {
    console.log('File appears to be gzipped, decompressing...')
    profileData = zlib.gunzipSync(rawData)
    console.log(`Decompressed to ${profileData.length} bytes`)
  } else {
    console.log('File appears to be uncompressed')
    profileData = rawData
  }
} catch (error) {
  console.error(`Error reading or decompressing pprof file: ${error.message}`)
  process.exit(1)
}

// Read the HTML template
let htmlTemplate
try {
  htmlTemplate = fs.readFileSync(templatePath, 'utf8')
} catch (error) {
  console.error(`Error reading template: ${error.message}`)
  process.exit(1)
}

// Use the embeddable function to generate the flamegraph (dynamic import for ESM)
;(async () => {
  try {
    const { generateEmbeddableFlameGraph } = await import('./dist/embeddable.js')
    const { html, script } = await generateEmbeddableFlameGraph(profileData, {
      title,
      filename: path.basename(pprofFile),
      primaryColor,
      secondaryColor,
      height: 1000 // CLI uses full page height
    })

    // Inject the generated HTML and script into the template
    const finalHTML = htmlTemplate
      .replace(/{{TITLE}}/g, title)
      .replace(/{{FILENAME}}/g, path.basename(pprofFile))
      .replace('{{PROFILE_DATA}}', '') // Will be set by script
      .replace('{{PRIMARY_COLOR}}', primaryColor)
      .replace('{{SECONDARY_COLOR}}', secondaryColor)
      .replace('</body>', `<script>${script}</script></body>`)

    // Write the final HTML file
    fs.writeFileSync(outputFile, finalHTML)
    console.log(`Generated HTML output: ${outputFile}`)
    console.log(`Profile data embedded: ${profileData.length} bytes`)
    console.log(`Open ${outputFile} in a web browser to view the flame graph`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
})()