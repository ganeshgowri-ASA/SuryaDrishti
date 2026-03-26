import { InverterData, InverterStatus } from '@/types';

function generateStringCurrents(count: number, base: number): number[] {
  return Array.from({ length: count }, () =>
    Number((base + (Math.random() - 0.5) * 1.5).toFixed(2))
  );
}

function generateInverter(id: number): InverterData {
  const status: InverterStatus = id === 15 ? 'stopped' : id === 22 ? 'warning' : 'running';
  const isActive = status === 'running' || status === 'warning';
  const basePower = isActive ? 2600 + Math.random() * 400 : 0;
  const dcVoltage = isActive ? 620 + Math.random() * 40 : 0;
  const dcCurrent = isActive ? basePower / dcVoltage : 0;
  const efficiency = isActive ? 96 + Math.random() * 2.5 : 0;
  const acPower = basePower * (efficiency / 100);

  return {
    id,
    name: `INV-${String(id).padStart(2, '0')}`,
    dcCurrent: Number(dcCurrent.toFixed(1)),
    dcVoltage: Number(dcVoltage.toFixed(1)),
    dcPower: Number(basePower.toFixed(1)),
    gridCurrentPhase1: Number((acPower / (33000 / Math.sqrt(3) * 3) * 1000).toFixed(1)),
    gridCurrentPhase2: Number((acPower / (33000 / Math.sqrt(3) * 3) * 1000 + (Math.random() - 0.5) * 2).toFixed(1)),
    gridCurrentPhase3: Number((acPower / (33000 / Math.sqrt(3) * 3) * 1000 + (Math.random() - 0.5) * 2).toFixed(1)),
    gridVoltageUV: Number((33.0 + Math.random() * 0.4).toFixed(2)),
    gridVoltageVW: Number((33.0 + Math.random() * 0.4).toFixed(2)),
    gridVoltageWU: Number((33.0 + Math.random() * 0.4).toFixed(2)),
    stringCurrents: generateStringCurrents(19, isActive ? 9.2 : 0),
    temperatures: {
      'IGBT Module 1': Number((52 + Math.random() * 8).toFixed(1)),
      'IGBT Module 2': Number((50 + Math.random() * 8).toFixed(1)),
      'Ambient': Number((34 + Math.random() * 4).toFixed(1)),
      'Transformer': Number((58 + Math.random() * 10).toFixed(1)),
      'Cabinet': Number((38 + Math.random() * 5).toFixed(1)),
    },
    status,
    dailyEnergy: Number((isActive ? 12 + Math.random() * 4 : 0).toFixed(1)),
    activePower: Number((acPower / 1000).toFixed(2)),
    reactivePower: Number((-0.05 + Math.random() * 0.1).toFixed(3)),
    frequency: Number((49.98 + Math.random() * 0.04).toFixed(2)),
    efficiency: Number(efficiency.toFixed(1)),
    powerFactor: Number((0.98 + Math.random() * 0.015).toFixed(3)),
  };
}

export const invertersData: InverterData[] = Array.from({ length: 28 }, (_, i) => generateInverter(i + 1));

export function getInverterById(id: number): InverterData | undefined {
  return invertersData.find(inv => inv.id === id);
}
