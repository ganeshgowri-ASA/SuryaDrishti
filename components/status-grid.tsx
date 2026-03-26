import { cn } from "@/lib/utils";
import { STATUS_COLORS } from "@/lib/constants";

interface StatusGridItem {
  id: number | string;
  label: string;
  value?: string | number;
  status: string;
}

interface StatusGridProps {
  items: StatusGridItem[];
  className?: string;
}

export function StatusGrid({ items, className }: StatusGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-4 gap-2 sm:grid-cols-7 lg:grid-cols-14",
        className
      )}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center rounded border border-slate-700 bg-slate-800/50 p-2"
        >
          <div
            className="mb-1 h-3 w-3 rounded-full"
            style={{
              backgroundColor:
                STATUS_COLORS[item.status] || STATUS_COLORS.comm_fault,
            }}
          />
          <span className="text-[10px] font-medium text-slate-300">
            {item.label}
          </span>
          {item.value !== undefined && (
            <span className="text-xs font-bold tabular-nums text-slate-50">
              {item.value}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
