import type { PPCData } from "@/types";

export const ppcData: PPCData = {
  activePowerSetpoint: 85.0,
  activePowerMeasured: 82.4,
  reactivePowerSetpoint: 0.0,
  reactivePowerMeasured: -3.2,
  controlMode: "remote",
  voltageSetpoint: 33.0,
  voltageMeasured: 33.2,
  powerFactorSetpoint: 0.99,
  powerFactorMeasured: 0.98,
  frequencyMeasured: 50.01,
  rampRateUp: 10,
  rampRateDown: 10,
  curtailmentEnabled: false,
  curtailmentLimit: 100,
  gridVoltageR: 19.14,
  gridVoltageY: 19.08,
  gridVoltageB: 19.21,
  gridCurrentR: 1456,
  gridCurrentY: 1448,
  gridCurrentB: 1462,
  plantProduction: 412.5,
  operatingTime: 8.5,
  pqmCommStatus: true,
  droopEnabled: true,
  droopPercentage: 4.0,
  frequencyResponseEnabled: true,
  commandHistory: [
    { timestamp: "2026-03-26 10:30:00", command: "Set Active Power Setpoint: 85 MW", source: "SLDC Remote", status: "executed" },
    { timestamp: "2026-03-26 10:15:00", command: "Enable Frequency Response", source: "SLDC Remote", status: "executed" },
    { timestamp: "2026-03-26 09:45:00", command: "Set Ramp Rate: 10 MW/min", source: "Local Operator", status: "executed" },
    { timestamp: "2026-03-26 09:30:00", command: "Set PF Setpoint: 0.99", source: "SLDC Remote", status: "executed" },
    { timestamp: "2026-03-26 09:00:00", command: "Switch to Remote Control", source: "Local Operator", status: "executed" },
    { timestamp: "2026-03-26 08:30:00", command: "Plant Start Command", source: "Local Operator", status: "executed" },
    { timestamp: "2026-03-26 08:00:00", command: "Set Curtailment: OFF", source: "SLDC Remote", status: "executed" },
    { timestamp: "2026-03-26 07:45:00", command: "Set Voltage Setpoint: 33.0 kV", source: "SLDC Remote", status: "executed" },
  ],
  trendData: Array.from({ length: 24 }, (_, i) => {
    const hour = 6 + Math.floor(i / 2);
    const min = (i % 2) * 30;
    const timeStr = `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
    const solar = Math.max(0, Math.sin(((i - 0) / 24) * Math.PI) * 90);
    return {
      time: timeStr,
      activePower: Math.round(solar * 10) / 10,
      reactivePower: Math.round((Math.random() * 6 - 3) * 10) / 10,
      setpoint: 85,
      voltage: Math.round((33.0 + Math.random() * 0.4 - 0.2) * 10) / 10,
    };
  }),
};
