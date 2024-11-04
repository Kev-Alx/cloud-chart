import React from "react";
import { AxisConfig } from "./chart/axis-config";
import LegendConfig from "./chart/legend-config";
import CartesianConfig from "./chart/cartesian-config";
import ChartConfig from "./chart/chart-config";

type Props = {};
const isData = true;
const ChartTab = (props: Props) => {
  return (
    <div className="p-4">
      {isData ? (
        <div>
          <p>choose active dataset</p>
          <p>choose chart type</p>
          <AxisConfig type="XAxis" />
          <AxisConfig type="YAxis" />
          <LegendConfig />
          <CartesianConfig />
          <ChartConfig />
          <p>dyanmically show settings for specificchart</p>
        </div>
      ) : (
        <p>You have&apos;t uploaded any data for this project.</p>
      )}
    </div>
  );
};

export default ChartTab;
