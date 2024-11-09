"use client";

import { useChartConfiguration } from "@/hooks/use-chart-config";
import { mockProjectData } from "@/lib/constants";
import { useActiveDataStore } from "@/lib/store";
import React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
} from "recharts";
import { CurveType } from "recharts/types/shape/Curve";
/* eslint-disable @typescript-eslint/no-explicit-any */

type Props = {
  data: any;
  dimension: { width: number; height: number };
};
const twColorHsl = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const ActiveChart = ({ dimension }: Props) => {
  const { chart, cartesian, legend, xAxis, yAxis } = useChartConfiguration();
  const { dataId } = useActiveDataStore();
  const dataUsed = mockProjectData.filter((data) => data.name === dataId)[0]
    .data.data;
  dataUsed.map((d) => {
    Object.entries(d).forEach(([key, value]) => {
      // @ts-expect-error value
      if (typeof value === "boolean") d[key] = value ? 1 : 0;
    });
  });
  // console.log(chart);
  if (
    chart.columns.length === 0 ||
    (chart.rows.length === 0 && chart.type !== "pie")
  )
    return (
      <div className="w-full text-center h-full grid place-items-center">
        Fill columns and rows
      </div>
    );
  if (chart.type === "line") {
    return (
      <LineChart
        className="p-3 border border-slate-100"
        data={dataUsed}
        width={dimension.width}
        height={dimension.height}
      >
        {cartesian.cartesianEnabled && (
          <CartesianGrid
            vertical={cartesian.vertical}
            horizontal={cartesian.horizontal}
          />
        )}
        {!xAxis.hide && (
          <XAxis
            className="text-sm"
            orientation={xAxis.orientation}
            tickLine={xAxis.tickLine ? { stroke: "#9ca3af" } : false}
            axisLine={xAxis.axisLine ? { stroke: "#9ca3af" } : false}
            dataKey={chart.columns[0].name}
            tickFormatter={
              chart.columns[0].type === "date"
                ? (value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }
                : undefined
            }
          />
        )}
        {!yAxis.hide && (
          <YAxis
            className="text-sm"
            orientation={yAxis.orientation}
            tickLine={yAxis.tickLine ? { stroke: "#9ca3af" } : false}
            axisLine={yAxis.axisLine ? { stroke: "#9ca3af" } : false}
          />
        )}
        {legend.legendEnabled && (
          <Legend align={legend.align} verticalAlign={legend.verticalAlign} />
        )}
        {chart.rows.map((row, i) => (
          <Line
            key={row.name}
            type={chart.lineType as CurveType}
            dataKey={row.name}
            stroke={twColorHsl[i]}
            isAnimationActive={false}
            dot={chart.dot}
          >
            {chart.withLabel && (
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            )}
          </Line>
        ))}
      </LineChart>
    );
  }
  if (chart.type === "area") {
    return (
      <AreaChart
        className="p-3"
        data={dataUsed}
        width={dimension.width}
        height={dimension.height}
      >
        {cartesian.cartesianEnabled && (
          <CartesianGrid
            vertical={cartesian.vertical}
            horizontal={cartesian.horizontal}
          />
        )}
        {!xAxis.hide && (
          <XAxis
            className="text-sm"
            orientation={xAxis.orientation}
            tickLine={xAxis.tickLine ? { stroke: "#9ca3af" } : false}
            axisLine={xAxis.axisLine ? { stroke: "#9ca3af" } : false}
            dataKey={chart.columns[0].name}
            tickFormatter={
              chart.columns[0].type === "date"
                ? (value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }
                : undefined
            }
          />
        )}
        {!yAxis.hide && (
          <YAxis
            className="text-sm"
            orientation={yAxis.orientation}
            tickLine={yAxis.tickLine ? { stroke: "#9ca3af" } : false}
            axisLine={yAxis.axisLine ? { stroke: "#9ca3af" } : false}
          />
        )}
        {legend.legendEnabled && (
          <Legend align={legend.align} verticalAlign={legend.verticalAlign} />
        )}
        {chart.rows.map((row, i) => (
          <Area
            key={row.name}
            type={chart.lineType as CurveType}
            dataKey={row.name}
            fill={twColorHsl[i]}
            stroke={twColorHsl[i]}
            opacity={`${100 - i * 20}%`}
            isAnimationActive={false}
          >
            {chart.withLabel && (
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            )}
          </Area>
        ))}
      </AreaChart>
    );
  }
  if (chart.type === "stackedArea" || chart.type === "stackedPercent") {
    return (
      <AreaChart
        className="p-3"
        data={dataUsed}
        stackOffset={chart.type === "stackedPercent" ? "expand" : undefined}
        width={dimension.width}
        height={dimension.height}
      >
        {cartesian.cartesianEnabled && (
          <CartesianGrid
            vertical={cartesian.vertical}
            horizontal={cartesian.horizontal}
          />
        )}
        {!xAxis.hide && (
          <XAxis
            className="text-sm"
            orientation={xAxis.orientation}
            tickLine={xAxis.tickLine ? { stroke: "#9ca3af" } : false}
            axisLine={xAxis.axisLine ? { stroke: "#9ca3af" } : false}
            dataKey={chart.columns[0].name}
            tickFormatter={
              chart.columns[0].type === "date"
                ? (value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }
                : undefined
            }
          />
        )}
        {!yAxis.hide && (
          <YAxis
            className="text-sm"
            orientation={yAxis.orientation}
            tickLine={yAxis.tickLine ? { stroke: "#9ca3af" } : false}
            axisLine={yAxis.axisLine ? { stroke: "#9ca3af" } : false}
          />
        )}
        {legend.legendEnabled && (
          <Legend align={legend.align} verticalAlign={legend.verticalAlign} />
        )}
        {chart.rows.map((row, i) => (
          <Area
            key={row.name}
            type={chart.lineType as CurveType}
            dataKey={row.name}
            fill={twColorHsl[i]}
            stackId="stack-1"
            stroke={twColorHsl[i]}
            opacity={`${100 - i * 20}%`}
            isAnimationActive={false}
          />
        ))}
      </AreaChart>
    );
  }
  if (chart.type === "bar") {
    return (
      <BarChart
        data={dataUsed}
        layout={chart.layout}
        margin={{ top: 25, right: 20, left: 20, bottom: 20 }}
        width={dimension.width}
        height={dimension.height}
      >
        {cartesian.cartesianEnabled && (
          <CartesianGrid
            vertical={cartesian.vertical}
            horizontal={cartesian.horizontal}
          />
        )}
        {!xAxis.hide && (
          <XAxis
            orientation={xAxis.orientation}
            tickLine={xAxis.tickLine ? { stroke: "#9ca3af" } : false}
            axisLine={xAxis.axisLine ? { stroke: "#9ca3af" } : false}
            dataKey={
              chart.layout === "horizontal" ? chart.columns[0].name : undefined
            }
            className="text-sm"
            tickFormatter={
              chart.columns[0].type === "date" && chart.layout === "horizontal"
                ? (value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }
                : undefined
            }
            type={chart.layout === "vertical" ? "number" : "category"}
          />
        )}
        {!yAxis.hide && (
          <YAxis
            orientation={yAxis.orientation}
            tickLine={yAxis.tickLine ? { stroke: "#9ca3af" } : false}
            axisLine={yAxis.axisLine ? { stroke: "#9ca3af" } : false}
            dataKey={
              chart.layout === "vertical" ? chart.columns[0].name : undefined
            }
            className="text-sm"
            tickFormatter={
              chart.columns[0].type === "date" && chart.layout === "vertical"
                ? (value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }
                : undefined
            }
            type={chart.layout === "vertical" ? "category" : "number"}
          />
        )}
        {legend.legendEnabled && (
          <Legend align={legend.align} verticalAlign={legend.verticalAlign} />
        )}
        {chart.rows.map((row, i) => (
          <Bar
            key={row.name}
            dataKey={row.name}
            fill={twColorHsl[i]}
            radius={+chart.radius}
            stroke={twColorHsl[i]}
            isAnimationActive={false}
          >
            {chart.withLabel && (
              <LabelList
                position="top"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            )}
          </Bar>
        ))}
      </BarChart>
    );
  }
  if (chart.type === "stackedBar") {
    return (
      <BarChart
        className="p-3"
        data={dataUsed}
        width={dimension.width}
        height={dimension.height}
      >
        {cartesian.cartesianEnabled && (
          <CartesianGrid
            vertical={cartesian.vertical}
            horizontal={cartesian.horizontal}
          />
        )}
        {!xAxis.hide && (
          <XAxis
            className="text-sm"
            orientation={xAxis.orientation}
            tickLine={xAxis.tickLine ? { stroke: "#9ca3af" } : false}
            axisLine={xAxis.axisLine ? { stroke: "#9ca3af" } : false}
            dataKey={
              chart.layout === "horizontal" ? chart.columns[0].name : undefined
            }
            tickFormatter={
              chart.columns[0].type === "date" && chart.layout === "horizontal"
                ? (value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }
                : undefined
            }
            type={chart.layout === "vertical" ? "number" : "category"}
          />
        )}
        {!yAxis.hide && (
          <YAxis
            className="text-sm"
            orientation={yAxis.orientation}
            tickLine={yAxis.tickLine ? { stroke: "#9ca3af" } : false}
            axisLine={yAxis.axisLine ? { stroke: "#9ca3af" } : false}
            dataKey={
              chart.layout === "vertical" ? chart.columns[0].name : undefined
            }
            tickFormatter={
              chart.columns[0].type === "date" && chart.layout === "vertical"
                ? (value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }
                : undefined
            }
            type={chart.layout === "vertical" ? "category" : "number"}
          />
        )}
        {legend.legendEnabled && (
          <Legend align={legend.align} verticalAlign={legend.verticalAlign} />
        )}
        {chart.rows.map((row, i) => (
          <Bar
            key={row.name}
            dataKey={row.name}
            fill={twColorHsl[i]}
            stroke={twColorHsl[i]}
            opacity={`${100 - i * 50}%`}
            radius={+chart.radius}
            stackId={"stack-1"}
            isAnimationActive={false}
          />
        ))}
      </BarChart>
    );
  }

  if (chart.type === "pie") {
    let transformedData: any[] = dataUsed;
    if (chart.aggregate) {
      transformedData = chart.columns.map((col) => {
        const aggregatedData = Object.entries(
          dataUsed.reduce((acc, item) => {
            const key = item[col.name as keyof typeof item];
            // @ts-expect-error key
            acc[key] = (acc[key] || 0) + 1;
            return acc;
          }, {})
        ).map(([key, count]) => ({ name: key, value: count }));

        return aggregatedData;
      });
    }

    return (
      <PieChart
        className="p-3"
        width={dimension.width}
        height={dimension.height}
      >
        {legend.legendEnabled && (
          <Legend
            payloadUniqBy={true}
            align={legend.align}
            verticalAlign={legend.verticalAlign}
          />
        )}
        {chart.columns.map((col, i) => (
          <Pie
            key={col.name}
            dataKey={chart.aggregate ? "value" : col.name}
            data={chart.aggregate ? transformedData[i] : transformedData}
            innerRadius={i * 60 + i * 50}
            outerRadius={100 + i * 40}
            fill={twColorHsl[i]}
            label={chart.withLabel && i > 0}
          >
            {chart.aggregate
              ? // @ts-expect-error any type
                transformedData[i].map((_e, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={twColorHsl[index]}
                    stroke={twColorHsl[index]}
                  />
                ))
              : transformedData.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={twColorHsl[index]}
                    stroke={twColorHsl[index]}
                  />
                ))}
          </Pie>
        ))}
      </PieChart>
    );
  }
  if (chart.type === "scatter") {
    return (
      <ScatterChart
        className="p-3"
        width={dimension.width}
        height={dimension.height}
      >
        {cartesian.cartesianEnabled && (
          <CartesianGrid
            vertical={cartesian.vertical}
            horizontal={cartesian.horizontal}
          />
        )}
        {!xAxis.hide && (
          <XAxis
            className="text-sm"
            orientation={xAxis.orientation}
            tickLine={xAxis.tickLine ? { stroke: "#9ca3af" } : false}
            axisLine={xAxis.axisLine ? { stroke: "#9ca3af" } : false}
            type="number"
            dataKey={chart.columns[0].name}
          />
        )}
        {!yAxis.hide && (
          <YAxis
            className="text-sm"
            orientation={yAxis.orientation}
            tickLine={yAxis.tickLine ? { stroke: "#9ca3af" } : false}
            axisLine={yAxis.axisLine ? { stroke: "#9ca3af" } : false}
            type="number"
            dataKey={chart.rows[0].name}
          />
        )}
        <Scatter
          lineType="joint"
          data={dataUsed}
          fill={twColorHsl[i]}
          line={chart.line}
        />
      </ScatterChart>
    );
  }
  return (
    <div className="w-full h-full grid text-center place-items-center">
      Choose a chart type
    </div>
  );
};

export default ActiveChart;
