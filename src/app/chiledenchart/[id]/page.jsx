"use client";

import data from "@/data/data";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const ChildrenChart = () => {
  const params = useParams();
  const id = params.id;
  const [chartData, setChartData] = useState(null);
  console.log("found", chartData);

  const findItemById = (items, id) => {
    // console.log("all data",items)
    for (let item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findItemById(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  useEffect(() => {
    // const item = data.find((item) => item.id === id);
    if (id) {
      const item = findItemById(data, id);
      // console.log("hell", item);
      if (item) {
        setChartData(item);
      }
    }
  }, [id]);

  const processedData = chartData
    ? [
        {
          id: chartData.id,
          name: chartData.name,
          borr: Number(chartData.borr) || 0,
          os: Number(chartData.os) || 0,
          avgos: Number(chartData.avgos) || 0,
          otr: Number(chartData.otr) || "0%",
          disbursement: Number(chartData.disbursement) || 0,
          savings: Number(chartData.savings) || 0,
          savingsRatio: Number(chartData.savingsRatio) || 0,
          totalcollection: Number(chartData.totalcollection) || 0,
          serviceCharge: Number(chartData.serviceCharge) || 0,
          savingscollection: Number(chartData.savingscollection) || 0,
          overdue: Number(chartData.overdue) || 0,
          cashandbank: Number(chartData.cashandbank) || 0,
          savingsRatio: Number(chartData.savingsRatio) || 0,
          srratio: Number(chartData.srratio) || 0,
          savingsrtn: Number(chartData.savingsrtn) || 0,
        },
      ]
    : [];

  const valueColumns = [
    // { id: "borr", name: "Borr/Br", color: "#ff00ff" },
    { id: "savings", name: "Savings", color: "#82ca9d" },
    { id: "savingsRatio", name: "Savings Ratio", color: "#ff00ff" },
    { id: "os", name: "OS", color: "#ffff00" },
    { id: "avgos", name: "AvgOS", color: "#00ffff" },
    { id: "otr", name: "OTR", color: "#ff7f50" },
    { id: "totalcollection", name: "Total Collection", color: "#8884d8" },
    { id: "serviceCharge", name: "Service Charge", color: "#ffc658" },
    { id: "savingscollection", name: "Savings Collection", color: "#ff7300" },
    { id: "savingsrtn", name: "Savings Return", color: "#6495ed" },
    { id: "srratio", name: "SR Ratio", color: "#dc143c" },
    { id: "disbursement", name: "Disbursement", color: "#0000ff" },
    { id: "cashandbank", name: "Cash&Bank", color: "#00ff00" },
    { id: "overdue", name: "Overdue", color: "#ff0000" },
  ];

  console.log(chartData, "chartData");

  return (
    <div className="p-4 bg-gray-200 min-h-screen">
      {/* <h1>{chartData.name}</h1> */}
      {/* <h1>{chartData.map((item)=>)}</h1> */}
      <div className="p-4 m-2 rounded-lg shadow-lg bg-white border border-gray-200">
        <h1>Area Chart </h1>
        <AreaChart
          width={800}
          height={500}
          data={Data}
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
          <Area
            type="monotone"
            dataKey="uv"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="pv"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="amt"
            stackId="1"
            stroke="#ffc658"
            fill="#ffc658"
          />
          <Tooltip />
        </AreaChart>
      </div>

      {/* Bar Chart  */}

      <div
        className="p-4 m-2 rounded-lg shadow-lg bg-white border border-gray-200"
        style={{ width: "100%", height: "100vh" }}
      >
        {processedData.map((data) => (
          <h1 key={data.id} className="text-2xl font-bold mb-4 px-8">
            Barchart of you {data.name}
          </h1>
        ))}

        <div
          className="bg-gray-100"
          style={{ width: "100%", height: "100%", minHeight: "400px" }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={processedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3 3 3 3" />
              <XAxis dataKey="name" angle={0} textAnchor="middle" height={70} />
              <YAxis />
              <Tooltip className="overflow-auto" />
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

export default ChildrenChart;
