import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "stable";
  color?: "green" | "amber" | "red" | "blue" | "slate";
  className?: string;
}

const colorMap = {
  green: "text-green-400",
  amber: "text-amber-400",
  red: "text-red-400",
  blue: "text-blue-400",
  slate: "text-slate-300",
};

const iconBgMap = {
  green: "bg-green-500/10",
  amber: "bg-amber-500/10",
  red: "bg-red-500/10",
  blue: "bg-blue-500/10",
  slate: "bg-slate-500/10",
};

export function KpiCard({ title, value, unit, icon: Icon, color = "slate", className }: KpiCardProps) {
  return (
    <div className={cn("rounded-lg border border-scada-border bg-scada-card p-3", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className={cn("rounded-md p-1.5", iconBgMap[color])}>
            <Icon className={cn("h-3.5 w-3.5", colorMap[color])} />
          </div>
        )}
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className={cn("text-2xl font-bold tabular-nums", colorMap[color])}>{value}</span>
        {unit && <span className="text-xs text-slate-500">{unit}</span>}
      </div>
    </div>
  );
}
