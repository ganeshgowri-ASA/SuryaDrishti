"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ppcData } from "@/lib/mock-data/ppc-control";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";
import { Settings, Radio, Gauge, Clock, Zap, Activity, ToggleRight, ToggleLeft } from "lucide-react";

const d = ppcData;

function ParamRow({ label, value, unit, highlight }: { label: string; value: string | number; unit?: string; highlight?: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-slate-700/50 last:border-0">
      <span className="text-xs text-slate-400">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className={`text-sm font-mono font-semibold ${highlight || "text-slate-200"}`}>{value}</span>
        {unit && <span className="text-[10px] text-slate-500">{unit}</span>}
      </div>
    </div>
  );
}

function ToggleDisplay({ label, enabled }: { label: string; enabled: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 px-3 bg-slate-700/30 rounded-lg">
      <span className="text-xs text-slate-300">{label}</span>
      <div className="flex items-center gap-2">
        {enabled ? (
          <ToggleRight className="h-5 w-5 text-green-400" />
        ) : (
          <ToggleLeft className="h-5 w-5 text-slate-500" />
        )}
        <span className={`text-xs font-semibold ${enabled ? "text-green-400" : "text-slate-500"}`}>
          {enabled ? "ON" : "OFF"}
        </span>
      </div>
    </div>
  );
}

