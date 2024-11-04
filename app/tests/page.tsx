"use client";
import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { useMeasure } from "@uidotdev/usehooks";
import { useChartConfiguration } from "@/hooks/use-chart-config";
import PreviewTable from "@/components/sidetab/data/preview-table";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: -3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Page() {
  const [ref, { width, height }] = useMeasure();
  const { xAxis, yAxis, cartesian, legend } = useChartConfiguration();
  // useEffect(() => {
  //   console.log(xAxis, yAxis, cartesian, legend);
  // }, [xAxis, yAxis, cartesian, legend]);
  return (
    <main ref={ref} className="w-full h-screen">
      {/* <LineChart data={data} width={width as number} height={height as number}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          padding={{ left: 30, right: 30 }}
         
        />
        <YAxis  axisLine={false} tickLine={false} />
        <Legend verticalAlign=""/>
        <Tooltip />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="stepAfter" dataKey="uv" stroke="#82ca9d">
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
          />
        </Line>
      </LineChart> */}
      {/* <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="step" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer> */}
      {/* <BarChart width={150} height={400} data={data} layout="">
        <Bar dataKey="uv" fill="#8884d8">
          {data.map((item) => (
            <Cell key={item.name} fill={item.uv > 0 ? "green" : "red"} />
          ))}
        </Bar>

        <XAxis type="number" dataKey="uv" hide />
        <YAxis type="category" dataKey="name" />
      </BarChart> */}

      <PreviewTable />
    </main>
  );
}
