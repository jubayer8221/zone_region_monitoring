"use client";

import React from "react";
// import Table from "@/components/Zone/Table";
// import TableGrids from "@/components/Home//Table/TableGrids";
// import Table from "@/components/Zone/Table";
import ZoneTable from "@/components/zone_table/ZoneTable";
// import TableGrids from "@/components/TableGrids";
// import Chart from "@/components/Home/Chart/Chart";

export default function Home() {
  return (
    <>
      {/* <h1>This is Home page.</h1> */}
      <div className="w-full">
        {/* <Table></Table> */}
        {/* <Table></Table> */}

        {/* <TableGrids></TableGrids> */}
        <ZoneTable />
        {/* <Chart></Chart> */}
      </div>
    </>
  );
}
