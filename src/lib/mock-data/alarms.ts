import { Alarm } from '@/types';

export const activeAlarms: Alarm[] = [
  {
    id: 'ALM-001',
    description: 'INV-15 DC Input Undervoltage',
    timeOn: '2026-03-26 08:42:15',
    condition: 'ON',
    source: 'INV-15',
    severity: 'critical',
  },
  {
    id: 'ALM-002',
    description: 'INV-22 IGBT Temperature High',
    timeOn: '2026-03-26 10:05:33',
    condition: 'ON',
    source: 'INV-22',
    severity: 'warning',
  },
  {
    id: 'ALM-003',
    description: 'WMS-03 Communication Timeout',
    timeOn: '2026-03-26 09:18:44',
    timeOff: '2026-03-26 09:22:10',
    condition: 'OFF',
    timeAck: '2026-03-26 09:25:00',
    source: 'WMS-03',
    severity: 'info',
  },
  {
    id: 'ALM-004',
    description: 'Tracker Block 07 Wind Speed High',
    timeOn: '2026-03-26 10:12:08',
    condition: 'ON',
    source: 'TBOX-1',
    severity: 'warning',
  },
];
