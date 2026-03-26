"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900/95 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <Sun className="h-6 w-6 text-amber-400" />
          <span className="text-lg font-bold text-slate-100">SuryaDrishti</span>
          <span className="hidden text-xs text-slate-500 sm:inline">| 50 MW Solar PV Plant</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-green-400">ONLINE</span>
          </div>
          <span className="text-xs text-slate-500">{new Date().toLocaleString()}</span>
        </div>
      </div>
      <nav className="flex overflow-x-auto border-t border-slate-800 px-2">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "whitespace-nowrap px-3 py-2 text-xs font-medium transition-colors hover:text-slate-100",
              pathname === item.href
                ? "border-b-2 border-blue-500 text-blue-400"
                : "text-slate-400"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
