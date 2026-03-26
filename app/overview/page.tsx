import {
  Zap,
  Activity,
  Sun,
  Gauge,
  Radio,
  BatteryCharging,
  Calendar,
  CalendarDays,
  CalendarRange,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { KpiCard } from "@/components/kpi-card";
import { StatusGrid } from "@/components/status-grid";
import plantData from "@/data/plant-overview.json";
import invertersData from "@/data/inverters.json";
import weatherData from "@/data/weather-stations.json";
import type { PlantOverview, InverterData, WeatherStation } from "@/types";

const plant = plantData as PlantOverview;
const inverters = invertersData as InverterData[];
const weather = weatherData as WeatherStation[];

const avgWeather = {
  ghi: Math.round(weather.reduce((a, w) => a + w.solarRadiation, 0) / weather.length),
  temp: (weather.reduce((a, w) => a + w.ambientTemp, 0) / weather.length).toFixed(1),
  humidity: Math.round(weather.reduce((a, w) => a + w.humidity, 0) / weather.length),
  wind: (weather.reduce((a, w) => a + w.windSpeed, 0) / weather.length).toFixed(1),
};

export default function OverviewPage() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-50">Plant Overview</h2>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="h-2 w-2 rounded-full bg-scada-green animate-pulse" />
          LIVE
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <KpiCard
          label="Power Generation"
          value={plant.powerGeneration}
          unit="MW"
          icon={<Zap className="h-4 w-4" />}
          valueColor="text-scada-green"
        />
        <KpiCard
          label="Reactive Power"
          value={plant.reactivePower}
          unit="MVAR"
          icon={<Activity className="h-4 w-4" />}
        />
        <KpiCard
          label="Irradiance"
          value={plant.irradiance}
          unit="W/m²"
          icon={<Sun className="h-4 w-4" />}
          valueColor="text-yellow-400"
        />
        <KpiCard
          label="Grid Voltage"
          value={plant.gridVoltage}
          unit="kV"
          icon={<Gauge className="h-4 w-4" />}
        />
        <KpiCard
          label="Grid Frequency"
          value={plant.gridFrequency}
          unit="Hz"
          icon={<Radio className="h-4 w-4" />}
        />
      </div>

      {/* Inverter Summary & Energy */}
      <div className="grid gap-3 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Inverter Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded border border-slate-700 bg-slate-900 p-3 text-center">
                <p className="text-2xl font-bold text-scada-green">{plant.invertersComm}</p>
                <p className="text-[10px] uppercase text-slate-400">Communicating</p>
              </div>
              <div className="rounded border border-slate-700 bg-slate-900 p-3 text-center">
                <p className="text-2xl font-bold text-scada-active">{plant.invertersRunning}</p>
                <p className="text-[10px] uppercase text-slate-400">Running</p>
              </div>
              <div className="rounded border border-slate-700 bg-slate-900 p-3 text-center">
                <p className="text-2xl font-bold text-scada-red">{plant.invertersStopped}</p>
                <p className="text-[10px] uppercase text-slate-400">Stopped</p>
              </div>
              <div className="rounded border border-slate-700 bg-slate-900 p-3 text-center">
                <p className="text-2xl font-bold text-slate-50">{plant.inverterAvailability}%</p>
                <p className="text-[10px] uppercase text-slate-400">Availability</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Energy Counters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded border border-slate-700 bg-slate-900 p-3 text-center">
                <BatteryCharging className="mx-auto mb-1 h-4 w-4 text-slate-500" />
                <p className="text-xl font-bold tabular-nums text-slate-50">{plant.dailyEnergy}</p>
                <p className="text-[10px] uppercase text-slate-400">Daily MWh</p>
              </div>
              <div className="rounded border border-slate-700 bg-slate-900 p-3 text-center">
                <Calendar className="mx-auto mb-1 h-4 w-4 text-slate-500" />
                <p className="text-xl font-bold tabular-nums text-slate-50">{plant.monthlyEnergy}</p>
                <p className="text-[10px] uppercase text-slate-400">Monthly MWh</p>
              </div>
              <div className="rounded border border-slate-700 bg-slate-900 p-3 text-center">
                <CalendarDays className="mx-auto mb-1 h-4 w-4 text-slate-500" />
                <p className="text-xl font-bold tabular-nums text-slate-50">{plant.yearlyEnergy}</p>
                <p className="text-[10px] uppercase text-slate-400">Yearly MWh</p>
              </div>
              <div className="rounded border border-slate-700 bg-slate-900 p-3 text-center">
                <CalendarRange className="mx-auto mb-1 h-4 w-4 text-slate-500" />
                <p className="text-xl font-bold tabular-nums text-slate-50">{plant.lifetimeEnergy}</p>
                <p className="text-[10px] uppercase text-slate-400">Lifetime GWh</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inverter Status Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Inverter Generation Status</CardTitle>
        </CardHeader>
        <CardContent>
          <StatusGrid
            items={inverters.map((inv) => ({
              id: inv.id,
              label: `INV ${String(inv.id).padStart(2, "0")}`,
              value: `${inv.activePower > 0 ? (inv.activePower / 1000).toFixed(1) : "0"} MW`,
              status: inv.status,
            }))}
          />
        </CardContent>
      </Card>

      {/* Weather Snapshot */}
      <Card>
        <CardHeader>
          <CardTitle>Weather Snapshot</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded border border-slate-700 bg-slate-900 p-3 text-center">
              <p className="text-xl font-bold text-yellow-400">{avgWeather.ghi}</p>
              <p className="text-[10px] uppercase text-slate-400">Avg GHI W/m²</p>
            </div>
            <div className="rounded border border-slate-700 bg-slate-900 p-3 text-center">
              <p className="text-xl font-bold text-scada-orange">{avgWeather.temp}°C</p>
              <p className="text-[10px] uppercase text-slate-400">Avg Ambient</p>
            </div>
            <div className="rounded border border-slate-700 bg-slate-900 p-3 text-center">
              <p className="text-xl font-bold text-blue-400">{avgWeather.humidity}%</p>
              <p className="text-[10px] uppercase text-slate-400">Avg Humidity</p>
            </div>
            <div className="rounded border border-slate-700 bg-slate-900 p-3 text-center">
              <p className="text-xl font-bold text-slate-50">{avgWeather.wind} m/s</p>
              <p className="text-[10px] uppercase text-slate-400">Avg Wind Speed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
