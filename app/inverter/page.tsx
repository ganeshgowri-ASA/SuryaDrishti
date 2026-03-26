import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function InverterPage() {
  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-bold text-slate-50">Inverter Dashboard</h2>
      <Card>
        <CardHeader>
          <CardTitle>Inverter Detail View</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400">
            Inverter selector, PV Array Data, Grid Current/Voltage, String Current table, Temperature points, and Control buttons will be implemented in Phase 2.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
