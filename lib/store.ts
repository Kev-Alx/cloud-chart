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

export interface ChartConfig {
  type:
    | ""
    | "line"
    | "area"
    | "stackedArea"
    | "stackedPercent"
    | "bar"
    | "stackedBar"
    | "pie"
    | "scatter";
  fill: string;
  lineType: "linear" | "smooth" | "step";
  withLabel: boolean;
  dot: boolean;
  layout: "horizontal" | "vertical";
  radius: number;
  line: boolean;
  aggregate: boolean;
  columns: { name: string; type: string }[];
  rows: { name: string; type: string }[];
  aggregateMethod: { name: string; method: "sum" | "average" | "count" }[];
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
  verticalAlign: "top" | "bottom";
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
  type: "",
  fill: "theme-one",
  lineType: "linear",
  dot: true,
  withLabel: false,
  layout: "horizontal",
  radius: 0,
  line: false,
  rows: [],
  columns: [],
  aggregate: false,
  aggregateMethod: [],
} satisfies ChartConfig;

export const useChartStore = create<ChartState>()((set) => ({
  chartType: "",
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

interface ActiveDataConfig {
  dataId: string;
  setData: (dataId: string) => void;
  resetData: () => void;
}

export const useActiveDataStore = create<ActiveDataConfig>()((set) => ({
  dataId: "Dataset 1",
  setData: (dataId) => set({ dataId }),
  resetData: () =>
    set({
      dataId: "",
    }),
}));

interface ImageStore {
  getDivJpeg: (() => Promise<string | undefined>) | null;
  divRef: React.RefObject<HTMLDivElement> | null;
  setGetDivJpeg: (fn: (() => Promise<string | undefined>) | null) => void;
  setDivRef: (ref: React.RefObject<HTMLDivElement> | null) => void;
}

export const useImageStore = create<ImageStore>((set) => ({
  getDivJpeg: null,
  divRef: null,
  setGetDivJpeg: (fn) => set({ getDivJpeg: fn }),
  setDivRef: (ref) => set({ divRef: ref }),
}));
