import '@/app/globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'RoutePostcard – Cinematic Travel Studio',
  description: 'Turn a city brief into a visual travel postcard for Seoul, Busan, and Jeju.'
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="bg-background text-foreground antialiased">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
