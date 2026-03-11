export default function StatsStrip() {
  return (
    <section className="flex justify-center gap-8 py-4 bg-muted rounded-md">
      <div className="text-center">
        <p className="text-2xl font-bold text-primary">4.7★</p>
        <p className="text-sm text-foreground">AI relevance rating</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-primary">+12k</p>
        <p className="text-sm text-foreground">Travelers served</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-primary">7‑day</p>
        <p className="text-sm text-foreground">Average itinerary length</p>
      </div>
    </section>
  );
}
