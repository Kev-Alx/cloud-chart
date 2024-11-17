"use client";

import { Download, PresentationIcon } from "lucide-react";
import React, { useCallback } from "react";
import { Button } from "../ui/button";
import { useNavigation } from "@/hooks/use-navigation";
import { useImageGeneration } from "./image-ctx";
import { saveAs } from "file-saver";
type Props = {};

const ChartActions = (props: Props) => {
  const { isChart, isDashboard } = useNavigation();
  const ctx = useImageGeneration();
  const handleDivDownload = useCallback(async () => {
    const jpeg = await ctx?.getDivJpeg();
    if (jpeg) {
      saveAs(jpeg, "div-element.jpeg");
    }
  }, [ctx]);
  return (
    <div className="ml-auto flex items-center">
      {isChart && (
        <Button onClick={handleDivDownload} size={"icon"} variant={"ghost"}>
          <Download />
        </Button>
      )}
      {(isChart || isDashboard) && (
        <Button size={"icon"} variant={"ghost"}>
          <PresentationIcon />
        </Button>
      )}
    </div>
  );
};

export default ChartActions;
