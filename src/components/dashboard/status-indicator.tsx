import { cn } from "@/lib/utils";
import { SCADA_COLORS } from "@/lib/constants";
import { InverterStatus } from "@/types";

interface StatusIndicatorProps {
  status: InverterStatus;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const statusConfig: Record<InverterStatus, { color: string; label: string }> = {
  running: { color: SCADA_COLORS.running, label: 'Running' },
  stopped: { color: SCADA_COLORS.stopped, label: 'Stopped' },
  fault: { color: SCADA_COLORS.fault, label: 'Fault' },
  warning: { color: SCADA_COLORS.warning, label: 'Warning' },
  comm_fault: { color: SCADA_COLORS.commFault, label: 'Comm Fault' },
  waiting: { color: SCADA_COLORS.waiting, label: 'Waiting' },
};

const sizeMap = {
  sm: 'h-2 w-2',
  md: 'h-3 w-3',
  lg: 'h-4 w-4',
};

export function StatusIndicator({ status, size = 'md', showLabel = false }: StatusIndicatorProps) {
  const config = statusConfig[status];
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn("rounded-full", sizeMap[size])}
        style={{ backgroundColor: config.color, boxShadow: `0 0 6px ${config.color}60` }}
      />
      {showLabel && <span className="text-xs text-muted-foreground">{config.label}</span>}
    </div>
  );
}
