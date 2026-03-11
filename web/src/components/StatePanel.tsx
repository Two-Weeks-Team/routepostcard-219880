"use client";
import { SpinnerIcon } from '@heroicons/react/24/outline';

type StatePanelProps = {
  loading: boolean;
  error: string | null;
};

export default function StatePanel({ loading, error }: StatePanelProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <SpinnerIcon className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-primary">Generating your travel storyboard…</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-4 bg-warning/10 border border-warning rounded-md text-warning">
        <p className="font-medium">Oops! Something went wrong.</p>
        <p>{error}</p>
      </div>
    );
  }
  return null;
}
