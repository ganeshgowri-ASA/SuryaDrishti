"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

function Select({ value, onValueChange, children }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className={cn(
        "h-9 rounded-md border border-scada-border bg-scada-card px-3 py-1 text-sm text-slate-200",
        "focus:outline-none focus:ring-2 focus:ring-blue-500"
      )}
    >
      {children}
    </select>
  );
}

function SelectOption({ value, children }: { value: string; children: React.ReactNode }) {
  return <option value={value}>{children}</option>;
}

export { Select, SelectOption };
