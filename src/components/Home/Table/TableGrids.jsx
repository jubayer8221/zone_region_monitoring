"use client";

import React, { useState } from "react";
import data from "../../../data/data";
import { TiEye } from "react-icons/ti";
import Link from "next/link";

// Recursive component to render rows for each level
const DataRow = ({ item, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(item.isOpen || false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <tr className="border-b hover:bg-gray-100">
        <td className="py-2 px-4" style={{ paddingLeft: `${level * 20}px` }}>
          {item.children && item.children.length > 0 ? (
            <button
              onClick={toggleOpen}
              className="mr-2 p-2 w-7 bg-gray-300 rounded-md hover:bg-gray-400 transition transform active:scale-90"
            >
              {isOpen ? "-" : "+"}
            </button>
          ) : (
            <span className="mr-2 w-full"> </span>
          )}
          <span className="w-40">{item.name}</span>
        </td>
        <td className="py-2 px-2 text-right">{item.borr}</td>
        <td className="py-2 px-2 text-right">{item.savings}</td>
        <td className="py-2 px-2 text-right">{item.savingsRatio}</td>
        <td className="py-2 px-2 text-right">{item.os}</td>
        <td className="py-2 px-2 text-right">{item.avgos}</td>
        <td className="py-2 px-2 text-right">{item.otr}</td>
        <td className="py-2 px-2 text-right">{item.totalcollection}</td>
        <td className="py-2 px-2 text-right">{item.serviceCharge}</td>
        <td className="py-2 px-2 text-right">{item.savingscollection}</td>
        <td className="py-2 px-2 text-right">{item.savingsrtn}</td>
        <td className="py-2 px-2 text-right">{item.srratio}</td>
        <td className="py-2 px-2 text-right">{item.disbursement}</td>
        <td className="py-2 px-2 text-right">{item.cashandbank}</td>
        <td className="py-2 px-2 text-right">{item.overdue}</td>
        <td>
          <Link href={`/chartview/${item.id}`}>
            <button className="w-6 h-6 p-1 rounded-full bg-gray-500 flex items-center justify-center cursor-pointer transform active:scale-90">
              <TiEye className="text-[20px] text-white" />
            </button>
          </Link>
        </td>
      </tr>
      {isOpen &&
        item.children &&
        item.children.map((child) => (
          <DataRow key={child.id} item={child} level={level + 1} />
        ))}
    </>
  );
};

const TableGrids = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Bangladesh Financial Data
      </h1>
      <div className="p-4 overflow-x-auto rounded-md shadow-lg bg-white border border-gray-200">
        <table className="min-w-full bg-white rounded-md">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
              <th className="py-3 px-2 text-left w-40">Name</th>
              <th className="py-3 px-2 text-right">Borr /Br</th>
              <th className="py-3 px-2 text-right">Savings</th>
              <th className="py-3 px-2 text-right">Savings Ratio</th>
              <th className="py-3 px-2 text-right">OS</th>
              <th className="py-3 px-2 text-right">Avg OS</th>
              <th className="py-3 px-2 text-right">OTR</th>
              <th className="py-3 px-2 text-right">Total Collection</th>
              <th className="py-3 px-2 text-right">Service Charge</th>
              <th className="py-3 px-2 text-right">Savings Collection</th>
              <th className="py-3 px-2 text-right">Savings Return</th>
              <th className="py-3 px-2 text-right">SR Ratio</th>
              <th className="py-3 px-2 text-right">Disbursement</th>
              <th className="py-3 px-2 text-right">Cash and Bank</th>
              <th className="py-3 px-2 text-right">Overdue</th>
              <th className="py-3 px-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {data.map((item) => (
              <DataRow key={item.id} item={item} level={0} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableGrids;
