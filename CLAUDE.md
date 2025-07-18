# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based PProf renderer project in early development stage. The project is designed to render and visualize performance profiling data from Go's pprof format.

## Current State

The repository is currently in a skeleton state with minimal setup:
- Basic package.json with project metadata
- No build system or dependencies configured yet
- No source code structure established

## Development Setup

Currently no specific development commands are available. The package.json only includes:
- `npm test`: Currently returns an error (no test specified)

## Architecture Notes

Since this is a starter project, the architecture is not yet defined. Based on the project name and description, this will likely become:
- A React-based frontend for rendering pprof data
- Components for visualizing performance profiles (flame graphs, call graphs, etc.)
- Integration with Go pprof format parsing

## Next Steps for Development

When developing this project, you'll likely need to:
1. Set up a React build system (Vite, Create React App, or custom Webpack)
2. Add dependencies for React and pprof parsing
3. Create the main application structure
4. Implement visualization components