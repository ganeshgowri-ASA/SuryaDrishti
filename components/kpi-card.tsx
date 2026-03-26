import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  className?: string;
  valueColor?: string;
}

export function KpiCard({
  label,
  value,
  unit,
  icon,
  className,
  valueColor,
}: KpiCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-slate-700 bg-slate-800 p-3",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wider text-slate-400">
          {label}
        </span>
        {icon && <span className="text-slate-500">{icon}</span>}
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <span
          className={cn(
            "text-2xl font-bold tabular-nums",
            valueColor || "text-slate-50"
          )}
        >
          {value}
        </span>
        {unit && <span className="text-xs text-slate-400">{unit}</span>}
      </div>
    </div>
  );
}
