"use client";

import {
  Activity,
  Zap,
  Sun,
  Gauge as GaugeIcon,
  ThermometerSun,
  Wind,
  Droplets,
  BarChart3,
  BatteryCharging,
} from "lucide-react";
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
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { Gauge } from "@/components/dashboard/gauge";
import { Badge } from "@/components/ui/badge";
import { StatusIndicator } from "@/components/dashboard/status-indicator";
import {
  plantOverviewData,
  performanceMetrics,
  weatherSnapshot,
  dailyPowerTrend,
  dailyEnergyData,
  monthlyEnergyData,
  inverterStatusSummary,
} from "@/lib/mock-data/plant-overview";

export default function PlantOverviewPage() {
  const data = plantOverviewData;
  const perf = performanceMetrics;
  const weather = weatherSnapshot;

  return (
    <div className="space-y-4 p-4">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-slate-100">Plant Overview — 50 MW Solar PV</h1>
        <Badge variant="success">GRID CONNECTED</Badge>
      </div>

      {/* Top KPIs Row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <KpiCard
          title="Power Generation"
          value={data.powerGeneration}
          unit="MW"
          color="green"
          icon={<Zap className="h-4 w-4" />}
        />
        <KpiCard
          title="Reactive Power"
          value={data.reactivePower}
          unit="MVAR"
          color="blue"
          icon={<Activity className="h-4 w-4" />}
        />
        <KpiCard
          title="Irradiance"
          value={data.irradiance}
          unit="W/m²"
          color="amber"
          icon={<Sun className="h-4 w-4" />}
        />
        <KpiCard
          title="Grid Voltage"
          value={data.gridVoltage}
          unit="kV"
          color="default"
          icon={<GaugeIcon className="h-4 w-4" />}
        />
        <KpiCard
          title="Grid Frequency"
          value={data.gridFrequency}
          unit="Hz"
          color="default"
          icon={<Activity className="h-4 w-4" />}
        />
      </div>

      {/* Power Gauge + Inverter Summary + Energy Counters */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Power Output Gauge */}
        <Card>
          <CardHeader>
            <CardTitle>Real-Time Power Output</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <Gauge
              value={data.powerGeneration}
              max={50}
              label="Active Power"
              unit="MW"
              color="#22c55e"
            />
          </CardContent>
        </Card>

        {/* Inverter Status Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Inverter Status Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Total Inverters</span>
                <span className="text-lg font-bold text-slate-100">{inverterStatusSummary.total}</span>
              </div>
              <div className="flex items-center justify-between">
                <StatusIndicator status="running" label="Running" />
                <span className="text-lg font-bold text-green-400">{inverterStatusSummary.running}</span>
              </div>
              <div className="flex items-center justify-between">
                <StatusIndicator status="stopped" label="Stopped" />
                <span className="text-lg font-bold text-gray-400">{inverterStatusSummary.stopped}</span>
              </div>
              <div className="flex items-center justify-between">
                <StatusIndicator status="fault" label="Fault" />
                <span className="text-lg font-bold text-red-400">{inverterStatusSummary.fault}</span>
              </div>
              <div className="flex items-center justify-between">
                <StatusIndicator status="warning" label="Warning" />
                <span className="text-lg font-bold text-orange-400">{inverterStatusSummary.warning}</span>
              </div>
              <div className="flex items-center justify-between">
                <StatusIndicator status="comm_fault" label="Comm Fault" />
                <span className="text-lg font-bold text-gray-400">{inverterStatusSummary.commFault}</span>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-slate-700 pt-2">
                <span className="text-xs text-slate-400">Availability</span>
                <span className="text-sm font-semibold text-green-400">{data.inverterAvailability}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Energy Counters */}
        <Card>
          <CardHeader>
            <CardTitle>Energy Production</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="rounded-md bg-slate-900/50 p-3">
                <div className="text-xs text-slate-500">Daily</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-slate-100">{data.dailyEnergy}</span>
                  <span className="text-sm text-slate-400">MWh</span>
                </div>
              </div>
              <div className="rounded-md bg-slate-900/50 p-3">
                <div className="text-xs text-slate-500">Monthly</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-slate-100">{data.monthlyEnergy.toLocaleString()}</span>
                  <span className="text-sm text-slate-400">MWh</span>
                </div>
              </div>
              <div className="rounded-md bg-slate-900/50 p-3">
                <div className="text-xs text-slate-500">Yearly</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-slate-100">{data.yearlyEnergy.toLocaleString()}</span>
                  <span className="text-sm text-slate-400">MWh</span>
                </div>
              </div>
              <div className="rounded-md bg-slate-900/50 p-3">
                <div className="text-xs text-slate-500">Lifetime</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-slate-100">{data.lifetimeEnergy}</span>
                  <span className="text-sm text-slate-400">GWh</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Power Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Daily Power & Irradiance Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={dailyPowerTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
              <YAxis yAxisId="power" stroke="#64748b" fontSize={11} label={{ value: "MW", angle: -90, position: "insideLeft", fill: "#64748b", fontSize: 11 }} />
              <YAxis yAxisId="irr" orientation="right" stroke="#64748b" fontSize={11} label={{ value: "W/m²", angle: 90, position: "insideRight", fill: "#64748b", fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#f1f5f9" }}
              />
              <Legend />
              <Area yAxisId="power" type="monotone" dataKey="power" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} name="Power (MW)" />
              <Area yAxisId="irr" type="monotone" dataKey="irradiance" stroke="#eab308" fill="#eab308" fillOpacity={0.1} name="Irradiance (W/m²)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Weekly + Monthly Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Energy Production</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={dailyEnergyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#f1f5f9" }} />
                <Bar dataKey="energy" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Energy (MWh)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Energy Production</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyEnergyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#f1f5f9" }} />
                <Bar dataKey="energy" fill="#22c55e" radius={[4, 4, 0, 0]} name="Energy (MWh)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics + Weather Widget */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Performance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="pb-2 text-left text-xs font-medium text-slate-400">Parameter</th>
                    <th className="pb-2 text-right text-xs font-medium text-slate-400">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  <tr>
                    <td className="py-2 text-slate-300">Performance Ratio (PR)</td>
                    <td className="py-2 text-right font-semibold text-green-400">{perf.pr}%</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-slate-300">Capacity Utilization (CUF)</td>
                    <td className="py-2 text-right font-semibold text-blue-400">{perf.cuf}%</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-slate-300">Max AC Power</td>
                    <td className="py-2 text-right font-semibold text-slate-200">{perf.maxACPower} MW</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-slate-300">Plant Availability</td>
                    <td className="py-2 text-right font-semibold text-green-400">{perf.plantAvailability}%</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-slate-300">Grid Availability</td>
                    <td className="py-2 text-right font-semibold text-green-400">{perf.gridAvailability}%</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-slate-300">Specific Yield</td>
                    <td className="py-2 text-right font-semibold text-slate-200">{perf.specificYield} kWh/kWp</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Weather Widget */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ThermometerSun className="h-4 w-4" />
              Weather Snapshot
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-md bg-slate-900/50 p-3 text-center">
                <ThermometerSun className="mx-auto h-5 w-5 text-orange-400" />
                <div className="mt-1 text-lg font-bold text-slate-100">{weather.ambientTemp}°C</div>
                <div className="text-xs text-slate-500">Ambient</div>
              </div>
              <div className="rounded-md bg-slate-900/50 p-3 text-center">
                <BatteryCharging className="mx-auto h-5 w-5 text-red-400" />
                <div className="mt-1 text-lg font-bold text-slate-100">{weather.moduleTemp}°C</div>
                <div className="text-xs text-slate-500">Module</div>
              </div>
              <div className="rounded-md bg-slate-900/50 p-3 text-center">
                <Sun className="mx-auto h-5 w-5 text-yellow-400" />
                <div className="mt-1 text-lg font-bold text-slate-100">{weather.ghi}</div>
                <div className="text-xs text-slate-500">GHI (W/m²)</div>
              </div>
              <div className="rounded-md bg-slate-900/50 p-3 text-center">
                <Wind className="mx-auto h-5 w-5 text-blue-400" />
                <div className="mt-1 text-lg font-bold text-slate-100">{weather.windSpeed}</div>
                <div className="text-xs text-slate-500">Wind (m/s)</div>
              </div>
              <div className="rounded-md bg-slate-900/50 p-3 text-center">
                <Droplets className="mx-auto h-5 w-5 text-cyan-400" />
                <div className="mt-1 text-lg font-bold text-slate-100">{weather.humidity}%</div>
                <div className="text-xs text-slate-500">Humidity</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
