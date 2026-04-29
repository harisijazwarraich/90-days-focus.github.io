import React from "react";
import { FocusRingSummary } from "../components/features/FocusRingSummary";
import { FocusHeatmap } from "../components/features/FocusHeatmap";
import { EmptyState } from "../components/features/EmptyState";
import type { Session } from "../types";

interface HistoryProps {
  sessions: Session[];
  setView: (v: string) => void;
}

export function History({ sessions, setView }: HistoryProps) {
  const sortedSessions = [...sessions].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">History</div>
          <h3 className="mt-2 text-3xl font-semibold tracking-tight">See the pattern.</h3>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            The app turns your reflections into a calm progress history so you can see consistency at a glance.
          </p>
          <div className="mt-6">
            <FocusRingSummary sessions={sessions} />
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Calendar heatmap</h4>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">28 days</span>
          </div>
          <div className="mt-5">
            <FocusHeatmap sessions={sessions} />
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Recent reflections</h4>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700/70">{sessions.length} entries</span>
        </div>
        <div className="mt-5 space-y-4">
          {sortedSessions.length === 0 && (
            <EmptyState
              title="No history yet"
              description="Return to Daily Focus and save your first session to populate this view."
              action={<button className="rounded-full bg-emerald-950 px-5 py-3 text-sm font-semibold text-white" onClick={() => setView("focus")} type="button">Go to Daily Focus</button>}
            />
          )}
          {sortedSessions.map((session) => (
            <article key={session.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">{session.date}</span>
                    <span className="text-xs text-slate-500">{session.minutes} mins</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(session.tags || []).map((tag) => (
                      <span key={tag} className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">{session.note}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
