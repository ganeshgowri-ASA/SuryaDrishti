import { PPCData, PPCTrendPoint } from "@/types";

export const ppcData: PPCData = {
  activePowerSetpoint: 40.0,
  activePowerMeasured: 38.72,
  reactivePowerSetpoint: 0.0,
  reactivePowerMeasured: -2.14,
  controlMode: "remote",
  voltageSetpoint: 33.0,
  powerFactorSetpoint: 0.99,
  droopPercentage: 4.0,
  gridVoltageR: 33.18,
  gridVoltageY: 33.22,
  gridVoltageB: 33.15,
  gridCurrentR: 687.2,
  gridCurrentY: 691.5,
  gridCurrentB: 684.8,
  gridFrequency: 50.02,
  gridPowerFactor: 0.998,
  plantProduction: 38.72,
  plantOperatingTime: 2847,
  curtailmentActive: false,
  curtailmentLimit: 40.0,
  frequencyResponseEnabled: true,
  rampRateUp: 10,
  rampRateDown: 20,
  pqmCommStatus: true,
  commandHistory: [
    { timestamp: "2026-03-26 14:32:15", command: "SET_ACTIVE_POWER_SP", value: "40.0 MW", user: "OPERATOR_1", status: "executed" },
    { timestamp: "2026-03-26 14:28:03", command: "SET_RAMP_RATE_UP", value: "10 MW/min", user: "OPERATOR_1", status: "executed" },
    { timestamp: "2026-03-26 13:45:22", command: "ENABLE_FREQ_RESPONSE", value: "ON", user: "SUPERVISOR", status: "executed" },
    { timestamp: "2026-03-26 12:15:00", command: "SET_PF_SETPOINT", value: "0.99", user: "OPERATOR_2", status: "executed" },
    { timestamp: "2026-03-26 11:30:45", command: "SET_CURTAILMENT", value: "OFF", user: "SUPERVISOR", status: "executed" },
    { timestamp: "2026-03-26 10:22:18", command: "SET_REACTIVE_POWER_SP", value: "0.0 MVAR", user: "OPERATOR_1", status: "executed" },
    { timestamp: "2026-03-26 09:05:33", command: "SET_CONTROL_MODE", value: "REMOTE", user: "SUPERVISOR", status: "executed" },
    { timestamp: "2026-03-26 08:00:01", command: "PLANT_START", value: "AUTO", user: "SYSTEM", status: "executed" },
  ],
};

export const ppcTrendData: PPCTrendPoint[] = Array.from({ length: 48 }, (_, i) => {
  const hour = 6 + i * 0.25;
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  const time = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  const peak = 12;
  const dist = Math.abs(hour - peak);
  const factor = Math.max(0, 1 - dist / 7);
  const base = 42 * factor * factor;
  return {
    time,
    activePower: Math.round((base * (0.9 + Math.random() * 0.1)) * 100) / 100,
    reactivePower: Math.round((-3 + Math.random() * 2) * 100) / 100,
    setpoint: 40.0,
  };
});
