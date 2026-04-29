import React from "react";

export function EmptyState({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-center">
      <div className="text-lg font-semibold text-slate-900">{title}</div>
      <div className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{description}</div>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
