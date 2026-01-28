import React from 'react';

const Logo = ({ className = "h-8 w-auto", variant = "dark" }) => {
  const primaryColor = "#2563eb"; // Synergy Blue
  const textColor = variant === "light" ? "#ffffff" : "#0f172a";

  return (
    <svg 
      className={className} 
      viewBox="0 0 320 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Synergy Mobiles Logo"
    >
      {/* High-Clarity Typography Monogram: SM Integration */}
      <g transform="translate(5, 5)">
        {/* The Monogram 'SM' - Elegant Interlocking Type */}
        <path 
          d="M28 45V15L18 35L8 15V45" 
          stroke={primaryColor} 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <path 
          d="M8 5H28C36.2843 5 43 11.7157 43 20C43 28.2843 36.2843 35 28 35H8" 
          stroke={primaryColor} 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        {/* Subtle Accent Point */}
        <circle cx="8" cy="5" r="3" fill={primaryColor} />
      </g>

      {/* Full Typography - Maximum Readability */}
      <text 
        x="65" 
        y="42" 
        fontFamily="Inter, sans-serif" 
        fontWeight="900" 
        fontSize="30" 
        letterSpacing="-0.02em" 
        fill={textColor}
      >
        SYNERGY
      </text>
      <text 
        x="205" 
        y="42" 
        fontFamily="Inter, sans-serif" 
        fontWeight="300" 
        fontSize="30" 
        letterSpacing="0.05em" 
        fill={primaryColor}
      >
        MOBILES
      </text>
    </svg>
  );
};

export const LogoIcon = ({ className = "h-10 w-10" }) => {
  const primaryColor = "#2563eb";

  return (
    <svg 
      className={className} 
      viewBox="0 0 60 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(10, 8)">
        <path 
          d="M28 45V15L18 35L8 15V45" 
          stroke={primaryColor} 
          strokeWidth="7" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <path 
          d="M8 5H28C36.2843 5 43 11.7157 43 20C43 28.2843 36.2843 35 28 35H8" 
          stroke={primaryColor} 
          strokeWidth="7" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </g>
    </svg>
  );
};

export default Logo;
