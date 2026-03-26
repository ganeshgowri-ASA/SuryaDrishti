"use client";

import { AlertTriangle } from "lucide-react";
import alarms from "@/data/alarms.json";
import type { Alarm } from "@/types";

const activeAlarms = (alarms as Alarm[]).filter((a) => a.condition === "ON");

export function AlarmTicker() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 flex h-8 items-center border-t border-slate-700 bg-slate-900/95 backdrop-blur">
      <div className="flex h-full items-center gap-2 border-r border-slate-700 bg-red-500/10 px-3">
        <AlertTriangle className="h-4 w-4 text-scada-red" />
        <span className="text-xs font-semibold text-scada-red">
          {activeAlarms.length} ACTIVE
        </span>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <div className="animate-ticker-scroll flex whitespace-nowrap">
          {activeAlarms.map((alarm, i) => (
            <span key={i} className="mx-8 text-xs text-slate-300">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-scada-red" />
              <span className="font-medium text-scada-red">
                [{alarm.source}]
              </span>{" "}
              {alarm.description} — {alarm.timeOn}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
