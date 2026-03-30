'use client'

import React from 'react'
import styles from './bg_shape.module.css'

export default function BgShape({ extraHeight = 0 }) {
  const gradientId = 'gradient-dynamic'

  // Fixed top points
  const M = { x: 1209.27, y: 0 }
  const L1 = { x: 1594.66, y: 652.458 }
  const C1 = { cp1: { x: 1597.96, y: 658.045 }, cp2: { x: 1598, y: 664.976 }, end: { x: 1594.76, y: 670.599 } }

  // Original diagonal line
  const P4Start = { ...C1.end }
  const P4EndOriginal = { x: 1104.05, y: 1525.99 }

  // Diagonal vector
  const dx = P4EndOriginal.x - P4Start.x
  const dy = P4EndOriginal.y - P4Start.y
  const slope = dy / dx

  // Extend diagonal along slope using extraHeight (vertical delta)
  const newY = P4EndOriginal.y + extraHeight
  const newX = P4Start.x + (newY - P4Start.y) / slope

  const P4End = { x: newX, y: newY }

  // Adjust bottom curve relative to new diagonal end
  const P5 = {
    cp1: { x: P4End.x - 3, y: P4End.y + 6 },
    cp2: { x: P4End.x - 10, y: P4End.y + 9 },
    end: { x: P4End.x - 16, y: P4End.y + 9 },
  }

  const bottomY = P5.end.y

  const path = `
    M${M.x} ${M.y}
    L${L1.x} ${L1.y}
    C${C1.cp1.x} ${C1.cp1.y}, ${C1.cp2.x} ${C1.cp2.y}, ${C1.end.x} ${C1.end.y}

    L${P4End.x} ${P4End.y}

    C${P5.cp1.x} ${P5.cp1.y}, ${P5.cp2.x} ${P5.cp2.y}, ${P5.end.x} ${P5.end.y}

    L0 ${bottomY}
    L0 0
    Z
  `

  return (
    <div className={styles.wrapper}>
      <svg 
        width="1600" 
        height="1600" 
        viewBox="0 0 1598 1585" 
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="1" x2="0" y1="0.6415" y2="0.3585">
            <stop offset="0" stopColor="#FFCC00"/>
            <stop offset="1" stopColor="#E39700"/>
          </linearGradient>
        </defs>

        <path d={path} fill={`url(#${gradientId})`} />
      </svg>
    </div>
  )
}