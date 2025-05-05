import React from "react";

const ZoneTable = () => {
  return (
      <div className="w-full px-10 flex items-center justify-center">
        <table className="table-auto w-full">
        <thead>
          <tr className="w-full flex items-center justify-between">
            <th>Song</th>
            <th>Artist</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          <tr className="w-full flex items-center self-end">
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td>Malcolm Lockyer</td>
            <td>1961</td>
          </tr>
          <tr className="w-full flex items-center justify-between self-end">
            <td>Witchy Woman</td>
            <td>The Eagles</td>
            <td>1972</td>
          </tr>
          <tr className="w-full flex items-center justify-between self-end">
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
            <td>1975</td>
          </tr>
        </tbody>
      </table>
      </div>
  );
};

export default ZoneTable;
