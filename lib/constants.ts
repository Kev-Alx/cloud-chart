import { Calendar, Check, Quote, SquareSigma } from "lucide-react";
import titanic from "@/ex.json";
import sick from "@/example.json";
export const CHART_OPTIONS = [
  {
    type: "line",
    options: [
      {
        label: "Theme",
        key: "fill",
        type: ["theme-one", "theme-two", "theme-three", "theme-four"],
      },
      { label: "Type", key: "lineType", type: ["monotone", "linear", "step"] }, // string
      { label: "Dot", key: "dot", type: "boolean" }, // bool
      { label: "With label", key: "withLabel", type: "boolean" }, // bool
      { label: "Aggregate data", key: "aggregate", type: "boolean" },
    ],
  },
  {
    type: "area",
    options: [
      {
        label: "Theme",
        key: "fill",
        type: ["theme-one", "theme-two", "theme-three", "theme-four"],
      }, // string
      { label: "Type", key: "lineType", type: ["monotone", "linear", "step"] }, // string
      { label: "With label", key: "withLabel", type: "boolean" }, // bool
      { label: "Aggregate data", key: "aggregate", type: "boolean" },
    ],
  },
  {
    type: "stackedArea", // need stackId
    options: [
      {
        label: "Theme",
        key: "fill",
        type: ["theme-one", "theme-two", "theme-three", "theme-four"],
      }, // string
      { label: "Type", key: "lineType", type: ["monotone", "linear", "step"] }, // string
      { label: "Aggregate data", key: "aggregate", type: "boolean" },
    ],
  },
  {
    type: "stackedPercent", // need stackId & stackOffset
    options: [
      {
        label: "Theme",
        key: "fill",
        type: ["theme-one", "theme-two", "theme-three", "theme-four"],
      }, // string
      { label: "Type", key: "lineType", type: ["monotone", "linear", "step"] }, // string
      { label: "Aggregate data", key: "aggregate", type: "boolean" },
    ],
  },
  {
    type: "bar",
    options: [
      {
        label: "Theme",
        key: "fill",
        type: ["theme-one", "theme-two", "theme-three", "theme-four"],
      }, // string
      { label: "Radius", key: "radius", type: "radius" }, // number
      { label: "Layout", key: "layout", type: ["horizontal", "vertical"] }, // string
      { label: "With label", key: "withLabel", type: "boolean" }, // bool
      { label: "Aggregate data", key: "aggregate", type: "boolean" }, // bool
    ],
  },
  {
    type: "stackedBar", // need stackId
    options: [
      {
        label: "Theme",
        key: "fill",
        type: ["theme-one", "theme-two", "theme-three", "theme-four"],
      }, // string
      { label: "Radius", key: "radius", type: "radius" }, // number
      { label: "Layout", key: "layout", type: ["horizontal", "vertical"] }, // string
      { label: "Aggregate data", key: "aggregate", type: "boolean" }, // bool
    ],
  },
  {
    type: "pie", // need reference line
    options: [
      {
        label: "Theme",
        key: "fill",
        type: ["theme-one", "theme-two", "theme-three", "theme-four"],
      }, // string
      { label: "With label", key: "withLabel", type: "boolean" }, // bool
      { label: "Aggregate data", key: "aggregate", type: "boolean" }, // bool
    ],
  },
  {
    type: "scatter", // need reference line
    options: [
      {
        label: "Theme",
        key: "fill",
        type: ["theme-one", "theme-two", "theme-three", "theme-four"],
      }, // string
      { label: "Line", key: "line", type: "boolean" }, //bool <= wrap as line scatter type
    ],
  },
];

export const CARTESIAN_OPTIONS = ["vertical", "horizontal"]; // bool - bool
export const AXIS_OPTIONS = [
  {
    type: "XAxis",
    options: [
      "hide",
      "tickLine",
      "axisLine",
      { orientation: ["top", "bottom"] },
    ], // bool - bool - bool
  },
  {
    type: "YAxis",
    options: [
      "hide",
      "tickLine",
      "axisLine",
      { orientation: ["left", "right"] },
    ], // bool - bool - bool
  },
];
export const LEGEND_OPTIONS = [
  "showLegend",
  { align: ["center", "left", "right"] },
  { verticalAlign: ["bottom", "top"] },
];
export const TYPE_ICON_MAP = {
  string: Quote,
  number: SquareSigma,
  date: Calendar,
  boolean: Check,
};

export const mockData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: -3490,
    pv: 4300,
    amt: 2100,
  },
];
export const mockProjectData = [
  {
    name: "Dataset 1",
    data: titanic,
  },
  {
    name: "Dataset 2",
    data: sick,
  },
];
