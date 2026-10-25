// Netlify Function: keeps the PandaScore token on the server, never in browser code.
const BASE = 'https://api.pandascore.co/csgo';

const ALLOWED = new Set([
  'health',
  'matches/running',
  'matches/upcoming',
  'tournaments/running',
  'tournaments/upcoming',
  'teams',
  'players'
]);

export default async (request) => {
  const url = new URL(request.url);
  const resource = url.searchParams.get('resource') || 'health';

  if (!ALLOWED.has(resource)) {
    return json({ error: 'Unsupported resource' }, 400);
  }

  if (resource === 'health') {
    return json({ configured: Boolean(process.env.PANDASCORE_API_KEY) });
  }

  const token = process.env.PANDASCORE_API_KEY;
  if (!token) {
    return json({
      error: 'PANDASCORE_API_KEY is not configured in Netlify Environment Variables.'
    }, 503);
  }

  const upstream = new URL(`${BASE}/${resource}`);
  upstream.searchParams.set('per_page', resource === 'players' ? '50' : '20');
  if (resource === 'matches/upcoming') upstream.searchParams.set('sort', 'begin_at');
  if (resource === 'tournaments/upcoming') upstream.searchParams.set('sort', 'begin_at');
  if (resource === 'teams' || resource === 'players') {
    upstream.searchParams.set('sort', 'name');
  }

  try {
    const response = await fetch(upstream, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });
    const body = await response.text();
    if (!response.ok) {
      let detail = body;
      try {
        const parsed = JSON.parse(body);
        detail = parsed.error || parsed.message || body;
      } catch {}
      return json({
        error: `PandaScore returned ${response.status}: ${String(detail).slice(0, 300)}`
      }, response.status === 429 ? 429 : 502);
    }
    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=60, s-maxage=60'
      }
    });
  } catch {
    return json({ error: 'Could not reach PandaScore API.' }, 502);
  }
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}
