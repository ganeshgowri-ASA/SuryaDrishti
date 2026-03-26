import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: string;
  label?: string;
  size?: "sm" | "md" | "lg";
}

const statusColors: Record<string, string> = {
  running: "bg-green-500",
  stopped: "bg-gray-500",
  fault: "bg-red-500",
  warning: "bg-orange-500",
  comm_fault: "bg-gray-500",
  waiting: "bg-yellow-500",
  online: "bg-green-500",
  offline: "bg-red-500",
};

const sizeMap = {
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
};

export function StatusIndicator({ status, label, size = "md" }: StatusIndicatorProps) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className={cn(
          "rounded-full",
          sizeMap[size],
          statusColors[status] || "bg-gray-500",
          status === "running" && "animate-pulse"
        )}
      />
      {label && <span className="text-xs text-slate-300">{label}</span>}
    </div>
  );
}
