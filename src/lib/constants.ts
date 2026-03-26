export const SCADA_COLORS = {
  running: "#22c55e",
  warning: "#f97316",
  fault: "#ef4444",
  waiting: "#eab308",
  commFault: "#6b7280",
  active: "#16a34a",
  background: "#0f172a",
  card: "#1e293b",
  cardHover: "#334155",
  border: "#334155",
  textPrimary: "#f1f5f9",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",
  accent: "#3b82f6",
} as const;

export const STATUS_LABELS: Record<string, string> = {
  running: "Running",
  stopped: "Stopped",
  fault: "Fault",
  warning: "Warning",
  comm_fault: "Comm Fault",
  waiting: "Waiting",
};

export const STATUS_COLORS: Record<string, string> = {
  running: "bg-green-500",
  stopped: "bg-gray-500",
  fault: "bg-red-500",
  warning: "bg-orange-500",
  comm_fault: "bg-gray-500",
  waiting: "bg-yellow-500",
};

export const NAV_ITEMS = [
  { label: "OVERVIEW", href: "/dashboard/plant-overview" },
  { label: "PPC CONTROL", href: "/dashboard/ppc-control" },
  { label: "INVERTER", href: "/dashboard/inverters" },
  { label: "WEATHER", href: "/dashboard/weather" },
  { label: "TRACKER CONTROL", href: "/dashboard/tracker-control" },
  { label: "TRACKER ALARMS", href: "/dashboard/tracker-alarms" },
  { label: "TRACKER POS CODE", href: "/dashboard/tracker-pos-code" },
  { label: "DBOX NOTIFICATION", href: "/dashboard/dbox-notification" },
  { label: "SMB ALARM", href: "/dashboard/smb-alarm" },
  { label: "REPORTS", href: "/dashboard/reports" },
  { label: "INV GRAPH", href: "/dashboard/inv-graph" },
];
