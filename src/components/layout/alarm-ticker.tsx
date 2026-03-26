"use client";

import { AlertTriangle } from "lucide-react";

const alarms = [
  "INV-14: DC Insulation Warning — 10:32:15",
  "TRACKER BLK-07: Wind Speed High — 11:45:22",
  "WMS-03: Communication Timeout — 12:02:08",
  "SMB IS-05/SMB-12: Overcurrent Detected — 09:18:44",
];

export function AlarmTicker() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-2 border-t border-slate-700 bg-slate-900/95 px-4 py-1.5 backdrop-blur">
      <div className="flex items-center gap-1.5 shrink-0">
        <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
        <span className="text-xs font-semibold text-amber-400">ALARMS</span>
      </div>
      <div className="overflow-hidden flex-1">
        <div className="animate-marquee whitespace-nowrap text-xs text-red-400">
          {alarms.map((alarm, i) => (
            <span key={i} className="mx-8">
              ● {alarm}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
