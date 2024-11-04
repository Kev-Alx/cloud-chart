/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useCartesianStore } from "@/lib/store";

const CartesianConfig = () => {
  const { enabled, config, setEnabled, setConfig } = useCartesianStore();

  return (
    <div className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Cartesian Grid</CardTitle>
        <Switch checked={enabled} onCheckedChange={setEnabled} />
      </CardHeader>
      {enabled && (
        <CardContent className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <Label>Vertical Lines</Label>
            <Switch
              checked={config.vertical}
              onCheckedChange={(checked) => setConfig("vertical", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Horizontal Lines</Label>
            <Switch
              checked={config.horizontal}
              onCheckedChange={(checked) => setConfig("horizontal", checked)}
            />
          </div>
        </CardContent>
      )}
    </div>
  );
};
export default CartesianConfig;
