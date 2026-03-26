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

export type InverterStatus = 'running' | 'stopped' | 'fault' | 'warning' | 'comm_fault' | 'waiting';

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
}

export interface PPCData {
  activePowerSetpoint: number;
  activePowerMeasured: number;
  activePowerLimit: number;
  reactivePowerSetpoint: number;
  reactivePowerMeasured: number;
  voltageSetpoint: number;
  voltageMeasured: number;
  powerFactorSetpoint: number;
  powerFactorMeasured: number;
  controlMode: 'local' | 'remote';
  curtailmentActive: boolean;
  curtailmentLevel: number;
  rampRateUp: number;
  rampRateDown: number;
  frequencyResponse: boolean;
  frequencyDeadband: number;
  droopSetting: number;
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
  pqmCommStatus: boolean;
  commandHistory: CommandLogEntry[];
}

export interface CommandLogEntry {
  timestamp: string;
  command: string;
  source: string;
  status: 'executed' | 'rejected' | 'pending';
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
  name: string;
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
  id: string;
  description: string;
  timeOn: string;
  timeOff?: string;
  condition: 'ON' | 'OFF';
  timeAck?: string;
  source: string;
  severity: 'critical' | 'warning' | 'info';
}

export interface PerformanceMetrics {
  pr: number;
  cuf: number;
  maxAcPower: number;
  specificYield: number;
  gridAvailability: number;
  plantAvailability: number;
}

export interface EnergyTrendPoint {
  time: string;
  power: number;
  irradiance: number;
}

export interface DailyEnergyPoint {
  date: string;
  energy: number;
}

export interface PPCTrendPoint {
  time: string;
  setpoint: number;
  measured: number;
  limit: number;
}
