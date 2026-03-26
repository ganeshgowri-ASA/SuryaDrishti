"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { invertersData, stringCurrentChartData } from "@/lib/mock-data/inverters";
import { InverterData, InverterStatus } from "@/types";
import { STATUS_COLORS } from "@/lib/constants";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Zap, Thermometer, Activity, ChevronDown } from "lucide-react";

function InverterTile({ inv, selected, onClick }: { inv: InverterData; selected: boolean; onClick: () => void }) {
  const borderColor = STATUS_COLORS[inv.status] || "#6b7280";
  return (
    <button
      onClick={onClick}
      className={`rounded-lg p-2 text-left transition-all border-2 ${
        selected ? "ring-2 ring-amber-400 border-amber-400" : "border-slate-700 hover:border-slate-500"
      } bg-slate-800`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-slate-200">{inv.name}</span>
        <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: borderColor }} />
      </div>
      <div className="text-lg font-bold" style={{ color: borderColor }}>
        {inv.activePower > 0 ? `${inv.activePower.toFixed(0)}` : "---"}
        <span className="text-[10px] text-slate-400 ml-0.5">kW</span>
      </div>
      <div className="text-[10px] text-slate-400">{inv.dailyEnergy.toFixed(0)} kWh</div>
    </button>
  );
}

