import React, { useEffect, useRef } from "react";
import { useParams } from "next/navigation";

import data from "../../../data/data";

const Chart = ({ labels }) => {
  const params = useParams();
  const { id } = params;

  const canvasRef = useRef(null);

  // Recursive function to find items by id
  const findItemsById = (data, id) => {
    for (const item of data) {
      if (item.id === id) {
        return item;
      }
      if (item.children) {
        const result = findItemsById(item.children, id);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  const chartData = findItemsById(data, id);

  useEffect(() => {
    if (!chartData) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const barWidth = 40;
    const barSpacing = 20;
    const chartHeight = 250;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bars
    chartData.values.forEach((value, index) => {
      const x = index * (barWidth + barSpacing) + barSpacing;
      const y = chartHeight - value;

      // Draw bar
      ctx.fillStyle = "#4CAF50";
      ctx.fillRect(x, y, barWidth, value);

      // Draw label
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.fillText(labels[index], x + barWidth / 2, chartHeight + 15);
    });

    // Draw axes
    ctx.beginPath();
    ctx.moveTo(10, chartHeight);
    ctx.lineTo(canvas.width, chartHeight);
    ctx.strokeStyle = "#000";
    ctx.stroke();
  }, [chartData, labels]);

  return (
    <div>
      <h1>Bar Chart</h1>
      <canvas ref={canvasRef} width={400} height={300} />
    </div>
  );
};

export default Chart;
