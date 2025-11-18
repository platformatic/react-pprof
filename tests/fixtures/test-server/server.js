/* eslint-disable no-console */

import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
// Use fixed port for Playwright webServer
const port = process.env.TEST_PORT || 3100

// Create a webpack config specifically for tests
const testWebpackConfig = {
  mode: 'development',
  entry: path.resolve(__dirname, 'test-app.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'test-bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    extensionAlias: {
      '.js': ['.ts', '.tsx', '.js'],
      '.mjs': ['.mts', '.mjs']
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            compilerOptions: {
              noEmit: false
            }
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}

const compiler = webpack(testWebpackConfig)

// Use webpack dev middleware
app.use(webpackDevMiddleware(compiler, {
  publicPath: testWebpackConfig.output.publicPath
}))

// No longer serving static files - handled by static-server.js

// Serve the test HTML page
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'test-page.html'))
})

// Serve the tooltip test HTML page
app.get('/tooltip-test.html', (_req, res) => {
  res.sendFile(path.join(__dirname, 'tooltip-test.html'))
})

// Start server - Playwright will manage lifecycle
const server = app.listen(port, () => {
  console.log(`Test server running at http://localhost:${port}`)
})

export { server, port }
