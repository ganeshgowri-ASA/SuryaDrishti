import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "danger" | "muted";
}

const variantClasses: Record<string, string> = {
  default: "bg-slate-700 text-slate-200",
  success: "bg-green-500/20 text-green-400 border-green-500/30",
  warning: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  danger: "bg-red-500/20 text-red-400 border-red-500/30",
  muted: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold", variantClasses[variant], className)}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export { Badge };
