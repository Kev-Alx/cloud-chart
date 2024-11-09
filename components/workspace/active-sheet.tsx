"use client";
import React from "react";
import ChartSheet from "../sidetab/chart/chart-sheet";
import { usePathname } from "next/navigation";
import DataSheet from "../sidetab/data/data-sheet";

const ActiveSheet = () => {
  const pathname = usePathname();
  if (pathname.includes("data/")) return <DataSheet />;
  return <ChartSheet />;
};

export default ActiveSheet;
