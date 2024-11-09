"use client";

import { useIsClient } from "@uidotdev/usehooks";
import { Loader2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Rnd, RndResizeCallback } from "react-rnd";
import ActiveChart from "./active-chart";
import ColDroppable from "./col-droppable";
import { useChartStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const isPerformance = true;

const ChartSheet = () => {
  const isClient = useIsClient();
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const [dimension, setDimension] = useState({
    width: 400,
    height: 300,
  });
  const { chartType, chartOptions } = useChartStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const handleResizeStop: RndResizeCallback = (_e, _dir, ref) => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      if (!isPerformance) {
        setDimension({
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        });
      }
      setPosition({
        x: (offsetWidth - ref.offsetWidth) / 2,
        y: (offsetHeight - ref.offsetHeight) / 2,
      });
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    setDimension({
      width: containerRef.current.offsetWidth * 0.7,
      height: containerRef.current.offsetHeight * 0.6,
    });
    setPosition({
      x:
        (containerRef.current.offsetWidth -
          containerRef.current.offsetWidth * 0.7) /
        2,
      y:
        (containerRef.current.offsetHeight -
          containerRef.current.offsetHeight * 0.6) /
        2,
    });
  }, [isClient]);

  if (!isClient)
    return (
      <div className="w-full h-full grid place-items-center">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  return (
    <div className="relative flex flex-col w-full h-full overflow-auto">
      <div className="w-full px-2 space-y-1 py-1 border-b border-b-slate-200">
        {chartType !== "pie" ? (
          <>
            <ColDroppable name="columns" />
            <ColDroppable name="rows" />
          </>
        ) : (
          <ColDroppable name="columns" label="Category" />
        )}
      </div>

      <div
        ref={containerRef}
        className={cn("w-full flex-1 overflow-hidden", chartOptions.fill)}
      >
        <Rnd
          minWidth={250}
          minHeight={250}
          maxWidth={"96%"}
          maxHeight={"92%"}
          size={dimension}
          position={position}
          onResize={(_e, _direction, ref) => {
            if (!isPerformance) return;
            setDimension({
              width: ref.offsetWidth,
              height: ref.offsetHeight,
            });
          }}
          onResizeStop={handleResizeStop}
          disableDragging
          className="bg-white border border-slate-200"
        >
          <ActiveChart data={null} dimension={dimension} />
        </Rnd>
      </div>
    </div>
  );
};

export default ChartSheet;
