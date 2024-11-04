import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useLegendStore } from "@/lib/store";

const LegendConfig = () => {
  const { enabled, config, setEnabled, setConfig } = useLegendStore();

  return (
    <div className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Legend</CardTitle>
        <Switch checked={enabled} onCheckedChange={setEnabled} />
      </CardHeader>
      {enabled && (
        <CardContent className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <Label>Horizontal Alignment</Label>
            <Select
              value={config.align}
              // @ts-expect-error value diff
              onValueChange={(value) => setConfig("align", value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label>Vertical Alignment</Label>
            <Select
              value={config.verticalAlign}
              // @ts-expect-error value diff
              onValueChange={(value) => setConfig("verticalAlign", value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="top">Top</SelectItem>
                <SelectItem value="middle">Middle</SelectItem>
                <SelectItem value="bottom">Bottom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      )}
    </div>
  );
};

export default LegendConfig;
