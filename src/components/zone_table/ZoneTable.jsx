"use client";
import data from "@/data/data";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { LuMinus } from "react-icons/lu";
import { VscDebugBreakpointLog } from "react-icons/vsc";

const ZoneTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="overflow-x-auto bg-white rounded-md shadow-md">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left text-sm">
                <th className="px-4 py-4">Operation Place</th>
                <th className="px-4 py-4">Borr / Br</th>
                <th className="px-4 py-4">Savings</th>
                <th className="px-4 py-4">Savings Ratio</th>
                <th className="px-4 py-4">OS</th>
                <th className="px-4 py-4">Avg. OS</th>
                <th className="px-4 py-4">OTR%</th>
                <th className="px-4 py-4">Total Collection</th>
                <th className="px-4 py-4">Service Charge</th>
                <th className="px-4 py-4">Savings RTN</th>
                <th className="px-4 py-4">SR Ratio</th>
                <th className="px-4 py-4">Disbursement</th>
                <th className="px-4 py-4">Cash & Bank</th>
                <th className="px-4 py-4">Overdue</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {data.map((item) => (
                <React.Fragment key={item.id}>
                <tr  className="border-b hover:bg-gray-100">
                  <td className="px-4 py-4 flex items-center gap-5">
                    {item.children && item.children.length > 0 ? (
                      <button
                        onClick={toggleOpen}
                        className="text-4 text-white w-6 h-6 p-2 bg-gray-400 rounded-full flex items-center justify-center cursor-pointer"
                      >
                        {isOpen ? (
                          <LuMinus className="" />
                        ) : (
                          <FaPlus className="" />
                        )}
                      </button>
                    ) : (
                      <VscDebugBreakpointLog className="text-4" />
                    )}

                    {item.name}
                  </td>
                  <td className="px-4 py-4">{item.borr}</td>
                  <td className="px-4 py-4">{item.savings}</td>
                  <td className="px-4 py-4">
                    {item.savingsRatio}
                  </td>
                  <td className="px-4 py-4">{item.os}</td>
                  <td className="px-4 py-4">{item.avgos}</td>
                  <td className="px-4 py-4">
                    {item.otr}
                  </td>
                  <td className="px-4 py-4">{item.totalcollection}</td>
                  <td className="px-4 py-4">{item.serviceCharge}</td>
                  <td className="px-4 py-4">
                    {item.savingscollection}
                  </td>
                  <td className="px-4 py-4">{item.srratio}</td>
                  <td className="px-4 py-4">{item.disbursement}</td>
                  <td className="px-4 py-4">{item.cashandbank}</td>
                  <td className="px-4 py-4">{item.overdue}</td>
                </tr>
                {isOpen && item.children && item.children.map((item)=>(
                  <tr key={item.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-4 flex items-center gap-5">
                    {item.children && item.children.length > 0 ? (
                      <button
                        onClick={toggleOpen}
                        className="text-4 text-white w-6 h-6 p-2 bg-gray-400 rounded-full flex items-center justify-center cursor-pointer"
                      >
                        {isOpen ? (
                          <LuMinus className="" />
                        ) : (
                          <FaPlus className="" />
                        )}
                      </button>
                    ) : (
                      <VscDebugBreakpointLog className="text-4" />
                    )}

                    {item.name}
                  </td>
                  <td className="px-4 py-4">{item.borr}</td>
                  <td className="px-4 py-4">{item.savings}</td>
                  <td className="px-4 py-4">
                    {item.savingsRatio}
                  </td>
                  <td className="px-4 py-4">{item.os}</td>
                  <td className="px-4 py-4">{item.avgos}</td>
                  <td className="px-4 py-4">
                    {item.otr}
                  </td>
                  <td className="px-4 py-4">{item.totalcollection}</td>
                  <td className="px-4 py-4">{item.serviceCharge}</td>
                  <td className="px-4 py-4">
                    {item.savingscollection}
                  </td>
                  <td className="px-4 py-4">{item.srratio}</td>
                  <td className="px-4 py-4">{item.disbursement}</td>
                  <td className="px-4 py-4">{item.cashandbank}</td>
                  <td className="px-4 py-4">{item.overdue}</td>
                </tr>
                ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ZoneTable;
