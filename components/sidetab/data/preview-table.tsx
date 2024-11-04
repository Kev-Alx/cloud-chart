import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import data from "@/ex.json";
import { TYPE_ICON_MAP } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Props = {};

const PreviewTable = (props: Props) => {
  return (
    <Table className="overflow-x-auto">
      <TableHeader>
        <TableRow>
          {data.columns.map((col) => {
            const IconComponent =
              TYPE_ICON_MAP[col.type as keyof typeof TYPE_ICON_MAP];
            return (
              <TableHead key={col.name}>
                <div className="flex items-center gap-2">
                  {IconComponent && (
                    <IconComponent
                      className={cn(
                        "h-5 w-5 text-emerald-600",
                        col.type === "number" ? "text-blue-500" : "",
                        col.type === "string" ? "text-slate-900" : "",
                        col.type === "date" ? "text-yellow-600" : ""
                      )}
                    />
                  )}
                  {col.name}
                </div>
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.data.slice(0, 20).map((d, i) => (
          <TableRow key={`${i}k` + d[0]}>
            {data.columns.map((_, i) => (
              <TableCell key={`${i}kc`}>{d[i].toString()}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PreviewTable;
