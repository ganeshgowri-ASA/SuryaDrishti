import type { InverterData, InverterStatus } from "@/types";

function generateStringCurrents(count: number, base: number): number[] {
  return Array.from({ length: count }, () =>
    Math.round((base + (Math.random() * 1.5 - 0.75)) * 100) / 100
  );
}

function generateMpptData(count: number): { voltages: number[]; currents: number[] } {
  return {
    voltages: Array.from({ length: count }, () => Math.round((620 + Math.random() * 40) * 10) / 10),
    currents: Array.from({ length: count }, () => Math.round((8 + Math.random() * 3) * 100) / 100),
  };
}

const statuses: InverterStatus[] = [
  "running", "running", "running", "running", "running", "running", "running",
  "running", "running", "running", "running", "running", "running", "running",
  "running", "running", "running", "running", "running", "running", "running",
  "running", "running", "running", "running", "running", "fault", "stopped",
];

export const inverterData: InverterData[] = Array.from({ length: 28 }, (_, i) => {
  const id = i + 1;
  const status = statuses[i];
  const isActive = status === "running";
  const basePower = isActive ? 2800 + Math.random() * 400 : 0;
  const mppt = generateMpptData(4);

  return {
    id,
    name: `INV-${id.toString().padStart(2, "0")}`,
    dcCurrent: isActive ? Math.round((450 + Math.random() * 50) * 10) / 10 : 0,
    dcVoltage: isActive ? Math.round((630 + Math.random() * 20) * 10) / 10 : 0,
    dcPower: isActive ? Math.round(basePower * 10) / 10 : 0,
    gridCurrentPhase1: isActive ? Math.round((4.2 + Math.random() * 0.5) * 100) / 100 : 0,
    gridCurrentPhase2: isActive ? Math.round((4.2 + Math.random() * 0.5) * 100) / 100 : 0,
    gridCurrentPhase3: isActive ? Math.round((4.2 + Math.random() * 0.5) * 100) / 100 : 0,
    gridVoltageUV: isActive ? Math.round((690 + Math.random() * 10) * 10) / 10 : 0,
    gridVoltageVW: isActive ? Math.round((690 + Math.random() * 10) * 10) / 10 : 0,
    gridVoltageWU: isActive ? Math.round((690 + Math.random() * 10) * 10) / 10 : 0,
    stringCurrents: generateStringCurrents(19, isActive ? 9.5 : 0),
    temperatures: {
      "Module": isActive ? Math.round((45 + Math.random() * 8) * 10) / 10 : 25,
      "Ambient": Math.round((33 + Math.random() * 3) * 10) / 10,
      "IGBT": isActive ? Math.round((55 + Math.random() * 10) * 10) / 10 : 28,
      "Heatsink": isActive ? Math.round((48 + Math.random() * 8) * 10) / 10 : 27,
    },
    status,
    dailyEnergy: isActive ? Math.round((12 + Math.random() * 4) * 100) / 100 : 0,
    activePower: isActive ? Math.round(basePower / 1000 * 100) / 100 : 0,
    reactivePower: isActive ? Math.round((Math.random() * 0.2 - 0.1) * 100) / 100 : 0,
    frequency: isActive ? Math.round((49.95 + Math.random() * 0.1) * 100) / 100 : 0,
    efficiency: isActive ? Math.round((97 + Math.random() * 2) * 10) / 10 : 0,
    powerFactor: isActive ? Math.round((0.98 + Math.random() * 0.015) * 1000) / 1000 : 0,
    mpptVoltages: mppt.voltages,
    mpptCurrents: mppt.currents,
  };
});
