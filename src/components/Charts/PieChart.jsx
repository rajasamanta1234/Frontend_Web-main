import React from "react";
import { Chart } from "react-google-charts";

const data = [
  ["Task", "Percentage"],
  ["Course Sale 40%", 11],
  ["Course Watched 30%", 2],
  ["", 2],
];
const options = {
  title: "",
  pieHole: 0.4,
  is3D: false,
  colors: ["#701872", "#E3C7EF", "#F7F7F7"],
  pieSliceText: "none",
  legend: "none",
};

export function PieChart() {
  return (
    <div style={{ width: "100%" }}>
      <Chart
        chartType="PieChart"
        width="100%"
        height="200px"
        data={data}
        options={options}
      />
      <div>
        <ul className="pieCahrtUl">
          {data.slice(1).map((item, index) => (
            <li key={index}>{item[0]}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
