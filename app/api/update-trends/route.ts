import { NextRequest, NextResponse } from 'next/server';
import { gatherTrendData } from '@/lib/search';
import { synthesizeTrends } from '@/lib/synthesize';
import { saveTrends } from '@/lib/storage';

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const searchData = await gatherTrendData();
    const trends = await synthesizeTrends(searchData);
    await saveTrends(trends);
    return NextResponse.json({ success: true, week: trends.week });
  } catch (error) {
    console.error('Failed to update trends:', error);
    return NextResponse.json({ error: 'Failed to update trends' }, { status: 500 });
  }
}
