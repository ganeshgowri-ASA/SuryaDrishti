"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ppcData, ppcTrendData } from "@/lib/mock-data/ppc-control";
import { SCADA_COLORS } from "@/lib/constants";
import {
  Zap,
  Activity,
  Radio,
  ToggleLeft,
  ToggleRight,
  Gauge,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  XCircle,
  Wifi,
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
} from "recharts";

function ParamRow({ label, value, unit, color }: { label: string; value: string | number; unit?: string; color?: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={`text-sm font-medium tabular-nums ${color || ''}`}>
        {value}{unit && <span className="text-xs text-muted-foreground ml-1">{unit}</span>}
      </span>
    </div>
  );
}

function ControlToggle({ label, active }: { label: string; active: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-md bg-muted/50">
      <span className="text-sm">{label}</span>
      {active ? (
        <div className="flex items-center gap-1.5">
          <ToggleRight className="h-5 w-5 text-green-400" />
          <span className="text-xs text-green-400">ON</span>
        </div>
      ) : (
        <div className="flex items-center gap-1.5">
          <ToggleLeft className="h-5 w-5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">OFF</span>
        </div>
      )}
    </div>
  );
}

export default function PPCControlPage() {
  const ppc = ppcData;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">PPC Control</h1>
        <div className="flex items-center gap-3">
          <Badge variant={ppc.controlMode === 'remote' ? 'success' : 'warning'}>
            {ppc.controlMode === 'remote' ? 'REMOTE' : 'LOCAL'}
          </Badge>
          <div className="flex items-center gap-1.5">
            <Wifi className={`h-4 w-4 ${ppc.pqmCommStatus ? 'text-green-400' : 'text-red-400'}`} />
            <span className="text-xs text-muted-foreground">PQM</span>
          </div>
        </div>
      </div>

      {/* Active & Reactive Power Control */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Active Power */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-green-400" />
              Active Power
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <ParamRow label="Setpoint" value={ppc.activePowerSetpoint} unit="MW" color="text-green-400" />
              <ParamRow label="Measured" value={ppc.activePowerMeasured} unit="MW" />
              <ParamRow label="Limit" value={ppc.activePowerLimit} unit="MW" />
              <ParamRow label="Deviation" value={((ppc.activePowerMeasured - ppc.activePowerSetpoint)).toFixed(1)} unit="MW" color={Math.abs(ppc.activePowerMeasured - ppc.activePowerSetpoint) > 2 ? 'text-amber-400' : 'text-green-400'} />
            </div>
          </CardContent>
        </Card>

        {/* Reactive Power */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-400" />
              Reactive Power
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <ParamRow label="Q Setpoint" value={ppc.reactivePowerSetpoint} unit="MVAR" color="text-blue-400" />
              <ParamRow label="Q Measured" value={ppc.reactivePowerMeasured} unit="MVAR" />
              <ParamRow label="V Setpoint" value={ppc.voltageSetpoint} unit="kV" />
              <ParamRow label="V Measured" value={ppc.voltageMeasured} unit="kV" />
              <ParamRow label="PF Setpoint" value={ppc.powerFactorSetpoint} />
              <ParamRow label="PF Measured" value={ppc.powerFactorMeasured} />
            </div>
          </CardContent>
        </Card>

        {/* Curtailment & Ramp Rate */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-amber-400" />
              Curtailment & Ramp
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex items-center justify-between py-1.5 border-b border-border/50">
                <span className="text-xs text-muted-foreground">Curtailment</span>
                <Badge variant={ppc.curtailmentActive ? 'danger' : 'success'}>
                  {ppc.curtailmentActive ? 'ACTIVE' : 'INACTIVE'}
                </Badge>
              </div>
              <ParamRow label="Curtailment Level" value={ppc.curtailmentLevel} unit="%" />
              <div className="flex items-center justify-between py-1.5 border-b border-border/50">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3 text-green-400" /> Ramp Up
                </span>
                <span className="text-sm font-medium tabular-nums">{ppc.rampRateUp} <span className="text-xs text-muted-foreground">MW/min</span></span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-border/50">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <ArrowDownRight className="h-3 w-3 text-red-400" /> Ramp Down
                </span>
                <span className="text-sm font-medium tabular-nums">{ppc.rampRateDown} <span className="text-xs text-muted-foreground">MW/min</span></span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Frequency Response */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Radio className="h-4 w-4 text-purple-400" />
              Frequency Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <ControlToggle label="Freq Response" active={ppc.frequencyResponse} />
              <ParamRow label="Deadband" value={`±${ppc.frequencyDeadband}`} unit="Hz" />
              <ParamRow label="Droop Setting" value={ppc.droopSetting} unit="%" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid Measurement + Plant Measurement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Card>
          <CardHeader>
            <CardTitle>Grid Measurement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-x-6">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Voltage (kV)</p>
                <ParamRow label="R-Phase" value={ppc.gridVoltageR} unit="kV" />
                <ParamRow label="Y-Phase" value={ppc.gridVoltageY} unit="kV" />
                <ParamRow label="B-Phase" value={ppc.gridVoltageB} unit="kV" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Current (A)</p>
                <ParamRow label="R-Phase" value={ppc.gridCurrentR} unit="A" />
                <ParamRow label="Y-Phase" value={ppc.gridCurrentY} unit="A" />
                <ParamRow label="B-Phase" value={ppc.gridCurrentB} unit="A" />
              </div>
            </div>
            <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-x-6">
              <ParamRow label="Frequency" value={ppc.gridFrequency} unit="Hz" />
              <ParamRow label="Power Factor" value={ppc.gridPowerFactor} />
            </div>
          </CardContent>
        </Card>

        {/* Plant Measurement + Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Plant Measurement & Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-md bg-muted/50 p-3 text-center">
                  <p className="text-lg font-bold text-green-400">{ppc.plantProduction}</p>
                  <p className="text-xs text-muted-foreground">Daily Production (MWh)</p>
                </div>
                <div className="rounded-md bg-muted/50 p-3 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <p className="text-lg font-bold text-blue-400">{ppc.operatingTime}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Operating Hours Today</p>
                </div>
              </div>
              <div className="space-y-2">
                <ControlToggle label="PQM Communication" active={ppc.pqmCommStatus} />
                <ControlToggle label="Curtailment" active={ppc.curtailmentActive} />
                <ControlToggle label="Frequency Response" active={ppc.frequencyResponse} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* PPC Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>PPC Power Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={ppcTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} label={{ value: 'MW', angle: -90, position: 'insideLeft', style: { fill: 'hsl(var(--muted-foreground))', fontSize: 11 } }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="setpoint" stroke={SCADA_COLORS.running} strokeWidth={2} dot={false} name="Setpoint (MW)" />
              <Line type="monotone" dataKey="measured" stroke="#3b82f6" strokeWidth={2} dot={false} name="Measured (MW)" />
              <Line type="monotone" dataKey="limit" stroke={SCADA_COLORS.fault} strokeWidth={1} strokeDasharray="5 5" dot={false} name="Limit (MW)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Command History */}
      <Card>
        <CardHeader>
          <CardTitle>Command History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Command</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ppc.commandHistory.map((entry, i) => (
                <TableRow key={i}>
                  <TableCell className="text-xs tabular-nums text-muted-foreground">{entry.timestamp}</TableCell>
                  <TableCell className="text-xs">{entry.command}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">{entry.source}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      {entry.status === 'executed' ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
                      ) : entry.status === 'rejected' ? (
                        <XCircle className="h-3.5 w-3.5 text-red-400" />
                      ) : (
                        <Clock className="h-3.5 w-3.5 text-amber-400" />
                      )}
                      <span className="text-xs capitalize">{entry.status}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
