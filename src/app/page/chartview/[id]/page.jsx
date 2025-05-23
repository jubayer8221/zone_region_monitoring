"use client";

import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
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
import data from "../../../../data/data";
import Link from "next/link";

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

  const [chartConfig, setChartConfig] = useState({
    stacked: false,
    horizontal: false,
    showLegend: true,
    showGrid: true,
    showTooltip: true,
  });

  // Dynamic chart rendering
  // const renderChart = () => {
  //   if (!labelColumn || !valueColumns.length || !processedData.length) {
  //     return (
  //       <div className="py-6 my-2 text-center text-gray-500">
  //         Please select a label column and at least one numeric value column
  //       </div>
  //     );
  //   }
  // };

  const xAxisProps = {
    dataKey: data.id,
    name: data.name || "Name",
    angle: chartConfig.horizontal ? 0 : -45,
    textAnchor: chartConfig.horizontal ? "middle" : "end",
    height: 70,
    scale: chartConfig.horizontal ? "band" : "auto",
  };

  const commonProps = {
    data: data,
    margin: { top: 20, right: 30, left: 20, bottom: 60 },
    layout: chartConfig.horizontal ? "vertical" : "horizontal",
    animationDuration: 500,
    animationEasing: "ease-in-out",
  };

  // Process data with explicit type checking

  const processedData = chartData?.children?.length
    ? chartData.children.map((item) => ({
        id: item.id,
        name: item.name,
        borr: Number(item.borr),
        os: Number(item.os),
        avgos: Number(item.avgos),
        otr: parseFloat(item.otr),
        disbursement: Number(item.disbursement),
        savings: Number(item.savings),
        savingsRatio: parseFloat(item.savingsRatio),
        totalcollection: Number(item.totalcollection),
        serviceCharge: Number(item.serviceCharge),
        savingscollection: Number(item.savingscollection),
        overdue: Number(item.overdue) || 0,
        cashandbank: Number(item.cashandbank) || 0,
        savingsRatio: Number(item.savingsRatio) || 0,
        srratio: parseFloat(item.srratio),
        savingsrtn: Number(item.savingsrtn) || 0,
      }))
    : chartData
    ? [
        {
          id: chartData.id,
          name: chartData.name,
          borr: Number(chartData.borr) || 0,
          savings: Number(chartData.savings) || 0,
          totalcollection: Number(chartData.totalcollection) || 0,
          serviceCharge: Number(chartData.serviceCharge) || 0,
          savingscollection: Number(chartData.savingscollection) || 0,
          os: Number(chartData.os) || 0,
          avgos: Number(chartData.avgos) || 0,
          otr: parseFloat(chartData.otr),
          disbursement: Number(chartData.disbursement) || 0,
          savingsRatio: parseFloat(chartData.savingsRatio),
          cashandbank: Number(chartData.cashandbank) || 0,
          srratio: parseFloat(chartData.srratio) || 0,
          savingsrtn: Number(chartData.savingsrtn) || 0,
          overdue: Number(chartData.overdue) || 0,
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
    { id: "savingsRatio", name: "Savings Ratio", color: "#ff00ff" },
    { id: "os", name: "OS", color: "#2E8B57" },
    { id: "avgos", name: "AvgOS", color: "#00ffff" },
    { id: "otr", name: "OTR", color: "#ff7f50" },
    { id: "serviceCharge", name: "Service Charge", color: "#ffc658" },
    { id: "savingscollection", name: "Savings Collection", color: "#ff7300" },
    { id: "savingsrtn", name: "Savings Return", color: "#6495ed" },
    { id: "srratio", name: "SR Ratio", color: "#dc143c" },
    { id: "disbursement", name: "Disbursement", color: "#38A3A5" },
    { id: "cashandbank", name: "Cash&Bank", color: "#00ff00" },
    { id: "overdue", name: "Overdue", color: "#ff0000" },
  ];

  // Handle loading and error states
  if (loading) {
    return <div className="p-4 text-xl">Loading...</div>;
  }

  // if (!chartData || !chartData.children?.length) {
  //   return <div className="p-4 text-xl">No data found for ID: {id}</div>;
  // }

  return (
    <div className="w-full flex flex-col">
      <div className="flex-col" style={{ width: "100%", height: "100vh" }}>
        <div className="flex items-center justify-between">
          <h1 className="lg:text-3xl md:text-2xl font-bold mb-4">
            Barchart of {chartData.name}
          </h1>
          <Link href="/" className="hover:text-green-600">
            Go To Back
          </Link>
        </div>

        {/* Chart container - scrollable */}
        <div
          className="flex-grow overflow-auto"
          style={{
            width: "100%",
            minHeight: "400px",
            // These styles ensure the container takes remaining space and scrolls
          }}
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
            minWidth="1410px"
            minHeight="730px"
          >
            <BarChart
              data={processedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={0} textAnchor="middle" height={70} />
              <YAxis />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "savingsRatio" || "otr" || "srratio")
                    return `${value}%`;
                  return value;
                }}
              />
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
    </div>
  );
};

export default MultiBarChart;
