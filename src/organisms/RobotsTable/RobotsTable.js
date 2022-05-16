import React, { useState, useEffect } from "react";
import "./styles.scss";

const RobotsTable = ({ data, submit }) => {
  const headers = [
    { name: "Name" },
    { name: "Color" },
    { name: "Attack" },
    { name: "Defence" },
    { name: "" },
    { name: "" },
  ];

  return (
    <table className={`data-table`}>
      <thead>
        <tr>
          {headers.map(({ name }, i) => (
            <th key={i}>{name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* {table.map((data, i) => (
          <tr key={i}>
            {data.map((value, i) => (
              <td key={i}>{value}</td>
            ))}
          </tr>
        ))} */}
      </tbody>
    </table>
  );
};

export default RobotsTable;
