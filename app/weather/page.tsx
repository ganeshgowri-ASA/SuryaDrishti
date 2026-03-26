import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function WeatherPage() {
  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-bold text-slate-50">Weather Monitoring</h2>
      <Card>
        <CardHeader>
          <CardTitle>Weather Stations (WMS)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400">
            6-station weather data table, Average data, and WMS Trends will be implemented in Phase 3.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
