const ALLOWED_PATHS = [
  '/cs2/matches/live',
  '/cs2/matches/upcoming',
  '/cs2/matches/recent',
  '/cs2/rankings/world',
  '/cs2/rankings/vrs',
  '/cs2/teams',
  '/cs2/leaderboards/rating',
  '/cs2/events/live'
];

exports.handler = async (event) => {
  const key = process.env.CITO_API_KEY;
  if (!key) {
    return json(500, { success: false, message: 'Не задан CITO_API_KEY в Netlify Environment variables.' });
  }

  const rawPath = event.queryStringParameters?.path || '';
  let target;
  try { target = new URL(rawPath, 'https://api.citoapi.com'); }
  catch { return json(400, { success: false, message: 'Некорректный API path.' }); }

  if (target.origin !== 'https://api.citoapi.com' || !ALLOWED_PATHS.includes(target.pathname)) {
    return json(400, { success: false, message: 'Этот API endpoint не разрешён.' });
  }

  const qs = new URLSearchParams(event.queryStringParameters || {});
  qs.delete('path');
  // Preserve query params included inside the path, e.g. ?limit=60.
  for (const [k, v] of target.searchParams.entries()) qs.append(k, v);
  const url = 'https://api.citoapi.com/api/v1' + target.pathname + (qs.toString() ? '?' + qs.toString() : '');

  try {
    const response = await fetch(url, {
      headers: { 'x-api-key': key, 'Accept': 'application/json' }
    });
    const body = await response.text();
    return {
      statusCode: response.status,
      headers: { 'Content-Type': response.headers.get('content-type') || 'application/json', 'Cache-Control': 'no-store' },
      body
    };
  } catch (err) {
    return json(502, { success: false, message: 'Не удалось связаться с Cito API.' });
  }
};

function json(statusCode, data) {
  return { statusCode, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }, body: JSON.stringify(data) };
}
