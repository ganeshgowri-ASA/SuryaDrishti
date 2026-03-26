import { PlantOverview, PerformanceMetrics, EnergyTrendPoint, DailyEnergyPoint, WeatherStation } from '@/types';

export const plantOverviewData: PlantOverview = {
  powerGeneration: 78.4,
  reactivePower: -2.3,
  irradiance: 842,
  gridVoltage: 33.2,
  gridFrequency: 50.01,
  invertersComm: 28,
  invertersRunning: 26,
  invertersStopped: 1,
  inverterAvailability: 96.4,
  dailyEnergy: 412.6,
  monthlyEnergy: 9845.2,
  yearlyEnergy: 142560.8,
  lifetimeEnergy: 1.284,
};

export const performanceMetrics: PerformanceMetrics = {
  pr: 78.6,
  cuf: 22.4,
  maxAcPower: 98.2,
  specificYield: 4.12,
  gridAvailability: 99.2,
  plantAvailability: 97.8,
};

export const dailyPowerTrend: EnergyTrendPoint[] = Array.from({ length: 24 }, (_, i) => {
  const hour = i;
  let power = 0;
  let irradiance = 0;
  if (hour >= 6 && hour <= 18) {
    const peakOffset = Math.abs(hour - 12);
    const factor = Math.max(0, 1 - peakOffset / 7);
    power = factor * 82 + (Math.random() - 0.5) * 5;
    irradiance = factor * 950 + (Math.random() - 0.5) * 30;
  }
  return {
    time: `${String(hour).padStart(2, '0')}:00`,
    power: Math.max(0, Number(power.toFixed(1))),
    irradiance: Math.max(0, Number(irradiance.toFixed(0))),
  };
});

export const monthlyEnergyData: DailyEnergyPoint[] = Array.from({ length: 30 }, (_, i) => ({
  date: `${i + 1}`,
  energy: Number((350 + Math.random() * 120).toFixed(1)),
}));

export const weatherSnapshot: WeatherStation = {
  id: 1,
  name: 'CWS-01',
  solarRadiation: 842,
  ambientTemp: 34.2,
  humidity: 42,
  pressure: 1013.2,
  windDirection: 225,
  windSpeed: 3.8,
  rainfall: 0,
  moduleTemps: [48.2, 47.8, 49.1, 48.6],
  soilingRatio: 96.2,
};

export const inverterStatusCounts = {
  running: 26,
  stopped: 1,
  fault: 0,
  warning: 1,
  comm_fault: 0,
  waiting: 0,
};
