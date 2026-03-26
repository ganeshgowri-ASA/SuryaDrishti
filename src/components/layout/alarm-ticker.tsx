"use client";

import { AlertTriangle } from "lucide-react";

const MOCK_ALARMS = [
  "INV-07: DC String Fault — String 12 Low Current",
  "TBOX-1: Wind Speed Alert — Block 04 Wind Defence Mode",
  "WMS-03: Communication Timeout — Retry in Progress",
  "INV-22: Grid Voltage High — Phase R: 442V",
  "TRACKER: Block 09 ID-45 — Motor Overcurrent Alarm",
];

export function AlarmTicker() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-700">
      <div className="flex items-center h-8 px-4 overflow-hidden">
        <div className="flex items-center gap-2 shrink-0 pr-4 border-r border-slate-700">
          <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
          <span className="text-xs font-semibold text-red-400">ALARMS</span>
        </div>
        <div className="overflow-hidden ml-4 flex-1">
          <div className="animate-marquee whitespace-nowrap">
            {MOCK_ALARMS.map((alarm, i) => (
              <span key={i} className="text-xs text-amber-400 mx-8">
                {alarm}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
