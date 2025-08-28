# 🔥 Introducing Next-Generation Flamegraph Visualization for Node.js

Today we're excited to announce a revolutionary new approach to CPU profiling and flamegraph visualization in Node.js. At the heart of this ecosystem is `@platformatic/flame` - a profiling toolkit built specifically for seamless integration into any Node.js application or development workflow. Paired with `react-pprof` for stunning WebGL-powered visualization, these packages deliver an unparalleled developer experience.

## The Power of Two: `@platformatic/flame` and `react-pprof`

We've developed a comprehensive profiling ecosystem that combines the best of both worlds: powerful data capture with stunning visualization.

### 🔥 `@platformatic/flame`: Built for Seamless Integration

Our profiling toolkit is designed from the ground up for integration into any Node.js application or development workflow:

- **Zero-Config Profiling**: Drop-in profiling for any Node.js script with no code changes required
- **Integration-First Design**: Built specifically to integrate into existing applications, CI/CD pipelines, and development tools
- **Signal-Based Control**: Start/stop profiling using `SIGUSR2` signals - perfect for production environments
- **Programmatic API**: Rich JavaScript API designed for tooling integration and automation
- **Cross-Platform CLI**: Simple commands that work consistently across macOS, Linux, and Windows
- **Standard Output Format**: Generates industry-standard pprof files compatible with the entire ecosystem

```bash
# Integrate profiling into any Node.js application (auto-start mode)
flame run server.js
# ... application runs with profiling active ...
# Stop the app (Ctrl-C) to automatically save profile and generate flamegraph

# Manual profiling mode for CI/CD and automated testing
flame run --manual server.js
# In another terminal, send SIGUSR2 signal to toggle profiling:
kill -USR2 <PID>  # Start profiling
# ... run your tests or load scenarios ...
kill -USR2 <PID>  # Stop profiling and save profile
# Stop the server (Ctrl-C) to automatically generate flamegraph
```

### 🎨 `react-pprof`: WebGL-Powered Visualization

Our React component library brings professional-grade flamegraph rendering to the web:

