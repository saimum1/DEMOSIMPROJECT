import React from 'react';

const CircularProgress = ({
  value ,
  maxValue ,
  size = 200, // Total size of the component
  strokeWidth = 20, // Border thickness
  activeColor = "#22C55E", // Active arc color
  inactiveColor = "#0f391d", // Inactive arc color
  label = "SIM Available",
}) => {
  const percentage = (value / maxValue) * 100;
console.log("sadsad",value)
  // Calculate circle dimensions
  const radius = (size - strokeWidth) / 2; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Total circumference of the circle
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1a1a1a", // Dark background color
        borderRadius: "50%", // Circular shape
      }}
    >
      {/* SVG Container */}
      <svg
        width={size}
        height={size}
        style={{
          transform: "rotate(-90deg)", // Start from top
          overflow: "visible",
        }}
      >
        {/* Inactive Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={inactiveColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Active Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={activeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
        />
      </svg>

      {/* Inner Content */}
      <div
        style={{
          position: "absolute",
          width: "80%", // Adjust size of inner circle
          height: "80%",
          borderRadius: "50%", // Inner circle should be circular
          backgroundColor: "#fff", // White background for inner circle
        }}
      />

      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <span
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: activeColor,
          }}
        >
          {value.toLocaleString()}
        </span>
        <span
          style={{
            fontSize: "80%",
            color: "#333333", // Dark text for label
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

export default CircularProgress;
