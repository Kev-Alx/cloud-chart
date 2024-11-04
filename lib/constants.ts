import { Calendar, Check, Quote, SquareSigma } from "lucide-react";

export const CHART_OPTIONS = [
  {
    type: "line",
    options: [
      { label: "Color", key: "fill", type: "string" },
      { label: "Type", key: "lineType", type: ["monotone", "linear", "step"] }, // string
      { label: "Dot", key: "dot", type: "boolean" }, // bool
      { label: "With label", key: "withLabel", type: "boolean" }, // bool
    ],
  },
  {
    type: "area",
    options: [
      { label: "Color", key: "fill", type: "string" }, // string
      { label: "Type", key: "lineType", type: ["monotone", "linear", "step"] }, // string
      { label: "Opacity", key: "fillOpacity", type: "number" }, // number
      { label: "With label", key: "withLabel", type: "boolean" }, // bool
    ],
  },
  {
    type: "stackedArea", // need stackId
    options: [
      { label: "Color", key: "fill", type: "string" }, // string
      { label: "Type", key: "lineType", type: ["monotone", "linear", "step"] }, // string
      { label: "Opacity", key: "fillOpacity", type: "number" }, // number
      { label: "With label", key: "withLabel", type: "boolean" },
    ],
  },
  {
    type: "stackedPercent", // need stackId & stackOffset
    options: [
      { label: "Color", key: "fill", type: "string" }, // string
      { label: "Type", key: "lineType", type: ["monotone", "linear", "step"] }, // string
      { label: "Opacity", key: "fillOpacity", type: "number" }, // number
    ],
  },
  {
    type: "bar",
    options: [
      { label: "Color", key: "fill", type: "string" }, // string
      { label: "Radius", key: "radius", type: "radius" }, // number
      { label: "Layout", key: "layout", type: ["horizontal", "vertical"] }, // string
    ],
  },
  {
    type: "stackedBar", // need stackId
    options: [
      { label: "Color", key: "fill", type: "string" }, // string
      { label: "Radius", key: "radius", type: "radius" }, // number
      { label: "Layout", key: "layout", type: ["horizontal", "vertical"] }, // string
    ],
  },
  {
    type: "posAndNegBar", // need reference line
    options: [
      { label: "Color", key: "fill", type: "string" }, // string
      { label: "Radius", key: "radius", type: "radius" },
      { label: "Layout", key: "layout", type: ["horizontal", "vertical"] }, // string
    ],
  },
  {
    type: "pie", // need reference line
    options: [
      { label: "Color", key: "fill", type: "string" }, // string
      { label: "Stroke width", key: "stroke", type: "stroke" }, // number
      { label: "With label", key: "withLabel", type: "boolean" }, // bool
      { label: "Inner radius", key: "innerRadius", type: "number" }, // number <= wrap as is donut
    ],
  },
  {
    type: "scatter", // need reference line
    options: [
      { label: "Color", key: "fill", type: "string" }, // string
      { label: "Shape", key: "shape", type: "number" }, // number
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
  { verticalAlign: ["bottom", "middle", "top"] },
];
export const TYPE_ICON_MAP = {
  string: Quote,
  number: SquareSigma,
  date: Calendar,
  boolean: Check,
};
