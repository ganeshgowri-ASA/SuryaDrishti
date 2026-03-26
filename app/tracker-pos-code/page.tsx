import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function TrackerPosCodePage() {
  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-bold text-slate-50">Tracker Position Code</h2>
      <Card>
        <CardHeader>
          <CardTitle>Position Modes Grid</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400">
            Position modes (TRACKING, NIGHT, BACKTRACKING, WIND DEFENCE, SNOW, HAIL, etc.) will be implemented in Phase 4.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
