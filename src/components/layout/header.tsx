"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import { Sun } from "lucide-react";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-700">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3">
          <Sun className="h-6 w-6 text-amber-400" />
          <div>
            <h1 className="text-lg font-bold text-slate-50 leading-tight">SuryaDrishti</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Solar SCADA</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-green-400">ONLINE</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
          </span>
        </div>
      </div>
      <nav className="overflow-x-auto">
        <div className="flex min-w-max px-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors border-b-2",
                pathname === item.href
                  ? "border-amber-400 text-amber-400 bg-slate-800/50"
                  : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
