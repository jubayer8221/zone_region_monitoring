"use client";
import data from "@/data/data";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

const ChildrenChart = () => {
  const params = useParams();
  const id = params.id;
  const [chartData, setChartData] = useState(null);
  console.log("found", chartData);

  const findItemById = (items, id) => {
    for (let item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findItemById(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  // Function to collect chart data
  const collectedChartData = (item) => {
    console.log("===========", item);
    const chartData = [];
    console.log("ChartData-----", chartData);
    const collect = (node) => {
      console.log("collect: ", node);
      chartData.push({
        name: node.name,
        borr: node.borr,
        savings: node.savings,
        savingsRatio: parseFloat(node.savingsRatio), // Convert "39%" to 39
      });
    //   if (node.children) {
    //     node.children.forEach((chil) => collect(chil));
    //   }
    };
    collect(item);
    return chartData;
  };

  useEffect(() => {
    if (id) {
      const item = findItemById(data, id);
      if (item) {
        const formattedData = collectedChartData(item);
        setChartData(formattedData);
      }
    }
  }, [id]);

  return (
    <div className="flex items-center justify-center flex-col">
      
      {chartData && chartData.map((item) => (
        <h1 className="mt-10 text-3xl font-bold" key={item.name}>{item.name}</h1>
      ))}
      <div className="m-10">
        <LineChart
          width={1000}
          height={500}
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          {/* <Line
            type="monotone"
            dataKey="borr"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          /> */}
          <Line
            type="monotone"
            dataKey="savings"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Line
            type="monotone"
            dataKey="savingsRatio"
            stackId="1"
            stroke="#ffc658"
            fill="#ffc658"
          />
          <Tooltip formatter={(value, name) => {
            if (name === "savingsRatio") return `${value}%`;
            return value;
          }} />
        </LineChart>
      </div>
    </div>
  );
};

export default ChildrenChart;