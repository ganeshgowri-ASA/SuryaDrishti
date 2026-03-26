"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { StatusIndicator } from "@/components/dashboard/status-indicator";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { invertersData } from "@/lib/mock-data/inverters";
import { SCADA_COLORS } from "@/lib/constants";
import { InverterData, InverterStatus } from "@/types";
import {
  Zap,
  Activity,
  Thermometer,
  Gauge,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function InverterTile({ inv, selected, onClick }: { inv: InverterData; selected: boolean; onClick: () => void }) {
  const statusColor: Record<InverterStatus, string> = {
    running: 'border-green-500/50 bg-green-500/5',
    stopped: 'border-gray-500/50 bg-gray-500/5',
    fault: 'border-red-500/50 bg-red-500/5',
    warning: 'border-orange-500/50 bg-orange-500/5',
    comm_fault: 'border-gray-500/50 bg-gray-500/5',
    waiting: 'border-yellow-500/50 bg-yellow-500/5',
  };

  return (
    <button
      onClick={onClick}
      className={`rounded-lg border p-3 text-left transition-all hover:ring-1 hover:ring-primary/50 ${statusColor[inv.status]} ${selected ? 'ring-2 ring-primary' : ''}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium">{inv.name}</span>
        <StatusIndicator status={inv.status} size="sm" />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-bold tabular-nums">{inv.activePower.toFixed(1)}</span>
        <span className="text-xs text-muted-foreground">MW</span>
      </div>
      <div className="text-xs text-muted-foreground tabular-nums">{inv.dailyEnergy} MWh</div>
    </button>
  );
}

export default function InverterDashboardPage() {
  const [selectedId, setSelectedId] = useState(1);
  const selected = invertersData.find(i => i.id === selectedId) || invertersData[0];

  const stringChartData = selected.stringCurrents.map((current, i) => ({
    name: `S${i + 1}`,
    current,
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Inverter Dashboard</h1>
        <Select
          label="Select Inverter:"
          value={selectedId}
          onChange={(e) => setSelectedId(Number(e.target.value))}
          className="w-40"
        >
          {invertersData.map(inv => (
            <option key={inv.id} value={inv.id}>{inv.name}</option>
          ))}
        </Select>
      </div>

      {/* Inverter Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-14 gap-2">
        {invertersData.map(inv => (
          <InverterTile
            key={inv.id}
            inv={inv}
            selected={inv.id === selectedId}
            onClick={() => setSelectedId(inv.id)}
          />
        ))}
      </div>

      {/* Selected Inverter Details */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <KpiCard title="Active Power" value={selected.activePower.toFixed(2)} unit="MW" icon={Zap} color="green" />
        <KpiCard title="DC Power" value={selected.dcPower.toFixed(1)} unit="kW" icon={Activity} color="amber" />
        <KpiCard title="Efficiency" value={selected.efficiency.toFixed(1)} unit="%" icon={Gauge} color={selected.efficiency > 96 ? 'green' : 'amber'} />
        <KpiCard title="Frequency" value={selected.frequency.toFixed(2)} unit="Hz" icon={Activity} color="default" />
        <KpiCard title="Power Factor" value={selected.powerFactor.toFixed(3)} unit="" icon={Gauge} color="blue" />
        <KpiCard title="Daily Energy" value={selected.dailyEnergy} unit="MWh" icon={BarChart3} color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* DC Input */}
        <Card>
          <CardHeader>
            <CardTitle>DC Input (PV Array)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <span className="text-xs text-muted-foreground">DC Voltage</span>
                <span className="text-sm font-medium tabular-nums">{selected.dcVoltage} <span className="text-xs text-muted-foreground">V</span></span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <span className="text-xs text-muted-foreground">DC Current</span>
                <span className="text-sm font-medium tabular-nums">{selected.dcCurrent} <span className="text-xs text-muted-foreground">A</span></span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-xs text-muted-foreground">DC Power</span>
                <span className="text-sm font-medium tabular-nums text-amber-400">{selected.dcPower} <span className="text-xs text-muted-foreground">kW</span></span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AC Output */}
        <Card>
          <CardHeader>
            <CardTitle>AC Output (Grid)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Phase Currents (A)</p>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center rounded bg-muted/50 p-2">
                  <p className="text-xs text-red-400">R</p>
                  <p className="text-sm font-bold tabular-nums">{selected.gridCurrentPhase1}</p>
                </div>
                <div className="text-center rounded bg-muted/50 p-2">
                  <p className="text-xs text-yellow-400">Y</p>
                  <p className="text-sm font-bold tabular-nums">{selected.gridCurrentPhase2}</p>
                </div>
                <div className="text-center rounded bg-muted/50 p-2">
                  <p className="text-xs text-blue-400">B</p>
                  <p className="text-sm font-bold tabular-nums">{selected.gridCurrentPhase3}</p>
                </div>
              </div>
              <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Line Voltages (kV)</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center rounded bg-muted/50 p-2">
                  <p className="text-xs text-muted-foreground">UV</p>
                  <p className="text-sm font-bold tabular-nums">{selected.gridVoltageUV}</p>
                </div>
                <div className="text-center rounded bg-muted/50 p-2">
                  <p className="text-xs text-muted-foreground">VW</p>
                  <p className="text-sm font-bold tabular-nums">{selected.gridVoltageVW}</p>
                </div>
                <div className="text-center rounded bg-muted/50 p-2">
                  <p className="text-xs text-muted-foreground">WU</p>
                  <p className="text-sm font-bold tabular-nums">{selected.gridVoltageWU}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Temperatures */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-red-400" />
              Temperatures
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {Object.entries(selected.temperatures).map(([label, temp]) => (
                <div key={label} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                  <span className="text-xs text-muted-foreground">{label}</span>
                  <span className={`text-sm font-medium tabular-nums ${temp > 60 ? 'text-amber-400' : temp > 70 ? 'text-red-400' : ''}`}>
                    {temp}°C
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* String Current Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>String Current Comparison — {selected.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stringChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} label={{ value: 'A', angle: -90, position: 'insideLeft', style: { fill: 'hsl(var(--muted-foreground))', fontSize: 11 } }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: 12 }} />
              <Bar dataKey="current" fill={SCADA_COLORS.running} radius={[2, 2, 0, 0]} name="Current (A)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* String Current Table */}
      <Card>
        <CardHeader>
          <CardTitle>String Currents — {selected.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {selected.stringCurrents.map((_, i) => (
                  <TableHead key={i} className="text-center">S{i + 1}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                {selected.stringCurrents.map((current, i) => {
                  const avg = selected.stringCurrents.reduce((a, b) => a + b, 0) / selected.stringCurrents.length;
                  const deviation = Math.abs(current - avg) / avg;
                  return (
                    <TableCell key={i} className={`text-center tabular-nums text-xs ${deviation > 0.15 ? 'text-red-400' : deviation > 0.08 ? 'text-amber-400' : ''}`}>
                      {current.toFixed(2)}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Status Legend */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs font-medium text-muted-foreground uppercase">Status Legend:</span>
            {(['running', 'warning', 'fault', 'stopped', 'waiting', 'comm_fault'] as InverterStatus[]).map(status => (
              <StatusIndicator key={status} status={status} showLabel size="md" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
