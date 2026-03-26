"use client";

import {
  Activity,
  Zap,
  Radio,
  Gauge,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";
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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ppcData, ppcTrendData } from "@/lib/mock-data/ppc-control";

export default function PPCControlPage() {
  const ppc = ppcData;

  return (
    <div className="space-y-4 p-4">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-slate-100">PPC Control — Power Plant Controller</h1>
        <div className="flex items-center gap-3">
          <Badge variant={ppc.controlMode === "remote" ? "success" : "warning"}>
            {ppc.controlMode.toUpperCase()} MODE
          </Badge>
          <Badge variant={ppc.pqmCommStatus ? "success" : "danger"}>
            PQM {ppc.pqmCommStatus ? "ONLINE" : "OFFLINE"}
          </Badge>
        </div>
      </div>

      {/* Active & Reactive Power Control */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Active Power Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-green-400" />
              Active Power Control
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-md bg-slate-900/50 p-3">
                  <div className="text-xs text-slate-500">Setpoint</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-blue-400">{ppc.activePowerSetpoint}</span>
                    <span className="text-sm text-slate-400">MW</span>
                  </div>
                </div>
                <div className="rounded-md bg-slate-900/50 p-3">
                  <div className="text-xs text-slate-500">Measured</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-green-400">{ppc.activePowerMeasured}</span>
                    <span className="text-sm text-slate-400">MW</span>
                  </div>
                </div>
              </div>
              {/* Progress bar showing measured vs setpoint */}
              <div>
                <div className="mb-1 flex justify-between text-xs text-slate-500">
                  <span>0 MW</span>
                  <span>{ppc.activePowerSetpoint} MW (SP)</span>
                  <span>50 MW</span>
                </div>
                <div className="h-3 w-full rounded-full bg-slate-700">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-green-600 to-green-400 transition-all"
                    style={{ width: `${(ppc.activePowerMeasured / 50) * 100}%` }}
                  />
                </div>
              </div>
              {/* Curtailment */}
              <div className="flex items-center justify-between rounded-md border border-slate-700 p-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`h-4 w-4 ${ppc.curtailmentActive ? "text-amber-400" : "text-slate-600"}`} />
                  <span className="text-sm text-slate-300">Curtailment</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-400">Limit: {ppc.curtailmentLimit} MW</span>
                  <Badge variant={ppc.curtailmentActive ? "warning" : "muted"}>
                    {ppc.curtailmentActive ? "ACTIVE" : "OFF"}
                  </Badge>
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
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-md bg-slate-900/50 p-3">
                  <div className="text-xs text-slate-500">Q Setpoint</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-blue-400">{ppc.reactivePowerSetpoint}</span>
                    <span className="text-sm text-slate-400">MVAR</span>
                  </div>
                </div>
                <div className="rounded-md bg-slate-900/50 p-3">
                  <div className="text-xs text-slate-500">Q Measured</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-cyan-400">{ppc.reactivePowerMeasured}</span>
                    <span className="text-sm text-slate-400">MVAR</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-md bg-slate-900/50 p-3 text-center">
                  <div className="text-xs text-slate-500">Voltage SP</div>
                  <div className="text-lg font-bold text-slate-200">{ppc.voltageSetpoint} kV</div>
                </div>
                <div className="rounded-md bg-slate-900/50 p-3 text-center">
                  <div className="text-xs text-slate-500">PF Setpoint</div>
                  <div className="text-lg font-bold text-slate-200">{ppc.powerFactorSetpoint}</div>
                </div>
                <div className="rounded-md bg-slate-900/50 p-3 text-center">
                  <div className="text-xs text-slate-500">Droop</div>
                  <div className="text-lg font-bold text-slate-200">{ppc.droopPercentage}%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid Measurement + Frequency/Ramp Rate */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Grid Measurements */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              Grid Measurement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="pb-2 text-left text-xs font-medium text-slate-400">Parameter</th>
                    <th className="pb-2 text-right text-xs font-medium text-slate-400">R / L1</th>
                    <th className="pb-2 text-right text-xs font-medium text-slate-400">Y / L2</th>
                    <th className="pb-2 text-right text-xs font-medium text-slate-400">B / L3</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  <tr>
                    <td className="py-2 text-slate-300">Voltage (kV)</td>
                    <td className="py-2 text-right font-mono text-slate-200">{ppc.gridVoltageR.toFixed(2)}</td>
                    <td className="py-2 text-right font-mono text-slate-200">{ppc.gridVoltageY.toFixed(2)}</td>
                    <td className="py-2 text-right font-mono text-slate-200">{ppc.gridVoltageB.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-slate-300">Current (A)</td>
                    <td className="py-2 text-right font-mono text-slate-200">{ppc.gridCurrentR.toFixed(1)}</td>
                    <td className="py-2 text-right font-mono text-slate-200">{ppc.gridCurrentY.toFixed(1)}</td>
                    <td className="py-2 text-right font-mono text-slate-200">{ppc.gridCurrentB.toFixed(1)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-md bg-slate-900/50 p-2 text-center">
                <div className="text-xs text-slate-500">Frequency</div>
                <div className="text-lg font-bold text-slate-200">{ppc.gridFrequency} Hz</div>
              </div>
              <div className="rounded-md bg-slate-900/50 p-2 text-center">
                <div className="text-xs text-slate-500">Power Factor</div>
                <div className="text-lg font-bold text-slate-200">{ppc.gridPowerFactor}</div>
              </div>
              <div className="rounded-md bg-slate-900/50 p-2 text-center">
                <div className="text-xs text-slate-500">Production</div>
                <div className="text-lg font-bold text-green-400">{ppc.plantProduction} MW</div>
              </div>
              <div className="rounded-md bg-slate-900/50 p-2 text-center">
                <div className="text-xs text-slate-500">Operating Time</div>
                <div className="text-lg font-bold text-slate-200">{ppc.plantOperatingTime} h</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Frequency Response & Ramp Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Frequency & Ramp Control</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-md border border-slate-700 p-3">
                <div className="flex items-center gap-2">
                  <Radio className={`h-4 w-4 ${ppc.frequencyResponseEnabled ? "text-green-400" : "text-slate-600"}`} />
                  <span className="text-sm text-slate-300">Freq Response</span>
                </div>
                <Badge variant={ppc.frequencyResponseEnabled ? "success" : "muted"}>
                  {ppc.frequencyResponseEnabled ? "ENABLED" : "DISABLED"}
                </Badge>
              </div>
              <div className="rounded-md bg-slate-900/50 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowUpRight className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-slate-300">Ramp Up Rate</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-green-400">{ppc.rampRateUp}</span>
                  <span className="text-sm text-slate-400">MW/min</span>
                </div>
              </div>
              <div className="rounded-md bg-slate-900/50 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowDownRight className="h-4 w-4 text-orange-400" />
                  <span className="text-sm text-slate-300">Ramp Down Rate</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-orange-400">{ppc.rampRateDown}</span>
                  <span className="text-sm text-slate-400">MW/min</span>
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
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={ppcTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} domain={[0, 50]} />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#f1f5f9" }} />
              <Legend />
              <ReferenceLine y={ppc.activePowerSetpoint} stroke="#3b82f6" strokeDasharray="5 5" label={{ value: "Setpoint", fill: "#3b82f6", fontSize: 11 }} />
              <Line type="monotone" dataKey="activePower" stroke="#22c55e" strokeWidth={2} dot={false} name="Active Power (MW)" />
              <Line type="monotone" dataKey="reactivePower" stroke="#06b6d4" strokeWidth={1.5} dot={false} name="Reactive Power (MVAR)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Command History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Command History Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="pb-2 text-left text-xs font-medium text-slate-400">Timestamp</th>
                  <th className="pb-2 text-left text-xs font-medium text-slate-400">Command</th>
                  <th className="pb-2 text-left text-xs font-medium text-slate-400">Value</th>
                  <th className="pb-2 text-left text-xs font-medium text-slate-400">User</th>
                  <th className="pb-2 text-left text-xs font-medium text-slate-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {ppc.commandHistory.map((entry, i) => (
                  <tr key={i}>
                    <td className="py-2 font-mono text-xs text-slate-400">{entry.timestamp}</td>
                    <td className="py-2 font-mono text-xs text-slate-200">{entry.command}</td>
                    <td className="py-2 text-xs text-slate-300">{entry.value}</td>
                    <td className="py-2 text-xs text-slate-400">{entry.user}</td>
                    <td className="py-2">
                      {entry.status === "executed" ? (
                        <span className="flex items-center gap-1 text-xs text-green-400">
                          <CheckCircle2 className="h-3 w-3" /> Executed
                        </span>
                      ) : entry.status === "failed" ? (
                        <span className="flex items-center gap-1 text-xs text-red-400">
                          <XCircle className="h-3 w-3" /> Failed
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-yellow-400">
                          <Clock className="h-3 w-3" /> Pending
                        </span>
                      )}
                    </td>
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
