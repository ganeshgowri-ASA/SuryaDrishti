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
  textPrimary: "#f8fafc",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",
  accent: "#3b82f6",
} as const;

export const STATUS_COLORS: Record<string, string> = {
  running: SCADA_COLORS.running,
  stopped: SCADA_COLORS.commFault,
  fault: SCADA_COLORS.fault,
  warning: SCADA_COLORS.warning,
  comm_fault: SCADA_COLORS.commFault,
  waiting: SCADA_COLORS.waiting,
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
] as const;
