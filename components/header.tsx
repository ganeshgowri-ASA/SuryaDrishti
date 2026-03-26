"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900/95 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3">
          <Sun className="h-7 w-7 text-yellow-400" />
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-50">
              SuryaDrishti
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-400">
              Solar Vision SCADA
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-slate-300">
            50 MW Solar PV Plant
          </p>
          <p className="text-xs text-slate-500">PLCnext AXC F 2152</p>
        </div>
      </div>
      <nav className="flex overflow-x-auto border-t border-slate-800">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (pathname === "/" && item.href === "/overview");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "whitespace-nowrap px-3 py-2 text-xs font-medium transition-colors hover:bg-slate-800 hover:text-slate-50",
                isActive
                  ? "border-b-2 border-scada-green bg-slate-800/50 text-scada-green"
                  : "text-slate-400"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
