import React, { useMemo } from 'react';

const CircularPieChart = ({
    agentCount = 0, // Number of agents
    userCount = 0, // Number of users
    size = 150, // Total size of the component
    strokeWidth = 20, // Border thickness
    agentColor = "#ffffff", // Color for the agent section
    userColor = "#22C55E", // Color for the user section
}) => {
    const total = agentCount + userCount;
    const agentPercentage = total > 0 ? (agentCount / total) * 100 : 0;
  const agentAngle = (agentPercentage / 100) * 360;
  const userAngle = 360 - agentAngle; 
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  // Calculate agent percentage dynamically


  // Memoized function to generate arc paths
  const describeArc = useMemo(() => {
    return (x, y, radius, startAngle, endAngle) => {
      const start = {
        x: x + radius * Math.cos((Math.PI / 180) * startAngle),
        y: y + radius * Math.sin((Math.PI / 180) * startAngle),
      };
      const end = {
        x: x + radius * Math.cos((Math.PI / 180) * endAngle),
        y: y + radius * Math.sin((Math.PI / 180) * endAngle),
      };
      const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

      return [
        `M ${x} ${y}`,  // Move to the center
        `L ${start.x} ${start.y}`, // Draw line to the start point
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`, // Draw arc
        `L ${x} ${y}`, // Close the path back to the center
      ].join(' ');
    };
  }, []);

  // Function to calculate label position
  const getLabelPosition = (angle, radius) => {
    const radian = (Math.PI / 180) * angle;
    return {
      x: center + radius * Math.cos(radian),
      y: center + radius * Math.sin(radian),
    };
  };

  // Label positions
  const userLabelPosition = getLabelPosition(agentAngle + userAngle / 2, radius / 2);
  const agentLabelPosition = getLabelPosition(agentAngle / 2, radius / 2);

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
      <svg
        width={size}
        height={size}
        style={{
          transform: "rotate(-90deg)", // Start from top
        }}
      >
        {/* Circle Border */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(41, 204, 121, 0.40)"
          strokeWidth={strokeWidth}
        />
        
        {/* User Section (Remaining Pie) */}
        <path
          d={describeArc(center, center, radius, 0, agentAngle)}
          fill={userColor}
        />
        {/* Agent Section */}
        <path
          d={describeArc(center, center, radius, agentAngle, 360)}
          fill={agentColor}
        />
        
        {/* Labels */}
        <text 
          x={userLabelPosition.x}
          y={userLabelPosition.y}
          fill="black"
          fontSize="14"
          textAnchor="middle"
          alignmentBaseline="middle"
          color='black'
          angle='100'
          transform={`rotate(${userAngle / 2}, ${userLabelPosition.x}, ${userLabelPosition.y})`}
        >
            Agents
        </text>
        <text
          x={agentLabelPosition.x}
          y={agentLabelPosition.y}
          fill="white"
          fontSize="14"
          textAnchor="middle"
          alignmentBaseline="middle"
          transform={`rotate(${agentAngle / 2}, ${agentLabelPosition.x}, ${agentLabelPosition.y})`}
        >
         User 
        </text>
      </svg>
    </div>
  );
};

export default CircularPieChart;







