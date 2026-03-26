"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-scada-border bg-scada-card sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <Sun className="h-6 w-6 text-amber-400" />
          <span className="text-lg font-bold text-slate-100 tracking-wide">
            SuryaDrishti
          </span>
          <span className="text-xs text-slate-500 ml-1">v1.0</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">100 MW Solar PV Plant</span>
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-green-400">ONLINE</span>
        </div>
      </div>
      <nav className="flex overflow-x-auto px-2 pb-1">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors rounded-md",
              pathname === item.href
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
