"use client";

import { activeAlarms } from "@/lib/mock-data/alarms";
import { AlertTriangle } from "lucide-react";

export function AlarmTicker() {
  const onAlarms = activeAlarms.filter(a => a.condition === 'ON');

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 h-8 border-t bg-scada-bg/95 backdrop-blur">
      <div className="flex h-full items-center px-4 overflow-hidden">
        <div className="flex items-center gap-2 shrink-0 pr-4 border-r border-border">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
          <span className="text-xs font-medium text-amber-400">
            {onAlarms.length} Active
          </span>
        </div>
        <div className="overflow-hidden ml-4 flex-1">
          <div className="animate-marquee whitespace-nowrap flex gap-8">
            {onAlarms.map((alarm) => (
              <span key={alarm.id} className="text-xs text-muted-foreground">
                <span className={alarm.severity === 'critical' ? 'text-red-400' : 'text-amber-400'}>
                  [{alarm.source}]
                </span>{' '}
                {alarm.description} - {alarm.timeOn}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
