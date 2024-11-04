import { create } from "zustand";

// Interfaces for each store's state and config
interface XAxisConfig {
  hide: boolean;
  tickLine: boolean;
  axisLine: boolean;
  orientation: "top" | "bottom";
}

interface XAxisState {
  config: XAxisConfig;
  setConfig: (
    key: keyof XAxisConfig,
    value: XAxisConfig[keyof XAxisConfig]
  ) => void;
  resetConfig: () => void;
}

interface YAxisConfig {
  hide: boolean;
  tickLine: boolean;
  axisLine: boolean;
  orientation: "left" | "right";
}

interface YAxisState {
  config: YAxisConfig;
  setConfig: (
    key: keyof YAxisConfig,
    value: YAxisConfig[keyof YAxisConfig]
  ) => void;
  resetConfig: () => void;
}

interface ChartConfig {
  type: string;
  fill: string;
  lineType: "linear" | "smooth" | "step";
  withLabel: boolean;
  dot: boolean;
  layout: "horizontal" | "vertical";
  radius: number;
  line: boolean;
}

export interface ChartState {
  chartType: string;
  chartOptions: ChartConfig;
  setChartType: (type: string) => void;
  setChartOptions: (options: ChartConfig) => void;
  resetConfig: () => void;
}

interface CartesianConfig {
  vertical: boolean;
  horizontal: boolean;
}

interface CartesianState {
  enabled: boolean;
  config: CartesianConfig;
  setEnabled: (enabled: boolean) => void;
  setConfig: (key: keyof CartesianConfig, value: boolean) => void;
  resetConfig: () => void;
}

interface LegendConfig {
  align: "left" | "center" | "right";
  verticalAlign: "top" | "middle" | "bottom";
}

interface LegendState {
  enabled: boolean;
  config: LegendConfig;
  setEnabled: (enabled: boolean) => void;
  setConfig: (
    key: keyof LegendConfig,
    value: LegendConfig[keyof LegendConfig]
  ) => void;
  resetConfig: () => void;
}

// Store implementations
export const useXAxisStore = create<XAxisState>()((set) => ({
  config: {
    hide: false,
    tickLine: true,
    axisLine: true,
    orientation: "bottom",
  },
  setConfig: (key, value) =>
    set((state) => ({
      config: { ...state.config, [key]: value },
    })),
  resetConfig: () =>
    set({
      config: {
        hide: false,
        tickLine: true,
        axisLine: true,
        orientation: "bottom",
      },
    }),
}));

export const useYAxisStore = create<YAxisState>()((set) => ({
  config: {
    hide: false,
    tickLine: true,
    axisLine: true,
    orientation: "left",
  },
  setConfig: (key, value) =>
    set((state) => ({
      config: { ...state.config, [key]: value },
    })),
  resetConfig: () =>
    set({
      config: {
        hide: false,
        tickLine: true,
        axisLine: true,
        orientation: "left",
      },
    }),
}));

const initialChartConfig = {
  type: "line",
  fill: "#000000",
  lineType: "linear",
  dot: true,
  withLabel: false,
  layout: "horizontal",
  radius: 0,
  line: false,
} satisfies ChartConfig;

export const useChartStore = create<ChartState>()((set) => ({
  chartType: "line",
  chartOptions: initialChartConfig,
  setChartType: (type) => set({ chartType: type }),
  setChartOptions: (options) => set({ chartOptions: options }),
  resetConfig: () =>
    set({
      chartOptions: initialChartConfig,
    }),
}));

export const useCartesianStore = create<CartesianState>()((set) => ({
  enabled: false,
  config: {
    vertical: true,
    horizontal: true,
  },
  setEnabled: (enabled) => set({ enabled }),
  setConfig: (key, value) =>
    set((state) => ({
      config: { ...state.config, [key]: value },
    })),
  resetConfig: () =>
    set({
      enabled: false,
      config: {
        vertical: false,
        horizontal: false,
      },
    }),
}));

export const useLegendStore = create<LegendState>()((set) => ({
  enabled: false,
  config: {
    align: "center",
    verticalAlign: "bottom",
  },
  setEnabled: (enabled) => set({ enabled }),
  setConfig: (key, value) =>
    set((state) => ({
      config: { ...state.config, [key]: value },
    })),
  resetConfig: () =>
    set({
      enabled: false,
      config: {
        align: "center",
        verticalAlign: "bottom",
      },
    }),
}));
