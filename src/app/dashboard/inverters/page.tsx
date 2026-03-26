"use client";

import { useState } from "react";
import {
  Zap,
  ThermometerSun,
  Activity,
  Power,
} from "lucide-react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusIndicator } from "@/components/dashboard/status-indicator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { invertersData, inverterStringComparisonData } from "@/lib/mock-data/inverters";
import { cn } from "@/lib/utils";

const statusBadgeVariant: Record<string, "success" | "warning" | "danger" | "muted"> = {
  running: "success",
  stopped: "muted",
  fault: "danger",
  warning: "warning",
  comm_fault: "muted",
  waiting: "warning",
};

export default function InvertersPage() {
  const [selectedId, setSelectedId] = useState<number>(1);
  const selectedInverter = invertersData.find((i) => i.id === selectedId) || invertersData[0];
  const stringData = inverterStringComparisonData(selectedId);

  return (
    <div className="space-y-4 p-4">
      {/* Page Title + Selector */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-lg font-bold text-slate-100">Inverter Dashboard</h1>
        <div className="flex items-center gap-3">
          <Select value={String(selectedId)} onValueChange={(v) => setSelectedId(Number(v))}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Inverter" />
            </SelectTrigger>
            <SelectContent>
              {invertersData.map((inv) => (
                <SelectItem key={inv.id} value={String(inv.id)}>
                  {inv.name} — {inv.status.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Badge variant={statusBadgeVariant[selectedInverter.status]}>
            {selectedInverter.status.toUpperCase().replace("_", " ")}
          </Badge>
        </div>
      </div>

      {/* Inverter Grid Overview - Mini tiles for all 28 */}
      <Card>
        <CardHeader>
          <CardTitle>All Inverters — Quick View</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-7 lg:grid-cols-14">
            {invertersData.map((inv) => (
              <button
                key={inv.id}
                onClick={() => setSelectedId(inv.id)}
                className={cn(
                  "rounded-md border p-2 text-center transition-colors",
                  inv.id === selectedId
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-slate-700 bg-slate-800/50 hover:bg-slate-700/50",
                )}
              >
                <div className="text-[10px] text-slate-400">INV-{inv.id.toString().padStart(2, "0")}</div>
                <div className={cn(
                  "text-sm font-bold",
                  inv.status === "running" ? "text-green-400" :
                  inv.status === "warning" ? "text-orange-400" :
                  inv.status === "fault" ? "text-red-400" :
                  "text-gray-500"
                )}>
                  {inv.activePower > 0 ? `${(inv.activePower / 1000).toFixed(1)}` : "0"}
                </div>
                <div className="text-[9px] text-slate-500">MW</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Inverter Detail */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* DC Input (PV Array Data) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-400" />
              DC Input — PV Array
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="rounded-md bg-slate-900/50 p-3">
                <div className="text-xs text-slate-500">DC Voltage</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-yellow-400">
                    {selectedInverter.dcVoltage.toFixed(1)}
                  </span>
                  <span className="text-sm text-slate-400">V</span>
                </div>
              </div>
              <div className="rounded-md bg-slate-900/50 p-3">
                <div className="text-xs text-slate-500">DC Current</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-yellow-400">
                    {selectedInverter.dcCurrent.toFixed(1)}
                  </span>
                  <span className="text-sm text-slate-400">A</span>
                </div>
              </div>
              <div className="rounded-md bg-slate-900/50 p-3">
                <div className="text-xs text-slate-500">DC Power</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-yellow-400">
                    {selectedInverter.dcPower.toFixed(1)}
                  </span>
                  <span className="text-sm text-slate-400">kW</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AC Output */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-400" />
              AC Output — Grid Side
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-md bg-slate-900/50 p-2 text-center">
                  <div className="text-[10px] text-slate-500">I (R)</div>
                  <div className="text-sm font-bold text-green-400">
                    {selectedInverter.gridCurrentPhase1.toFixed(1)} A
                  </div>
                </div>
                <div className="rounded-md bg-slate-900/50 p-2 text-center">
                  <div className="text-[10px] text-slate-500">I (Y)</div>
                  <div className="text-sm font-bold text-green-400">
                    {selectedInverter.gridCurrentPhase2.toFixed(1)} A
                  </div>
                </div>
                <div className="rounded-md bg-slate-900/50 p-2 text-center">
                  <div className="text-[10px] text-slate-500">I (B)</div>
                  <div className="text-sm font-bold text-green-400">
                    {selectedInverter.gridCurrentPhase3.toFixed(1)} A
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-md bg-slate-900/50 p-2 text-center">
                  <div className="text-[10px] text-slate-500">V (UV)</div>
                  <div className="text-sm font-bold text-slate-200">
                    {selectedInverter.gridVoltageUV.toFixed(1)} V
                  </div>
                </div>
                <div className="rounded-md bg-slate-900/50 p-2 text-center">
                  <div className="text-[10px] text-slate-500">V (VW)</div>
                  <div className="text-sm font-bold text-slate-200">
                    {selectedInverter.gridVoltageVW.toFixed(1)} V
                  </div>
                </div>
                <div className="rounded-md bg-slate-900/50 p-2 text-center">
                  <div className="text-[10px] text-slate-500">V (WU)</div>
                  <div className="text-sm font-bold text-slate-200">
                    {selectedInverter.gridVoltageWU.toFixed(1)} V
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-md bg-slate-900/50 p-2 text-center">
                  <div className="text-[10px] text-slate-500">Power</div>
                  <div className="text-sm font-bold text-green-400">
                    {selectedInverter.activePower.toFixed(1)} kW
                  </div>
                </div>
                <div className="rounded-md bg-slate-900/50 p-2 text-center">
                  <div className="text-[10px] text-slate-500">Frequency</div>
                  <div className="text-sm font-bold text-slate-200">
                    {selectedInverter.frequency.toFixed(2)} Hz
                  </div>
                </div>
                <div className="rounded-md bg-slate-900/50 p-2 text-center">
                  <div className="text-[10px] text-slate-500">Efficiency</div>
                  <div className="text-sm font-bold text-blue-400">
                    {selectedInverter.efficiency.toFixed(1)}%
                  </div>
                </div>
              </div>
              <div className="rounded-md bg-slate-900/50 p-2 text-center">
                <div className="text-[10px] text-slate-500">Daily Energy</div>
                <div className="text-lg font-bold text-green-400">
                  {selectedInverter.dailyEnergy.toFixed(2)} MWh
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Temperature Readings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ThermometerSun className="h-4 w-4 text-orange-400" />
              Temperature Readings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(selectedInverter.temperatures).map(([key, value]) => {
                const tempColor =
                  value > 65 ? "text-red-400" : value > 55 ? "text-orange-400" : "text-green-400";
                const barWidth = Math.min((value / 80) * 100, 100);
                const barColor =
                  value > 65 ? "bg-red-500" : value > 55 ? "bg-orange-500" : "bg-green-500";
                return (
                  <div key={key} className="rounded-md bg-slate-900/50 p-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-400">{key}</span>
                      <span className={cn("text-sm font-bold", tempColor)}>{value.toFixed(1)}°C</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-700">
                      <div
                        className={cn("h-1.5 rounded-full transition-all", barColor)}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-slate-700 pt-2">
              <StatusIndicator status={selectedInverter.status} label={selectedInverter.status.toUpperCase().replace("_", " ")} />
              <div className="flex items-center gap-1">
                <Power className="h-3 w-3 text-slate-500" />
                <span className="text-xs text-slate-400">INV-{selectedInverter.id.toString().padStart(2, "0")}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* String Current Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>
            String Current Comparison — {selectedInverter.name} ({selectedInverter.stringCurrents.length} Strings)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={stringData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="string" stroke="#64748b" fontSize={10} />
              <YAxis stroke="#64748b" fontSize={11} domain={[0, 14]} label={{ value: "A", angle: -90, position: "insideLeft", fill: "#64748b", fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#f1f5f9" }} />
              <ReferenceLine y={9.5} stroke="#3b82f6" strokeDasharray="5 5" label={{ value: "Avg", fill: "#3b82f6", fontSize: 10 }} />
              <Bar dataKey="current" name="Current (A)" radius={[3, 3, 0, 0]}>
                {stringData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.current < 7 ? "#ef4444" : entry.current < 8 ? "#f97316" : "#22c55e"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* String Current Table */}
      <Card>
        <CardHeader>
          <CardTitle>String Current Table — {selectedInverter.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  {selectedInverter.stringCurrents.map((_, idx) => (
                    <th key={idx} className="px-2 pb-2 text-center text-xs font-medium text-slate-400">
                      S{(idx + 1).toString().padStart(2, "0")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {selectedInverter.stringCurrents.map((current, idx) => {
                    const color =
                      current < 7 ? "text-red-400" : current < 8 ? "text-orange-400" : "text-green-400";
                    return (
                      <td key={idx} className={cn("px-2 py-2 text-center font-mono text-xs", color)}>
                        {current.toFixed(2)}
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
