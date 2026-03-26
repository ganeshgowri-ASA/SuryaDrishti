"use client";

import { useState } from "react";
import {
  Zap, Thermometer, Activity, Gauge, BarChart3, Grid3X3,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectOption } from "@/components/ui/select";
import { StatusIndicator } from "@/components/status-indicator";
import { KpiCard } from "@/components/kpi-card";
import { inverterData } from "@/data/inverter-data";
import { SCADA_COLORS, STATUS_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { InverterData, InverterStatus } from "@/types";

const statusVariantMap: Record<InverterStatus, "running" | "fault" | "warning" | "waiting" | "commFault"> = {
  running: "running",
  stopped: "fault",
  fault: "fault",
  warning: "warning",
  waiting: "waiting",
  comm_fault: "commFault",
};

function InverterTile({ inv, selected, onClick }: { inv: InverterData; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-lg border p-2 text-left transition-all",
        selected
          ? "border-blue-500 bg-blue-500/10"
          : "border-scada-border bg-scada-card hover:bg-scada-card-hover"
      )}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-bold text-slate-300">{inv.name}</span>
        <StatusIndicator status={inv.status} showLabel={false} size="sm" />
      </div>
      <div className="text-lg font-bold tabular-nums" style={{ color: STATUS_COLORS[inv.status] }}>
        {inv.activePower.toFixed(1)}
        <span className="text-xs text-slate-500 ml-0.5">MW</span>
      </div>
      <div className="text-[10px] text-slate-500">
        {inv.dailyEnergy.toFixed(1)} MWh
      </div>
    </button>
  );
}

