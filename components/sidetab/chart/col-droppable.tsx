import { useChartStore } from "@/lib/store";
import { useDroppable } from "@dnd-kit/core";
import { XIcon } from "lucide-react";
import React from "react";

type Props = {
  name: "columns" | "rows";
  label?: string;
};

const ColDroppable = ({ name, label }: Props) => {
  const { setNodeRef } = useDroppable({
    id: name,
  });
  const { chartOptions, setChartOptions } = useChartStore();
  return (
    <div className="w-full flex gap-2">
      <p className="min-w-12 py-1 self-center">
        {label ? label : name === "columns" ? "X-Axis" : "Y-Axis"}
      </p>
      <div
        ref={setNodeRef}
        className="flex gap-2 items-center bg-slate-100 rounded-lg flex-1"
      >
        {chartOptions[name].map((col, i) => (
          <div
            key={name + i}
            className="px-2 py-1 flex items-center gap-2 bg-slate-900 text-slate-50 rounded-full text-sm"
          >
            {col.name}
            <XIcon
              onClick={() => {
                setChartOptions({
                  ...chartOptions,
                  [name]: chartOptions[name].filter((c) => c.name !== col.name),
                });
              }}
              className="h-5 w-5 cursor-pointer hover:text-slate-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColDroppable;
