import { ResponsiveContainer, PieChart, Pie, Label } from "recharts";

function PieChartComponent({ data }) {
  return (
    <div className="pieFont" style={{ width: "100%", height: 150 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={[
              { name: "Group A", value: 100, fill: `transparent` },
              { name: "Group B", value: data, fill: "#fff" },
            ]}
            // cx={100}
            // cy={150}
            startAngle={-20}
            endAngle={200}
            innerRadius={"50%"}
            outerRadius={"100%"}
            fill="#fff"
            paddingAngle={0}
            dataKey="value"
          >
            {/* <Label
              value="800"
              viewBox={{ width: 4 }}
              position="inside"
              fill="white"
            /> */}
          </Pie>
          <Pie
            className="chaaart"
            data={[
              { name: "Group A", value: 100, fill: "#FFFFFF47" },
              { name: "Group B", value: 0, fill: "#FFFFFF47" },
            ]}
            // cx={80}
            // cy={100}
            startAngle={-20}
            endAngle={200}
            innerRadius={"50%"}
            outerRadius={"100%"}
            fill="#fff"
            paddingAngle={0}
            dataKey="value"
            blendStroke
          >
            <Label
              value={`${data ?? ""}%`}
              viewBox={{ width: 140 }}
              position="center"
              fill="white"
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartComponent;
