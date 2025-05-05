"use client";

import React from "react";
// import Table from "@/components/Zone/Table";
import TableGrids from "@/components/Home//Table/TableGrids";

export default function Home() {
  return (
    <div>
      {/* <h1>This is Home page.</h1> */}
      <div className="w-full">
        {/* <Table></Table> */}
        <TableGrids></TableGrids>
      </div>
    </div>
  );
}
