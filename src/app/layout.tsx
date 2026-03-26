import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { AlarmTicker } from "@/components/layout/alarm-ticker";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SuryaDrishti — Solar SCADA",
  description: "Solar PV Plant SCADA Web Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} font-sans antialiased bg-slate-900 text-slate-50`}>
        <Header />
        <main className="pb-10">{children}</main>
        <AlarmTicker />
      </body>
    </html>
  );
}
