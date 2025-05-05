"use client";

import React from "react";
import Table from "@/components/Zone/Table";
import ZoneTable from "@/components/zone_table/ZoneTable";
import TableGrids from "@/components/TableGrids";

export default function Home() {
  return (
    <>
      {/* <h1>This is Home page.</h1> */}
      <div className="w-full">
        <Table></Table>

        <TableGrids></TableGrids>
        <ZoneTable />
      </div>
    </>
  );
}
