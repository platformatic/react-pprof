# React PPProf Testing Suite

This directory contains comprehensive end-to-end tests for the React PPProf components using Playwright.

## Test Structure

### Core Test Files

- **`flamegraph.spec.ts`** - Tests for the main FlameGraph component
  - Basic rendering tests
  - User interaction tests (clicks, hovers, zoom)
  - Visual regression tests
  - Performance tests
  - Edge case handling

- **`stack-details.spec.ts`** - Tests for the StackDetails component
  - Empty state handling
  - Stack trace display
  - Children sorting and display
  - Visual styling consistency
  - Responsive behavior

- **`integration.spec.ts`** - Integration tests for FlameGraph + StackDetails
  - Component communication
  - Data synchronization
  - Layout and positioning
  - Error handling

- **`comprehensive.spec.ts`** - Comprehensive test suite
  - Cross-theme consistency
  - Responsive design
  - Performance under load
  - Accessibility testing
  - Visual regression suite

### Utilities

- **`utils.ts`** - Test utility functions and helpers
  - `FlameGraphTestUtils` class for common operations
  - Constants for story IDs and positions
  - Helper functions for interactions

## Running Tests

### Basic Test Commands

```bash
# Run all tests
npm test

# Run tests with UI (recommended for development)
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed

# Run specific test files
npm run test:flamegraph
npm run test:stack-details
npm run test:integration
npm run test:comprehensive
```

### Debug Commands

```bash
# Run tests in debug mode
npm run test:debug

# Update visual snapshots
npm run test:update-snapshots
```

## Test Coverage

### FlameGraph Component Tests

1. **Rendering Tests**
   - Default theme rendering
   - Custom color themes (blue, green, light)
   - Different sizes (small, full-screen)
   - Canvas element presence

2. **Interaction Tests**
   - Frame click detection
   - Zoom in/out functionality
   - Hover tooltip display
   - Mouse leave handling
   - Rapid click handling

3. **Visual State Tests**
   - Opacity changes (selected/hovered/unselected)
   - Frame border rendering
   - Color gradient display
   - Animation smoothness

4. **Performance Tests**
   - Render time measurements
   - WebGL context health
   - Memory usage stability
   - Multiple interaction handling

### StackDetails Component Tests

1. **State Management**
   - Empty state display
   - Populated state rendering
   - Frame selection updates
   - Data consistency

2. **Stack Trace Display**
   - Complete hierarchy showing
   - Selected frame highlighting
   - File/line information
   - Proper indentation

3. **Children Display**
   - Child frame listing
   - Sorting by weight
   - Leaf node handling
   - Detailed information

4. **Visual Styling**
   - Consistent theming
   - Responsive layout
   - Text overflow handling
   - Spacing consistency

### Integration Tests

1. **Component Communication**
   - Click event propagation
   - Data synchronization
   - State updates
   - Error handling

2. **Visual Synchronization**
   - Consistent selection states
   - Proper layout positioning
   - Animation coordination
   - Theme consistency

3. **Performance Integration**
   - Smooth updates
   - Memory management
   - Animation performance
   - Resource cleanup

## Visual Regression Testing

The test suite includes comprehensive visual regression testing using Playwright's screenshot comparison feature. Screenshots are automatically captured and compared against baseline images.

### Screenshot Categories

1. **Theme Variations** - Each color theme
2. **Interaction States** - Click, hover, zoom states
3. **Layout Variations** - Different viewport sizes
4. **Component States** - Empty, populated, error states
5. **Integration Views** - Combined components

### Updating Screenshots

When UI changes are made intentionally:

```bash
npm run test:update-snapshots
```

This will update all baseline screenshots with new versions.

## Test Configuration

### Playwright Configuration

The tests are configured to run on multiple browsers:
- Chromium (Chrome)
- Firefox
- WebKit (Safari)

### Test Environment

- **Base URL**: `http://localhost:6007` (Storybook)
- **Timeout**: 30 seconds for initial load
- **Retries**: 2 retries on CI, 0 locally
- **Screenshots**: Captured on failure
- **Traces**: Captured on first retry

### WebGL Testing

Special considerations for WebGL testing:
- Wait times for WebGL initialization
- Context health checks
- Performance monitoring
- Resource cleanup verification

## Best Practices

### Writing Tests

1. **Use the test utilities** - Leverage `FlameGraphTestUtils` for common operations
2. **Wait for WebGL** - Always wait for WebGL initialization (2000ms)
3. **Test cross-browser** - Ensure tests work on all configured browsers
4. **Include visual regression** - Add screenshots for UI changes
5. **Test edge cases** - Cover error conditions and boundary cases

### Debugging Tests

1. **Use headed mode** - See what's happening in the browser
2. **Check console logs** - WebGL errors appear in browser console
3. **Inspect screenshots** - Compare actual vs expected visuals
4. **Use debug mode** - Step through tests interactively

### Performance Testing

1. **Measure render times** - Track WebGL initialization and render performance
2. **Monitor memory usage** - Check for memory leaks
3. **Test under load** - Rapid interactions and stress testing
4. **Verify cleanup** - Ensure resources are properly released

## Continuous Integration

The test suite is designed to run in CI environments:
- Headless browser execution
- Automatic screenshot comparison
- Parallel test execution
- Comprehensive reporting

## Troubleshooting

### Common Issues

1. **WebGL not supported** - Ensure CI environment supports WebGL
2. **Screenshot differences** - May be due to font rendering differences
3. **Timeout errors** - Increase wait times for slow environments
4. **Memory issues** - Check for proper cleanup in tests

### Environment Setup

Ensure your environment has:
- Node.js 18+ 
- Modern browser support
- WebGL 2.0 support
- Sufficient memory for visual testing

## Contributing

When adding new features:

1. Add corresponding tests
2. Update visual regression tests
3. Test on all browsers
4. Update documentation
5. Ensure CI passes

For questions or issues with the test suite, please check the existing test patterns and utility functions first.