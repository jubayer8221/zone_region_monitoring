"use client";

import React, { Children, useEffect, useState } from "react";
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
import { useParams } from "next/navigation";

const page = () => {
  const prams = useParams();
  const id = prams.id;
  const [ChartData, setChartData] = useState("");

  //   console.log("idddd====", prams.id);
  //   console.log("kdfjlkdflkd===", ChartData);

  const findItemById = (items, id) => {
    // console.log("all data",items)
    for (let item of items) {
      if (item.id === id) return item;
      else if (item.children) {
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

  const processedData = data.map((ChartData) => ({
    // item: items.id,
    item: ChartData.id,
    item: ChartData.id,
    name: ChartData.name,
    borr: ChartData.borr,
    savings: ChartData.savings,
    savingratio: ChartData.savingsRatio,
    outstanding: ChartData.os,
    avgos: ChartData.avgos,
    otr: ChartData.ort,
    totalcollection: ChartData.totalcollection,
    serviceCharge: ChartData.serviceCharge,
    savingscollection: ChartData.savingscollection,
    savingsrtn: ChartData.savingsrtn,
    srratio: ChartData.srratio,
    disbursement: ChartData.disbursement,
    cashandbank: ChartData.cashandbank,
    overdue: ChartData.overdue,
  }));

  const valueColumns = [
    // { id: "borr", name: "Borrowers", color: "#8884d8" },
    { id: "savings", name: "Savings", color: "#82ca9d" },
    // { id: "outstanding", name: "Outstanding", color: "#ffc658" },
    // { id: "avgos", name: "Average OS", color: "#ff7300" },
    // { id: "otr", name: "OTR", color: "#ff0000" },
    { id: "totalcollection", name: "Rotal Collection", color: "#8884d8" },
    { id: "serviceCharge", name: "Service Charge", color: "#82ca9d" },
    // { id: "savingscollection", name: "Savings Collection", color: "#ffc658" },
    // { id: "savingsrtn", name: "savings RTN", color: "#ffc658" },
    // { id: "srratio", name: "ST Ratio", color: "#ffc658" },
  ];
  //   console.log(data);
  //   console.log(processedData);

  return (
    <div className="p-4" style={{ width: "100%", height: "500px" }}>
      <h1 className="text-2xl font-bold mb-4 px-8">Bar Chart</h1>
      <div className="bg-gray-100">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={processedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={0} textAnchor="center" height={70} />
            <YAxis />
            <Tooltip />
            <Legend />
            {valueColumns.map((column) => (
              <Bar
                key={column.id}
                dataKey={column.id}
                name={column.name}
                fill={column.color}
                //   radius={[4, 4, 0, 0]}
                stackId={data.level}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default page;
