"use client";

import { AlertTriangle } from "lucide-react";

const TICKER_ALARMS = [
  "INV-03: DC Insulation Fault - 10:23:45",
  "INV-17: Grid Over-Voltage Warning - 10:25:12",
  "TBOX-1: Communication Timeout - 10:28:00",
  "WMS-02: Sensor Calibration Required - 10:30:15",
  "SMB-05-IS12: Fuse Fault String 7 - 10:32:44",
];

export function AlarmTicker() {
  return (
    <footer className="border-t border-scada-border bg-scada-card py-1.5 px-4 flex items-center gap-3 sticky bottom-0 z-50">
      <div className="flex items-center gap-1.5 shrink-0">
        <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
        <span className="text-xs font-semibold text-amber-400 uppercase">Alarms</span>
      </div>
      <div className="overflow-hidden flex-1">
        <div className="animate-marquee whitespace-nowrap">
          {TICKER_ALARMS.map((alarm, i) => (
            <span key={i} className="text-xs text-red-400 mx-6">
              {alarm}
            </span>
          ))}
        </div>
      </div>
      <span className="text-xs text-slate-500 shrink-0">
        Active: {TICKER_ALARMS.length}
      </span>
    </footer>
  );
}
