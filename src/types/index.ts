export interface PlantOverview {
  powerGeneration: number;
  reactivePower: number;
  irradiance: number;
  gridVoltage: number;
  gridFrequency: number;
  invertersComm: number;
  invertersRunning: number;
  invertersStopped: number;
  inverterAvailability: number;
  dailyEnergy: number;
  monthlyEnergy: number;
  yearlyEnergy: number;
  lifetimeEnergy: number;
}

export type InverterStatus = "running" | "stopped" | "fault" | "warning" | "comm_fault" | "waiting";

export interface InverterData {
  id: number;
  name: string;
  dcCurrent: number;
  dcVoltage: number;
  dcPower: number;
  gridCurrentPhase1: number;
  gridCurrentPhase2: number;
  gridCurrentPhase3: number;
  gridVoltageUV: number;
  gridVoltageVW: number;
  gridVoltageWU: number;
  stringCurrents: number[];
  temperatures: Record<string, number>;
  status: InverterStatus;
  dailyEnergy: number;
  activePower: number;
  efficiency: number;
  frequency: number;
}

export interface PPCData {
  activePowerSetpoint: number;
  activePowerMeasured: number;
  reactivePowerSetpoint: number;
  reactivePowerMeasured: number;
  controlMode: "local" | "remote";
  voltageSetpoint: number;
  powerFactorSetpoint: number;
  droopPercentage: number;
  gridVoltageR: number;
  gridVoltageY: number;
  gridVoltageB: number;
  gridCurrentR: number;
  gridCurrentY: number;
  gridCurrentB: number;
  gridFrequency: number;
  gridPowerFactor: number;
  plantProduction: number;
  plantOperatingTime: number;
  curtailmentActive: boolean;
  curtailmentLimit: number;
  frequencyResponseEnabled: boolean;
  rampRateUp: number;
  rampRateDown: number;
  pqmCommStatus: boolean;
  commandHistory: CommandLogEntry[];
}

export interface CommandLogEntry {
  timestamp: string;
  command: string;
  value: string;
  user: string;
  status: "executed" | "pending" | "failed";
}

export interface PPCTrendPoint {
  time: string;
  activePower: number;
  reactivePower: number;
  setpoint: number;
}

export interface TrackerMotor {
  id: number;
  elevationSetpoint: number;
  elevationPosition: number;
  batteryLevel: number;
  maxMotorCurrent: number;
  operationMode: string;
  alarm: string;
  position: string;
}

export interface WeatherStation {
  id: number;
  solarRadiation: number;
  ambientTemp: number;
  humidity: number;
  pressure: number;
  windDirection: number;
  windSpeed: number;
  rainfall: number;
  moduleTemps: number[];
  soilingRatio: number;
}

export interface Alarm {
  description: string;
  timeOn: string;
  timeOff?: string;
  condition: "ON" | "OFF";
  timeAck?: string;
  source: string;
}

export interface EnergyTrendPoint {
  hour: string;
  power: number;
  irradiance: number;
}

export interface DailyEnergyPoint {
  day: string;
  energy: number;
}

export interface MonthlyEnergyPoint {
  month: string;
  energy: number;
}

export interface PerformanceMetrics {
  pr: number;
  cuf: number;
  maxACPower: number;
  plantAvailability: number;
  gridAvailability: number;
  specificYield: number;
}

export interface WeatherSnapshot {
  ambientTemp: number;
  moduleTemp: number;
  ghi: number;
  windSpeed: number;
  humidity: number;
}
