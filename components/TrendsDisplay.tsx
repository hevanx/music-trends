import { TrendsData } from '@/types/trends';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-4 pb-2 border-b border-[var(--border)]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <span className="inline-block text-xs px-2 py-0.5 bg-[var(--accent-dim)] text-[var(--accent)] rounded mr-1 mb-1">
      {text}
    </span>
  );
}

export function TrendsDisplay({ data }: { data: TrendsData }) {
  const date = new Date(data.week).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div>
      <div className="mb-8">
        <p className="text-[var(--muted)] text-sm mb-3">{date}</p>
        <p className="text-[var(--text)] leading-relaxed text-sm border-l-2 border-[var(--accent)] pl-4">
          {data.summary}
        </p>
      </div>

      <Section title="Hooks — opening lines that pull people in">
        <div className="space-y-4">
          {data.hooks.map((h, i) => (
            <div key={i} className="bg-[var(--surface)] border border-[var(--border)] rounded p-4">
              <p className="text-[var(--text)] font-semibold mb-2">&ldquo;{h.hook}&rdquo;</p>
              <p className="text-[var(--muted)] text-sm mb-2">{h.why}</p>
              <p className="text-xs text-[var(--accent)] italic">{h.example}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Formats — what to actually shoot">
        <div className="grid gap-3 sm:grid-cols-2">
          {data.formats.map((f, i) => (
            <div key={i} className="bg-[var(--surface)] border border-[var(--border)] rounded p-4">
              <p className="text-[var(--text)] font-semibold text-sm mb-1">{f.format}</p>
              <p className="text-[var(--muted)] text-xs leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Angles — fan-first content that builds real community">
        <div className="space-y-3">
          {data.angles.map((a, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-[var(--accent)] text-xs mt-0.5 shrink-0">▸</span>
              <div>
                <p className="text-[var(--text)] text-sm font-semibold">{a.angle}</p>
                <p className="text-[var(--muted)] text-xs leading-relaxed">{a.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Dying — stop doing these">
        <div className="flex flex-wrap gap-2">
          {data.dying.map((d, i) => (
            <Tag key={i} text={d} />
          ))}
        </div>
      </Section>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="text-center py-20">
      <p className="text-[var(--muted)] text-sm mb-2">No trends yet.</p>
      <p className="text-[var(--muted)] text-xs">
        Trigger the first update via <code className="text-[var(--accent)]">/api/update-trends</code>
      </p>
    </div>
  );
}

export function ArchiveList({ history }: { history: TrendsData[] }) {
  if (history.length <= 1) return null;
  const past = history.slice(1);

  return (
    <details className="mt-10">
      <summary className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] cursor-pointer hover:text-[var(--text)] transition-colors">
        Archive ({past.length} past {past.length === 1 ? 'week' : 'weeks'})
      </summary>
      <div className="mt-4 space-y-2">
        {past.map((entry, i) => (
          <div key={i} className="border border-[var(--border)] rounded p-3">
            <p className="text-xs text-[var(--muted)] mb-1">
              {new Date(entry.week).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
            <p className="text-xs text-[var(--text)] leading-relaxed">{entry.summary}</p>
          </div>
        ))}
      </div>
    </details>
  );
}
