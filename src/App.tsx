import React, { useEffect, useMemo, useState } from "react";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import { AppIcon, Pill } from "./components/ui/Base";
import { Onboarding } from "./views/Onboarding";
import { Dashboard } from "./views/Dashboard";
import { FocusMode } from "./views/FocusMode";
import { History } from "./views/History";
import {
  clamp,
  formatDateInput,
  startOfDay,
  daysBetween,
  generateId
} from "./utils/time";
import {
  STORAGE_KEY,
  GOAL_DAYS,
  DEFAULT_TOPIC
} from "./constants";
import type { AppState, Session } from "./types";

export default function App() {
  const [stored, setStored] = useLocalStorageState<AppState | null>(STORAGE_KEY, null);
  const [view, setView] = useState("dashboard");
  const [topicDraft, setTopicDraft] = useState("");
  const [draftNote, setDraftNote] = useState("");
  const [draftMinutes, setDraftMinutes] = useState(25);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [sessionTag, setSessionTag] = useState("Deep Work");

  const initialState = useMemo(() => {
    if (stored) return stored;
    return {
      topic: DEFAULT_TOPIC,
      startDate: null,
      locked: false,
      sessions: [],
      targetMinutesPerDay: 60,
      dailyLimits: {},
    };
  }, [stored]);

  const [topic, setTopic] = useState(initialState.topic);
  const [startDate, setStartDate] = useState(initialState.startDate);
  const [locked, setLocked] = useState(initialState.locked);
  const [sessions, setSessions] = useState(initialState.sessions);
  const [targetMinutesPerDay, setTargetMinutesPerDay] = useState(initialState.targetMinutesPerDay);
  const [dailyLimits, setDailyLimits] = useState(initialState.dailyLimits || {});

  useEffect(() => {
    if (stored) {
      setTopic(stored.topic ?? DEFAULT_TOPIC);
      setStartDate(stored.startDate ?? null);
      setLocked(Boolean(stored.locked));
      setSessions(Array.isArray(stored.sessions) ? stored.sessions : []);
      setTargetMinutesPerDay(stored.targetMinutesPerDay ?? 60);
      setDailyLimits(stored.dailyLimits || {});
    }
  }, [stored]);

  useEffect(() => {
    setStored({ topic, startDate, locked, sessions, targetMinutesPerDay, dailyLimits });
  }, [topic, startDate, locked, sessions, targetMinutesPerDay, dailyLimits, setStored]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimerSeconds((sec) => {
        if (!timerRunning) return sec;
        if (sec <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return sec - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [timerRunning]);

  const todayKey = formatDateInput(new Date());
  const todaySessions = sessions.filter((s) => s.date === todayKey);
  const totalToday = todaySessions.reduce((a, b) => a + b.minutes, 0);

  const currentStreak = useMemo(() => {
    const map = new Map();
    sessions.forEach((s) => map.set(s.date, (map.get(s.date) || 0) + s.minutes));
    let streak = 0;
    let cursor = startOfDay(new Date());
    while (true) {
      const key = formatDateInput(cursor);
      if ((map.get(key) || 0) > 0) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }, [sessions]);

  const daysElapsed = startDate ? clamp(daysBetween(startDate, new Date()) + 1, 1, GOAL_DAYS) : 0;
  const completion = startDate ? (daysElapsed / GOAL_DAYS) * 100 : 0;
  const totalLogged = sessions.reduce((a, b) => a + b.minutes, 0);
  const remainingDays = startDate ? Math.max(0, GOAL_DAYS - daysElapsed) : GOAL_DAYS;

  const handleStartJourney = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicDraft.trim()) return;
    const start = new Date();
    setTopic(topicDraft.trim());
    setStartDate(formatDateInput(start));
    setLocked(true);
    setTopicDraft("");
    setView("dashboard");
    // Removed seed sessions generation
    setSessions([]);
  };

  const handleReset = () => {
    const ok = window.confirm("Reset the whole 90-day journey? This clears your saved topic and focus history.");
    if (!ok) return;
    setTopic("");
    setStartDate(null);
    setLocked(false);
    setSessions([]);
    setDailyLimits({});
    setDraftNote("");
    setDraftMinutes(25);
    setTimerRunning(false);
    setTimerSeconds(25 * 60);
    setView("dashboard");
  };

  const addSession = () => {
    const minutes = clamp(Number(draftMinutes) || 0, 1, 480);
    const next: Session = {
      id: generateId(),
      date: todayKey,
      minutes,
      note: draftNote.trim() || "Focused session logged from the daily focus screen.",
      tags: [sessionTag],
    };
    setSessions((prev) => [next, ...prev]);
    setDraftNote("");
    setDraftMinutes(25);
    setTimerSeconds(25 * 60);
    setTimerRunning(false);
    setView("history");
  };

  const finishTimerSession = () => {
    const originalSeconds = clamp(Number(draftMinutes) || 25, 1, 240) * 60;
    const minutes = Math.max(1, Math.round((originalSeconds - timerSeconds) / 60));
    setSessions((prev) => [
      {
        id: generateId(),
        date: todayKey,
        minutes,
        note: draftNote.trim() || "Timer session completed.",
        tags: [sessionTag],
      },
      ...prev,
    ]);
    setTimerRunning(false);
    setTimerSeconds(originalSeconds);
    setDraftNote("");
    setView("dashboard");
  };

  const setDailyLimitForToday = (mins: number) => {
    setDailyLimits(prev => ({
      ...prev,
      [todayKey]: mins
    }));
  };

  if (!startDate) {
    return (
      <Onboarding
        topicDraft={topicDraft}
        setTopicDraft={setTopicDraft}
        handleStartJourney={handleStartJourney}
        useExample={() => {
          setTopicDraft("Learn React deeply");
          // Not setting view here, just filling the draft
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f7faf8] px-4 py-6 text-slate-900">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <AppIcon />
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700/70">Focus90</div>
              <h2 className="text-2xl font-semibold tracking-tight">{topic}</h2>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
              {["dashboard", "focus", "history"].map((item) => (
                <Pill key={item} active={view === item} onClick={() => setView(item)}>
                  {item === "dashboard" ? "Dashboard" : item === "focus" ? "Daily Focus" : "History"}
                </Pill>
              ))}
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-rose-200 hover:text-rose-700"
            >
              Reset journey
            </button>
          </div>
        </div>

        {view === "dashboard" && (
          <Dashboard
            topic={topic}
            startDate={startDate}
            totalToday={totalToday}
            currentStreak={currentStreak}
            remainingDays={remainingDays}
            completion={completion}
            daysElapsed={daysElapsed}
            sessions={sessions}
            draftMinutes={draftMinutes}
            setDraftMinutes={setDraftMinutes}
            sessionTag={sessionTag}
            setSessionTag={setSessionTag}
            draftNote={draftNote}
            setDraftNote={setDraftNote}
            addSession={addSession}
            setView={setView}
            targetMinutesPerDay={targetMinutesPerDay}
            setTargetMinutesPerDay={setTargetMinutesPerDay}
            dailyLimitForToday={dailyLimits[todayKey]}
            setDailyLimitForToday={setDailyLimitForToday}
          />
        )}

        {view === "focus" && (
          <FocusMode
            timerSeconds={timerSeconds}
            timerRunning={timerRunning}
            setTimerRunning={setTimerRunning}
            setTimerSeconds={setTimerSeconds}
            draftMinutes={draftMinutes}
            finishTimerSession={finishTimerSession}
            sessionTag={sessionTag}
            setSessionTag={setSessionTag}
            setDraftMinutes={setDraftMinutes}
            draftNote={draftNote}
            setDraftNote={setDraftNote}
            addSession={addSession}
            setView={setView}
            topic={topic}
            totalToday={totalToday}
            currentStreak={currentStreak}
            totalLogged={totalLogged}
          />
        )}

        {view === "history" && (
          <History
            sessions={sessions}
            setView={setView}
          />
        )}
      </div>
    </div>
  );
}
