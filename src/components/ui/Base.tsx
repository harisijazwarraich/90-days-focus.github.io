import React from "react";

export function AppIcon() {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-950 text-white shadow-sm shadow-emerald-950/10">
      <span className="text-2xl">◎</span>
    </div>
  );
}

export function StatCard({ label, value, sublabel }: { label: string; value: string | number; sublabel: string }) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700/70">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
      <div className="mt-1 text-sm text-slate-500">{sublabel}</div>
    </div>
  );
}

export function Pill({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? "border-emerald-900 bg-emerald-900 text-white shadow-sm"
          : "border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:text-emerald-900"
      }`}
      type="button"
    >
      {children}
    </button>
  );
}
