"use client";

interface GaugeProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  color?: string;
}

export function Gauge({ value, max, label, unit, color = "#22c55e" }: GaugeProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference * 0.75;
  const rotation = -225;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-32 w-32">
        <svg className="h-32 w-32" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#334155"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.25}
            transform={`rotate(${rotation} 50 50)`}
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform={`rotate(${rotation} 50 50)`}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-100">{value}</span>
          <span className="text-xs text-slate-400">{unit}</span>
        </div>
      </div>
      <span className="mt-1 text-xs font-medium text-slate-400">{label}</span>
    </div>
  );
}
