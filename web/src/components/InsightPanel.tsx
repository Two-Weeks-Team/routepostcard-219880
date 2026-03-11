"use client";

import { useEffect, useState } from "react";
import { fetchInsights } from '@/lib/api';
import { MapPinIcon, CloudRainIcon } from '@heroicons/react/24/outline';

// Exported interface for the day item to avoid any potential TypeScript parsing issues
export interface DayItem {
  date: string;
  headline: string;
  thumbnail: string;
  activities: string[];
}

type InsightPanelProps = {
  plan: {
    summary: string;
    items: DayItem[];
    score: number;
  };
};

export default function InsightPanel({ plan }: InsightPanelProps) {
  const [insights, setInsights] = useState<string[]>([]);

  useEffect(() => {
    // Example: fetch extra insights based on first day's headline
    const fetch = async () => {
      try {
        const res = await fetchInsights({ selection: plan.items[0].headline, context: plan.summary });
        setInsights(res.insights);
      } catch (_) {}
    };
    fetch();
  }, [plan]);

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-semibold text-primary">Your Cinematic Storyboard</h2>
      <p className="text-muted">{plan.summary}</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plan.items.map((day, idx) => (
          <article key={idx} className="bg-card rounded-lg shadow-card overflow-hidden transition-transform hover:scale-[1.02]">
            <img src={day.thumbnail} alt={day.headline} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                <MapPinIcon className="w-5 h-5 text-primary" />
                {day.headline}
              </h3>
              <p className="text-sm text-muted mt-1">Day {day.date}</p>
              <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-foreground">
                {day.activities.map((act, i) => (
                  <li key={i}>{act}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
      {insights.length > 0 && (
        <div className="mt-6 p-4 bg-muted rounded-md">
          <h4 className="font-medium text-primary flex items-center gap-2">
            <CloudRainIcon className="w-5 h-5" />
            Weather‑aware Tips
          </h4>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-foreground">
            {insights.map((ins, i) => (
              <li key={i}>{ins}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
