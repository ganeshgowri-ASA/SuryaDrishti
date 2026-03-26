import {
  PlantOverview,
  PerformanceMetrics,
  WeatherSnapshot,
  EnergyTrendPoint,
  DailyEnergyPoint,
  MonthlyEnergyPoint,
} from "@/types";

export const plantOverviewData: PlantOverview = {
  powerGeneration: 38.72,
  reactivePower: -2.14,
  irradiance: 847,
  gridVoltage: 33.2,
  gridFrequency: 50.02,
  invertersComm: 28,
  invertersRunning: 26,
  invertersStopped: 1,
  inverterAvailability: 96.4,
  dailyEnergy: 187.5,
  monthlyEnergy: 4825.3,
  yearlyEnergy: 52140.8,
  lifetimeEnergy: 312.4,
};

export const performanceMetrics: PerformanceMetrics = {
  pr: 82.4,
  cuf: 23.6,
  maxACPower: 42.1,
  plantAvailability: 98.2,
  gridAvailability: 99.1,
  specificYield: 4.52,
};

export const weatherSnapshot: WeatherSnapshot = {
  ambientTemp: 34.2,
  moduleTemp: 48.7,
  ghi: 847,
  windSpeed: 3.2,
  humidity: 42,
};

export const dailyPowerTrend: EnergyTrendPoint[] = Array.from({ length: 24 }, (_, i) => {
  const hour = i;
  let power = 0;
  let irradiance = 0;
  if (hour >= 6 && hour <= 18) {
    const peak = 12;
    const dist = Math.abs(hour - peak);
    const factor = Math.max(0, 1 - dist / 7);
    power = 42 * factor * factor * (0.85 + Math.random() * 0.15);
    irradiance = 1050 * factor * factor * (0.9 + Math.random() * 0.1);
  }
  return {
    hour: `${hour.toString().padStart(2, "0")}:00`,
    power: Math.round(power * 100) / 100,
    irradiance: Math.round(irradiance),
  };
});

export const dailyEnergyData: DailyEnergyPoint[] = [
  { day: "Mon", energy: 192.3 },
  { day: "Tue", energy: 185.7 },
  { day: "Wed", energy: 198.1 },
  { day: "Thu", energy: 176.4 },
  { day: "Fri", energy: 201.2 },
  { day: "Sat", energy: 187.5 },
  { day: "Sun", energy: 190.8 },
];

export const monthlyEnergyData: MonthlyEnergyPoint[] = [
  { month: "Jan", energy: 4120 },
  { month: "Feb", energy: 4350 },
  { month: "Mar", energy: 4825 },
  { month: "Apr", energy: 5210 },
  { month: "May", energy: 5680 },
  { month: "Jun", energy: 5420 },
  { month: "Jul", energy: 4890 },
  { month: "Aug", energy: 4650 },
  { month: "Sep", energy: 4980 },
  { month: "Oct", energy: 4530 },
  { month: "Nov", energy: 4210 },
  { month: "Dec", energy: 3950 },
];

export const inverterStatusSummary = {
  total: 28,
  running: 26,
  stopped: 1,
  fault: 0,
  warning: 1,
  commFault: 0,
};
