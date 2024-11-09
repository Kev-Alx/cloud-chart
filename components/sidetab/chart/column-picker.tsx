"use client";

import { mockProjectData } from "@/lib/constants";
import { useActiveDataStore, useChartStore } from "@/lib/store";
import titanic from "@/ex.json";
import React from "react";
import { cn } from "@/lib/utils";
import ColDraggable from "./col-draggable";

type Props = {};

const ColumnPicker = (props: Props) => {
  const { dataId, setData } = useActiveDataStore();
  const { setChartOptions, chartOptions } = useChartStore();
  return (
    <div className="p-4">
      <h1>Choose dataset for this chart</h1>
      {mockProjectData.map((data) => (
        <div
          onClick={() => {
            setData(data.name);
            setChartOptions({ ...chartOptions, columns: [], rows: [] });
          }}
          key={data.name}
          className={cn(
            "p-2 rounded-lg cursor-pointer",
            data.name === dataId ? "bg-emerald-300" : ""
          )}
        >
          {data.name}
        </div>
      ))}
      <ol>
        {mockProjectData
          .filter((data) => data.name === dataId)[0]
          .data.columns.map((col, i) => (
            <ColDraggable column={col} key={i} />
          ))}
      </ol>
    </div>
  );
};

export default ColumnPicker;
