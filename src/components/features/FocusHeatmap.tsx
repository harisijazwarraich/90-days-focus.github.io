import React from "react";
import { clamp, formatDateInput, startOfDay } from "../../utils/time";

export function FocusHeatmap({ sessions }: { sessions: any[] }) {
  const cells = [];
  const today = startOfDay(new Date());
  for (let i = 27; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = formatDateInput(d);
    const total = sessions.filter((s) => s.date === key).reduce((a, b) => a + b.minutes, 0);
    cells.push({ key, total });
  }

  return (
    <div className="grid grid-cols-7 gap-2">
      {cells.map((cell) => {
        const intensity = clamp(Math.floor(cell.total / 20), 0, 4);
        const classes = [
          "bg-slate-100",
          "bg-emerald-100",
          "bg-emerald-200",
          "bg-emerald-300",
          "bg-emerald-500",
        ];
        return (
          <div
            key={cell.key}
            title={`${cell.key}: ${cell.total} mins`}
            className={`aspect-square rounded-md border border-white ${classes[intensity]}`}
          />
        );
      })}
    </div>
  );
}
