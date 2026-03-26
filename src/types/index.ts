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
  operatingTime: number;
  curtailmentActive: boolean;
  curtailmentLimit: number;
  rampRateUp: number;
  rampRateDown: number;
  frequencyResponseEnabled: boolean;
  frequencyDeadband: number;
  pqmCommStatus: boolean;
  commandHistory: PPCCommand[];
  trendData: PPCTrendPoint[];
}

export interface PPCCommand {
  id: number;
  timestamp: string;
  command: string;
  value: string;
  status: "executed" | "pending" | "failed";
  user: string;
}

export interface PPCTrendPoint {
  time: string;
  activePower: number;
  reactivePower: number;
  setpoint: number;
  gridFrequency: number;
}

export interface EnergyTrendPoint {
  hour: string;
  power: number;
  irradiance: number;
}

export interface MonthlyEnergyPoint {
  day: string;
  energy: number;
}
