"use client";
import { useState } from "react";
import Hero from '@/components/Hero';
import WorkspacePanel from '@/components/WorkspacePanel';
import InsightPanel from '@/components/InsightPanel';
import StatePanel from '@/components/StatePanel';
import CollectionPanel from '@/components/CollectionPanel';
import FeaturePanel from '@/components/FeaturePanel';
import StatsStrip from '@/components/StatsStrip';
import ReferenceShelf from '@/components/ReferenceShelf';

type PlanResponse = {
  summary: string;
  items: Array<{ date: string; headline: string; thumbnail: string; activities: string[] }>;
  score: number;
};

export default function HomePage() {
  const [plan, setPlan] = useState<PlanResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (query: string, preferences: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, preferences })
      });
      if (!res.ok) throw new Error('Network response was not ok');
      const data = (await res.json()) as PlanResponse;
      setPlan(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col gap-8 p-4 md:p-8 max-w-5xl mx-auto">
      <Hero />
      <WorkspacePanel onGenerate={handleGenerate} />
      <StatePanel loading={loading} error={error} />
      {plan && <InsightPanel plan={plan} />}
      <StatsStrip />
      <ReferenceShelf />
      <FeaturePanel />
      <CollectionPanel />
    </main>
  );
}
