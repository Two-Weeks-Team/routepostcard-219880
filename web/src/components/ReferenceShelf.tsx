export default function ReferenceShelf() {
  const samples = [
    { city: 'Seoul', brief: '7‑day indie art tour' },
    { city: 'Busan', brief: '5‑day coastal food crawl' },
    { city: 'Jeju', brief: '4‑day nature & tea escape' }
  ];
  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold text-primary mb-4 text-center">Explore Sample Storyboards</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {samples.map((s, i) => (
          <div key={i} className="bg-card rounded-lg shadow-card p-4 flex flex-col items-center">
            <h3 className="font-medium text-foreground">{s.city}</h3>
            <p className="text-sm text-muted mt-1">{s.brief}</p>
            <button className="mt-3 px-4 py-2 bg-primary text-card rounded-md hover:bg-primary/90 transition-colors">
              View Demo
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
