import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";
import { CHART_OPTIONS } from "@/lib/constants";
import { useChartStore } from "@/lib/store";
import { capitalize, splitText } from "@/lib/utils";
import {
  ALargeSmallIcon,
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ArrowDown,
  ArrowUp,
  BoldIcon,
} from "lucide-react";

const ChartConfig = () => {
  const { chartType, chartOptions, setChartType, setChartOptions } =
    useChartStore();

  const handleChartTypeChange = (val: string) => {
    setChartType(val);
  };

  const handleOptionChange = (key: string, value: unknown) => {
    setChartOptions({ ...chartOptions, [key]: value });
  };

  const currentOptions = CHART_OPTIONS.find(
    (option) => option.type === chartType
  )?.options;

  return (
    <div>
      <CardHeader>
        <CardTitle className="font-medium text-lg">Chart Type</CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={chartType} onValueChange={handleChartTypeChange}>
          <SelectTrigger className="mb-4">
            <SelectValue placeholder="Select chart type" />
          </SelectTrigger>
          <SelectContent>
            {CHART_OPTIONS.map((option) => (
              <SelectItem key={option.type} value={option.type}>
                {capitalize(splitText(option.type, "stacked"))}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {chartType !== "" && (
          <div>
            <Label htmlFor={"title"}>Title</Label>
            <Input
              id="title"
              type={"text"}
              className="mb-2"
              value={chartOptions["title"] as string}
              onChange={(e) => handleOptionChange("title", e.target.value)}
            />
            <div className="flex justify-between gap-4 mb-4">
              <Toggle
                pressed={chartOptions.titleConfig.bold}
                onPressedChange={() =>
                  handleOptionChange("titleConfig", {
                    ...chartOptions.titleConfig,
                    bold: !chartOptions.titleConfig.bold,
                  })
                }
              >
                <BoldIcon />
              </Toggle>
              <Toggle
                pressed={chartOptions.titleConfig.size}
                onPressedChange={() =>
                  handleOptionChange("titleConfig", {
                    ...chartOptions.titleConfig,
                    size: !chartOptions.titleConfig.size,
                  })
                }
              >
                <ALargeSmallIcon />
              </Toggle>
              <ButtonGroup>
                <Button
                  onClick={() =>
                    handleOptionChange("titleConfig", {
                      ...chartOptions.titleConfig,
                      align: "left",
                    })
                  }
                  className="p-3"
                  variant={"outline"}
                >
                  <AlignLeftIcon />
                </Button>
                <Button
                  onClick={() =>
                    handleOptionChange("titleConfig", {
                      ...chartOptions.titleConfig,
                      align: "center",
                    })
                  }
                  className="p-3"
                  variant={"outline"}
                >
                  <AlignCenterIcon />
                </Button>
                <Button
                  onClick={() =>
                    handleOptionChange("titleConfig", {
                      ...chartOptions.titleConfig,
                      align: "right",
                    })
                  }
                  className="p-3"
                  variant={"outline"}
                >
                  <AlignRightIcon />
                </Button>
              </ButtonGroup>
            </div>
          </div>
        )}
        {currentOptions && (
          <div className="space-y-4">
            {currentOptions.map((option) => (
              <div
                className="flex gap-2 justify-between items-center flex-wrap"
                key={option.key}
              >
                <Label htmlFor={option.key}>{option.label}</Label>
                {typeof option.type === "string" ? (
                  option.type === "boolean" ? (
                    <Switch
                      id={option.key}
                      key={option.key}
                      // @ts-expect-error key
                      checked={chartOptions[option.key] as boolean}
                      onCheckedChange={(checked) =>
                        handleOptionChange(option.key, checked)
                      }
                    />
                  ) : (
                    <Input
                      id={option.key}
                      key={option.key}
                      type={option.key === "radius" ? "number" : "text"}
                      // @ts-expect-error key
                      value={chartOptions[option.key] as string}
                      onChange={(e) =>
                        handleOptionChange(option.key, e.target.value)
                      }
                    />
                  )
                ) : (
                  <Select
                    // @ts-expect-error key
                    value={chartOptions[option.key] as string}
                    onValueChange={(value) =>
                      handleOptionChange(option.key, value)
                    }
                    key={option.key}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {option.type.map((value) => (
                        <SelectItem key={value} value={value}>
                          {capitalize(value)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {option.key === "aggregate" && chartOptions.aggregate && (
                  <div className="flex w-full mt-4 flex-col gap-2">
                    {chartOptions.rows.map((row) => (
                      <div
                        key={row.name}
                        className="flex  justify-between items-center"
                      >
                        <Label>{capitalize(row.name)}</Label>
                        <Select
                          value={
                            chartOptions.aggregateMethod.find(
                              (method) => method.name === row.name
                            )?.method
                          }
                          onValueChange={(value) =>
                            handleOptionChange(
                              "aggregateMethod",
                              chartOptions.aggregateMethod.map((method) =>
                                method.name === row.name
                                  ? { ...method, method: value }
                                  : method
                              )
                            )
                          }
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sum">Sum</SelectItem>
                            <SelectItem value="count">Count</SelectItem>
                            <SelectItem value="average">Average</SelectItem>
                            <SelectItem value="min">Min</SelectItem>
                            <SelectItem value="max">Max</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {!["pie", "scatter"].includes(chartType) && (
              <div className="flex gap-2 justify-between items-center">
                <Label htmlFor={"sortBy"}>Sort by</Label>
                <Select
                  value={chartOptions.sortBy.by}
                  onValueChange={(v) =>
                    handleOptionChange("sortBy", {
                      ...chartOptions.sortBy,
                      by: v,
                    })
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {chartOptions.rows.map((row) => (
                      <SelectItem key={row.name} value={row.name}>
                        {capitalize(row.name)}
                      </SelectItem>
                    ))}
                    {chartOptions.columns.map((column) => (
                      <SelectItem key={column.name} value={column.name}>
                        {capitalize(column.name)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Toggle
                  pressed={chartOptions.sortBy.ascending}
                  onPressedChange={(v) =>
                    handleOptionChange("sortBy", {
                      ...chartOptions.sortBy,
                      ascending: v,
                    })
                  }
                >
                  {chartOptions.sortBy.ascending ? <ArrowUp /> : <ArrowDown />}
                </Toggle>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </div>
  );
};

export default ChartConfig;
