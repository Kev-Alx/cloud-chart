"use client";

import { mockProjectData, TYPE_ICON_MAP } from "@/lib/constants";
import { useActiveDataStore, useChartStore } from "@/lib/store";
import titanic from "@/ex.json";
import React from "react";
import { cn } from "@/lib/utils";
import ColDraggable from "./col-draggable";
import { SidebarSeparator } from "@/components/ui/sidebar";

type Props = {};

const ColumnPicker = (props: Props) => {
  const { dataId, setData } = useActiveDataStore();
  const { setChartOptions, chartOptions } = useChartStore();
  return (
    <div className="p-4">
      <h1 className="mb-2">Choose dataset for this chart</h1>
      {mockProjectData.map((data) => (
        <div
          onClick={() => {
            setData(data.name);
            setChartOptions({ ...chartOptions, columns: [], rows: [] });
          }}
          key={data.name}
          className={cn(
            "p-2 rounded-lg cursor-pointer",
            data.name === dataId ? "bg-slate-800 text-white" : ""
          )}
        >
          {data.name}
        </div>
      ))}
      <SidebarSeparator className="my-4" />
      <ol className="space-y-2">
        {mockProjectData
          .filter((data) => data.name === dataId)[0]
          .data.columns.map((col, i) => {
            const IconComponent =
              TYPE_ICON_MAP[col.type as keyof typeof TYPE_ICON_MAP];
            return (
              <ColDraggable
                IconComponent={IconComponent}
                className="py-1 px-2 bg-white rounded-md"
                column={col}
                key={i}
              />
            );
          })}
      </ol>
    </div>
  );
};

export default ColumnPicker;
