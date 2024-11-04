import {
  useCartesianStore,
  useChartStore,
  useLegendStore,
  useXAxisStore,
  useYAxisStore,
} from "@/lib/store";
/* eslint-disable @typescript-eslint/no-explicit-any */

export const useChartConfiguration = () => {
  const xAxisConfig = useXAxisStore((state) => state.config);
  const yAxisConfig = useYAxisStore((state) => state.config);
  const { chartType, config: chartConfig } = useChartStore() as any;
  const cartesianConfig = useCartesianStore((state) => state.config);
  const legendConfig = useLegendStore((state) => state.config);
  return {
    xAxis: xAxisConfig,
    yAxis: yAxisConfig,
    chart: {
      type: chartType,
      ...chartConfig,
    },
    cartesian: cartesianConfig,
    legend: legendConfig,
  };
};
