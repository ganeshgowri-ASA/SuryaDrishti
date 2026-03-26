import { PPCData, PPCTrendPoint } from '@/types';

export const ppcData: PPCData = {
  activePowerSetpoint: 80.0,
  activePowerMeasured: 78.4,
  activePowerLimit: 100.0,
  reactivePowerSetpoint: -2.0,
  reactivePowerMeasured: -2.3,
  voltageSetpoint: 33.0,
  voltageMeasured: 33.2,
  powerFactorSetpoint: 0.99,
  powerFactorMeasured: 0.985,
  controlMode: 'remote',
  curtailmentActive: false,
  curtailmentLevel: 100,
  rampRateUp: 10,
  rampRateDown: 10,
  frequencyResponse: true,
  frequencyDeadband: 0.03,
  droopSetting: 5,
  gridVoltageR: 33.18,
  gridVoltageY: 33.22,
  gridVoltageB: 33.20,
  gridCurrentR: 812.4,
  gridCurrentY: 808.6,
  gridCurrentB: 810.2,
  gridFrequency: 50.01,
  gridPowerFactor: 0.985,
  plantProduction: 412.6,
  operatingTime: 8.5,
  pqmCommStatus: true,
  commandHistory: [
    { timestamp: '2026-03-26 10:15:32', command: 'Set Active Power Setpoint: 80 MW', source: 'SCADA Remote', status: 'executed' },
    { timestamp: '2026-03-26 09:45:10', command: 'Enable Frequency Response', source: 'SCADA Remote', status: 'executed' },
    { timestamp: '2026-03-26 09:30:05', command: 'Set Ramp Rate Up: 10 MW/min', source: 'SCADA Remote', status: 'executed' },
    { timestamp: '2026-03-26 08:12:44', command: 'Set Reactive Power: -2.0 MVAR', source: 'PPC Auto', status: 'executed' },
    { timestamp: '2026-03-26 07:55:18', command: 'Set PF Setpoint: 0.99', source: 'SCADA Remote', status: 'executed' },
    { timestamp: '2026-03-26 07:30:00', command: 'Switch to Remote Mode', source: 'Operator', status: 'executed' },
    { timestamp: '2026-03-26 06:45:22', command: 'Plant Startup Sequence', source: 'PPC Auto', status: 'executed' },
    { timestamp: '2026-03-25 18:30:00', command: 'Plant Shutdown Sequence', source: 'PPC Auto', status: 'executed' },
  ],
};

export const ppcTrendData: PPCTrendPoint[] = Array.from({ length: 48 }, (_, i) => {
  const hour = 6 + (i * 0.25);
  if (hour > 18) return null;
  const peakOffset = Math.abs(hour - 12);
  const factor = Math.max(0, 1 - peakOffset / 7);
  const setpoint = 80;
  const measured = setpoint * factor + (Math.random() - 0.5) * 3;
  const limit = 100;
  return {
    time: `${String(Math.floor(hour)).padStart(2, '0')}:${String(Math.round((hour % 1) * 60)).padStart(2, '0')}`,
    setpoint: Number((setpoint * factor).toFixed(1)),
    measured: Math.max(0, Number(measured.toFixed(1))),
    limit,
  };
}).filter(Boolean) as PPCTrendPoint[];
