"use client";

import React from "react";
import { Rnd } from "react-rnd";

type Props = {};

const DashboardSheet = (props: Props) => {
  return (
    <div className="w-[99.4%] h-full ">
      <Rnd
        resizeGrid={[8, 8]}
        dragGrid={[8, 8]}
        className="bg-red-200"
        bounds={"parent"}
      >
        test 1
      </Rnd>
      <Rnd
        resizeGrid={[8, 8]}
        dragGrid={[8, 8]}
        className="bg-green-200"
        bounds={"parent"}
      >
        test 2
      </Rnd>
    </div>
  );
};

export default DashboardSheet;
