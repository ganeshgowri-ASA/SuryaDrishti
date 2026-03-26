"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import { Sun } from "lucide-react";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-scada-bg/95 backdrop-blur supports-[backdrop-filter]:bg-scada-bg/80">
      <div className="flex h-14 items-center px-4 gap-4">
        <Link href="/dashboard/plant-overview" className="flex items-center gap-2 shrink-0">
          <Sun className="h-6 w-6 text-amber-400" />
          <span className="font-bold text-lg tracking-tight">SuryaDrishti</span>
        </Link>
        <div className="h-6 w-px bg-border mx-1" />
        <nav className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors",
                pathname === item.href
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
