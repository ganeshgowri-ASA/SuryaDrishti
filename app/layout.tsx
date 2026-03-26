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
  title: "SuryaDrishti - Solar Vision SCADA",
  description: "Solar PV Plant SCADA Web Application - 50 MW",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-[family-name:var(--font-geist-sans)] text-foreground antialiased`}
      >
        <Header />
        <main className="pb-10">{children}</main>
        <AlarmTicker />
      </body>
    </html>
  );
}
