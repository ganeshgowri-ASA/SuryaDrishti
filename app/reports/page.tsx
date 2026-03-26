import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ReportsPage() {
  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-bold text-slate-50">Reports</h2>
      <Card>
        <CardHeader>
          <CardTitle>Generation & Performance Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400">
            Generation reports and Performance reports will be implemented in Phase 5.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
