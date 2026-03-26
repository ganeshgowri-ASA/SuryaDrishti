export const SCADA_COLORS = {
  running: '#22c55e',
  warning: '#f97316',
  fault: '#ef4444',
  waiting: '#eab308',
  commFault: '#6b7280',
  active: '#16a34a',
  background: '#0f172a',
  card: '#1e293b',
  stopped: '#64748b',
} as const;

export const STATUS_LABELS: Record<string, string> = {
  running: 'Running',
  stopped: 'Stopped',
  fault: 'Fault',
  warning: 'Warning',
  comm_fault: 'Comm Fault',
  waiting: 'Waiting',
};

export const NAV_ITEMS = [
  { label: 'OVERVIEW', href: '/dashboard/plant-overview' },
  { label: 'PPC CONTROL', href: '/dashboard/ppc-control' },
  { label: 'INVERTER', href: '/dashboard/inverters' },
  { label: 'WEATHER', href: '/dashboard/weather' },
  { label: 'TRACKER CONTROL', href: '/dashboard/tracker-control' },
  { label: 'TRACKER ALARMS', href: '/dashboard/tracker-alarms' },
  { label: 'TRACKER POS CODE', href: '/dashboard/tracker-pos-code' },
  { label: 'DBOX NOTIFICATION', href: '/dashboard/dbox-notification' },
  { label: 'SMB ALARM', href: '/dashboard/smb-alarm' },
  { label: 'REPORTS', href: '/dashboard/reports' },
  { label: 'INV GRAPH', href: '/dashboard/inv-graph' },
] as const;

export const PLANT_CAPACITY_MW = 100;
export const TOTAL_INVERTERS = 28;
export const STRINGS_PER_INVERTER = 19;
export const SMBS_PER_STATION = 17;
export const TRACKER_BLOCKS = 13;
export const TRACKERS_PER_BLOCK = 80;