export default function InverterDashboardPage() {
  const [selectedId, setSelectedId] = useState(1);
  const inv = inverterData.find((i) => i.id === selectedId) || inverterData[0];

  const stringChartData = inv.stringCurrents.map((current, i) => ({
    name: `S${i + 1}`,
    current,
    avg: inv.status === "running" ? 9.5 : 0,
  }));

  const tempData = Object.entries(inv.temperatures).map(([key, value]) => ({
    name: key,
    value,
  }));

  const mpptData = inv.mpptVoltages.map((v, i) => ({
    name: `MPPT ${i + 1}`,
    voltage: v,
    current: inv.mpptCurrents[i],
    power: Math.round(v * inv.mpptCurrents[i]) / 1000,
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-slate-100">Inverter Dashboard</h1>
        <div className="flex items-center gap-3">
          <Select value={selectedId.toString()} onValueChange={(v) => setSelectedId(parseInt(v))}>
            {inverterData.map((inv) => (
              <SelectOption key={inv.id} value={inv.id.toString()}>
                {inv.name}
              </SelectOption>
            ))}
          </Select>
          <Badge variant={statusVariantMap[inv.status]}>
            {inv.status.replace("_", " ").toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Inverter Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-14 gap-1.5">
        {inverterData.map((i) => (
          <InverterTile
            key={i.id}
            inv={i}
            selected={i.id === selectedId}
            onClick={() => setSelectedId(i.id)}
          />
        ))}
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <KpiCard title="DC Power" value={inv.dcPower.toFixed(1)} unit="kW" icon={Zap} color="amber" />
        <KpiCard title="AC Power" value={inv.activePower.toFixed(2)} unit="MW" icon={Activity} color="green" />
        <KpiCard title="Efficiency" value={inv.efficiency.toFixed(1)} unit="%" icon={Gauge} color="blue" />
        <KpiCard title="Daily Energy" value={inv.dailyEnergy.toFixed(1)} unit="MWh" icon={BarChart3} color="green" />
        <KpiCard title="Frequency" value={inv.frequency.toFixed(2)} unit="Hz" icon={Activity} color="slate" />
        <KpiCard title="Power Factor" value={inv.powerFactor.toFixed(3)} unit="" icon={Gauge} color="blue" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* DC Input (MPPT) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-400" />
              DC Input (MPPT)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-scada-border">
                    <th className="text-left py-1 text-slate-500">MPPT</th>
                    <th className="text-right py-1 text-slate-500">V (V)</th>
                    <th className="text-right py-1 text-slate-500">I (A)</th>
                    <th className="text-right py-1 text-slate-500">P (kW)</th>
                  </tr>
                </thead>
                <tbody>
                  {mpptData.map((m) => (
                    <tr key={m.name} className="border-b border-scada-border/50">
                      <td className="py-1 text-slate-300">{m.name}</td>
                      <td className="py-1 text-right text-amber-400 tabular-nums">{m.voltage.toFixed(1)}</td>
                      <td className="py-1 text-right text-slate-200 tabular-nums">{m.current.toFixed(2)}</td>
                      <td className="py-1 text-right text-green-400 tabular-nums">{m.power.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-scada-border font-bold">
                    <td className="py-1 text-slate-300">Total</td>
                    <td className="py-1 text-right text-amber-400">{inv.dcVoltage.toFixed(1)}</td>
                    <td className="py-1 text-right text-slate-200">{inv.dcCurrent.toFixed(1)}</td>
                    <td className="py-1 text-right text-green-400">{inv.dcPower.toFixed(1)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* AC Output */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-400" />
              AC Output (3-Phase)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-slate-500 uppercase mb-1">Line Voltages (V)</div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded bg-slate-800/50 p-2 text-center">
                    <span className="text-[10px] text-red-400">U-V</span>
                    <p className="text-sm font-bold text-slate-200 tabular-nums">{inv.gridVoltageUV.toFixed(1)}</p>
                  </div>
                  <div className="rounded bg-slate-800/50 p-2 text-center">
                    <span className="text-[10px] text-yellow-400">V-W</span>
                    <p className="text-sm font-bold text-slate-200 tabular-nums">{inv.gridVoltageVW.toFixed(1)}</p>
                  </div>
                  <div className="rounded bg-slate-800/50 p-2 text-center">
                    <span className="text-[10px] text-blue-400">W-U</span>
                    <p className="text-sm font-bold text-slate-200 tabular-nums">{inv.gridVoltageWU.toFixed(1)}</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase mb-1">Phase Currents (kA)</div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded bg-slate-800/50 p-2 text-center">
                    <span className="text-[10px] text-red-400">R</span>
                    <p className="text-sm font-bold text-slate-200 tabular-nums">{inv.gridCurrentPhase1.toFixed(2)}</p>
                  </div>
                  <div className="rounded bg-slate-800/50 p-2 text-center">
                    <span className="text-[10px] text-yellow-400">Y</span>
                    <p className="text-sm font-bold text-slate-200 tabular-nums">{inv.gridCurrentPhase2.toFixed(2)}</p>
                  </div>
                  <div className="rounded bg-slate-800/50 p-2 text-center">
                    <span className="text-[10px] text-blue-400">B</span>
                    <p className="text-sm font-bold text-slate-200 tabular-nums">{inv.gridCurrentPhase3.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-scada-border">
                <div>
                  <span className="text-[10px] text-slate-500">Reactive Power</span>
                  <p className="text-sm font-bold text-blue-400">{inv.reactivePower.toFixed(2)} <span className="text-xs text-slate-500">MVAR</span></p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">Frequency</span>
                  <p className="text-sm font-bold text-slate-200">{inv.frequency.toFixed(2)} <span className="text-xs text-slate-500">Hz</span></p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Temperature */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-red-400" />
              Temperature Readings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tempData.map((t) => {
                const isHigh = t.value > 55;
                const isWarn = t.value > 45 && !isHigh;
                return (
                  <div key={t.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-400">{t.name}</span>
                      <span className={cn(
                        "text-sm font-bold tabular-nums",
                        isHigh ? "text-red-400" : isWarn ? "text-amber-400" : "text-slate-200"
                      )}>
                        {t.value.toFixed(1)} °C
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full">
                      <div
                        className={cn(
                          "h-1.5 rounded-full transition-all",
                          isHigh ? "bg-red-500" : isWarn ? "bg-amber-500" : "bg-green-500"
                        )}
                        style={{ width: `${Math.min(t.value / 80 * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* String Current Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Grid3X3 className="h-4 w-4 text-cyan-400" />
            String Current Comparison — {inv.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stringChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} label={{ value: "A", angle: -90, position: "insideLeft", fill: "#94a3b8", fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                labelStyle={{ color: "#94a3b8" }}
                formatter={(value) => [`${Number(value).toFixed(2)} A`, "Current"]}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="current" name="String Current" radius={[3, 3, 0, 0]}>
                {stringChartData.map((entry, index) => {
                  const deviation = Math.abs(entry.current - entry.avg);
                  const color = deviation > 2 ? SCADA_COLORS.fault : deviation > 1 ? SCADA_COLORS.warning : "#3b82f6";
                  return <Cell key={index} fill={color} />;
                })}
              </Bar>
              <Bar dataKey="avg" name="Average" fill={SCADA_COLORS.running} fillOpacity={0.3} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
