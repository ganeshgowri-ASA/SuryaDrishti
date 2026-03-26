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
