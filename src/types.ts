export interface Session {
  id: string;
  date: string;
  minutes: number;
  note: string;
  tags: string[];
}

export interface AppState {
  topic: string;
  startDate: string | null;
  locked: boolean;
  sessions: Session[];
  targetMinutesPerDay: number;
  dailyLimits?: { [date: string]: number };
}
