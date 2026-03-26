import { PPCData } from "@/types";

export const ppcData: PPCData = {
  activePowerSetpoint: 45.0,
  activePowerMeasured: 42.8,
  reactivePowerSetpoint: -2.0,
  reactivePowerMeasured: -2.4,
  controlMode: "remote",
  voltageSetpoint: 33.0,
  powerFactorSetpoint: 0.995,
  droopPercentage: 4.0,
  gridVoltageR: 33.18,
  gridVoltageY: 33.22,
  gridVoltageB: 33.15,
  gridCurrentR: 748.2,
  gridCurrentY: 752.6,
  gridCurrentB: 745.8,
  gridFrequency: 50.02,
  gridPowerFactor: 0.993,
  plantProduction: 42.8,
  operatingTime: 7.5,
  curtailmentActive: false,
  curtailmentLimit: 50.0,
  rampRateUp: 10.0,
  rampRateDown: 15.0,
  frequencyResponseEnabled: true,
  frequencyDeadband: 0.03,
  pqmCommStatus: true,
  commandHistory: [
    { id: 1, timestamp: "2026-03-26 14:32:15", command: "SET_ACTIVE_POWER_SP", value: "45.0 MW", status: "executed", user: "Operator-1" },
    { id: 2, timestamp: "2026-03-26 14:28:42", command: "SET_REACTIVE_POWER_SP", value: "-2.0 MVAR", status: "executed", user: "Operator-1" },
    { id: 3, timestamp: "2026-03-26 13:15:08", command: "ENABLE_FREQ_RESPONSE", value: "ON", status: "executed", user: "Admin" },
    { id: 4, timestamp: "2026-03-26 12:45:30", command: "SET_RAMP_RATE_UP", value: "10.0 MW/min", status: "executed", user: "Operator-2" },
    { id: 5, timestamp: "2026-03-26 12:30:00", command: "SET_PF_SETPOINT", value: "0.995", status: "executed", user: "Operator-1" },
    { id: 6, timestamp: "2026-03-26 11:20:18", command: "CURTAILMENT_OFF", value: "Disabled", status: "executed", user: "Admin" },
    { id: 7, timestamp: "2026-03-26 10:55:44", command: "SET_DROOP", value: "4.0%", status: "executed", user: "Operator-2" },
    { id: 8, timestamp: "2026-03-26 10:10:22", command: "SET_VOLTAGE_SP", value: "33.0 kV", status: "executed", user: "Operator-1" },
  ],
  trendData: Array.from({ length: 24 }, (_, i) => {
    const hour = 6 + i * 0.5;
    const h = Math.floor(hour);
    const m = (hour % 1) * 60;
    const t = (hour - 6) / 12;
    const peak = Math.sin(t * Math.PI);
    return {
      time: `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`,
      activePower: Math.round(peak * 44 * 10) / 10,
      reactivePower: Math.round((peak * -2.5 + (Math.random() - 0.5)) * 10) / 10,
      setpoint: 45.0,
      gridFrequency: Math.round((50 + (Math.random() - 0.5) * 0.06) * 100) / 100,
    };
  }),
};
