export const COLORS = {
  running: "#22c55e",
  warning: "#f97316",
  fault: "#ef4444",
  waiting: "#eab308",
  commFault: "#6b7280",
  active: "#16a34a",
  background: "#0f172a",
  card: "#1e293b",
} as const;

export const STATUS_COLORS: Record<string, string> = {
  running: COLORS.running,
  ready: COLORS.running,
  stopped: COLORS.fault,
  fault: COLORS.fault,
  alarm: COLORS.fault,
  warning: COLORS.warning,
  waiting: COLORS.waiting,
  comm_fault: COLORS.commFault,
} as const;

export const NAV_ITEMS = [
  { label: "OVERVIEW", href: "/overview" },
  { label: "PPC CONTROL", href: "/ppc-control" },
  { label: "INVERTER", href: "/inverter" },
  { label: "WEATHER", href: "/weather" },
  { label: "TRACKER CONTROL", href: "/tracker-control" },
  { label: "TRACKER ALARMS", href: "/tracker-alarms" },
  { label: "TRACKER POS CODE", href: "/tracker-pos-code" },
  { label: "DBOX NOTIFICATION", href: "/dbox-notification" },
  { label: "SMB ALARM", href: "/smb-alarm" },
  { label: "REPORTS", href: "/reports" },
  { label: "INV GRAPH", href: "/inv-graph" },
] as const;
