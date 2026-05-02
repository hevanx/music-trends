const TAVILY_API_URL = 'https://api.tavily.com/search';

async function searchTavily(query: string): Promise<string> {
  const response = await fetch(TAVILY_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: process.env.TAVILY_API_KEY,
      query,
      search_depth: 'advanced',
      max_results: 5,
      include_answer: true,
    }),
  });

  if (!response.ok) throw new Error(`Tavily error: ${response.status}`);

  const data = await response.json();
  const sources = data.results
    ?.map((r: { title: string; content: string }) => `${r.title}\n${r.content}`)
    .join('\n\n') ?? '';

  return data.answer ? `${data.answer}\n\n${sources}` : sources;
}

export async function gatherTrendData(): Promise<string> {
  const queries = [
    'TikTok music marketing hooks trending 2025 alt rock emo post hardcore indie artists',
    'Instagram Reels music content strategy 2025 independent artist fan engagement growth',
    'TikTok fan first music content what is working 2025 scene based music creators',
  ];

  const results = await Promise.all(queries.map(searchTavily));

  return results.map((r, i) => `=== SEARCH ${i + 1}: ${queries[i]} ===\n${r}`).join('\n\n');
}
