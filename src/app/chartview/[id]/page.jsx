"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useParams } from "next/navigation";
import data from "../../../data/data";

const MultiBarChart = () => {
  const params = useParams();
  const { id } = params;
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Recursive function to find item by ID
  const findItemById = (items, id) => {
    for (let item of items) {
      if (item.id === id) return item;
      if (item.children && Array.isArray(item.children)) {
        const found = findItemById(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      const item = findItemById(data, id);
      // console.log("Found item:", item); // Debug: Log the found items
      if (item) {
        setChartData(item);
      } else {
        setChartData(null);
      }
      setLoading(false);
    }
  }, [id]);

  // Process data with explicit type checking

  const processedData = chartData?.children?.length
    ? chartData.children.map((item) => ({
        id: item.id,
        name: item.name,
        savings: Number(item.savings) || 0,
        totalcollection: Number(item.totalcollection) || 0,
        serviceCharge: Number(item.serviceCharge) || 0,
        savingscollection: Number(item.savingscollection) || 0,
      }))
    : chartData
    ? [
        {
          id: chartData.id,
          name: chartData.name,
          savings: Number(chartData.savings) || 0,
          totalcollection: Number(chartData.totalcollection) || 0,
          serviceCharge: Number(chartData.serviceCharge) || 0,
          savingscollection: Number(chartData.savingscollection) || 0,
        },
      ]
    : [];

  // const processedData = chartData
  //   ? [
  //       {
  //         id: chartData.id,
  //         name: chartData.name,
  //         savings: Number(chartData.savings) || 0,
  //         totalcollection: Number(chartData.totalcollection) || 0,
  //         serviceCharge: Number(chartData.serviceCharge) || 0,
  //         savingscollection: Number(chartData.savingscollection) || 0,
  //       },
  //     ]
  //   : [];

  console.log("Processed Data:", processedData); // Debug: Log processed data

  const valueColumns = [
    { id: "savings", name: "Savings", color: "#82ca9d" },
    { id: "totalcollection", name: "Total Collection", color: "#8884d8" },
    { id: "serviceCharge", name: "Service Charge", color: "#ffc658" },
    { id: "savingscollection", name: "Savings Collection", color: "#ff7300" },
  ];

  // Handle loading and error states
  if (loading) {
    return <div className="p-4 text-xl">Loading...</div>;
  }

  // if (!chartData || !chartData.children?.length) {
  //   return <div className="p-4 text-xl">No data found for ID: {id}</div>;
  // }

  return (
    <div className="p-4" style={{ width: "100%", height: "500px" }}>
      <h1 className="text-2xl font-bold mb-4 px-8">Bar Chart</h1>
      <div
        className=""
        style={{ width: "100%", height: "100%", minHeight: "400px" }} // Ensure container has height
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={processedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={0} textAnchor="middle" height={70} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            {valueColumns.map((column) => (
              <Bar
                key={column.id}
                dataKey={column.id}
                name={column.name}
                fill={column.color}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MultiBarChart;
