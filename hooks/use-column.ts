"use client";
import { useChartStore } from "@/lib/store";
import { useState } from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */

export const useColumn = () => {
  const [activeColumn, setDraggedColumn] = useState<string | null>(null);
  const { setChartOptions, chartOptions, chartType } = useChartStore();
  function handleDragStart(event: any) {
    setDraggedColumn(event.active.data.current.val.name);
  }
  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (over) {
      if (over.id === "columns") {
        if (chartType === "scatter" && chartOptions.columns.length > 0) return;
        if (chartType === "pie" && chartOptions.columns.length > 1) return;
        if (chartOptions.columns.includes(active.data.current.val)) return;
        setChartOptions({
          ...chartOptions,
          columns: [...chartOptions.columns, active.data.current.val],
        });
      } else {
        if (chartType === "scatter" && chartOptions.rows.length > 0) return;
        if (chartOptions.rows.includes(active.data.current.val)) return;
        setChartOptions({
          ...chartOptions,
          rows: [...chartOptions.rows, active.data.current.val],
          aggregateMethod: [
            ...chartOptions.aggregateMethod,
            { name: active.data.current.val.name, method: "sum" },
          ],
        });
      }
    }
    setDraggedColumn(null);
  }

  return {
    handleDragEnd,
    handleDragStart,
    activeColumn,
  };
};
