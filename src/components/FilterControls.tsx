import React from 'react'

export interface FilterControlsProps {
  showAppCodeOnly: boolean
  onToggle: (enabled: boolean) => void
  /** Whether deopt markers are shown */
  showDeopts?: boolean
  /** When provided, a "Highlight Deopts" checkbox is shown */
  onToggleDeopts?: (enabled: boolean) => void
  textColor?: string
  fontSize?: string
  fontFamily?: string
}

interface CheckboxProps {
  checked: boolean
  label: string
  textColor: string
  onChange: (checked: boolean) => void
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, label, textColor, onChange }) => (
  <label
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      cursor: 'pointer',
      userSelect: 'none',
    }}
  >
    <div
      style={{
        position: 'relative',
        width: '16px',
        height: '16px',
        border: `1.5px solid ${textColor}`,
        borderRadius: '3px',
        backgroundColor: checked ? textColor : 'transparent',
        transition: 'background-color 0.15s',
        flexShrink: 0,
      }}
    >
      {checked && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <path
            d="M3 8L6.5 11.5L13 4.5"
            stroke="#1e1e1e"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        style={{
          position: 'absolute',
          opacity: 0,
          width: '100%',
          height: '100%',
          cursor: 'pointer',
          margin: 0,
        }}
      />
    </div>
    <span>{label}</span>
  </label>
)

export const FilterControls: React.FC<FilterControlsProps> = ({
  showAppCodeOnly,
  onToggle,
  showDeopts = false,
  onToggleDeopts,
  textColor = '#ffffff',
  fontSize = '14px',
  fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        color: textColor,
        fontSize,
        fontFamily,
        padding: '8px 0',
      }}
    >
      <Checkbox
        checked={showAppCodeOnly}
        label="Show App Code Only"
        textColor={textColor}
        onChange={onToggle}
      />
      {onToggleDeopts && (
        <Checkbox
          checked={showDeopts}
          label="Highlight Deopts"
          textColor={textColor}
          onChange={onToggleDeopts}
        />
      )}
    </div>
  )
}
