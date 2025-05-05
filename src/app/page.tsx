"use client";
import React from "react";
import Table from "@/components/Zone/Table";
import ZoneTable from "@/components/zone_table/ZoneTable";

export default function Home() {
  return (
    <>
      {/* <h1>This is Home page.</h1> */}
      <div className="w-full">
        <Table></Table>
        <ZoneTable />
      </div>
    </>
  );
}
