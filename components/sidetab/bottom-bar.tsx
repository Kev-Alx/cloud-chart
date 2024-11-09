"use client";

import { Grid2x2PlusIcon, SquarePlus } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type Props = {};

const BottomBar = (props: Props) => {
  const pathname = usePathname();
  const splittedPathname = pathname.split("/");
  const isFile = splittedPathname.length >= 4;
  if (!isFile) return null;
  return (
    <div className="border-t z-20 py-1 px-2 flex gap-4 bg-background w-full">
      <Tooltip>
        <TooltipTrigger>
          <SquarePlus className="stroke-gray-700" />
        </TooltipTrigger>
        <TooltipContent>New chart</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Grid2x2PlusIcon className="stroke-gray-700" />
        </TooltipTrigger>
        <TooltipContent>New dashboard</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default BottomBar;
