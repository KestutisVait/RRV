import React from "react";

const StripedSVGPattern = ({
  angle = 45,
  stripeColor = "rgba(26, 32, 44, 1)",
  stripeThickness = 1,
  gap = 6,
  width = 300,
  height = 100,
  fadeHeight = 100 // height of the fade in px
}) => {
  const patternSize = stripeThickness + gap;

  return (
    <svg 
      width={`${width}vw`} 
      height={height} 
      xmlns="http://www.w3.org/2000/svg" 
      style={{ position: "absolute", top: "0", right: "0" }}
      z-index="-1"
    >
      <defs>
        {/* Stripe pattern */}
        <pattern
          id="stripePattern"
          width={patternSize}
          height={patternSize}
          patternUnits="userSpaceOnUse"
          patternTransform={`rotate(${angle})`}
        >
          <rect width={stripeThickness} height={patternSize} fill={stripeColor} />
        </pattern>

        {/* Fade mask */}
        <linearGradient id="fadeGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset={0} stopColor="white" stopOpacity={1} />
          <stop
            offset={Math.max(0, (height - fadeHeight) / height)}
            stopColor="white"
            stopOpacity={1}
          />
          <stop offset="1" stopColor="white" stopOpacity={0} />
        </linearGradient>

        <mask id="fadeMask">
          <rect width="100%" height="100%" fill="url(#fadeGradient)" />
        </mask>
      </defs>

      {/* Apply mask to stripes */}
      <rect
        width="100%"
        height="100%"
        fill="url(#stripePattern)"
        mask="url(#fadeMask)"
      />
    </svg>
  );
};

export default StripedSVGPattern;
