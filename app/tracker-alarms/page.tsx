import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function TrackerAlarmsPage() {
  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-bold text-slate-50">Tracker Alarms</h2>
      <Card>
        <CardHeader>
          <CardTitle>Tracker Alarm Grid</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400">
            Color grid for IS-01 to IS-13, IDs 01-80 with Green/Orange/Yellow/Red status will be implemented in Phase 4.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
