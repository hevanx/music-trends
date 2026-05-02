import { getCurrentTrends, getTrendsHistory } from '@/lib/storage';
import { TrendsDisplay, EmptyState, ArchiveList } from '@/components/TrendsDisplay';

export const revalidate = 3600;

const GENRES = ['alt rock', 'post hardcore', 'emo', 'post punk'];

export default async function Home() {
  const [current, history] = await Promise.all([getCurrentTrends(), getTrendsHistory()]);

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <header className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text)] mb-2">
          MUSIC TRENDS
        </h1>
        <p className="text-[var(--muted)] text-xs mb-3">
          TikTok &amp; Reels · updated weekly · auto-generated
        </p>
        <div className="flex flex-wrap gap-1">
          {GENRES.map((g) => (
            <span
              key={g}
              className="text-xs px-2 py-0.5 border border-[var(--border)] text-[var(--muted)] rounded"
            >
              {g}
            </span>
          ))}
        </div>
      </header>

      {current ? <TrendsDisplay data={current} /> : <EmptyState />}
      <ArchiveList history={history} />
    </main>
  );
}
