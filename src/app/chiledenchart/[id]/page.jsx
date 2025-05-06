"use client";

import MultiBarChart from "@/app/chartview/[id]/page";
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

const ChildrenChart = () => {
  const params = useParams();
  const id = params.id;
  const [chartData, setChartData] = useState(null);
  const [chartData2, setChartData2] = useState(null);
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
      // chartData.push({
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
        setChartData2(item);
      }
    }
  }, [id]);

  const processedData = chartData2
    ? [
        {
          id: chartData2.id,
          name: chartData2.name,
          borr: Number(chartData2.borr) || 0,
          os: Number(chartData2.os) || 0,
          avgos: Number(chartData2.avgos) || 0,
          otr: parseFloat(chartData2.otr),
          disbursement: Number(chartData2.disbursement) || 0,
          savings: Number(chartData2.savings) || 0,
          savingsRatio: parseFloat(chartData2.savingsRatio),

          totalcollection: Number(chartData2.totalcollection) || 0,
          serviceCharge: Number(chartData2.serviceCharge) || 0,
          savingscollection: Number(chartData2.savingscollection) || 0,
          overdue: Number(chartData2.overdue) || 0,
          cashandbank: Number(chartData2.cashandbank) || 0,
          savingsRatio: Number(chartData2.savingsRatio) || 0,
          srratio: parseFloat(chartData2.srratio) || 0,
          savingsrtn: Number(chartData2.savingsrtn) || 0,
        },
      ]
    : [];

  const valueColumns = [
    // { id: "borr", name: "Borr/Br", color: "#ff00ff" },
    { id: "savings", name: "Savings", color: "#82ca9d" },
    { id: "savingsRatio", name: "Savings Ratio", color: "#ff00ff" },
    { id: "os", name: "OS", color: "#fff00" },
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
      <div className="p-4 m-2 rounded-lg shadow-lg bg-white border border-gray-200 flex items-center justify-center flex-col">
        <MultiBarChart />
      </div>
      <div className="p-4 m-2 rounded-lg shadow-lg bg-white border border-gray-200 flex items-center justify-center flex-col">
        {chartData &&
          chartData.map((item) => (
            <h1 key={data.id} className="text-3xl font-bold mb-4">
              Line Chart for {item.name}
            </h1>
          ))}
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
          <Tooltip
            formatter={(value, name) => {
              if (name === "savingsRatio") return `${value}%`;
              return value;
            }}
          />
        </LineChart>
      </div>
      {/* Bar Chart  */}

      <div
        className="p-4 m-2 rounded-lg shadow-lg bg-white border border-gray-200"
        style={{ width: "100%", height: "100vh" }}
      >
        {processedData.map((data) => (
          <h1 key={data.id} className="text-2xl font-bold mb-4 px-8">
            Barchart for {data.name}
          </h1>
        ))}

        <div
          className=""
          style={{ width: "100%", height: "100%", minHeight: "400px" }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={processedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3 3" />
              <XAxis dataKey="name" angle={0} textAnchor="middle" height={70} />
              <YAxis />
              <Tooltip
                processedData={(value, name) => {
                  if (name === "savingsRatio") return `${value}%`;
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

      {/* Area Chart  */}
      <div className="p-4 m-2 rounded-lg shadow-lg bg-white border border-gray-200">
        {processedData.map((data) => (
          <h1 key={data.id} className="text-2xl font-bold mb-4 px-8">
            Area chart for {data.name}
          </h1>
        ))}

        {processedData.map((data) => (
          <AreaChart
            width={800}
            height={500}
            data={processedData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={data.name} />
            <YAxis />

            <Area
              type="monotone"
              dataKey={data.savings}
              stackId={data.id}
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Tooltip />
          </AreaChart>
        ))}
      </div>
    </div>
  );
};

export default ChildrenChart;
