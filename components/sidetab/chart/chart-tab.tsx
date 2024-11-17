"use client";
import React from "react";
import { AxisConfig } from "./axis-config";
import LegendConfig from "./legend-config";
import CartesianConfig from "./cartesian-config";
import ChartConfig from "./chart-config";
import { SidebarSeparator } from "../../ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import ColumnPicker from "./column-picker";
import { useChartStore } from "@/lib/store";

const ChartTab = () => {
  const { chartType } = useChartStore();
  return (
    <div className="pb-4 relative">
      <div>
        <Tabs defaultValue="data">
          <TabsList className="w-full sticky top-0">
            <TabsTrigger value="data" className="w-full">
              Data
            </TabsTrigger>
            <TabsTrigger value="chart" className="w-full">
              Chart
            </TabsTrigger>
          </TabsList>
          <TabsContent value="data">
            <ColumnPicker />
          </TabsContent>
          <TabsContent value="chart">
            <ChartConfig />
            {!["pie"].includes(chartType) && (
              <>
                <SidebarSeparator />
                <AxisConfig type="XAxis" />
                <AxisConfig type="YAxis" />
              </>
            )}
            {!["scatter"].includes(chartType) && (
              <>
                <SidebarSeparator />
                <LegendConfig />
              </>
            )}
            {!["pie", "scatter"].includes(chartType) && (
              <>
                <SidebarSeparator />
                <CartesianConfig />
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ChartTab;
