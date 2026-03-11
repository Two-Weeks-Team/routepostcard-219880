export default function FeaturePanel() {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold text-primary text-center mb-6">Trusted By</h2>
      <div className="flex flex-wrap justify-center items-center gap-8">
        <img src="/partner-kto.png" alt="Korea Tourism Organization" className="h-12" />
        <img src="/partner-local.png" alt="Local Cultural Institutes" className="h-12" />
      </div>
      <div className="mt-6 text-center text-muted">
        <p className="font-medium">Featured in</p>
        <div className="flex flex-wrap justify-center items-center gap-6 mt-2">
          <img src="/media-condé.png" alt="Condé Nast Traveller" className="h-8" />
          <img src="/media-lonely.png" alt="Lonely Planet" className="h-8" />
        </div>
      </div>
    </section>
  );
}
