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
import { CHART_OPTIONS } from "@/lib/constants";
import { useChartStore } from "@/lib/store";
import { capitalize, splitText } from "@/lib/utils";

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
                        <Label>{row.name}</Label>
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
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </div>
  );
};

export default ChartConfig;
