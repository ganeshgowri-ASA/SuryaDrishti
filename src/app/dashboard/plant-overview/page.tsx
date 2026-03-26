"use client";

import {
  Zap, Activity, Sun, Gauge, Radio,
  Thermometer, Wind, Droplets,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { KpiCard } from "@/components/kpi-card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  plantOverviewData,
  dailyEnergyData,
  monthlyEnergyData,
  inverterSummary,
  weatherSnapshot,
} from "@/data/plant-overview";
import { SCADA_COLORS } from "@/lib/constants";
import { useState } from "react";

export default function PlantOverviewPage() {
  const data = plantOverviewData;
  const [energyTab, setEnergyTab] = useState("daily");

  const gaugePercent = (data.powerGeneration / data.plantCapacity) * 100;

  return (
    <div className="space-y-4">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-slate-100">Plant Overview</h1>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Last updated: 10:34:22</span>
          <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
        </div>
      </div>

      {/* Primary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <KpiCard title="Active Power" value={data.powerGeneration} unit="MW" icon={Zap} color="green" />
        <KpiCard title="Reactive Power" value={data.reactivePower} unit="MVAR" icon={Activity} color="blue" />
        <KpiCard title="Irradiance" value={data.irradiance} unit="W/m²" icon={Sun} color="amber" />
        <KpiCard title="Grid Voltage" value={data.gridVoltage} unit="kV" icon={Gauge} color="blue" />
        <KpiCard title="Grid Frequency" value={data.gridFrequency} unit="Hz" icon={Radio} color="slate" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Power Output Gauge */}
        <Card>
          <CardHeader>
            <CardTitle>Real-Time Power Output</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-24 overflow-hidden">
                <svg viewBox="0 0 200 100" className="w-full h-full">
                  {/* Background arc */}
                  <path
                    d="M 20 90 A 80 80 0 0 1 180 90"
                    fill="none"
                    stroke="#334155"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  {/* Value arc */}
                  <path
                    d="M 20 90 A 80 80 0 0 1 180 90"
                    fill="none"
                    stroke={gaugePercent > 90 ? SCADA_COLORS.warning : SCADA_COLORS.running}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${gaugePercent * 2.51} 251`}
                  />
                  <text x="100" y="80" textAnchor="middle" className="fill-slate-200 text-2xl font-bold" fontSize="28">
                    {data.powerGeneration}
                  </text>
                  <text x="100" y="95" textAnchor="middle" className="fill-slate-500" fontSize="12">
                    MW / {data.plantCapacity} MW
                  </text>
                </svg>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full mt-4 text-center">
                <div>
                  <p className="text-xs text-slate-500">Grid Export</p>
                  <p className="text-lg font-bold text-green-400">{data.gridExportPower} <span className="text-xs text-slate-500">MW</span></p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Plant Load</p>
                  <p className="text-lg font-bold text-blue-400">{(data.powerGeneration - data.gridExportPower).toFixed(1)} <span className="text-xs text-slate-500">MW</span></p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Energy Production Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Energy Production</CardTitle>
            <Tabs value={energyTab} onValueChange={setEnergyTab}>
              <TabsList>
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TabsContent value="daily" className="mt-0">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={dailyEnergyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="label" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                    labelStyle={{ color: "#94a3b8" }}
                    itemStyle={{ color: "#22c55e" }}
                    formatter={(value) => [`${value} MW`, "Power"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={SCADA_COLORS.running}
                    fill={SCADA_COLORS.running}
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="monthly" className="mt-0">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyEnergyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="label" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                    labelStyle={{ color: "#94a3b8" }}
                    formatter={(value) => [`${value} MWh`, "Energy"]}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {monthlyEnergyData.map((_, index) => (
                      <Cell key={index} fill={index === 2 ? SCADA_COLORS.running : "#3b82f6"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Inverter Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Inverter Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Communicated</span>
                <span className="text-sm font-bold text-slate-200">{inverterSummary.total}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-xs text-slate-400">Running</span>
                </div>
                <Badge variant="running">{inverterSummary.running}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="text-xs text-slate-400">Stopped</span>
                </div>
                <Badge variant="fault">{inverterSummary.stopped}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="text-xs text-slate-400">Fault</span>
                </div>
                <Badge variant="fault">{inverterSummary.fault}</Badge>
              </div>
              <div className="mt-3 pt-3 border-t border-scada-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Availability</span>
                  <span className="text-sm font-bold text-green-400">{data.inverterAvailability}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Energy Counters */}
        <Card>
          <CardHeader>
            <CardTitle>Energy Counters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Daily</span>
                <span className="text-sm font-bold text-amber-400">{data.dailyEnergy} <span className="text-xs text-slate-500">MWh</span></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Monthly</span>
                <span className="text-sm font-bold text-blue-400">{data.monthlyEnergy.toLocaleString()} <span className="text-xs text-slate-500">MWh</span></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Yearly</span>
                <span className="text-sm font-bold text-green-400">{data.yearlyEnergy.toLocaleString()} <span className="text-xs text-slate-500">MWh</span></span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-scada-border">
                <span className="text-xs text-slate-400">Lifetime</span>
                <span className="text-sm font-bold text-slate-200">{data.lifetimeEnergy} <span className="text-xs text-slate-500">GWh</span></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Grid Export Today</span>
                <span className="text-sm font-bold text-green-400">{data.gridExportEnergy} <span className="text-xs text-slate-500">MWh</span></span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance KPIs */}
        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-400">PR (Performance Ratio)</span>
                  <span className="text-sm font-bold text-green-400">{data.performanceRatio}%</span>
                </div>
                <div className="h-1.5 bg-slate-700 rounded-full">
                  <div className="h-1.5 bg-green-500 rounded-full" style={{ width: `${data.performanceRatio}%` }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-400">CUF</span>
                  <span className="text-sm font-bold text-blue-400">{data.cuf}%</span>
                </div>
                <div className="h-1.5 bg-slate-700 rounded-full">
                  <div className="h-1.5 bg-blue-500 rounded-full" style={{ width: `${data.cuf * 4}%` }} />
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-scada-border">
                <span className="text-xs text-slate-400">Max AC Power Today</span>
                <span className="text-sm font-bold text-amber-400">{data.maxACPower} <span className="text-xs text-slate-500">MW</span></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Plant Capacity</span>
                <span className="text-sm font-bold text-slate-300">{data.plantCapacity} <span className="text-xs text-slate-500">MW</span></span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather Snapshot */}
        <Card>
          <CardHeader>
            <CardTitle>Weather Snapshot</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Sun className="h-3.5 w-3.5 text-amber-400" />
                  <span className="text-xs text-slate-400">GHI</span>
                </div>
                <span className="text-sm font-bold text-amber-400">{weatherSnapshot.ghi} <span className="text-xs text-slate-500">W/m²</span></span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Thermometer className="h-3.5 w-3.5 text-red-400" />
                  <span className="text-xs text-slate-400">Ambient Temp</span>
                </div>
                <span className="text-sm font-bold text-slate-200">{weatherSnapshot.ambientTemp} <span className="text-xs text-slate-500">°C</span></span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Thermometer className="h-3.5 w-3.5 text-orange-400" />
                  <span className="text-xs text-slate-400">Module Temp</span>
                </div>
                <span className="text-sm font-bold text-orange-400">{weatherSnapshot.moduleTemp} <span className="text-xs text-slate-500">°C</span></span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Wind className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-xs text-slate-400">Wind Speed</span>
                </div>
                <span className="text-sm font-bold text-slate-200">{weatherSnapshot.windSpeed} <span className="text-xs text-slate-500">m/s</span></span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Droplets className="h-3.5 w-3.5 text-cyan-400" />
                  <span className="text-xs text-slate-400">Humidity</span>
                </div>
                <span className="text-sm font-bold text-slate-200">{weatherSnapshot.humidity} <span className="text-xs text-slate-500">%</span></span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
