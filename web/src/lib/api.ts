export type PlanRequest = {
  query: string;
  preferences: string;
};

export type PlanResponse = {
  summary: string;
  items: Array<{ date: string; headline: string; thumbnail: string; activities: string[] }>;
  score: number;
};

export async function fetchPlan(payload: PlanRequest): Promise<PlanResponse> {
  const res = await fetch('/api/plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to fetch plan');
  return res.json();
}

export type InsightsRequest = {
  selection: string;
  context: string;
};

export type InsightsResponse = {
  insights: string[];
  next_actions: string[];
  highlights: string[];
};

export async function fetchInsights(payload: InsightsRequest): Promise<InsightsResponse> {
  const res = await fetch('/api/insights', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to fetch insights');
  return res.json();
}
