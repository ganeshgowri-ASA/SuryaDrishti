"use client";

import { KpiCard } from "@/components/dashboard/kpi-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  plantOverviewData,
  performanceMetrics,
  dailyPowerTrend,
  monthlyEnergyData,
  weatherSnapshot,
  inverterStatusCounts,
} from "@/lib/mock-data/plant-overview";
import {
  Zap,
  Activity,
  Sun,
  Gauge,
  Radio,
  Battery,
  Calendar,
  TrendingUp,
  Thermometer,
  Wind,
  Droplets,
  CloudSun,
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
import { SCADA_COLORS } from "@/lib/constants";

export default function PlantOverviewPage() {
  const data = plantOverviewData;
  const perf = performanceMetrics;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Plant Overview</h1>
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-muted-foreground">Live</span>
        </div>
      </div>

      {/* Top KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <KpiCard title="Power Generation" value={data.powerGeneration} unit="MW" icon={Zap} color="green" />
        <KpiCard title="Reactive Power" value={data.reactivePower} unit="MVAR" icon={Activity} color="blue" />
        <KpiCard title="Irradiance" value={data.irradiance} unit="W/m²" icon={Sun} color="amber" />
        <KpiCard title="Grid Voltage" value={data.gridVoltage} unit="kV" icon={Gauge} color="default" />
        <KpiCard title="Grid Frequency" value={data.gridFrequency} unit="Hz" icon={Radio} color="default" />
      </div>

      {/* Power Gauge + Energy Counters + Inverter Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Real-time Power Output */}
        <Card>
          <CardHeader>
            <CardTitle>Real-Time Power Output</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Background arc */}
                  <path
                    d="M 30 160 A 80 80 0 1 1 170 160"
                    fill="none"
                    stroke="hsl(var(--border))"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  {/* Value arc */}
                  <path
                    d="M 30 160 A 80 80 0 1 1 170 160"
                    fill="none"
                    stroke={SCADA_COLORS.running}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${(data.powerGeneration / 100) * 290} 290`}
                  />
                  <text x="100" y="105" textAnchor="middle" className="fill-foreground text-3xl font-bold" fontSize="32">
                    {data.powerGeneration}
                  </text>
                  <text x="100" y="130" textAnchor="middle" className="fill-muted-foreground" fontSize="14">
                    MW
                  </text>
                  <text x="30" y="180" textAnchor="middle" className="fill-muted-foreground" fontSize="10">0</text>
                  <text x="170" y="180" textAnchor="middle" className="fill-muted-foreground" fontSize="10">100</text>
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Capacity: <span className="text-foreground font-medium">100 MW</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Loading: <span className="text-green-400 font-medium">{data.powerGeneration}%</span>
                </p>
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
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-md bg-muted/50 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Battery className="h-3.5 w-3.5 text-green-400" />
                  <span className="text-xs text-muted-foreground">Daily</span>
                </div>
                <p className="text-lg font-bold text-green-400">{data.dailyEnergy}</p>
                <p className="text-xs text-muted-foreground">MWh</p>
              </div>
              <div className="rounded-md bg-muted/50 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-xs text-muted-foreground">Monthly</span>
                </div>
                <p className="text-lg font-bold text-blue-400">{data.monthlyEnergy.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">MWh</p>
              </div>
              <div className="rounded-md bg-muted/50 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-3.5 w-3.5 text-amber-400" />
                  <span className="text-xs text-muted-foreground">Yearly</span>
                </div>
                <p className="text-lg font-bold text-amber-400">{(data.yearlyEnergy / 1000).toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">GWh</p>
              </div>
              <div className="rounded-md bg-muted/50 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="h-3.5 w-3.5 text-purple-400" />
                  <span className="text-xs text-muted-foreground">Lifetime</span>
                </div>
                <p className="text-lg font-bold text-purple-400">{data.lifetimeEnergy}</p>
                <p className="text-xs text-muted-foreground">GWh</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inverter Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Inverter Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Communicating</span>
                <span className="text-sm font-medium">{data.invertersComm} / 28</span>
              </div>
              <div className="space-y-2">
                {Object.entries(inverterStatusCounts).map(([status, count]) => (
                  <div key={status} className="flex items-center gap-3">
                    <div
                      className="h-3 w-3 rounded-full shrink-0"
                      style={{ backgroundColor: SCADA_COLORS[status as keyof typeof SCADA_COLORS] || '#6b7280' }}
                    />
                    <span className="text-xs text-muted-foreground flex-1 capitalize">{status.replace('_', ' ')}</span>
                    <span className="text-sm font-medium tabular-nums">{count}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Availability</span>
                  <Badge variant="success">{data.inverterAvailability}%</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Daily Power Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Power & Irradiance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={dailyPowerTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis yAxisId="power" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} label={{ value: 'MW', angle: -90, position: 'insideLeft', style: { fill: 'hsl(var(--muted-foreground))', fontSize: 11 } }} />
                <YAxis yAxisId="irr" orientation="right" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} label={{ value: 'W/m²', angle: 90, position: 'insideRight', style: { fill: 'hsl(var(--muted-foreground))', fontSize: 11 } }} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area yAxisId="power" type="monotone" dataKey="power" stroke={SCADA_COLORS.running} fill={SCADA_COLORS.running} fillOpacity={0.15} name="Power (MW)" />
                <Area yAxisId="irr" type="monotone" dataKey="irradiance" stroke="#eab308" fill="#eab308" fillOpacity={0.08} name="Irradiance (W/m²)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Energy Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Energy Production (MWh)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyEnergyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: 12 }} />
                <Bar dataKey="energy" fill={SCADA_COLORS.running} radius={[2, 2, 0, 0]} name="Energy (MWh)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance + Weather Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center rounded-md bg-muted/50 p-3">
                <p className="text-2xl font-bold text-green-400">{perf.pr}%</p>
                <p className="text-xs text-muted-foreground mt-1">PR (Performance Ratio)</p>
              </div>
              <div className="text-center rounded-md bg-muted/50 p-3">
                <p className="text-2xl font-bold text-blue-400">{perf.cuf}%</p>
                <p className="text-xs text-muted-foreground mt-1">CUF</p>
              </div>
              <div className="text-center rounded-md bg-muted/50 p-3">
                <p className="text-2xl font-bold text-amber-400">{perf.maxAcPower}</p>
                <p className="text-xs text-muted-foreground mt-1">Max AC Power (MW)</p>
              </div>
              <div className="text-center rounded-md bg-muted/50 p-3">
                <p className="text-2xl font-bold text-foreground">{perf.specificYield}</p>
                <p className="text-xs text-muted-foreground mt-1">Specific Yield (kWh/kWp)</p>
              </div>
              <div className="text-center rounded-md bg-muted/50 p-3">
                <p className="text-2xl font-bold text-green-400">{perf.gridAvailability}%</p>
                <p className="text-xs text-muted-foreground mt-1">Grid Availability</p>
              </div>
              <div className="text-center rounded-md bg-muted/50 p-3">
                <p className="text-2xl font-bold text-green-400">{perf.plantAvailability}%</p>
                <p className="text-xs text-muted-foreground mt-1">Plant Availability</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather Widget */}
        <Card>
          <CardHeader>
            <CardTitle>Weather Station ({weatherSnapshot.name})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 rounded-md bg-muted/50 p-3">
                <Sun className="h-5 w-5 text-amber-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium">{weatherSnapshot.solarRadiation} W/m²</p>
                  <p className="text-xs text-muted-foreground">GHI</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-md bg-muted/50 p-3">
                <Thermometer className="h-5 w-5 text-red-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium">{weatherSnapshot.ambientTemp}°C</p>
                  <p className="text-xs text-muted-foreground">Ambient Temp</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-md bg-muted/50 p-3">
                <Droplets className="h-5 w-5 text-blue-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium">{weatherSnapshot.humidity}%</p>
                  <p className="text-xs text-muted-foreground">Humidity</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-md bg-muted/50 p-3">
                <Wind className="h-5 w-5 text-cyan-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium">{weatherSnapshot.windSpeed} m/s</p>
                  <p className="text-xs text-muted-foreground">Wind Speed</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-md bg-muted/50 p-3">
                <CloudSun className="h-5 w-5 text-orange-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium">{weatherSnapshot.moduleTemps[0]}°C</p>
                  <p className="text-xs text-muted-foreground">Module Temp</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-md bg-muted/50 p-3">
                <Gauge className="h-5 w-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium">{weatherSnapshot.soilingRatio}%</p>
                  <p className="text-xs text-muted-foreground">Soiling Ratio</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
