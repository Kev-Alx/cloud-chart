"use client";

import { useImageGeneration } from "@/components/workspace/image-ctx";
import { useChartConfiguration } from "@/hooks/use-chart-config";
import { mockProjectData } from "@/lib/constants";
import { useActiveDataStore } from "@/lib/store";
import { aggregateData, cn, sortData } from "@/lib/utils";
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
  const ctx = useImageGeneration();

  let transformedData: any[] | undefined = dataUsed;
  if (chart.aggregate && ["pie"].includes(chart.type)) {
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
  if (
    chart.columns.length === 0 ||
    (chart.rows.length === 0 && chart.type !== "pie")
  )
    return (
      <div className="w-full text-center h-full grid place-items-center">
        Fill columns and rows
      </div>
    );
  if (chart.aggregate && !["pie", "scatter"].includes(chart.type)) {
    transformedData = aggregateData(
      dataUsed as any,
      chart.columns[0].name as keyof (typeof dataUsed)[0],
      chart.rows.map((row) => row.name as keyof (typeof dataUsed)[0]),
      chart.aggregateMethod
    );
  }
  if (!["pie", "scatter"].includes(chart.type) && chart.sortBy.by.length > 0) {
    console.log(transformedData);
    transformedData = sortData(
      transformedData,
      chart.columns[0].name === chart.sortBy.by ? "name" : chart.sortBy.by,
      chart.sortBy.ascending
    );
    console.log(transformedData);
  }
  if (chart.type === "")
    return (
      <div className="w-full h-full grid text-center place-items-center">
        Choose a chart type
      </div>
    );

  return (
    <div
      ref={ctx?.divRef}
      className={cn(chart.titleConfig.size ? "pt-10" : "pt-6")}
    >
      <p
        className={cn(
          "absolute top-1",
          chart.titleConfig.bold && "font-semibold",
          chart.titleConfig.size && "text-2xl",
          {
            "left-4": chart.titleConfig.align === "left",
            "left-1/2 -translate-x-[50%]": chart.titleConfig.align === "center",
            "right-4": chart.titleConfig.align === "right",
          }
        )}
      >
        {chart.title}
      </p>
      {chart.type === "line" && (
        <LineChart
          margin={{
            top: 15,
            right: 25,
            left: 15,
            bottom: legend.legendEnabled || chart.titleConfig.size ? 35 : 20,
          }}
          data={transformedData}
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
              type="category"
              orientation={xAxis.orientation}
              tickLine={xAxis.tickLine ? { stroke: "#9ca3af" } : false}
              axisLine={xAxis.axisLine ? { stroke: "#9ca3af" } : false}
              dataKey={chart.aggregate ? "name" : chart.columns[0].name}
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
      )}
      {chart.type === "area" && (
        <AreaChart
          margin={{
            top: 15,
            right: 25,
            left: 15,
            bottom: legend.legendEnabled || chart.titleConfig.size ? 35 : 20,
          }}
          data={transformedData}
          width={dimension.width}
          height={dimension.height}
          type="category"
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
              dataKey={chart.aggregate ? "name" : chart.columns[0].name}
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
      )}
      {(chart.type === "stackedArea" || chart.type === "stackedPercent") && (
        <AreaChart
          data={transformedData}
          margin={{
            top: 15,
            right: 25,
            left: 15,
            bottom: legend.legendEnabled || chart.titleConfig.size ? 35 : 20,
          }}
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
              dataKey={chart.aggregate ? "name" : chart.columns[0].name}
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
      )}
      {(chart.type === "bar" || chart.type === "stackedBar") && (
        <BarChart
          data={transformedData}
          layout={chart.layout}
          margin={{
            top: 15,
            right: 25,
            left: 15,
            bottom: legend.legendEnabled || chart.titleConfig.size ? 35 : 20,
          }}
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
                chart.layout === "horizontal"
                  ? chart.columns[0].name
                  : undefined
              }
              className="text-sm"
              tickFormatter={
                chart.columns[0].type === "date" &&
                chart.layout === "horizontal"
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
              stackId={chart.type === "stackedBar" ? "stack-1" : undefined}
            >
              {chart.withLabel && chart.type !== "stackedBar" && (
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
      )}
      {chart.type === "pie" && (
        <PieChart
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: legend.legendEnabled || chart.titleConfig.size ? 35 : 20,
          }}
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
              label={
                chart.columns.length === 1 || i === chart.columns.length - 1
                  ? chart.withLabel
                  : false
              }
            >
              {chart.aggregate
                ? transformedData[i]?.map((_e, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={twColorHsl[index]}
                      stroke={twColorHsl[index]}
                    />
                  ))
                : transformedData?.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={twColorHsl[index]}
                      stroke={twColorHsl[index]}
                    />
                  ))}
            </Pie>
          ))}
        </PieChart>
      )}
      {chart.type === "scatter" && (
        <ScatterChart
          margin={{
            top: 15,
            right: 25,
            left: 15,
            bottom: legend.legendEnabled || chart.titleConfig.size ? 35 : 20,
          }}
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
            fill={twColorHsl[0]}
            line={chart.line}
          />
        </ScatterChart>
      )}
    </div>
  );
};

export default ActiveChart;
