import { clamp } from "../utils/time";

interface FocusModeProps {
  timerSeconds: number;
  timerRunning: boolean;
  setTimerRunning: (v: boolean | ((prev: boolean) => boolean)) => void;
  setTimerSeconds: (v: number | ((prev: number) => number)) => void;
  draftMinutes: number;
  finishTimerSession: () => void;
  sessionTag: string;
  setSessionTag: (v: string) => void;
  setDraftMinutes: (v: number) => void;
  draftNote: string;
  setDraftNote: (v: string) => void;
  addSession: () => void;
  setView: (v: string) => void;
  topic: string;
  totalToday: number;
  currentStreak: number;
  totalLogged: number;
}

export function FocusMode({
  timerSeconds,
  timerRunning,
  setTimerRunning,
  setTimerSeconds,
  draftMinutes,
  finishTimerSession,
  sessionTag,
  setSessionTag,
  setDraftMinutes,
  draftNote,
  setDraftNote,
  addSession,
  setView,
  topic,
  totalToday,
  currentStreak,
  totalLogged,
}: FocusModeProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Daily Focus</div>
        <h3 className="mt-2 text-3xl font-semibold tracking-tight">Enter focus mode.</h3>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Use a clean timer, add a small note, and keep the session short and honest.
        </p>

        <div className="mt-6 rounded-[2rem] bg-slate-50 p-6 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Timer</div>
          <div className="mt-4 text-6xl font-semibold tracking-tight text-slate-900">
            {String(Math.floor(timerSeconds / 60)).padStart(2, "0")}:{String(timerSeconds % 60).padStart(2, "0")}
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setTimerRunning((v: any) => !v)}
              className="rounded-full bg-emerald-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900"
            >
              {timerRunning ? "Pause" : "Start"}
            </button>
            <button
              type="button"
              onClick={() => setTimerSeconds(clamp(Number(draftMinutes) || 25, 1, 240) * 60)}
              className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={finishTimerSession}
              className="rounded-full border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-900"
            >
              Finish & Save
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Session details</h4>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700/70">Ready</span>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Minutes</label>
              <input
                type="number"
                min="1"
                max="240"
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
          </div>
          <div className="mt-4">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Reflection</label>
            <textarea
              value={draftNote}
              onChange={(e) => setDraftNote(e.target.value)}
              rows={5}
              placeholder="What did you do today?"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>
          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={addSession}
              className="rounded-full bg-emerald-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900"
            >
              Save Session
            </button>
            <button
              type="button"
              onClick={() => setView("dashboard")}
              className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h4 className="text-lg font-semibold">Focus shield</h4>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            A distraction-free view for work sessions. Keep it simple: one task, one timer, one note.
          </p>
          <div className="mt-5 rounded-[2rem] border border-emerald-100 bg-emerald-50 p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800/70">Current task</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight text-emerald-950">{topic}</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Today</div>
                <div className="mt-2 text-xl font-semibold text-slate-900">{totalToday}m</div>
              </div>
              <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Streak</div>
                <div className="mt-2 text-xl font-semibold text-slate-900">{currentStreak}</div>
              </div>
              <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Logged</div>
                <div className="mt-2 text-xl font-semibold text-slate-900">{totalLogged}m</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
