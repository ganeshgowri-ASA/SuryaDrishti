import type { PlantOverview, EnergyDataPoint } from "@/types";

export const plantOverviewData: PlantOverview = {
  powerGeneration: 82.4,
  reactivePower: -3.2,
  irradiance: 856,
  gridVoltage: 33.2,
  gridFrequency: 50.01,
  invertersComm: 28,
  invertersRunning: 26,
  invertersStopped: 2,
  inverterAvailability: 92.86,
  dailyEnergy: 412.5,
  monthlyEnergy: 9845.2,
  yearlyEnergy: 142560.8,
  lifetimeEnergy: 1.284,
  performanceRatio: 78.5,
  cuf: 22.3,
  maxACPower: 95.2,
  plantCapacity: 100,
  gridExportPower: 80.1,
  gridExportEnergy: 398.7,
};

export const dailyEnergyData: EnergyDataPoint[] = [
  { label: "06:00", value: 2.1 },
  { label: "07:00", value: 18.5 },
  { label: "08:00", value: 42.3 },
  { label: "09:00", value: 68.7 },
  { label: "10:00", value: 82.1 },
  { label: "11:00", value: 91.4 },
  { label: "12:00", value: 95.2 },
  { label: "13:00", value: 89.6 },
  { label: "14:00", value: 82.4 },
  { label: "15:00", value: 71.3 },
  { label: "16:00", value: 48.9 },
  { label: "17:00", value: 22.1 },
  { label: "18:00", value: 4.8 },
];

export const monthlyEnergyData: EnergyDataPoint[] = [
  { label: "Jan", value: 11200 },
  { label: "Feb", value: 10800 },
  { label: "Mar", value: 12400 },
  { label: "Apr", value: 13800 },
  { label: "May", value: 14200 },
  { label: "Jun", value: 13500 },
  { label: "Jul", value: 11800 },
  { label: "Aug", value: 12100 },
  { label: "Sep", value: 13200 },
  { label: "Oct", value: 12600 },
  { label: "Nov", value: 11400 },
  { label: "Dec", value: 10500 },
];

export const inverterSummary = {
  total: 28,
  running: 26,
  stopped: 1,
  fault: 1,
  warning: 0,
  commFault: 0,
};

export const weatherSnapshot = {
  ghi: 856,
  ambientTemp: 34.2,
  moduleTemp: 48.7,
  windSpeed: 3.4,
  humidity: 42,
};
