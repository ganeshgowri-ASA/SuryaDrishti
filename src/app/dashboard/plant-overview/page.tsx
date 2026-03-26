"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { KPICard } from "@/components/ui/kpi-card";
import { Badge } from "@/components/ui/badge";
import {
  plantOverviewData,
  performanceData,
  dailyEnergyTrend,
  monthlyEnergyTrend,
  inverterStatusSummary,
  weatherSnapshot,
} from "@/lib/mock-data/plant-overview";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Zap,
  Activity,
  Sun,
  Gauge,
  Radio,
  Battery,
  Thermometer,
  Wind,
  Droplets,
  TrendingUp,
} from "lucide-react";

const d = plantOverviewData;
const p = performanceData;
const w = weatherSnapshot;

export default function PlantOverviewPage() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-200">Plant Overview — 50 MW Solar PV</h2>
        <Badge variant="running">GRID CONNECTED</Badge>
      </div>

      {/* Top KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <KPICard title="Power Output" value={d.powerGeneration} unit="MW" icon={<Zap className="h-5 w-5 text-green-400" />} valueColor="text-green-400" />
        <KPICard title="Reactive Power" value={d.reactivePower} unit="MVAR" icon={<Activity className="h-5 w-5 text-blue-400" />} valueColor="text-blue-400" />
        <KPICard title="Irradiance" value={d.irradiance} unit="W/m²" icon={<Sun className="h-5 w-5 text-amber-400" />} valueColor="text-amber-400" />
        <KPICard title="Grid Voltage" value={d.gridVoltage} unit="kV" icon={<Gauge className="h-5 w-5 text-cyan-400" />} valueColor="text-cyan-400" />
        <KPICard title="Grid Frequency" value={d.gridFrequency} unit="Hz" icon={<Radio className="h-5 w-5 text-purple-400" />} valueColor="text-purple-400" />
      </div>

      {/* Power Output Gauge + Energy Counters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Real-time Power Gauge */}
        <Card>
          <CardHeader>
            <CardTitle>Real-Time Power Output</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-24 overflow-hidden">
                <svg viewBox="0 0 200 100" className="w-full h-full">
                  <path d="M 10 95 A 90 90 0 0 1 190 95" fill="none" stroke="#334155" strokeWidth="12" strokeLinecap="round" />
                  <path
                    d="M 10 95 A 90 90 0 0 1 190 95"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${(d.powerGeneration / 50) * 283} 283`}
                  />
                  <text x="100" y="80" textAnchor="middle" className="fill-slate-50 text-2xl font-bold" fontSize="28">
                    {d.powerGeneration}
                  </text>
                  <text x="100" y="95" textAnchor="middle" className="fill-slate-400" fontSize="12">
                    MW
                  </text>
                </svg>
              </div>
              <div className="flex justify-between w-full mt-2 text-xs text-slate-400">
                <span>0 MW</span>
                <span>25 MW</span>
                <span>50 MW</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Capacity: {Math.round((d.powerGeneration / 50) * 100)}% of 50 MW
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Energy Counters */}
        <Card>
          <CardHeader>
            <CardTitle>Energy Production</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-700/50 rounded-lg p-3">
                <p className="text-[10px] text-slate-400 uppercase">Today</p>
                <p className="text-xl font-bold text-green-400">{d.dailyEnergy}</p>
                <p className="text-xs text-slate-400">MWh</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <p className="text-[10px] text-slate-400 uppercase">This Month</p>
                <p className="text-xl font-bold text-blue-400">{d.monthlyEnergy}</p>
                <p className="text-xs text-slate-400">MWh</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <p className="text-[10px] text-slate-400 uppercase">This Year</p>
                <p className="text-xl font-bold text-cyan-400">{d.yearlyEnergy.toLocaleString()}</p>
                <p className="text-xs text-slate-400">MWh</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <p className="text-[10px] text-slate-400 uppercase">Lifetime</p>
                <p className="text-xl font-bold text-purple-400">{d.lifetimeEnergy}</p>
                <p className="text-xs text-slate-400">GWh</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inverter Status Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Inverter Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-28 h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={inverterStatusSummary} dataKey="count" nameKey="status" cx="50%" cy="50%" innerRadius={30} outerRadius={50} strokeWidth={0}>
                      {inverterStatusSummary.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {inverterStatusSummary.map((s) => (
                  <div key={s.status} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-xs text-slate-300">{s.status}</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-200">{s.count}</span>
                  </div>
                ))}
                <div className="pt-1 border-t border-slate-600 flex justify-between">
                  <span className="text-xs text-slate-400">Comm</span>
                  <span className="text-sm font-semibold text-slate-200">{d.invertersComm}/28</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Availability</span>
                  <span className="text-sm font-semibold text-green-400">{d.inverterAvailability}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Daily Generation Curve */}
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Generation Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyEnergyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "#94a3b8" }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 10, fill: "#94a3b8" }} label={{ value: "MW", angle: -90, position: "insideLeft", style: { fill: "#94a3b8", fontSize: 10 } }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: "#94a3b8" }} label={{ value: "W/m²", angle: 90, position: "insideRight", style: { fill: "#94a3b8", fontSize: 10 } }} />
                  <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area yAxisId="left" type="monotone" dataKey="power" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} name="Power (MW)" />
                  <Area yAxisId="right" type="monotone" dataKey="irradiance" stroke="#eab308" fill="#eab308" fillOpacity={0.1} name="Irradiance (W/m²)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Energy */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Energy Production (March 2026)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyEnergyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="day" tick={{ fontSize: 9, fill: "#94a3b8" }} interval={2} />
                  <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} label={{ value: "MWh", angle: -90, position: "insideLeft", style: { fill: "#94a3b8", fontSize: 10 } }} />
                  <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", fontSize: 12 }} />
                  <Bar dataKey="energy" fill="#3b82f6" radius={[2, 2, 0, 0]} name="Energy (MWh)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance + Grid Export + Weather */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Performance KPIs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: "Performance Ratio (PR)", value: `${p.pr}%`, bar: p.pr, color: "bg-green-500" },
                { label: "Capacity Utilization (CUF)", value: `${p.cuf}%`, bar: p.cuf, color: "bg-blue-500" },
                { label: "Plant Availability", value: `${p.plantAvailability}%`, bar: p.plantAvailability, color: "bg-cyan-500" },
                { label: "Grid Availability", value: `${p.gridAvailability}%`, bar: p.gridAvailability, color: "bg-purple-500" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="text-slate-200 font-semibold">{item.value}</span>
                  </div>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full transition-all`} style={{ width: `${item.bar}%` }} />
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t border-slate-700 flex justify-between items-center">
                <span className="text-xs text-slate-400">Max AC Power Today</span>
                <span className="text-sm font-bold text-amber-400">{p.maxACPower} MW</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grid Export */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Battery className="h-4 w-4" /> Grid Export</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <p className="text-[10px] text-slate-400 uppercase mb-1">Exporting Now</p>
                <p className="text-3xl font-bold text-green-400">{d.powerGeneration}</p>
                <p className="text-xs text-slate-400">MW to Grid</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <p className="text-[10px] text-slate-400 uppercase">Today Export</p>
                  <p className="text-lg font-bold text-slate-200">{p.gridExportToday}</p>
                  <p className="text-xs text-slate-400">MWh</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-slate-400 uppercase">Month Export</p>
                  <p className="text-lg font-bold text-slate-200">{p.gridExportMonth.toLocaleString()}</p>
                  <p className="text-xs text-slate-400">MWh</p>
                </div>
              </div>
              <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
                <span className="text-xs text-slate-400">Grid Voltage</span>
                <span className="text-sm font-mono text-cyan-400">{d.gridVoltage} kV</span>
              </div>
              <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
                <span className="text-xs text-slate-400">Frequency</span>
                <span className="text-sm font-mono text-purple-400">{d.gridFrequency} Hz</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather Widget */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Sun className="h-4 w-4 text-amber-400" /> Weather Snapshot</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { icon: <Sun className="h-4 w-4 text-amber-400" />, label: "GHI", value: `${w.ghi} W/m²` },
                { icon: <Sun className="h-4 w-4 text-orange-400" />, label: "Tilt Irradiance", value: `${w.tiltIrradiance} W/m²` },
                { icon: <Thermometer className="h-4 w-4 text-red-400" />, label: "Ambient Temp", value: `${w.ambientTemp} °C` },
                { icon: <Thermometer className="h-4 w-4 text-orange-400" />, label: "Module Temp", value: `${w.moduleTemp} °C` },
                { icon: <Wind className="h-4 w-4 text-cyan-400" />, label: "Wind Speed", value: `${w.windSpeed} m/s` },
                { icon: <Droplets className="h-4 w-4 text-blue-400" />, label: "Humidity", value: `${w.humidity}%` },
                { icon: <TrendingUp className="h-4 w-4 text-green-400" />, label: "Soiling Ratio", value: `${w.soilingRatio}%` },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="text-xs text-slate-400">{item.label}</span>
                  </div>
                  <span className="text-sm font-mono text-slate-200">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
