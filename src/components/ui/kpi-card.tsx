"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "stable";
  className?: string;
  valueColor?: string;
}

export function KPICard({ title, value, unit, icon, className, valueColor }: KPICardProps) {
  return (
    <Card className={cn("p-4", className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</p>
          <div className="flex items-baseline gap-1">
            <span className={cn("text-2xl font-bold", valueColor || "text-slate-50")}>{value}</span>
            {unit && <span className="text-sm text-slate-400">{unit}</span>}
          </div>
        </div>
        {icon && <div className="text-slate-400">{icon}</div>}
      </div>
    </Card>
  );
}