function DetailSection({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">{icon} {title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function ValueRow({ label, value, unit, color }: { label: string; value: string | number; unit?: string; color?: string }) {
  return (
    <div className="flex items-center justify-between py-1 border-b border-slate-700/50 last:border-0">
      <span className="text-xs text-slate-400">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className={`text-sm font-mono font-semibold ${color || "text-slate-200"}`}>{value}</span>
        {unit && <span className="text-[10px] text-slate-500">{unit}</span>}
      </div>
    </div>
  );
}

export default function InvertersPage() {
  const [selectedId, setSelectedId] = useState(1);
  const inv = invertersData.find((i) => i.id === selectedId) || invertersData[0];
  const chartData = stringCurrentChartData(inv);
  const avgCurrent = inv.stringCurrents.length > 0 ? inv.stringCurrents.reduce((a, b) => a + b, 0) / inv.stringCurrents.length : 0;

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-200">Inverter Dashboard</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-1.5 border border-slate-700">
            <span className="text-xs text-slate-400">Selected:</span>
            <span className="text-sm font-bold text-amber-400">{inv.name}</span>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </div>
          <Badge variant={inv.status as InverterStatus}>{inv.status.replace("_", " ").toUpperCase()}</Badge>
        </div>
      </div>

      {/* Inverter Grid */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Inverter Selection — 28 Units</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-14 gap-2">
            {invertersData.map((i) => (
              <InverterTile key={i.id} inv={i} selected={i.id === selectedId} onClick={() => setSelectedId(i.id)} />
            ))}
          </div>
          <div className="flex gap-4 mt-3 pt-2 border-t border-slate-700">
            {(["running", "warning", "fault", "stopped"] as const).map((s) => (
              <div key={s} className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: STATUS_COLORS[s] }} />
                <span className="text-[10px] text-slate-400 capitalize">{s.replace("_", " ")}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detail Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* DC Input */}
        <DetailSection title="DC Input (PV Array)" icon={<Zap className="h-4 w-4 text-amber-400" />}>
          <div className="space-y-1">
            <ValueRow label="DC Voltage" value={inv.dcVoltage.toFixed(1)} unit="V" color="text-amber-400" />
            <ValueRow label="DC Current" value={inv.dcCurrent.toFixed(1)} unit="A" color="text-amber-400" />
            <ValueRow label="DC Power" value={inv.dcPower.toFixed(1)} unit="kW" color="text-green-400" />
          </div>
          <div className="mt-3 bg-slate-700/50 rounded-lg p-3 text-center">
            <p className="text-[10px] text-slate-400 uppercase">Active Power</p>
            <p className="text-2xl font-bold text-green-400">{inv.activePower.toFixed(1)}</p>
            <p className="text-xs text-slate-400">kW</p>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="bg-slate-700/30 rounded-lg p-2 text-center">
              <p className="text-[10px] text-slate-400">Daily Energy</p>
              <p className="text-sm font-bold text-slate-200">{inv.dailyEnergy.toFixed(0)}</p>
              <p className="text-[10px] text-slate-500">kWh</p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-2 text-center">
              <p className="text-[10px] text-slate-400">Efficiency</p>
              <p className="text-sm font-bold text-cyan-400">{inv.efficiency.toFixed(1)}%</p>
            </div>
          </div>
        </DetailSection>

        {/* AC Output */}
        <DetailSection title="AC Output (Grid)" icon={<Activity className="h-4 w-4 text-blue-400" />}>
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 uppercase mb-1">Phase Currents (A)</p>
            <ValueRow label="Phase R" value={inv.gridCurrentPhase1.toFixed(1)} unit="A" color="text-red-400" />
            <ValueRow label="Phase Y" value={inv.gridCurrentPhase2.toFixed(1)} unit="A" color="text-yellow-400" />
            <ValueRow label="Phase B" value={inv.gridCurrentPhase3.toFixed(1)} unit="A" color="text-blue-400" />
          </div>
          <div className="mt-2 space-y-1">
            <p className="text-[10px] text-slate-500 uppercase mb-1">Line Voltages (V)</p>
            <ValueRow label="U-V" value={inv.gridVoltageUV.toFixed(1)} unit="V" />
            <ValueRow label="V-W" value={inv.gridVoltageVW.toFixed(1)} unit="V" />
            <ValueRow label="W-U" value={inv.gridVoltageWU.toFixed(1)} unit="V" />
          </div>
          <div className="mt-2 pt-2 border-t border-slate-700">
            <ValueRow label="Frequency" value={inv.frequency.toFixed(2)} unit="Hz" color="text-purple-400" />
          </div>
        </DetailSection>

        {/* Temperature */}
        <DetailSection title="Temperature Readings" icon={<Thermometer className="h-4 w-4 text-red-400" />}>
          <div className="space-y-2">
            {Object.entries(inv.temperatures).map(([key, val]) => {
              const isHigh = val > 60;
              const isWarn = val > 50 && val <= 60;
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-400">{key}</span>
                    <span className={`text-sm font-mono font-semibold ${isHigh ? "text-red-400" : isWarn ? "text-amber-400" : "text-slate-200"}`}>
                      {val.toFixed(1)} °C
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${isHigh ? "bg-red-500" : isWarn ? "bg-amber-500" : "bg-green-500"}`}
                      style={{ width: `${Math.min((val / 80) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4">
            <p className="text-[10px] text-slate-500 uppercase mb-2">Status</p>
            <StatusIndicator status={inv.status} label={inv.status.replace("_", " ")} size="lg" />
          </div>
        </DetailSection>
      </div>

      {/* String Current Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>String Current Comparison — {inv.name} ({inv.stringCurrents.length} strings)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="string" tick={{ fontSize: 10, fill: "#94a3b8" }} />
                <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} domain={[0, 12]} label={{ value: "A", angle: -90, position: "insideLeft", style: { fill: "#94a3b8", fontSize: 10 } }} />
                <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", fontSize: 12 }} />
                <ReferenceLine y={avgCurrent} stroke="#eab308" strokeDasharray="5 5" label={{ value: `Avg: ${avgCurrent.toFixed(2)}A`, position: "right", style: { fill: "#eab308", fontSize: 10 } }} />
                <Bar
                  dataKey="current"
                  name="String Current (A)"
                  radius={[2, 2, 0, 0]}
                  fill="#3b82f6"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* String Current Table */}
      <Card>
        <CardHeader>
          <CardTitle>String Current Detail — {inv.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-700">
                  {inv.stringCurrents.map((_, i) => (
                    <th key={i} className="py-2 px-2 text-slate-400 font-medium text-center">
                      S{(i + 1).toString().padStart(2, "0")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {inv.stringCurrents.map((val, i) => {
                    const deviation = Math.abs(val - avgCurrent);
                    const isLow = deviation > 1.5 && val < avgCurrent;
                    return (
                      <td key={i} className={`py-2 px-2 text-center font-mono ${isLow ? "text-red-400 font-bold" : "text-slate-200"}`}>
                        {val.toFixed(2)}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
