import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function InvGraphPage() {
  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-bold text-slate-50">Inverter Graph</h2>
      <Card>
        <CardHeader>
          <CardTitle>Daily Generation Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400">
            Daily generation bar chart per inverter will be implemented in Phase 3.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
