"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useXAxisStore, useYAxisStore } from "@/lib/store";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
/* eslint-disable @typescript-eslint/no-explicit-any */

export const AxisConfig = ({ type }: { type: "XAxis" | "YAxis" }) => {
  const store = type === "XAxis" ? useXAxisStore : useYAxisStore;
  const { config, setConfig } = store() as any;

  return (
    <div className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          {type} configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Hide Axis</Label>
          <Switch
            checked={config.hide}
            onCheckedChange={(checked) => setConfig("hide", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>Show Tick Line</Label>
          <Switch
            checked={config.tickLine}
            onCheckedChange={(checked) => setConfig("tickLine", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>Show Axis Line</Label>
          <Switch
            checked={config.axisLine}
            onCheckedChange={(checked) => setConfig("axisLine", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>Orientation</Label>
          <Select
            value={config.orientation}
            onValueChange={(value) => setConfig("orientation", value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {type === "XAxis" ? (
                <>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="bottom">Bottom</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </div>
  );
};
