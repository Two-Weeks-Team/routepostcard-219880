import { Playfair_Display, Noto_Sans_KR } from 'next/font/google';

const titleFont = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-title'
});

const accentFont = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-accent'
});

export default function Hero() {
  return (
    <section className={`${titleFont.variable} ${accentFont.variable} py-12 text-center`}> 
      <h1 className="text-5xl md:text-7xl font-bold text-primary mb-4 tracking-wider">
        RoutePostcard
      </h1>
      <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto">
        Turn a city brief into a cinematic, neighborhood‑by‑neighborhood travel postcard for Seoul, Busan, and Jeju.
      </p>
    </section>
  );
}
