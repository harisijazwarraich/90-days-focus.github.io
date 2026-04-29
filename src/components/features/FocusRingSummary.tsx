import { GOAL_DAYS } from "../../constants";

export function FocusRingSummary({ sessions }: { sessions: any[] }) {
  const total = sessions.reduce((a, b) => a + b.minutes, 0);
  const days = new Set(sessions.map((s) => s.date)).size;
  const avg = sessions.length ? Math.round(total / sessions.length) : 0;
  const progress = Math.min(100, (days / GOAL_DAYS) * 100);

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-2xl bg-slate-50 p-4">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Days active</div>
        <div className="mt-2 text-2xl font-semibold text-slate-900">{days}</div>
      </div>
      <div className="rounded-2xl bg-slate-50 p-4">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Total minutes</div>
        <div className="mt-2 text-2xl font-semibold text-slate-900">{total}</div>
      </div>
      <div className="rounded-2xl bg-slate-50 p-4">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Average</div>
        <div className="mt-2 text-2xl font-semibold text-slate-900">{avg}m</div>
      </div>
      <div className="sm:col-span-3 rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>Challenge completion</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-emerald-900 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
