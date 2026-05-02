import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    ok: true,
    anthropic: !!process.env.ANTHROPIC_API_KEY,
    tavily: !!process.env.TAVILY_API_KEY,
    cron: !!process.env.CRON_SECRET,
    kv_url: !!process.env.musictrendskv_KV_REST_API_URL,
    kv_token: !!process.env.musictrendskv_KV_REST_API_TOKEN,
  });
}
