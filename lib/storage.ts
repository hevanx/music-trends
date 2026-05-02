import { kv } from '@vercel/kv';
import { TrendsData } from '@/types/trends';

const CURRENT_KEY = 'trends:current';
const HISTORY_KEY = 'trends:history';
const MAX_HISTORY = 12;

export async function saveTrends(trends: TrendsData): Promise<void> {
  await kv.set(CURRENT_KEY, trends);

  const history: TrendsData[] = (await kv.get<TrendsData[]>(HISTORY_KEY)) ?? [];
  history.unshift(trends);
  if (history.length > MAX_HISTORY) history.splice(MAX_HISTORY);
  await kv.set(HISTORY_KEY, history);
}

export async function getCurrentTrends(): Promise<TrendsData | null> {
  return kv.get<TrendsData>(CURRENT_KEY);
}

export async function getTrendsHistory(): Promise<TrendsData[]> {
  return (await kv.get<TrendsData[]>(HISTORY_KEY)) ?? [];
}
