"use client";
import { useState } from "react";
import { fetchPlan } from '@/lib/api';
import { SparklesIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

type WorkspacePanelProps = {
  onGenerate: (query: string, preferences: string) => Promise<void>;
};

export default function WorkspacePanel({ onGenerate }: WorkspacePanelProps) {
  const [query, setQuery] = useState('');
  const [preferences, setPreferences] = useState('sunny');
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setSubmitting(true);
    setLocalError(null);
    try {
      await onGenerate(query, preferences);
    } catch (err) {
      setLocalError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-card rounded-lg shadow-card p-6 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="text-sm font-medium text-foreground" htmlFor="query">
          City brief
        </label>
        <input
          id="query"
          type="text"
          placeholder="e.g., 7‑day indie art tour in Seoul"
          className="border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <label className="text-sm font-medium text-foreground" htmlFor="pref">
          Weather &amp; mood (optional)
        </label>
        <select
          id="pref"
          className="border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          value={preferences}
          onChange={e => setPreferences(e.target.value)}
        >
          <option value="sunny">Sunny</option>
          <option value="rainy">Rainy</option>
          <option value="mixed">Mixed</option>
        </select>
        {localError && <p className="text-warning text-sm">{localError}</p>}
        <button
          type="submit"
          disabled={submitting}
          className={clsx(
            'flex items-center justify-center gap-2 bg-primary text-card font-medium py-2 rounded-md hover:bg-primary/90 transition-colors',
            submitting && 'opacity-60 cursor-not-allowed'
          )}
        >
          <SparklesIcon className="w-5 h-5" />
          {submitting ? 'Creating...' : 'Create Postcard'}
        </button>
      </form>
    </section>
  );
}
