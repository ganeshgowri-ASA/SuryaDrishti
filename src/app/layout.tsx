import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/header";
import { AlarmTicker } from "@/components/alarm-ticker";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SuryaDrishti - Solar PV Plant SCADA",
  description: "Solar Vision - Real-time monitoring and control for solar PV plants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-scada-bg text-slate-200 min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1 overflow-auto p-4">{children}</main>
        <AlarmTicker />
      </body>
    </html>
  );
}
