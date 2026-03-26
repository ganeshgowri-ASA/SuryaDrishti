import { PlantOverview, EnergyTrendPoint, MonthlyEnergyPoint } from "@/types";

export const plantOverviewData: PlantOverview = {
  powerGeneration: 42.8,
  reactivePower: -2.4,
  irradiance: 872,
  gridVoltage: 33.2,
  gridFrequency: 50.02,
  invertersComm: 28,
  invertersRunning: 25,
  invertersStopped: 3,
  inverterAvailability: 98.2,
  dailyEnergy: 186.4,
  monthlyEnergy: 4520.8,
  yearlyEnergy: 52340.2,
  lifetimeEnergy: 312.8,
};

export const performanceData = {
  pr: 82.4,
  cuf: 24.6,
  maxACPower: 49.8,
  plantCapacity: 50,
  gridExportToday: 182.1,
  gridExportMonth: 4380.5,
  gridAvailability: 99.7,
  plantAvailability: 98.2,
};

export const dailyEnergyTrend: EnergyTrendPoint[] = Array.from({ length: 13 }, (_, i) => {
  const hour = 6 + i;
  const t = (hour - 6) / 12;
  const peak = Math.sin(t * Math.PI);
  return {
    hour: `${hour.toString().padStart(2, "0")}:00`,
    power: Math.round(peak * 48 * 10) / 10,
    irradiance: Math.round(peak * 950),
  };
});

export const monthlyEnergyTrend: MonthlyEnergyPoint[] = Array.from({ length: 26 }, (_, i) => ({
  day: `Mar ${(i + 1).toString().padStart(2, "0")}`,
  energy: Math.round((140 + Math.random() * 60) * 10) / 10,
}));

export const inverterStatusSummary = [
  { status: "Running", count: 25, color: "#22c55e" },
  { status: "Stopped", count: 1, color: "#6b7280" },
  { status: "Fault", count: 1, color: "#ef4444" },
  { status: "Warning", count: 1, color: "#f97316" },
];

export const weatherSnapshot = {
  ambientTemp: 34.2,
  moduleTemp: 48.6,
  windSpeed: 3.8,
  windDirection: 215,
  humidity: 42,
  ghi: 872,
  tiltIrradiance: 910,
  soilingRatio: 96.4,
};
