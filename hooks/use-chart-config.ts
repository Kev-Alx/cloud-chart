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
  const { chartType, chartOptions } = useChartStore();
  const cartesianConfig = useCartesianStore((state) => state.config);
  const cartesianEnabled = useCartesianStore((state) => state.enabled);
  const legendConfig = useLegendStore((state) => state.config);
  const legendEnabled = useLegendStore((state) => state.enabled);
  return {
    xAxis: xAxisConfig,
    yAxis: yAxisConfig,
    chart: {
      ...chartOptions,
      type: chartType,
    },
    cartesian: { ...cartesianConfig, cartesianEnabled },
    legend: { ...legendConfig, legendEnabled },
  };
};
