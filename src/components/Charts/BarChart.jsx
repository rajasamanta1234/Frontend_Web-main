import { Chart } from "react-google-charts";

const data = [
  ["Year", "Course Visit", "Course Sale", "Revenue"],
  ["2021", 1000, 400, 200],
  ["2022", 1170, 460, 250],
  ["2023", 660, 1120, 300],
  ["2024", 1030, 540, 350],
];

const options = {
  chart: {
    title: "",
    subtitle: "",
  },
  colors: ["#701872", "#E3C7EF", "#F7F7F7"],
};

export function Barchart() {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
