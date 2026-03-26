import { Header } from "@/components/layout/header";
import { AlarmTicker } from "@/components/layout/alarm-ticker";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 pb-12 overflow-auto">{children}</main>
      <AlarmTicker />
    </div>
  );
}
