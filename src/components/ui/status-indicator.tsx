import { cn } from "@/lib/utils";
import { STATUS_COLORS } from "@/lib/constants";

interface StatusIndicatorProps {
  status: string;
  label?: string;
  size?: "sm" | "md" | "lg";
}

export function StatusIndicator({ status, label, size = "md" }: StatusIndicatorProps) {
  const color = STATUS_COLORS[status] || "#6b7280";
  const sizeClass = { sm: "h-2 w-2", md: "h-3 w-3", lg: "h-4 w-4" }[size];

  return (
    <div className="flex items-center gap-2">
      <div className={cn("rounded-full animate-pulse", sizeClass)} style={{ backgroundColor: color }} />
      {label && <span className="text-sm text-slate-300 capitalize">{label || status}</span>}
    </div>
  );
}
