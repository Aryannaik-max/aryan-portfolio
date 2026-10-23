import React from 'react'

// size   = distance between dots (px)  -> bigger = more spread out
// radius = dot radius (px), defaults to 15% of size
// opacity = how visible the dots are
const Halftone = ({ size = 12, radius, opacity = 0.28, className = '' }) => {
  const r = radius ?? size * 0.15
  return (
    <div
      aria-hidden
      className={`halftone pointer-events-none absolute inset-0 ${className}`}
      style={{
        '--dot': `${size}px`,
        '--r': `${r.toFixed(2)}px`,
        '--dot-opacity': opacity,
      }}
    />
  )
}

export default Halftone