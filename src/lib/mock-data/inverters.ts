import { InverterData, InverterStatus } from "@/types";

function generateStringCurrents(): number[] {
  return Array.from({ length: 19 }, () => 8.5 + Math.random() * 2.5);
}

function generateInverter(id: number): InverterData {
  const status: InverterStatus = id === 14 ? "warning" : id === 22 ? "stopped" : "running";
  const isRunning = status === "running" || status === "warning";
  const basePower = isRunning ? 1350 + Math.random() * 200 : 0;

  return {
    id,
    name: `INV-${id.toString().padStart(2, "0")}`,
    dcVoltage: isRunning ? 620 + Math.random() * 40 : 0,
    dcCurrent: isRunning ? 2150 + Math.random() * 300 : 0,
    dcPower: isRunning ? basePower * 1.02 : 0,
    gridCurrentPhase1: isRunning ? 23.5 + Math.random() * 2 : 0,
    gridCurrentPhase2: isRunning ? 23.3 + Math.random() * 2 : 0,
    gridCurrentPhase3: isRunning ? 23.7 + Math.random() * 2 : 0,
    gridVoltageUV: isRunning ? 690 + Math.random() * 10 : 0,
    gridVoltageVW: isRunning ? 688 + Math.random() * 10 : 0,
    gridVoltageWU: isRunning ? 691 + Math.random() * 10 : 0,
    stringCurrents: isRunning ? generateStringCurrents() : Array(19).fill(0),
    temperatures: {
      "IGBT A": isRunning ? 52 + Math.random() * 12 : 25,
      "IGBT B": isRunning ? 51 + Math.random() * 12 : 25,
      "IGBT C": isRunning ? 53 + Math.random() * 12 : 25,
      "Ambient": 34 + Math.random() * 4,
      "Transformer": isRunning ? 58 + Math.random() * 10 : 28,
    },
    status,
    dailyEnergy: isRunning ? 5.8 + Math.random() * 1.5 : 0,
    activePower: Math.round(basePower * 100) / 100,
    efficiency: isRunning ? 96.5 + Math.random() * 2.5 : 0,
    frequency: isRunning ? 49.95 + Math.random() * 0.1 : 0,
  };
}

export const invertersData: InverterData[] = Array.from({ length: 28 }, (_, i) => generateInverter(i + 1));

export const inverterStringComparisonData = (inverterId: number) => {
  const inv = invertersData.find((i) => i.id === inverterId);
  if (!inv) return [];
  return inv.stringCurrents.map((current, idx) => ({
    string: `S${(idx + 1).toString().padStart(2, "0")}`,
    current: Math.round(current * 100) / 100,
    avg: 9.5,
  }));
};
