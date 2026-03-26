import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SMBAlarmPage() {
  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-bold text-slate-50">SMB Alarm</h2>
      <Card>
        <CardHeader>
          <CardTitle>SMB Status Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400">
            28 IS x 17 SMB matrix with color-coded status will be implemented in Phase 3.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
