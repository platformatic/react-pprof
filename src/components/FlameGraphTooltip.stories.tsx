import type { Meta, StoryObj } from '@storybook/react'
import { FlameGraphTooltip } from './FlameGraphTooltip'
import { FlameNode } from '../renderer'
import { useState, useEffect } from 'react'

const meta = {
  title: 'FlameGraphTooltip',
  component: FlameGraphTooltip,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{
        backgroundColor: '#0a0a0a',
        padding: '40px',
        minHeight: '100vh',
        position: 'relative'
      }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FlameGraphTooltip>

export default meta
type Story = StoryObj<typeof meta>

// Sample frame data
const sampleFrame: FlameNode = {
  id: 'root/main/server/handler',
  name: 'requestHandler',
  value: 1250,
  width: 0.45,
  depth: 3,
  x: 0.2,
  children: []
}

const longNameFrame: FlameNode = {
  id: 'root/main/server/handler/very/long/path',
  name: 'veryLongFunctionNameThatMightCauseWrappingInTheTooltipDisplay',
  value: 567890,
  width: 0.123456,
  depth: 7,
  x: 0.456,
  children: []
}

const largeValueFrame: FlameNode = {
  id: 'root/expensive',
  name: 'expensiveOperation',
  value: 1234567890,
  width: 0.9876,
  depth: 2,
  x: 0.05,
  children: []
}

const smallValueFrame: FlameNode = {
  id: 'root/tiny',
  name: 'tinyOperation',
  value: 1,
  width: 0.0001,
  depth: 5,
  x: 0.999,
  children: []
}

export const Default: Story = {
  args: {
    frameData: sampleFrame,
    mouseX: 400,
    mouseY: 300,
  },
}

export const LongName: Story = {
  args: {
    frameData: longNameFrame,
    mouseX: 400,
    mouseY: 300,
  },
}

export const LargeValue: Story = {
  args: {
    frameData: largeValueFrame,
    mouseX: 400,
    mouseY: 300,
  },
}

export const SmallValue: Story = {
  args: {
    frameData: smallValueFrame,
    mouseX: 400,
    mouseY: 300,
  },
}

// Interactive story that follows mouse cursor
export const FollowMouse = () => {
  const [mousePos, setMousePos] = useState({ x: 400, y: 300 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <div style={{
        position: 'fixed',
        top: 20,
        left: 20,
        color: '#ffffff',
        fontSize: '12px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '8px',
        borderRadius: '4px',
        zIndex: 2000
      }}>
        Mouse position: ({mousePos.x}, {mousePos.y})
      </div>
      <FlameGraphTooltip
        frameData={sampleFrame}
        mouseX={mousePos.x}
        mouseY={mousePos.y}
      />
    </>
  )
}

// Story with very deep nesting
export const DeepNesting: Story = {
  args: {
    frameData: {
      id: 'root/a/b/c/d/e/f/g/h/i/j/k/l/m/n/o/p',
      name: 'deeplyNestedFunction',
      value: 42,
      width: 0.00042,
      depth: 16,
      x: 0.5,
      children: []
    },
    mouseX: 400,
    mouseY: 300,
  },
}

// Story demonstrating edge case values
export const EdgeCaseValues: Story = {
  args: {
    frameData: {
      id: 'root/edge',
      name: 'edgeCaseFunction',
      value: 0,
      width: 0,
      depth: 0,
      x: 0,
      children: []
    },
    mouseX: 400,
    mouseY: 300,
  },
}

// Story with percentage precision
export const PrecisionDisplay: Story = {
  args: {
    frameData: {
      id: 'root/precise',
      name: 'preciseFunction',
      value: 12345.6789,
      width: 0.123456789,
      depth: 3,
      x: 0.333333,
      children: []
    },
    mouseX: 400,
    mouseY: 300,
  },
}