- **WebGL-Accelerated Performance**: Smooth, responsive rendering even with massive profile datasets
- **Interactive Exploration**: Click, zoom, and navigate through your performance data with fluid animations  
- **Rich Stack Details**: Complete call hierarchy visualization with parent/child relationships
- **Customizable Theming**: Multiple color schemes and full styling control
- **TypeScript Support**: First-class [TypeScript](https://www.typescriptlang.org/) integration with comprehensive type definitions
- **Static HTML Generation**: Generate standalone HTML flamegraphs with our CLI tool

```tsx
import { FlameGraph, StackDetails, fetchProfile } from 'react-pprof'

function ProfileViewer() {
  const [profile, setProfile] = useState(null)
  const [selectedFrame, setSelectedFrame] = useState(null)
  
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <FlameGraph 
        profile={profile}
        onFrameClick={(frame, stack, children) => {
          setSelectedFrame(frame)
        }}
        zoomOnScroll={true}
      />
      <StackDetails selectedFrame={selectedFrame} />
    </div>
  )
}
```

## The Complete Workflow

Here's how easy it is to profile your Node.js applications:

### 1. Install the Tools
```bash
npm install -g @platformatic/flame
npm install react-pprof  # For React integration
```

**Package Links:**
- [`@platformatic/flame`](https://www.npmjs.com/package/@platformatic/flame) on npm
- [`react-pprof`](https://www.npmjs.com/package/react-pprof) on npm

### 2. Profile Your Application
```bash
# Profile any existing Node.js app (profiling starts immediately)
flame run your-app.js

# In another terminal, generate some load while profiling is active
curl http://localhost:3000/api/heavy-computation
curl http://localhost:3000/api/heavy-computation

# Stop the app (Ctrl-C) to automatically save profile and generate HTML flamegraph
# You'll see the exact file paths and browser URL in the output:
# 🔥 CPU profile written to: cpu-profile-2025-08-28T12-00-00-000Z.pb
# 🔥 Flamegraph generated: cpu-profile-2025-08-28T12-00-00-000Z.html
# 🔥 Open file:///path/to/cpu-profile-2025-08-28T12-00-00-000Z.html in your browser
```

### 3. View the Results
```bash
# The HTML flamegraph is automatically generated - just open it!
open cpu-profile-*.html

# Or generate from existing pprof files
flame generate cpu-profile-*.pb
```

## Built on Open Source Foundation

Our profiling ecosystem is powered by Datadog's generous open source contribution: the [`@datadog/pprof`](https://github.com/DataDog/pprof-nodejs) library. This battle-tested Node.js profiling library provides the core CPU sampling and pprof data export functionality that makes our entire toolkit possible.

We're grateful to Datadog for open sourcing this critical piece of infrastructure, which enables the Node.js community to have access to production-grade profiling capabilities that were previously only available in enterprise monitoring solutions.

## Technical Excellence

Both packages are built with production-grade quality in mind:

### `react-pprof` Features:
- **WebGL Rendering Pipeline**: Custom shaders for optimal performance
- **Responsive Design**: Works seamlessly across desktop and mobile
- **Accessibility Support**: Full keyboard navigation and ARIA compliance  
- **Visual Regression Testing**: Pixel-perfect consistency across updates
- **Storybook Integration**: Comprehensive component documentation with [Storybook](https://storybook.js.org/)

### `@platformatic/flame` Features:
- **Integration-First Architecture**: Designed for seamless embedding in existing applications and tools
- **Cross-Platform Support**: Works consistently across macOS, Linux, and Windows environments
- **Protocol Buffer Output**: Standard pprof format for compatibility with entire profiling ecosystem
- **Automatic Compression**: Efficient gzipped profile storage for CI/CD and automation
- **Process Management**: Clean signal handling perfect for production and development workflows
- **Flexible Control**: Auto-start mode for development, manual mode for production and CI/CD

## Real-World Performance

We've tested both tools extensively in production environments:

### Profiling Overhead Analysis

Comprehensive benchmarks show minimal performance impact when profiling is active. Testing was conducted with 10 concurrent connections over 10 seconds across different computation workloads:

**Express.js Framework Results:**
| Endpoint Type | Load Level | Without Profiling | With Profiling | Throughput Overhead | Latency Overhead |
|---------------|------------|-------------------|----------------|--------------------|--------------------|
| Health Check | Minimal | 13,571 req/s | 13,752 req/s | -1.3% | -6.3% |
| Light Computation | Low | 10,187 req/s | 9,979 req/s | +2.0% | +12.0% |
| Medium Computation | Moderate | 71 req/s | 66 req/s | +6.1% | +6.3% |
| Heavy Computation | High | 295 req/s | 291 req/s | +1.3% | +1.4% |
| Mixed Computation | Very High | 56 req/s | 53 req/s | +5.2% | +5.8% |

**Express Summary:** Average throughput overhead of **2.7%** and latency overhead of **3.9%**

**Fastify Framework Results:**
| Endpoint Type | Load Level | Without Profiling | With Profiling | Throughput Overhead | Latency Overhead |
|---------------|------------|-------------------|----------------|--------------------|--------------------|
| Health Check | Minimal | 41,174 req/s | 38,747 req/s | +5.9% | 0.0% |
| Light Computation | Low | 35,056 req/s | 32,847 req/s | +6.3% | 0.0% |
| Medium Computation | Moderate | 3,235 req/s | 3,126 req/s | +3.4% | +4.2% |
| Heavy Computation | High | 345 req/s | 336 req/s | +2.6% | +2.6% |
| Mixed Computation | Very High | 311 req/s | 304 req/s | +2.3% | +2.3% |

**Fastify Summary:** Average throughput overhead of **4.1%** and latency overhead of **1.8%**

These results demonstrate that `@platformatic/flame` adds minimal overhead even under high load scenarios, making it suitable for production profiling.

### Visualization Performance

Our React components deliver exceptional rendering performance:

- **Large Profiles**: Handles profiles with 100k+ frames smoothly
- **Memory Efficiency**: Optimized data structures and WebGL resource management
- **Fast Startup**: Sub-second initialization for most profiles
- **Responsive Interaction**: 60fps zooming and panning even on mobile devices

## Integration Examples

### [Express.js](https://expressjs.com/) Application
```javascript
// No code changes needed!
// server.js remains exactly the same
const express = require('express')
const app = express()

app.get('/heavy', (req, res) => {
  // Your existing CPU-intensive code
  const result = performComplexCalculation()
  res.json(result)
})

app.listen(3000)
```

```bash
# Profile the Express app (profiling starts immediately)
flame run server.js

# In another terminal, make requests while profiling is active
curl http://localhost:3000/heavy
curl http://localhost:3000/heavy
curl http://localhost:3000/heavy

# Stop the server (Ctrl-C) to automatically save profile and generate HTML flamegraph
# You'll see the exact file paths and browser URL in the output:
# 🔥 CPU profile written to: cpu-profile-2025-08-28T15-30-45-123Z.pb
# 🔥 Flamegraph generated: cpu-profile-2025-08-28T15-30-45-123Z.html
# 🔥 Open file:///path/to/cpu-profile-2025-08-28T15-30-45-123Z.html in your browser
```

### [React](https://reactjs.org/) Application Integration
```tsx
import { FlameGraph, StackDetails } from 'react-pprof'

function ProfileDashboard() {
  return (
    <div className="profiling-dashboard">
      <FlameGraph 
        profile={profile}
        primaryColor="#3498db"
        secondaryColor="#87ceeb" 
        backgroundColor="#2c3e50"
        onFrameClick={handleFrameSelection}
      />
      <StackDetails 
        selectedFrame={selectedFrame}
        stackTrace={stackTrace}
        children={children}
      />
    </div>
  )
}
```

## What Makes This Special

Unlike traditional profiling tools, our approach combines:

1. **Integration-First Design**: `@platformatic/flame` is built to integrate seamlessly into any existing Node.js application, CI/CD pipeline, or development tool
2. **Modern Web Technology**: [React](https://reactjs.org/) components with [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) acceleration
3. **Zero-Config Experience**: Drop-in profiling with no code changes required  
4. **Production Ready**: Battle-tested performance and reliability in real-world applications
5. **Ecosystem Compatibility**: Standard pprof output works with the entire profiling toolchain
6. **Beautiful Visualization**: Professional-grade flamegraphs that actually help you understand your code

## Getting Started Today

Both packages are available on npm and ready for production use:

```bash
# For profiling Node.js applications
npm install -g @platformatic/flame

# For React flamegraph components
npm install react-pprof
```

**npm Packages:**
- [`@platformatic/flame`](https://www.npmjs.com/package/@platformatic/flame) - CPU profiling toolkit
- [`react-pprof`](https://www.npmjs.com/package/react-pprof) - React components and CLI

Visit our repositories for comprehensive documentation:
- [react-pprof](https://github.com/platformatic/react-pprof) - React components and CLI
- [@platformatic/flame](https://github.com/platformatic/flame) - CPU profiling toolkit

## The Future of Node.js Performance Analysis

We believe that great developer tools should be powerful yet simple, beautiful yet functional. These packages represent our vision for the future of performance analysis in Node.js - where profiling integrates seamlessly into any workflow, is as easy as running a single command, and understanding your code's performance is as simple as exploring an interactive flamegraph.

Try them out today and let us know what you think! We're excited to see how the Node.js community uses these tools to build faster, more efficient applications.

---

*Built with ❤️ by the Platformatic team. We're making Node.js development faster, easier, and more enjoyable for everyone.*

**Special thanks to Datadog** for open sourcing the [`@datadog/pprof`](https://github.com/DataDog/pprof-nodejs) library, which provides the foundational CPU profiling capabilities that power our entire ecosystem. Their commitment to open source enables the entire Node.js community to benefit from enterprise-grade performance analysis tools.
