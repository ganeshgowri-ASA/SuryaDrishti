import { InverterData, InverterStatus } from "@/types";

function generateInverter(id: number): InverterData {
  const status: InverterStatus = id === 7 ? "fault" : id === 15 ? "warning" : id === 22 ? "stopped" : "running";
  const isRunning = status === "running";
  const isWarning = status === "warning";
  const isActive = isRunning || isWarning;
  const factor = isRunning ? 0.85 + Math.random() * 0.15 : isWarning ? 0.4 + Math.random() * 0.2 : 0;

  return {
    id,
    name: `INV-${id.toString().padStart(2, "0")}`,
    dcVoltage: isActive ? Math.round((620 + Math.random() * 60) * 10) / 10 : 0,
    dcCurrent: isActive ? Math.round((2400 + Math.random() * 400) * factor) / 10 : 0,
    dcPower: isActive ? Math.round(1650 * factor * 10) / 10 : 0,
    gridCurrentPhase1: isActive ? Math.round((86 + Math.random() * 8) * factor * 10) / 10 : 0,
    gridCurrentPhase2: isActive ? Math.round((85 + Math.random() * 10) * factor * 10) / 10 : 0,
    gridCurrentPhase3: isActive ? Math.round((87 + Math.random() * 6) * factor * 10) / 10 : 0,
    gridVoltageUV: isActive ? Math.round((415 + Math.random() * 10) * 10) / 10 : 0,
    gridVoltageVW: isActive ? Math.round((414 + Math.random() * 12) * 10) / 10 : 0,
    gridVoltageWU: isActive ? Math.round((416 + Math.random() * 8) * 10) / 10 : 0,
    stringCurrents: Array.from({ length: 19 }, () =>
      isActive ? Math.round((9.2 + (Math.random() - 0.5) * 1.6) * 100) / 100 : 0
    ),
    temperatures: {
      "IGBT Module": isActive ? Math.round((52 + Math.random() * 18) * 10) / 10 : 25,
      "Ambient": Math.round((32 + Math.random() * 8) * 10) / 10,
      "DC Bus": isActive ? Math.round((45 + Math.random() * 15) * 10) / 10 : 25,
      "Transformer": isActive ? Math.round((48 + Math.random() * 20) * 10) / 10 : 25,
    },
    status,
    dailyEnergy: isActive ? Math.round((5800 + Math.random() * 1200) * 10) / 10 : id === 22 ? 1240.5 : 0,
    activePower: isActive ? Math.round(1650 * factor * 10) / 10 : 0,
    efficiency: isActive ? Math.round((96.5 + Math.random() * 2.5) * 10) / 10 : 0,
    frequency: isActive ? Math.round((50 + (Math.random() - 0.5) * 0.06) * 100) / 100 : 0,
  };
}

export const invertersData: InverterData[] = Array.from({ length: 28 }, (_, i) => generateInverter(i + 1));

export function getInverterById(id: number): InverterData | undefined {
  return invertersData.find((inv) => inv.id === id);
}

export const stringCurrentChartData = (inv: InverterData) =>
  inv.stringCurrents.map((current, i) => ({
    string: `S${(i + 1).toString().padStart(2, "0")}`,
    current,
    avg: inv.stringCurrents.reduce((a, b) => a + b, 0) / inv.stringCurrents.length,
  }));
