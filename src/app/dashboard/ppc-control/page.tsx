"use client";

import {
  Zap, Activity, Gauge, Radio, ToggleLeft, ToggleRight,
  Clock, ArrowUpDown, AlertCircle, CheckCircle2, XCircle,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ppcData } from "@/data/ppc-data";
import { SCADA_COLORS } from "@/lib/constants";

function ControlRow({ label, value, unit, setpoint, setpointUnit }: {
  label: string;
  value: number;
  unit: string;
  setpoint?: number;
  setpointUnit?: string;
}) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-scada-border last:border-0">
      <span className="text-xs text-slate-400">{label}</span>
      <div className="flex items-center gap-3">
        {setpoint !== undefined && (
          <span className="text-xs text-blue-400">
            SP: {setpoint} {setpointUnit || unit}
          </span>
        )}
        <span className="text-sm font-bold text-slate-200 tabular-nums">
          {value} <span className="text-xs text-slate-500">{unit}</span>
        </span>
      </div>
    </div>
  );
}

function ToggleRow({ label, enabled }: { label: string; enabled: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-scada-border last:border-0">
      <span className="text-xs text-slate-400">{label}</span>
      <div className="flex items-center gap-1.5">
        {enabled ? (
          <>
            <ToggleRight className="h-4 w-4 text-green-400" />
            <span className="text-xs text-green-400 font-medium">ON</span>
          </>
        ) : (
          <>
            <ToggleLeft className="h-4 w-4 text-slate-500" />
            <span className="text-xs text-slate-500 font-medium">OFF</span>
          </>
        )}
      </div>
    </div>
  );
}

