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

// Read the HTML template and JavaScript bundle
let htmlTemplate, jsBundle
try {
  htmlTemplate = fs.readFileSync(templatePath, 'utf8')
  jsBundle = fs.readFileSync(bundlePath, 'utf8')
} catch (error) {
  console.error(`Error reading template or bundle: ${error.message}`)
  process.exit(1)
}

// Convert profile data to base64 for more reliable embedding
const profileDataBase64 = profileData.toString('base64')

// Create ArrayBuffer from base64 for the frontend, split into chunks for better parsing
const profileDataJS = `(function() {
  const base64Data = '${profileDataBase64}';
  const uint8Array = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
  return uint8Array.buffer;
})()`

// Copy the JS bundle to the same directory as the output HTML
const jsPath = outputFile.replace('.html', '.js')
fs.writeFileSync(jsPath, jsBundle)

// Replace the external script reference with correct path
const htmlWithInlineJS = htmlTemplate.replace(
  '<script defer src="flamegraph.js"></script>',
  `<script defer src="${path.basename(jsPath)}"></script>`
)

// Inject the profile data, title, filename, and colors into the template
const finalHTML = htmlWithInlineJS
  .replace(/{{TITLE}}/g, title)
  .replace(/{{FILENAME}}/g, path.basename(pprofFile))
  .replace('{{PROFILE_DATA}}', profileDataJS)
  .replace('{{PRIMARY_COLOR}}', primaryColor)
  .replace('{{SECONDARY_COLOR}}', secondaryColor)

// Write the final HTML file
try {
  fs.writeFileSync(outputFile, finalHTML)
  console.log(`Generated HTML output: ${outputFile}`)
  console.log(`Profile data embedded: ${profileData.length} bytes`)
  console.log(`Open ${outputFile} in a web browser to view the flame graph`)
} catch (error) {
  console.error(`Error writing output file: ${error.message}`)
  process.exit(1)
}