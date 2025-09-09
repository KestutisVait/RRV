import React from "react";
import styles from "../logo.module.css"; 

export default function Logo({
  colorCircle = "#ccc",
  colorTriangle = "#000",
  height = 200, // desired height in px
}) {
  // Original SVG parameters (from your viewBox and shapes)
  const originalViewBox = { x: 12, y: 23, width: 95, height: 82 };

  // Calculate scale factor based on desired height
  const scale = height / originalViewBox.height;

  // Scale viewBox values
  const scaledViewBox = {
    x: originalViewBox.x * scale,
    y: originalViewBox.y * scale,
    width: originalViewBox.width * scale,
    height: height
  };

  // Scale circle attributes
  const scaledCircle = {
    cx: 59.5 * scale,
    cy: 64 * scale,
    r: 41 * scale,
  };

  // Scale path commands for the triangle (manually scaled)
  // Original path:
  // M68.16 97.625
  // C64.311 104.292 54.689 104.292 50.84 97.625
  // L16.632 38.375
  // C12.783 31.708 17.594 23.375 25.292 23.375
  // H93.708
  // C101.406 23.375 106.217 31.708 102.368 38.375
  // Z

  // Function to scale all numbers in path by scale factor
  const scalePath = (path, scale) => {
    return path.replace(/([0-9]*\.?[0-9]+)/g, (num) => {
      return (parseFloat(num) * scale).toFixed(3);
    });
  };

  const originalPath = `
    M68.16 97.625
    C64.311 104.292 54.689 104.292 50.84 97.625
    L16.632 38.375
    C12.783 31.708 17.594 23.375 25.292 23.375
    H93.708
    C101.406 23.375 106.217 31.708 102.368 38.375
    Z
  `;

  const scaledPath = scalePath(originalPath, scale);

  return (
    <div className={styles.logo}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`${scaledViewBox.x} ${scaledViewBox.y} ${scaledViewBox.width} ${scaledViewBox.height}`}
        height={height}
        preserveAspectRatio="xMidYMid meet"
      >
        <circle cx={scaledCircle.cx} cy={scaledCircle.cy} r={scaledCircle.r} fill={colorCircle} />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`${scaledViewBox.x} ${scaledViewBox.y} ${scaledViewBox.width} ${scaledViewBox.height}`}
        height={height}
        preserveAspectRatio="xMidYMid meet"
      >
        <circle cx={scaledCircle.cx} cy={scaledCircle.cy} r={scaledCircle.r} fill={colorCircle} />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`${scaledViewBox.x} ${scaledViewBox.y} ${scaledViewBox.width} ${scaledViewBox.height}`}
        height={height}
        preserveAspectRatio="xMidYMid meet"
      >
        <path d={scaledPath} fill={colorTriangle} />
      </svg>
    </div>
  );
}
