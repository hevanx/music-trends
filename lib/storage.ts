import { Redis } from '@upstash/redis';
import { TrendsData } from '@/types/trends';

const redis = new Redis({
  url: process.env.musictrendskv_KV_REST_API_URL!,
  token: process.env.musictrendskv_KV_REST_API_TOKEN!,
});

const CURRENT_KEY = 'trends:current';
const HISTORY_KEY = 'trends:history';
const MAX_HISTORY = 12;

export async function saveTrends(trends: TrendsData): Promise<void> {
  await redis.set(CURRENT_KEY, trends);

  const history: TrendsData[] = (await redis.get<TrendsData[]>(HISTORY_KEY)) ?? [];
  history.unshift(trends);
  if (history.length > MAX_HISTORY) history.splice(MAX_HISTORY);
  await redis.set(HISTORY_KEY, history);
}

export async function getCurrentTrends(): Promise<TrendsData | null> {
  return redis.get<TrendsData>(CURRENT_KEY);
}

export async function getTrendsHistory(): Promise<TrendsData[]> {
  return (await redis.get<TrendsData[]>(HISTORY_KEY)) ?? [];
}
