import React from 'react'
import { FrameData, ProfileMetadata, formatValue, getSelfValueLabel, getTotalValueLabel } from '../renderer/index.js'

export interface FrameDetailsProps {
  frame: FrameData | null
  selfTime?: number
  textColor?: string
  fontSize?: string
  fontFamily?: string
  profileMetadata?: ProfileMetadata
}

export const FrameDetails: React.FC<FrameDetailsProps> = ({
  frame,
  selfTime,
  textColor = '#ffffff',
  fontSize = '12px',
  fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
  profileMetadata
}) => {
  // Return completely empty div when no frame is selected
  if (!frame) {
    return <div />
  }

  // Use the selfTime prop if provided, otherwise use frame.value
  const displaySelfTime = selfTime !== undefined ? selfTime : frame.value

  const selfLabel = profileMetadata ? getSelfValueLabel(profileMetadata).toLowerCase() : 'self'
  const totalLabel = profileMetadata ? getTotalValueLabel(profileMetadata).toLowerCase() : 'total'

  const selfValueFormatted = profileMetadata ? formatValue(displaySelfTime, profileMetadata) : displaySelfTime.toFixed(2)
  const totalValueFormatted = profileMetadata ? formatValue(frame.totalValue, profileMetadata) : frame.totalValue.toFixed(2)

  return (
    <div style={{
      fontSize,
      fontFamily,
      color: textColor,
      opacity: 0.8,
      padding: '8px 0',
    }}>
      <span style={{ fontWeight: 'bold' }}>{frame.functionName || frame.name}</span>
      {frame.fileName && (
        <span style={{ marginLeft: '8px', opacity: 0.7 }}>
          ({frame.fileName}
          {frame.lineNumber && `:${frame.lineNumber}`})
        </span>
      )}
      <span style={{ marginLeft: '12px' }}>
        {selfLabel}: {selfValueFormatted}, {totalLabel}: {totalValueFormatted}
      </span>
    </div>
  )
}