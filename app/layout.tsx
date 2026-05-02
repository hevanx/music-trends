import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Music Trends',
  description: 'Weekly TikTok & Reels trends for alt rock / post hardcore / emo artists',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
