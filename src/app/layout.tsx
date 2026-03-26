import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { AlarmTicker } from "@/components/layout/alarm-ticker";

export const metadata: Metadata = {
  title: "SuryaDrishti — Solar PV Plant SCADA",
  description: "50 MW Solar PV Plant Monitoring & Control System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-slate-900 text-slate-100 min-h-screen">
        <Header />
        <main className="pb-10">{children}</main>
        <AlarmTicker />
      </body>
    </html>
  );
}
