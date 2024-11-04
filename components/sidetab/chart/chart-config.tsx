import { Input } from "@/components/ui/input";
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
      <h1>Chart Type:</h1>
      <Select value={chartType} onValueChange={handleChartTypeChange}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {CHART_OPTIONS.map((option) => (
            <SelectItem key={option.type} value={option.type}>
              {option.type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {currentOptions && (
        <div className="p-4 space-y-4">
          <h3>Chart Options</h3>
          {currentOptions.map((option) => (
            <div key={option.key}>
              <label htmlFor={option.key}>{option.label}:</label>
              {typeof option.type === "string" ? (
                option.type === "boolean" ? (
                  <Switch
                    id={option.key}
                    // @ts-expect-error key
                    checked={chartOptions[option.key] as boolean}
                    onCheckedChange={(checked) =>
                      handleOptionChange(option.key, checked)
                    }
                  />
                ) : (
                  <Input
                    id={option.key}
                    type="text"
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
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {option.type.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChartConfig;
