# SuryaDrishti - CLAUDE.md (Srishti Workflow)

## Project Identity
- **Name**: SuryaDrishti (सूर्यदृष्टि) — "Solar Vision"
- **Type**: Solar PV Plant SCADA Web Application
- **Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Recharts, Vercel
- **Repo**: ganeshgowri-ASA/SuryaDrishti

## Srishti Workflow — Phase Plan

### Phase 1: Foundation (Srishti - Creation)
- Initialize Next.js 14 project with TypeScript, Tailwind, shadcn/ui
- Set up project structure: app/, components/, lib/, types/, data/
- Create shared layout with persistent header (logo, nav tabs, project name)
- Create persistent footer alarm ticker
- Set up mock data layer (JSON files simulating RTU data)
- Navigation: OVERVIEW | PPC CONTROL | INVERTER | WEATHER | TRACKER CONTROL | TRACKER ALARMS | TRACKER POS CODE | DBOX NOTIFICATION | SMB ALARM | REPORTS | INV GRAPH

### Phase 2: Core Dashboards (Sthapana - Establishment)
- **Plant Overview**: KPIs (Power MW, Reactive MVAR, Irradiance, Grid Voltage/Frequency), Inverter summary counts, Energy counters (Daily/Monthly/Yearly/Lifetime), Performance table (PR%, CUF%, Max AC Power), Weather snapshot
- **PPC Control**: Active Power Control (setpoint, measured, local/remote), Reactive Power Control (voltage/VAR/PF setpoints, droop), Grid Measurement (voltages, currents, frequency, PF), Plant Measurement (production, operating time), Control toggles, PQM comm status, PPC Trend chart
- **Inverter Dashboard**: Dropdown selector (Inv 01-28), PV Array Data (DC V/I/P), Grid Current (3-phase), Grid Voltage (line voltages), String Current table (19 strings), Temperature points, Control buttons (Start/Stop/Reset/VAR Night/Q-P Priority)

### Phase 3: Monitoring Screens (Samrakshana - Protection)
- **Inverter Generation**: 28 inverter tiles (kW + kWh), color-coded status legend (Green=Ready, Yellow=Waiting, Red=Fault, Orange=Warning, Dark Green=Running, Grey=Comm Fault)
- **Inverter Graph**: Daily generation bar chart per inverter
- **WMS Screen**: 6-station table (CWS, Albedometer, Multi-PT, SMS, TP-MB sensors), Average data table (GHI, Tilt, Humidity, Wind, Soiling Ratio), WMS Trends
- **SMB Status**: 28 IS x 17 SMB matrix with color-coded status

### Phase 4: Tracker System (Niyantrana - Control)
- **Tracker Control**: TBOX selector, Block parameters table (Wind Speed/Direction 3S/60S, Battery, Alarm Status), T-BOX summary
- **Tracker Alarms**: Color grid (IS-01 to IS-13, IDs 01-80) — Green/Orange/Yellow/Red
- **Tracker Position Code**: Position modes grid (TRACKING, NIGHT, BACKTRACKING, WIND DEFENCE, SNOW, HAIL, etc.)
- **DBox Notification**: Outdated DBox status grid
- **Tracker Status**: Per-tracker detail table (Elevation SP/POS, Battery, Motor Current, Operation Mode, Alarm, Position)

### Phase 5: Alarms & Reports (Suchana - Notification)
- **All Alarms**: Active + Historical views, columns (Description, Time ON/OFF, Condition, Time ACK), Ack Sel/All, Reset Sel/All
- **Inverter Alarms**: Filtered alarm view
- **TBOX-1 Alarms**: Filtered tracker box 1
- **TBOX-2 Alarms**: Filtered tracker box 2
- **Reports**: Generation reports, Performance reports

### Phase 6: Trends & Analytics (Vishleshan - Analysis)
- Inverter Power/String Current/Temperature/Voltage trend charts
- WMS trend charts
- Tracker trend charts
- UPS Status screen (8 ICR units)

### Phase 7: Polish & Deploy (Prasaran - Deployment)
- Responsive design optimization
- Dark/Light theme
- Vercel deployment configuration
- Performance optimization
- README with screenshots

## Coding Conventions
- Use TypeScript strict mode
- Components in PascalCase, files in kebab-case
- shadcn/ui for all UI primitives
- Recharts for all charts/graphs
- Mock data in /data folder as typed JSON
- Color constants in lib/constants.ts
- All SCADA screens as separate page routes under app/
- Reusable KPI card, alarm table, status grid components
- No external API calls in Phase 1-6 (mock data only)

## Color System
- Running/OK: #22c55e (green-500)
- Warning: #f97316 (orange-500)
- Fault/Alarm: #ef4444 (red-500)
- Waiting: #eab308 (yellow-500)
- Comm Fault: #6b7280 (gray-500)
- Active/Running: #16a34a (green-600)
- Background: #0f172a (slate-900)
- Card: #1e293b (slate-800)

## Key Data Types
```typescript
interface PlantOverview {
  powerGeneration: number; // MW
  reactivePower: number; // MVAR
  irradiance: number; // W/m2
  gridVoltage: number; // kV
  gridFrequency: number; // Hz
  invertersComm: number;
  invertersRunning: number;
  invertersStopped: number;
  inverterAvailability: number; // %
  dailyEnergy: number; // MWh
  monthlyEnergy: number; // MWh
  yearlyEnergy: number; // MWh
  lifetimeEnergy: number; // GWh
}

interface InverterData {
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
  status: 'running' | 'stopped' | 'fault' | 'warning' | 'comm_fault' | 'waiting';
  dailyEnergy: number;
  activePower: number;
}

interface TrackerMotor {
  id: number;
  elevationSetpoint: number;
  elevationPosition: number;
  batteryLevel: number;
  maxMotorCurrent: number;
  operationMode: string;
  alarm: string;
  position: string;
}

interface WeatherStation {
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

interface Alarm {
  description: string;
  timeOn: string;
  timeOff?: string;
  condition: 'ON' | 'OFF';
  timeAck?: string;
  source: string;
}
```

## Hardware Context (for data modeling)
- Controller: Phoenix Contact AXC F 2152 (PLCnext)
- Communication: 7x RS-485, 4x Modbus, Ethernet Managed Switch
- I/O: Axioline Smart Elements (DI16, DO16, AI4 4-20mA)
- Gateway: QT-485ETH Modbus (RS485-to-Ethernet)
- Plant: ~28 inverters, 2 tracker boxes, 13 blocks, 80 trackers/block, 6 WMS, 17 SMBs/inverter station

## Run Commands
```bash
npm run dev      # Development server
npm run build    # Production build
npm run lint     # Linting
npm run deploy   # Vercel deploy
```
