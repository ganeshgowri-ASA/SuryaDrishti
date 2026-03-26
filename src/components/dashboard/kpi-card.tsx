import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'green' | 'amber' | 'red' | 'blue' | 'default';
  subtitle?: string;
}

const colorMap = {
  green: 'text-green-400',
  amber: 'text-amber-400',
  red: 'text-red-400',
  blue: 'text-blue-400',
  default: 'text-foreground',
};

const bgMap = {
  green: 'bg-green-500/10',
  amber: 'bg-amber-500/10',
  red: 'bg-red-500/10',
  blue: 'bg-blue-500/10',
  default: 'bg-muted',
};

export function KpiCard({ title, value, unit, icon: Icon, color = 'default', subtitle }: KpiCardProps) {
  return (
    <div className="rounded-lg border bg-card p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className={cn("p-1.5 rounded-md", bgMap[color])}>
            <Icon className={cn("h-4 w-4", colorMap[color])} />
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className={cn("text-2xl font-bold tabular-nums", colorMap[color])}>{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
      {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
    </div>
  );
}
