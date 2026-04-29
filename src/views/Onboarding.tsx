import React from "react";
import { AppIcon } from "../components/ui/Base";

interface OnboardingProps {
  topicDraft: string;
  setTopicDraft: (v: string) => void;
  handleStartJourney: (e: React.FormEvent) => void;
  useExample: () => void;
}

export function Onboarding({ topicDraft, setTopicDraft, handleStartJourney, useExample }: OnboardingProps) {
  return (
    <div className="min-h-screen bg-[#f7faf8] px-4 py-8 text-slate-900">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center py-12">
        <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="relative z-10 w-full max-w-xl rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-xl shadow-emerald-950/5 backdrop-blur">
          <div className="flex flex-col items-center text-center">
            <AppIcon />
            <h1 className="mt-5 text-4xl font-semibold tracking-tight">One Goal. 90 Days.</h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-slate-600">
              Pick one focus topic, lock it in, and track daily momentum. The app keeps your journey simple: one goal, one timer, one place for reflections.
            </p>
          </div>

          <form onSubmit={handleStartJourney} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                What is your singular focus?
              </label>
              <input
                value={topicDraft}
                onChange={(e) => setTopicDraft(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-lg outline-none ring-0 transition focus:border-emerald-500 focus:shadow-sm"
                placeholder="e.g. Build my first SaaS MVP"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <button
                type="submit"
                className="rounded-full bg-emerald-950 px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-sm transition hover:bg-emerald-900"
              >
                Start Journey
              </button>
              <button
                type="button"
                onClick={useExample}
                className="rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-700 transition hover:border-emerald-200 hover:text-emerald-900"
              >
                Use Example
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
