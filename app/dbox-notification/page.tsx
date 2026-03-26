import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function DBoxNotificationPage() {
  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-bold text-slate-50">DBox Notification</h2>
      <Card>
        <CardHeader>
          <CardTitle>DBox Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400">
            Outdated DBox status grid will be implemented in Phase 4.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