export default function PPCControlPage() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-200">PPC Control — Power Plant Controller</h2>
        <div className="flex items-center gap-3">
          <Badge variant={d.pqmCommStatus ? "running" : "fault"}>
            PQM {d.pqmCommStatus ? "ONLINE" : "OFFLINE"}
          </Badge>
          <Badge variant={d.controlMode === "remote" ? "running" : "warning"}>
            {d.controlMode.toUpperCase()} MODE
          </Badge>
        </div>
      </div>

      {/* Active & Reactive Power Control */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Zap className="h-4 w-4 text-green-400" /> Active Power Control</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <ParamRow label="Setpoint" value={d.activePowerSetpoint.toFixed(1)} unit="MW" highlight="text-amber-400" />
              <ParamRow label="Measured" value={d.activePowerMeasured.toFixed(1)} unit="MW" highlight="text-green-400" />
              <ParamRow label="Deviation" value={((d.activePowerMeasured - d.activePowerSetpoint)).toFixed(1)} unit="MW" highlight={Math.abs(d.activePowerMeasured - d.activePowerSetpoint) > 5 ? "text-red-400" : "text-slate-200"} />
              <ParamRow label="Plant Capacity" value="50.0" unit="MW" />
              <ParamRow label="Loading" value={`${((d.activePowerMeasured / 50) * 100).toFixed(1)}`} unit="%" highlight="text-cyan-400" />
            </div>
            <div className="mt-3 bg-slate-700/50 rounded-lg p-3">
              <p className="text-[10px] text-slate-400 uppercase mb-2">Power Bar</p>
              <div className="h-3 bg-slate-600 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all relative" style={{ width: `${(d.activePowerMeasured / 50) * 100}%` }}>
                  <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-amber-400" style={{ left: `${(d.activePowerSetpoint / d.activePowerMeasured) * 100}%` }} />
                </div>
              </div>
              <div className="flex justify-between mt-1 text-[10px] text-slate-500">
                <span>0</span>
                <span>25 MW</span>
                <span>50 MW</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Activity className="h-4 w-4 text-blue-400" /> Reactive Power Control</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <ParamRow label="Q Setpoint" value={d.reactivePowerSetpoint.toFixed(1)} unit="MVAR" highlight="text-amber-400" />
              <ParamRow label="Q Measured" value={d.reactivePowerMeasured.toFixed(1)} unit="MVAR" highlight="text-blue-400" />
              <ParamRow label="Voltage Setpoint" value={d.voltageSetpoint.toFixed(1)} unit="kV" />
              <ParamRow label="Power Factor SP" value={d.powerFactorSetpoint.toFixed(3)} />
              <ParamRow label="Droop" value={d.droopPercentage.toFixed(1)} unit="%" />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                <p className="text-[10px] text-slate-400">Q RANGE</p>
                <p className="text-sm font-mono text-slate-200">-15 to +15</p>
                <p className="text-[10px] text-slate-500">MVAR</p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                <p className="text-[10px] text-slate-400">MEASURED PF</p>
                <p className="text-sm font-mono text-green-400">{d.gridPowerFactor}</p>
                <p className="text-[10px] text-slate-500">lead</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid + Plant Measurement */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Gauge className="h-4 w-4 text-cyan-400" /> Grid Measurement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="text-[10px] text-slate-500 uppercase mb-1">Voltages (kV)</p>
              <ParamRow label="V R-N" value={d.gridVoltageR.toFixed(2)} unit="kV" />
              <ParamRow label="V Y-N" value={d.gridVoltageY.toFixed(2)} unit="kV" />
              <ParamRow label="V B-N" value={d.gridVoltageB.toFixed(2)} unit="kV" />
              <p className="text-[10px] text-slate-500 uppercase mb-1 mt-2">Currents (A)</p>
              <ParamRow label="I R" value={d.gridCurrentR.toFixed(1)} unit="A" />
              <ParamRow label="I Y" value={d.gridCurrentY.toFixed(1)} unit="A" />
              <ParamRow label="I B" value={d.gridCurrentB.toFixed(1)} unit="A" />
              <div className="mt-2 pt-2 border-t border-slate-700">
                <ParamRow label="Frequency" value={d.gridFrequency.toFixed(2)} unit="Hz" highlight="text-purple-400" />
                <ParamRow label="Power Factor" value={d.gridPowerFactor.toFixed(3)} highlight="text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Settings className="h-4 w-4" /> Control Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <ToggleDisplay label="Curtailment" enabled={d.curtailmentActive} />
              {d.curtailmentActive && (
                <ParamRow label="Curtailment Limit" value={d.curtailmentLimit.toFixed(1)} unit="MW" highlight="text-red-400" />
              )}
              <ToggleDisplay label="Frequency Response" enabled={d.frequencyResponseEnabled} />
              <ParamRow label="Freq Deadband" value={`±${d.frequencyDeadband}`} unit="Hz" />
              <div className="mt-2 pt-2 border-t border-slate-700">
                <p className="text-[10px] text-slate-500 uppercase mb-2">Ramp Rates</p>
                <ParamRow label="Ramp Up" value={d.rampRateUp.toFixed(1)} unit="MW/min" highlight="text-green-400" />
                <ParamRow label="Ramp Down" value={d.rampRateDown.toFixed(1)} unit="MW/min" highlight="text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Radio className="h-4 w-4" /> Plant Measurement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <p className="text-[10px] text-slate-400 uppercase">Current Production</p>
                <p className="text-3xl font-bold text-green-400">{d.plantProduction}</p>
                <p className="text-xs text-slate-400">MW</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <p className="text-[10px] text-slate-400 uppercase">Operating Time Today</p>
                <p className="text-2xl font-bold text-slate-200">{d.operatingTime}</p>
                <p className="text-xs text-slate-400">Hours</p>
              </div>
              <div className="flex items-center justify-between bg-slate-700/30 rounded-lg p-3">
                <span className="text-xs text-slate-400">PQM Comm</span>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${d.pqmCommStatus ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                  <span className={`text-xs ${d.pqmCommStatus ? "text-green-400" : "text-red-400"}`}>
                    {d.pqmCommStatus ? "Connected" : "Disconnected"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* PPC Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>PPC Trend — Active Power vs Setpoint</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={d.trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#94a3b8" }} />
                <YAxis yAxisId="left" tick={{ fontSize: 10, fill: "#94a3b8" }} domain={[0, 55]} label={{ value: "MW", angle: -90, position: "insideLeft", style: { fill: "#94a3b8", fontSize: 10 } }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: "#94a3b8" }} domain={[49.9, 50.1]} label={{ value: "Hz", angle: 90, position: "insideRight", style: { fill: "#94a3b8", fontSize: 10 } }} />
                <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <ReferenceLine yAxisId="left" y={d.activePowerSetpoint} stroke="#eab308" strokeDasharray="5 5" label={{ value: "SP", position: "right", style: { fill: "#eab308", fontSize: 10 } }} />
                <Line yAxisId="left" type="monotone" dataKey="activePower" stroke="#22c55e" strokeWidth={2} dot={false} name="Active Power (MW)" />
                <Line yAxisId="left" type="monotone" dataKey="reactivePower" stroke="#3b82f6" strokeWidth={1.5} dot={false} name="Reactive Power (MVAR)" />
                <Line yAxisId="right" type="monotone" dataKey="gridFrequency" stroke="#a855f7" strokeWidth={1} dot={false} name="Frequency (Hz)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Command History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Clock className="h-4 w-4" /> Command History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 px-3 text-slate-400 font-medium">Timestamp</th>
                  <th className="text-left py-2 px-3 text-slate-400 font-medium">Command</th>
                  <th className="text-left py-2 px-3 text-slate-400 font-medium">Value</th>
                  <th className="text-left py-2 px-3 text-slate-400 font-medium">Status</th>
                  <th className="text-left py-2 px-3 text-slate-400 font-medium">User</th>
                </tr>
              </thead>
              <tbody>
                {d.commandHistory.map((cmd) => (
                  <tr key={cmd.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="py-2 px-3 font-mono text-slate-300">{cmd.timestamp}</td>
                    <td className="py-2 px-3 text-slate-200">{cmd.command}</td>
                    <td className="py-2 px-3 text-slate-200">{cmd.value}</td>
                    <td className="py-2 px-3">
                      <Badge variant={cmd.status === "executed" ? "running" : cmd.status === "failed" ? "fault" : "warning"}>
                        {cmd.status}
                      </Badge>
                    </td>
                    <td className="py-2 px-3 text-slate-400">{cmd.user}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
