import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function TrackerControlPage() {
  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-bold text-slate-50">Tracker Control</h2>
      <Card>
        <CardHeader>
          <CardTitle>TBOX Control Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400">
            TBOX selector, Block parameters, Wind Speed/Direction, Battery, Alarm Status, and T-BOX summary will be implemented in Phase 4.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
