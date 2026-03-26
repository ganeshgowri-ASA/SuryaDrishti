import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PPCControlPage() {
  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-bold text-slate-50">PPC Control</h2>
      <Card>
        <CardHeader>
          <CardTitle>Power Plant Controller</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400">
            Active Power Control, Reactive Power Control, Grid Measurement, and PPC Trend charts will be implemented in Phase 2.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