export default function PPCControlPage() {
  const d = ppcData;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-slate-100">PPC Control</h1>
        <div className="flex items-center gap-3">
          <Badge variant={d.controlMode === "remote" ? "info" : "warning"}>
            {d.controlMode.toUpperCase()} MODE
          </Badge>
          <Badge variant={d.pqmCommStatus ? "running" : "fault"}>
            PQM: {d.pqmCommStatus ? "ONLINE" : "OFFLINE"}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Active Power Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-green-400" />
              Active Power Control
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <ControlRow label="Setpoint" value={d.activePowerSetpoint} unit="MW" />
              <ControlRow label="Measured" value={d.activePowerMeasured} unit="MW" />
              <div className="mt-3 pt-2 border-t border-scada-border">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-500">Output</span>
                  <span className="text-xs text-slate-500">
                    {((d.activePowerMeasured / d.activePowerSetpoint) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full">
                  <div
                    className="h-2 bg-green-500 rounded-full transition-all"
                    style={{ width: `${(d.activePowerMeasured / d.activePowerSetpoint) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reactive Power Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-400" />
              Reactive Power Control
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <ControlRow label="VAR Setpoint" value={d.reactivePowerSetpoint} unit="MVAR" />
              <ControlRow label="VAR Measured" value={d.reactivePowerMeasured} unit="MVAR" />
              <ControlRow label="Voltage" value={d.voltageMeasured} unit="kV" setpoint={d.voltageSetpoint} />
              <ControlRow label="Power Factor" value={d.powerFactorMeasured} unit="" setpoint={d.powerFactorSetpoint} />
              <ToggleRow label="Droop Control" enabled={d.droopEnabled} />
              {d.droopEnabled && (
                <ControlRow label="Droop" value={d.droopPercentage} unit="%" />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Grid Measurement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-amber-400" />
              Grid Measurement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="text-xs text-slate-500 uppercase mb-1">Voltages (kV)</div>
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="text-center">
                  <span className="text-xs text-red-400">R</span>
                  <p className="text-sm font-bold text-slate-200 tabular-nums">{d.gridVoltageR}</p>
                </div>
                <div className="text-center">
                  <span className="text-xs text-yellow-400">Y</span>
                  <p className="text-sm font-bold text-slate-200 tabular-nums">{d.gridVoltageY}</p>
                </div>
                <div className="text-center">
                  <span className="text-xs text-blue-400">B</span>
                  <p className="text-sm font-bold text-slate-200 tabular-nums">{d.gridVoltageB}</p>
                </div>
              </div>
              <div className="text-xs text-slate-500 uppercase mb-1">Currents (A)</div>
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="text-center">
                  <span className="text-xs text-red-400">R</span>
                  <p className="text-sm font-bold text-slate-200 tabular-nums">{d.gridCurrentR}</p>
                </div>
                <div className="text-center">
                  <span className="text-xs text-yellow-400">Y</span>
                  <p className="text-sm font-bold text-slate-200 tabular-nums">{d.gridCurrentY}</p>
                </div>
                <div className="text-center">
                  <span className="text-xs text-blue-400">B</span>
                  <p className="text-sm font-bold text-slate-200 tabular-nums">{d.gridCurrentB}</p>
                </div>
              </div>
              <ControlRow label="Frequency" value={d.frequencyMeasured} unit="Hz" />
            </div>
          </CardContent>
        </Card>

        {/* Curtailment & Ramp */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-orange-400" />
              Curtailment & Ramp Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <ToggleRow label="Curtailment" enabled={d.curtailmentEnabled} />
              <ControlRow label="Curtailment Limit" value={d.curtailmentLimit} unit="%" />
              <div className="pt-2 border-t border-scada-border mt-2">
                <ControlRow label="Ramp Up Rate" value={d.rampRateUp} unit="MW/min" />
                <ControlRow label="Ramp Down Rate" value={d.rampRateDown} unit="MW/min" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Frequency Response & Plant */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Radio className="h-4 w-4 text-cyan-400" />
              Frequency Response & Plant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <ToggleRow label="Freq. Response" enabled={d.frequencyResponseEnabled} />
              <div className="pt-2 border-t border-scada-border mt-2">
                <ControlRow label="Plant Production" value={d.plantProduction} unit="MWh" />
                <ControlRow label="Operating Time" value={d.operatingTime} unit="hrs" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Command History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-400" />
              Command History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {d.commandHistory.map((cmd, i) => (
                <div key={i} className="flex items-start gap-2 py-1 border-b border-scada-border last:border-0">
                  {cmd.status === "executed" ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-400 mt-0.5 shrink-0" />
                  ) : cmd.status === "failed" ? (
                    <XCircle className="h-3.5 w-3.5 text-red-400 mt-0.5 shrink-0" />
                  ) : (
                    <AlertCircle className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="text-xs text-slate-300 truncate">{cmd.command}</p>
                    <p className="text-[10px] text-slate-500">{cmd.timestamp} | {cmd.source}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* PPC Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>PPC Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={d.trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis yAxisId="power" tick={{ fill: "#94a3b8", fontSize: 11 }} label={{ value: "MW", angle: -90, position: "insideLeft", fill: "#94a3b8", fontSize: 11 }} />
              <YAxis yAxisId="voltage" orientation="right" tick={{ fill: "#94a3b8", fontSize: 11 }} label={{ value: "kV", angle: 90, position: "insideRight", fill: "#94a3b8", fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                labelStyle={{ color: "#94a3b8" }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line yAxisId="power" type="monotone" dataKey="activePower" name="Active Power (MW)" stroke={SCADA_COLORS.running} dot={false} strokeWidth={2} />
              <Line yAxisId="power" type="monotone" dataKey="reactivePower" name="Reactive Power (MVAR)" stroke="#3b82f6" dot={false} strokeWidth={1.5} />
              <Line yAxisId="power" type="stepAfter" dataKey="setpoint" name="Setpoint (MW)" stroke={SCADA_COLORS.warning} dot={false} strokeWidth={1} strokeDasharray="5 5" />
              <Line yAxisId="voltage" type="monotone" dataKey="voltage" name="Voltage (kV)" stroke="#a855f7" dot={false} strokeWidth={1.5} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
