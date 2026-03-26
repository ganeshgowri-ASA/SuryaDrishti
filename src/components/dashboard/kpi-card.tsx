import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  color?: "green" | "amber" | "red" | "blue" | "default";
  className?: string;
}

const colorMap: Record<string, string> = {
  green: "border-l-green-500",
  amber: "border-l-amber-500",
  red: "border-l-red-500",
  blue: "border-l-blue-500",
  default: "border-l-slate-600",
};

export function KpiCard({ title, value, unit, icon, color = "default", className }: KpiCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-slate-700 bg-slate-800 p-3 border-l-4",
        colorMap[color],
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">{title}</span>
        {icon && <span className="text-slate-500">{icon}</span>}
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-2xl font-bold text-slate-100">{value}</span>
        {unit && <span className="text-sm text-slate-400">{unit}</span>}
      </div>
    </div>
  );
}
