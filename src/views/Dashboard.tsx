import React from "react";
import { StatCard } from "../components/ui/Base";
import { ProgressRing } from "../components/ui/ProgressRing";
import { FocusHeatmap } from "../components/features/FocusHeatmap";
import { EmptyState } from "../components/features/EmptyState";
import { GOAL_DAYS } from "../constants";
import type { Session } from "../types";

interface DashboardProps {
  topic: string;
  startDate: string | null;
  totalToday: number;
  currentStreak: number;
  remainingDays: number;
  completion: number;
  daysElapsed: number;
  sessions: Session[];
  draftMinutes: number;
  setDraftMinutes: (v: number) => void;
  sessionTag: string;
  setSessionTag: (v: string) => void;
  draftNote: string;
  setDraftNote: (v: string) => void;
  addSession: () => void;
  setView: (v: string) => void;
  targetMinutesPerDay: number;
  setTargetMinutesPerDay: (v: any) => void;
  dailyLimitForToday?: number;
  setDailyLimitForToday: (mins: number) => void;
}

export function Dashboard({
  topic,
  startDate,
  totalToday,
  currentStreak,
  remainingDays,
  completion,
  daysElapsed,
  sessions,
  draftMinutes,
  setDraftMinutes,
  sessionTag,
  setSessionTag,
  draftNote,
  setDraftNote,
  addSession,
  setView,
  targetMinutesPerDay,
  setTargetMinutesPerDay,
  dailyLimitForToday,
  setDailyLimitForToday,
}: DashboardProps) {
  const sortedSessions = [...sessions].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <div className="rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">90-day journey</div>
              <h3 className="mt-2 text-3xl font-semibold tracking-tight">Stay on one path.</h3>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                Your topic is locked. Use this space to log daily work, keep momentum visible, and protect your attention.
              </p>
            </div>
            <ProgressRing progress={completion} label={`${daysElapsed} / ${GOAL_DAYS} days`} />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <StatCard label="Today" value={`${totalToday} min`} sublabel="minutes focused" />
            <StatCard label="Streak" value={`${currentStreak}`} sublabel="days with activity" />
            <StatCard label="Remaining" value={`${remainingDays}`} sublabel="days left in the challenge" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">Quick Session</h4>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700/70">Daily Log</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-500">Record a focused block without overthinking it.</p>
            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Minutes</label>
                <input
                  type="number"
                  min="1"
                  max="480"
                  value={draftMinutes}
                  onChange={(e) => setDraftMinutes(Number(e.target.value))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Tag</label>
                <select
                  value={sessionTag}
                  onChange={(e) => setSessionTag(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500"
                >
                  <option>Deep Work</option>
                  <option>Planning</option>
                  <option>Writing</option>
                  <option>Study</option>
                  <option>Execution</option>
                </select>
              </div>
              <textarea
                value={draftNote}
                onChange={(e) => setDraftNote(e.target.value)}
                rows={4}
                placeholder="Write a 1–2 line reflection..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500"
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={addSession}
                  className="rounded-full bg-emerald-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900"
                >
                  Save Session
                </button>
                <button
                  type="button"
                  onClick={() => setView("focus")}
                  className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:text-emerald-900"
                >
                  Open Focus Mode
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">Current Progress</h4>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Last 28 Days</span>
            </div>
            <div className="mt-5">
              <FocusHeatmap sessions={sessions} />
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
              <span>Less</span>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Journey settings</h4>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">Locked</span>
          </div>
          <div className="mt-5 space-y-4 text-sm">
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Topic</div>
              <div className="mt-1 text-base font-medium text-slate-900">{topic}</div>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Start date</div>
              <div className="mt-1 text-base font-medium text-slate-900">{startDate}</div>
            </div>

            <div className={`rounded-2xl p-4 ${dailyLimitForToday ? 'bg-emerald-50 border border-emerald-100' : 'bg-slate-50'}`}>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Daily Limit (Today)
              </div>
              <div className="mt-1 flex items-center justify-between">
                <div className="text-base font-medium text-slate-900">
                  {dailyLimitForToday ? `${dailyLimitForToday} min` : 'Not set'}
                </div>
                {dailyLimitForToday && (
                  <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Locked</span>
                )}
              </div>
              {!dailyLimitForToday && (
                <div className="mt-3 flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-20 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs outline-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const val = parseInt((e.target as HTMLInputElement).value);
                        if (val > 0) setDailyLimitForToday(val);
                      }
                    }}
                  />
                  <button
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      const val = parseInt(input.value);
                      if (val > 0) setDailyLimitForToday(val);
                    }}
                    className="bg-emerald-900 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg"
                  >
                    Set
                  </button>
                </div>
              )}
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Target</div>
              <div className="mt-1 text-base font-medium text-slate-900">{targetMinutesPerDay} min/day</div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setTargetMinutesPerDay((v: number) => Math.max(15, v - 15))}
                className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
              >
                - 15
              </button>
              <button
                type="button"
                onClick={() => setTargetMinutesPerDay((v: number) => v + 15)}
                className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
              >
                + 15
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Recent entries</h4>
            <button
              type="button"
              onClick={() => setView("history")}
              className="text-sm font-medium text-emerald-800 hover:text-emerald-950"
            >
              View all
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {sortedSessions.slice(0, 4).map((session) => (
              <div key={session.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium text-slate-900">{session.date}</div>
                    <div className="mt-1 text-xs text-slate-500">{session.tags?.join(" · ")}</div>
                  </div>
                  <div className="text-sm font-semibold text-emerald-900">{session.minutes} min</div>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600 line-clamp-3">{session.note}</p>
              </div>
            ))}
            {sortedSessions.length === 0 && (
              <EmptyState
                title="No sessions yet"
                description="Log your first focused block to start building the history view."
                action={<button className="rounded-full bg-emerald-950 px-5 py-3 text-sm font-semibold text-white" onClick={() => setView("focus")} type="button">Start Focus Mode</button>}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
