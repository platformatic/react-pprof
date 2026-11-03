import React from 'react'
import type { FrameDeopt, FrameDeoptSummary } from '../deopts/index.js'

export interface DeoptDetailsProps {
  deopts: FrameDeoptSummary | null | undefined
  textColor?: string
  deoptColor?: string
  fontFamily?: string
}

const DeoptRow: React.FC<{ deopt: FrameDeopt, textColor: string, accent: string }> = ({ deopt, textColor, accent }) => (
  <li
    className="deopt-details-entry"
    style={{
      listStyle: 'none',
      padding: '6px 0',
      borderTop: `1px solid ${textColor}20`,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
      <span style={{ fontWeight: 600, color: accent }}>{deopt.count}×</span>
      <span style={{ fontWeight: 600 }}>{deopt.reason}</span>
      <span
        title={deopt.kind === 'lazy'
          ? 'Lazy: optimized code was invalidated because a dependency changed'
          : 'Eager: a guard failed while running optimized code'}
        style={{
          fontSize: '10px',
          padding: '0 4px',
          borderRadius: '3px',
          border: `1px solid ${textColor}40`,
          opacity: 0.8,
        }}
      >
        {deopt.kind}
      </span>
      {deopt.name && (
        <code style={{ fontSize: '10px', opacity: 0.6 }}>{deopt.name}</code>
      )}
    </div>
    {deopt.position && (
      <div style={{ fontSize: '11px', opacity: 0.7, wordBreak: 'break-all', marginTop: '2px' }}>
        at {deopt.position}
      </div>
    )}
    {deopt.meaning && (
      <div style={{ fontSize: '11px', opacity: 0.85, marginTop: '4px', lineHeight: 1.4 }}>
        {deopt.meaning}
      </div>
    )}
  </li>
)

/**
 * Lists the V8 deoptimizations recorded for a frame, with an explanation of
 * each reason. Tiering and engine-internal events are collapsed by default.
 */
export const DeoptDetails: React.FC<DeoptDetailsProps> = ({
  deopts,
  textColor = '#ffffff',
  deoptColor = '#3fa9ff',
  fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
}) => {
  if (!deopts || deopts.deopts.length === 0) {
    return null
  }

  const actionable = deopts.deopts.filter(d => d.category === 'actionable')
  const other = deopts.deopts.filter(d => d.category !== 'actionable')
  const otherCount = other.reduce((sum, d) => sum + d.count, 0)

  return (
    <div
      className="deopt-details"
      style={{
        color: textColor,
        fontFamily,
        fontSize: '12px',
        padding: '12px 16px',
        borderBottom: `1px solid ${textColor}20`,
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>
        <span style={{ color: deoptColor }}>▲</span> V8 deoptimizations ({deopts.total})
      </div>
      {actionable.length > 0 && (
        <ul style={{ margin: 0, padding: 0 }}>
          {actionable.map((deopt, i) => (
            <DeoptRow key={i} deopt={deopt} textColor={textColor} accent={deoptColor} />
          ))}
        </ul>
      )}
      {other.length > 0 && (
        <details style={{ marginTop: '6px' }}>
          <summary style={{ cursor: 'pointer', opacity: 0.7 }}>
            {otherCount} tiering / engine-internal event{otherCount === 1 ? '' : 's'} (usually not actionable)
          </summary>
          <ul style={{ margin: 0, padding: 0, opacity: 0.7 }}>
            {other.map((deopt, i) => (
              <DeoptRow key={i} deopt={deopt} textColor={textColor} accent={textColor} />
            ))}
          </ul>
        </details>
      )}
      <div style={{ fontSize: '10px', opacity: 0.5, marginTop: '8px' }}>
        A deopt is not a bug by itself: it matters when it repeats in a function that takes a large share of the profile.
      </div>
    </div>
  )
}
