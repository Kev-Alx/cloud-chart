"use client";
import React from "react";
import ChartSheet from "../sidetab/chart/chart-sheet";
import DataSheet from "../sidetab/data/data-sheet";
import DashboardSheet from "../sidetab/dashboard/dashboard-sheet";
import { useNavigation } from "@/hooks/use-navigation";

const ActiveSheet = () => {
  const { isChart, isDashboard } = useNavigation();
  if (isChart) return <ChartSheet />;
  if (isDashboard) return <DashboardSheet />;
  return <DataSheet />;
};

export default ActiveSheet;
