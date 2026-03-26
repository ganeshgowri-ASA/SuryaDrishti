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
  performanceRatio: number;
  cuf: number;
  maxACPower: number;
  plantCapacity: number;
  gridExportPower: number;
  gridExportEnergy: number;
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
  reactivePower: number;
  frequency: number;
  efficiency: number;
  powerFactor: number;
  mpptVoltages: number[];
  mpptCurrents: number[];
}

export interface PPCData {
  activePowerSetpoint: number;
  activePowerMeasured: number;
  reactivePowerSetpoint: number;
  reactivePowerMeasured: number;
  controlMode: "local" | "remote";
  voltageSetpoint: number;
  voltageMeasured: number;
  powerFactorSetpoint: number;
  powerFactorMeasured: number;
  frequencyMeasured: number;
  rampRateUp: number;
  rampRateDown: number;
  curtailmentEnabled: boolean;
  curtailmentLimit: number;
  gridVoltageR: number;
  gridVoltageY: number;
  gridVoltageB: number;
  gridCurrentR: number;
  gridCurrentY: number;
  gridCurrentB: number;
  plantProduction: number;
  operatingTime: number;
  pqmCommStatus: boolean;
  droopEnabled: boolean;
  droopPercentage: number;
  frequencyResponseEnabled: boolean;
  commandHistory: PPCCommand[];
  trendData: PPCTrendPoint[];
}

export interface PPCCommand {
  timestamp: string;
  command: string;
  source: string;
  status: "executed" | "pending" | "failed";
}

export interface PPCTrendPoint {
  time: string;
  activePower: number;
  reactivePower: number;
  setpoint: number;
  voltage: number;
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

export interface Alarm {
  description: string;
  timeOn: string;
  timeOff?: string;
  condition: "ON" | "OFF";
  timeAck?: string;
  source: string;
}

export interface EnergyDataPoint {
  label: string;
  value: number;
}
