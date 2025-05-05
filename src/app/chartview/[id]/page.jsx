"use client";

import React from "react";
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
import data from "../../../data/data";

const page = () => {
  // Process data
  const processedData = data.map((item) => ({
    item: item.id,
    name: item.name,
    borr: item.borr,
    savings: item.savings,
    outstanding: item.os,
  }));
  // {      name: "Zone Office",
  //     borr: 350000,
  //     savings: 2000,
  //     savingsRatio: "40%",
  //     os: 5000,
  //     avgos: 0.014,
  //     otr: "92%",
  //     totalcollection: 1000,
  //     serviceCharge: 500,
  //     savingscollection: 400,
  //     savingsrtn: 100,
  //     srratio: "25%",
  //     disbursement: 1500,
  //     cashandbank: 800,
  //     overdue: 250,
  //     isOpen: false,}
  // Chart configuration
  const valueColumns = [
    { id: "borr", name: "Borrowers", color: "#8884d8" },
    { id: "savings", name: "Savings", color: "#82ca9d" },
    { id: "outstanding", name: "Outstanding", color: "#ffc658" },
  ];
  //   console.log(data);
  console.log(processedData);

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <h1 className="text-2xl font-bold mb-4">Bar Chart</h1>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={processedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
          <YAxis />
          <Tooltip />
          <Legend />
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
  );
};

export default page;
