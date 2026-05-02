import Anthropic from '@anthropic-ai/sdk';
import { TrendsData } from '@/types/trends';

const client = new Anthropic();

export async function synthesizeTrends(searchData: string): Promise<TrendsData> {
  const today = new Date().toISOString().split('T')[0];
  const now = new Date().toISOString();

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2000,
    system: `You are a music marketing analyst who deeply understands the alt rock, post hardcore, emo, and post punk scenes on TikTok and Instagram Reels.

You specialize in fan-first content strategy — content that feels like a passionate scene kid made it, not an artist trying to go viral. Think "top 3 most underrated post hardcore albums" energy, not "check out my new song" energy.

Your audience is one independent artist in this scene trying to build a genuine, loyal fanbase online.`,
    messages: [
      {
        role: 'user',
        content: `Analyze these search results and produce a weekly trends report for the week of ${today}.

${searchData}

Return ONLY a valid JSON object — no markdown fences, no explanation, just raw JSON:

{
  "week": "${today}",
  "generatedAt": "${now}",
  "hooks": [
    {
      "hook": "the opening line or content concept",
      "why": "why this works psychologically for this audience",
      "example": "a concrete example tailored to alt rock / emo / post hardcore"
    }
  ],
  "formats": [
    {
      "format": "format or editing style name",
      "description": "how to execute it for this genre"
    }
  ],
  "angles": [
    {
      "angle": "content angle name",
      "description": "how an artist-who-is-also-a-fan uses this in the scene"
    }
  ],
  "dying": [
    "overused format or trend losing traction — be specific, not generic"
  ],
  "summary": "2-3 sentences on where the scene is headed this week on short-form video"
}

Include 4-5 hooks, 3-4 formats, 4-5 angles, 3-4 dying trends. Everything must be specific to this scene — no generic music advice.`,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== 'text') throw new Error('Unexpected response type from Claude');

  return JSON.parse(content.text) as TrendsData;
}
