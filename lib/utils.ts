import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function capitalize(input: string): string {
  return (input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()).replace(
    /-/g,
    " "
  );
}
export function splitText(input: string, splitBy: string) {
  if (!input.includes(splitBy)) return input;
  return splitBy + input.split(splitBy).join(" ");
}

type AggregationMethod = "sum" | "count" | "average";
interface AgrMtd {
  name: string;
  method: AggregationMethod;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DataRow = { [key: string]: any };
type AggregatedRow = { name: string } & { [key: string]: number };

export function aggregateData<T extends DataRow>(
  data: T[],
  column: keyof T,
  rows: (keyof T)[],
  agrMtd: AgrMtd[]
): AggregatedRow[] {
  const groupedData: { [key: string]: T[] } = {};

  for (const row of data) {
    const key = row[column];
    if (!groupedData[key]) {
      groupedData[key] = [];
    }
    groupedData[key].push(row);
  }

  const result: AggregatedRow[] = [];

  for (const groupName in groupedData) {
    const groupData = groupedData[groupName];
    // @ts-expect-error no col key
    const aggregatedRow: AggregatedRow = { name: groupName };

    for (const row of rows) {
      for (const { name, method } of agrMtd) {
        if (name === String(row)) {
          switch (method) {
            case "sum":
              aggregatedRow[name] = groupData.reduce(
                (acc, curr) => acc + (curr[row] || 0),
                0
              );
              break;
            case "count":
              aggregatedRow[name] = groupData.filter(
                (item) => item[row] !== undefined || item[row] !== null
              ).length;
              break;
            case "average":
              const sum = groupData.reduce(
                (acc, curr) => acc + (curr[row] || 0),
                0
              );
              const count = groupData.filter(
                (item) => item[row] !== undefined || item[row] !== null
              ).length;
              aggregatedRow[name] = count > 0 ? sum / count : 0;
              break;
          }
        }
      }
    }

    result.push(aggregatedRow);
  }

  return result;
}
