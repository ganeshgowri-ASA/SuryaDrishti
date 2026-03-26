import { cn } from "@/lib/utils";
import { STATUS_COLORS, STATUS_LABELS } from "@/lib/constants";
import type { InverterStatus } from "@/types";

interface StatusIndicatorProps {
  status: InverterStatus;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
};

export function StatusIndicator({ status, showLabel = true, size = "md" }: StatusIndicatorProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className={cn("rounded-full", sizeMap[size], status === "running" && "animate-pulse")}
        style={{ backgroundColor: STATUS_COLORS[status] }}
      />
      {showLabel && (
        <span className="text-xs text-slate-400">{STATUS_LABELS[status]}</span>
      )}
    </div>
  );
}
